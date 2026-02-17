# Partial SHA-2 Collision with Prefix/Suffix (oneAPI SYCL)

Link to GitHub Repository: [https://github.com/jianxun-p/partial-sha2-collision-with-oneapi](https://github.com/jianxun-p/partial-sha2-collision-with-oneapi)

This project searches for a **partial collision** in SHA-2 outputs: two different inputs that share the same first `N` bytes of hash output.

Inputs are constrained to this format:

`input = prefix || variable_middle(N bytes) || suffix`

The implementation uses a Van Oorschot–Wiener (VOW) style collision search with **distinguishable points (DPs)** and runs in parallel with **oneAPI SYCL**.

## Table of Contents 

- [Results](#results)
    - [Potential Optimizations (CPU)](#potential-optimizations-cpu)
    - [Potential Optimizations (GPU)](#potential-optimizations-gpu)
- [Secure Hash Algorithm 2 (SHA-2) & The Merkle–Damgard Construction](#secure-hash-algorithm-2-sha-2--the-merkledamgard-construction)
- [Van Oorschot–Wiener](#van-oorschotwiener)
- [Features](#features)
- [Repository Layout](#repository-layout)
- [Configuration](#configuration)
- [Build](#build)
- [Run](#run)
- [Example Collision Condition](#example-collision-condition)
- [Disclaimer](#disclaimer)

---

## Results

Here are the results for SHA256 (prefix = `0x00112233` and suffix = `0x33221100`):

| Collision Size (N) | K | Device | Hash Count | Duration | Average Hash Speed |
| --- | --- | --- | --- | --- | --- |
| 7 | 2 | AMD R9-9900X CPU | 2,000,114,392 hashes | 32 seconds | 62,503,574 hashes/second |
| 8 | 2 | AMD R9-9900X CPU | 10,000,252,285 hashes | 82 seconds | 121,954,296 hashes/second |
| 9 | 2 | AMD R9-9900X CPU | 26,000,102,890 hashes | 179 seconds | 145,251,971 hashes/second |
| 7 | 2 | Intel Arc B580 GPU | 2,000,114,392 hashes | 2 seconds | 1,000,057,196 hashes/second |
| 8 | 2 | Intel Arc B580 GPU | 10,000,252,285 hashes | 7 seconds | 1,428,607,469 hashes/second |
| 9 | 2 | Intel Arc B580 GPU | 26,000,102,890 hashes | 22 seconds | 1,181,822,858 hashes/second |


### Potential Optimizations (CPU)

The number of work-item (`THREADS`) and `BATCH_SIZE` can be reduced. 

Memory allocation/release is time consuming, which increased duration and average hash speed. The effect is more significant for smaller collision sizes.

Bottleneck: There exists 2 copies of the same data in the memory, and copying between them is unnecessary and time consuming.

The step of reduction with a single thread of CPU can be optimized, other threads are running idle at that time.

### Potential Optimizations (GPU)

`State`s are written/updated by device, the host only reads it, using device memory with `memcpy` to host memory for `State` may be a better alternative.

Bottleneck: The step of reduction with a single thread of CPU can be optimized, the GPU is running idle at that time.

---


## Secure Hash Algorithm 2 (SHA-2) & The Merkle–Damgard Construction

The SHA-2 is based on the [Merkle–Damgard construction](https://en.wikipedia.org/wiki/Merkle%E2%80%93Damg%C3%A5rd_construction).

The Merkle–Damgard construction consists of a compression function, $f$ (see function `sha2_compression`), which needed to be:

- pre-image resistant
    - i.e. when given $x$, it is computationally infeasible to find $y$, such that $x=f(y)$
- second pre-image resistant
    - i.e. when given $x$, it is computationally infeasible to find $y$, such that $f(x)=f(y)$
- collision resistant
    - i.e. it is computationally infeasible to find any pairs of $x,x'$ such that $f(x)=f(x')$
    - collision resistance implies second pre-image resistance

For a given message $m=m_1||\cdots||m_n$, the hash value of a hash function using the Merkle–Damgard construction is $H=H_1||\cdots||H_M$, where:

- $H_0$: intial hash values (i.e. initial vectors), see NIST's publication
- $H_i=f(m_i, H_{i-1})$ for $i\neq 1$

### Secure Hash Algorithm 2 (SHA-2) 

See NIST's publication for details: [https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)

---

## Van Oorschot–Wiener

Distinguishable Point (DP) are values such that the first `K` bytes equal to zero.

Create chains of `start_DP -> end_DP` (Stage 1).

If two chains have the same `end_DP` and different `start_DP`, then these two chains must have merged together at some point.

We backtrack (Stage 2) to find the point where they merge together.

### Stage 1: Parallel random walks + DP collision search

Each worker thread:
1. Starts from a deterministic seed
2. Repeatedly hashes `prefix || middle || suffix`
3. Treats outputs with first `K` bytes equal to zero as a distinguishable point
4. Stores chains ending at DPs

When two chains hit the same DP key (matching first `N` bytes), stage 1 returns two chain starts (`X`, `Y`) and distances to that DP.

### Stage 2: Backtracking to find the actual partial collision

The two chains are aligned by step count and advanced together until the first point where their first `N` hash bytes match. The corresponding two inputs are reported.

---

## Features

- Supports SHA-2 family variants:
	- `SHA224`, `SHA256`, `SHA384`, `SHA512`, `SHA512_224`, `SHA512_256`
- Configurable partial-collision size (`N` bytes)
- Configurable DP condition (`K` bytes, where `K <= N`)
- Prefix/suffix constrained input space
- Parallel stage-1 walk on CPU/GPU SYCL device
- Header-only SHA-2 implementation in [sha2.hpp](sha2.hpp)

---

## Repository Layout

- [main.cpp](main.cpp): VOW search logic, SYCL kernels, collision reporting
- [sha2.hpp](sha2.hpp): Header-only SHA-2 implementations
- [Makefile](Makefile): Build and run targets

---

## Configuration

Edit constants near the top of [main.cpp](main.cpp):

- `hash_type`: select SHA-2 variant
- `N`: number of leading output bytes that must collide
- `K`: DP prefix length in bytes (`K <= N`)
- `prefix`, `suffix`: fixed bytes around the variable `N`-byte middle
- `THREADS`: number of parallel walkers
- `BATCH_SIZE`: steps per walker before host merge/check
- `DP_ARRAY_LEN`: max DPs stored per thread per batch

### Notes

- Larger `N` increases expected work roughly as $2^{4N}$ for birthday-style partial collisions (in bits: $2^{8N/2}$).
- Larger `K` reduces DP frequency; smaller `K` increases merge overhead.
- Tune `THREADS`, `BATCH_SIZE`, and `DP_ARRAY_LEN` for your device memory and throughput.

---

## Build

Prerequisites:
- Intel oneAPI DPC++/C++ compiler (`icpx`)
- oneAPI/SYCL runtime properly configured in shell environment

### Option 1: Build with Makefile

The project Makefile compiles to `sha2_collision` (or `sha2_collision.exe` on Windows).

### Option 2: Direct compile command

```bash
icpx -fsycl -O3 -std=c++20 -Wall -Wextra -march=native -o sha2_collision main.cpp
```

---

## Run

Run the built binary.

Program output includes:
- selected SYCL device
- stage-1 batch progress and hash counts
- detected DP collision
- stage-2 alignment/backtracking logs
- final partial collision inputs and outputs
- total hashes, duration, and hashing speed

---

## Example Collision Condition

If `N = 8`, success means the first 8 bytes of the two outputs are identical:

`hash(input1)[0..7] == hash(input2)[0..7]`

with `input1 != input2` and both matching the `prefix || middle || suffix` format.

---

## Disclaimer

This project is for educational and research use (parallel hash search, SYCL programming, and collision-search techniques). Do not use it for unauthorized security testing.


