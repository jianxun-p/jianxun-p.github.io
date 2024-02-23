# Stage 1

## Table of Contents
---
- [Brief](#brief)
- [TLS version 1.2](#tls-version-12)
- [Features](#features)
- [Issues](#issues)
- [TLS version 1.3](#tls-version-13)
- [References](#references)

## Brief
---
At stage 1, this project implemented the server end of TLS1.2 with C++20. However, the build up of shit code made it nearly impossible to continue after successfully establishing the first TLS connection and deciphering the very first application data. As a result, the project was re-started.


## TLS version 1.2
---
In the inital `Client Hello` handshake message, the client will specifiy all supported cipher suites and public crytographic parameters, it also includes a 32 bytes of random data and a sequence of bytes for session ID. The random bytes would be used later in shared-key derivation. 

The server will respond with a `Server Hello` message, it also contains 32 random bytes and session ID, but it would choose one cipher suite and the required public crytographic parameters. The server would also send a `Certificate` signed by a CA to the client. The certificate contains a public key for the clients to encrypt a pre-master secret. Only the server is capable of decrypting the pre-master secret due to the properties of asymetric encryption, and the certificate is signed with the private key of the CA, which nobody acknowledges, so by using the public key of the CA, held by the operating systems, it is sufficient to assure that the public key contained inside the certificate has not been modified by any attackers in the network. On top of that, since only the server has the private key, nobody else except the client and the server knows the pre-master secret. 

The pre-master secret itself is not long enough to be directly used as session keys, and to avoid bad implementation of TLS that use the same pre-master secret repeatedly, the pre-master secret with be extended to obtain the master secret using the random bytes sent. If the extended-master secret extension was specified in the client hello and server hello messages, all handshake message would also be included to add an additional level of security. 

After key negotiation, both the server and client will send a `Change Cipher Spec` handshake message to indicate that all messages beyond would be encrypted with the session key. At the end of the handshake, it is required to send a hash of all messages encrypted with the new session key to ensure that the handshake messages are not modified by attackers and to ensure that there are no errors in key calculation of both sides. 


## Features
---
There is limited amount of features and support, and the cipher suites supported are not the most secure; in fact, it only supports RSA key exchange and AES in GCM mode for stream cipher using SHA2 as the hashing algorithm. 


## Learn
---
- wireshark
- openssl

## Reflection
---


## Issues
---
The structure and style of code resulted in poor readability. The comprimises made during development that were supposed to be fixed have never been revisted. The extensive use of stack memory, pointers and casting for fast implementation made it difficult to follow. This bad habit resulted in extremely unsafe code for deployment; in fact, segmentation fault and stack buffer overflow occured several times. The documentation can be improved by specifying the side effects of the code. The structure of the implmentation is done well. Few functions and classes are responsible of long heavy tasks. Despite the improvement of documentation from previous projects, the style cannot keep up with the growing size of this project. 



## References
---
- [RFC5246: The Transport Layer Security (TLS) Protocol Version 1.2](https://www.rfc-editor.org/rfc/rfc5246)
- [SHA256 Algorithm](https://sha256algorithm.com/)
- [RFC2104: HMAC: Keyed-Hashing for Message Authentication](https://datatracker.ietf.org/doc/html/rfc2104)
- [RFC5280: Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile](https://datatracker.ietf.org/doc/html/rfc5280)
- [RFC5116: An Interface and Algorithms for Authenticated Encryption](https://www.rfc-editor.org/rfc/rfc5116)
- [RFC5288: AES Galois Counter Mode (GCM) Cipher Suites for TLS](https://www.rfc-editor.org/rfc/rfc5288)
- [FIPS197: Advanced Encryption Standard (AES)](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197-upd1.pdf)
- [NIST: Galois/Counter Mode (GCM) and GMAC](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-38d.pdf)
- [The Galois/Counter Mode of Operation (GCM)](https://csrc.nist.rip/groups/ST/toolkit/BCM/documents/proposedmodes/gcm/gcm-spec.pdf)
- [NIST: Methods and Techniques](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-38a.pdf)
- [GCM Examples](https://csrc.nist.gov/CSRC/media/Projects/Cryptographic-Standards-and-Guidelines/documents/examples/AES_GCM.pdf)
