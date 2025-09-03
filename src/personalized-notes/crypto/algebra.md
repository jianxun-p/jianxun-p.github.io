# Algebra

## Table of Contents

---

- [Number Theory](#number-theory)
  - [Euler's Totient Function & Modulo Multiplicative Group](#eulers-totient-function-and-modulo-multiplicative-group)
  - [Multiplicative Order & Primitive Root & Index (Discrete Logrithm)](#multiplicative-order-and-primitive-root-and-index)
- [Group](#group)
  - [Coset](#coset)
  - [Group Homomorpphism & Isomorphism](#group-homomorphism-and-isomorphism)
  - [Cyclic Group](#cyclic-group)
- [Ring](#ring)
  - [Characteristic](#characteristic)
  - [Ideal](#ideal)
- [Field](#field)

## Number Theory

---

### Euler's Totient Function and Modulo Multiplicative Group

**Modulo Multiplicative Group**: $\Z_n^* := \{a\in \Z_n: \gcd(a,n)=1 \}$ is the set of elements in $\Z_n$ that has a modular inverse under modulo $n$.

**Euler's Totient Function**: $\phi(n) := |\Z_n^*|$ (i.e. the number of elements in $\Z_n$ that has a modular inverse).

### Multiplicative Order and Primitive Root and Index

**Multiplicative Order**: For any $a\in\Z_n^*$, the smallest positive integer $k$ that satisfies $a^k \equiv 1\ (\mathrm{mod}\ n)$ is the multiplicative order. Denoted as $\mathrm{ord}_n(a)$.

**Primitive Root**: Positive interger $g$ that satisfies $\mathrm{ord}_n(g)=\phi(n)$. Primitive roots have the property $g^{\phi(n)}\equiv 1\ (\mathrm{mod}\ n)$.

**Index (Discrete Logrithm)**: Exists an unique $\log_g(a):=x$, such that $a\equiv g^x\ (\mathrm{mod}\ n)$ and $\gcd(a,n) = 1$. It is bounded by $0\leq\log_g(a)<\phi(n)$.

- $\log_g(ab) \equiv \log_g(a) + \log_g(b)\ (\mathrm{mod}\ \phi(n))$
- $\log_g(a^m) \equiv m\log_g(a)\ (\mathrm{mod}\ \phi(n))$
- $\log_h(a) \equiv \log_h(g)\log_g(a)\ (\mathrm{mod}\ \phi(n))$

**Discrete Logrithm Problem**: There does not exists an efficient alogrithm that can quickly compute the index.

## Group

---

$(S,\cdot)$ is a group $G$ consists of a **non-empty set** $S$ and a **binary operation** $\cdot$ on any 2 elements of $S$, with the following axioms being satisfied:

- **Closed**: $\forall a,b\in G,a\cdot b\in G$
- **Associative**: $\forall a,b,c\in G,a\cdot b\cdot c = (a\cdot b)\cdot c = a\cdot(b\cdot c)$
- **Unique Identity**: $\exists e\in G, \forall a\in G, a=e\cdot a=a\cdot e$
- **Unique Inverse**: $\forall a\in G, \exists a^{-1}\in G, e=a\cdot a^{-1}=a^{-1}\cdot a$

**Subgroup**: $H:=(U,\cdot)$ is a subgroup of $G$ iff $U\subsetneq S$ and $H$ forms a group.

**Abelian Group**: a group where $\cdot$ is commutative for elements in $S$ (e.g., $(\Z,+)$).

### Coset

For any $a\in G$,

1. $aH:=\{a\cdot h:h\in H\}$ is the "left coset of $H$ in $G$ with the representative $a$"

2. $Ha:=\{h\cdot a:h\in H\}$ is the "right coset of $H$ in $G$ with the representative $a$"

3. $[a]_H:=aH$ is the "coset of $H$ in $G$ with the representative $a$" iff $aH = Ha$

Coset divides $G$ into subsets based on the relationship between elements in $H$ and any $b\in G$. All elements of $G$ belongs to some coset, so $G = \bigcup_{i=1}^n [a_i]_H$.

$a\equiv b\ (\mathrm{mod}\ H)$ iff $a$ and $b$ have the same relative relationship with $H$ (i.e., $[a]_H=[b]_H$).

> For example, let $G=\Z$,and $H=3\Z=\{0,\pm3,\pm6,\cdots\}$, all elements $b$ in the congruence class (coset) $[1]_{3\Z}$ all have the same relationship of $b\equiv 1\ (\mathrm{mod}\ 3)$.

**Operation on Cosets**: $[a]_H\cdot [b]_H := [a\cdot b]_H$

**Lagrange's Theorem**: For any finite group $G$ with its subgroup $H$, the cardinality of $H$ divides the cardinality of $G$ (i.e., $|H|\ |\ |G|$). Proof: All cosets in $G$ have the same cardinality as $H$ (the ordinary coset), since there exists a bijection mapping between any cosets $[a]_H$ and $[b]_H$; hence, $|G| = \sum_{i=1}^n |[a_i]_H| = \sum_{i=1}^n |H| = n|H|$.

**Normal Subgroup**: $N$ is a normal subgroup iff $\forall a\in G,aN=Na$

**Quotient Group**: $G/N:=\{[a]_N: a\in G\}$ (e.g., $\Z/n\Z = \{[0],[1],...,[n-1]\} = \Z_n$)

### Group Homomorphism and Isomorphism

**Homomorphism**: For groups $(G,\cdot)$, $(G',\times)$, if exists functions $f:G\rightarrow G'$ such that $\forall a,b\in G, f(a\cdot b)=f(a)\times f(b)$, then these two groups are said to be homomorphism.

**Homomorphic Image**: $\mathrm{Im}(f) = f(G) := \{f(a): a\in G\}$. Does not necessarily be the entire $G'$ (i.e. $f$ may be non-surjective).

**Homomorphic Kernal**: $\mathrm{Ker}(f) := \{a\in G:f(a)=e'\}$, where $e'$ is the identity in $G'$. Does not necessarily be $\{e\}$ (i.e. $f$ may be non-injective).

**Isomorphism**: Homomorphism but with the constrain that $f$ is bijective (i.e. $f^{-1}$ exists). Denoted as $G\cong G'$.

Isomorphic groups are essentially the same group, and all properties are commonly shared.

**Fundamental Homomorphism Theorem (FHT)**: For any homomorphism of group $G$ with a function $f$, there always exists an isomorphism relationship, $G/\mathrm{Ker}(f) \cong \mathrm{Im}(f)$.

### Cyclic Group

$\langle g\rangle:=\{g^n: n\in \Z\}$ is a cyclic group with a generator of $g$ iff $\langle g\rangle$ is a group (e.g., $m\Z=<m>$ is a cyclic group).

**Order of Element**: For any group $G$, $a\in G$, if $n$ is the minimum positive integer such that $a^n=e$, then $n$ is the order of element $a$. This is similar to the [multiplicative order](#multiplicative-order-and-primitive-root-and-index) for $\Z_n^*$.

- $\forall m\in\Z, n|m \iff a^m=e$.
- If the order of a finite cyclic group $\langle g\rangle=n$, then the order of $g=n$, and $g\neq g^2\neq\cdots\neq g^n=g^0$.
- Any order $n$ finite cyclic group, if $d|n$, then there exists an unique subgroup with order $d$.
- For any $k\in\Z$, the order of the element $g^k$ is $\frac{n}{\gcd(n,k)}$.
- Cyclic group with order $n$ has $\phi(n)$ distinct generators.
- $\langle g\rangle\cong\Z_n$

For integers $m=1,2,4,p^k,2p^k$, where $p$ is an odd prime and $k$ is a positive integer, there exists a [primitive root](#multiplicative-order-and-primitive-root-and-index) $g\in\Z_m^*$. In addition, $\Z_m^*=\langle g\rangle$ forms a finite cyclic group, so primitive roots are generators.

## Ring

---

$(R, +, \cdot)$ is a ring when:

- $(R, +)$ is an Abelian group
- $(R, \cdot)$ is closed: $a,b\in R \implies a\cdot b\in R$
- $(R, \cdot)$ is associative: $a\cdot b\cdot c=a\cdot(b\cdot c)=(a\cdot b)\cdot c$
- Distributative law holds: $\forall a,b,c\in R, a\cdot(b+c)=a\cdot b+a\cdot c$ and $(b+c)\cdot a=b\cdot a+c\cdot a$

Additionally, more restrictions can be placed:

- Ring with Identity: contains an multiplicative identity(i.e. $\exists e\in R, \forall a\in R, e\cdot a = a\cdot e = e$)
- Commutative Ring: operation $\cdot$ is commutative(i.e. $\forall a,b\in R, a\cdot b = b\cdot a$)
- Division Ring: $(R\setminus\{\theta\}, \cdot)$ forms a group

**Zero Element($\theta$)**: An element $\theta\in R$ such that $\forall a\in R, a\cdot\theta=\theta\cdot a=\theta$. This is also the additive identity (proof: $a\cdot\theta=\theta\iff a\cdot b=a\cdot b+a\cdot\theta=a\cdot(b+\theta)$).

**Identity($e$)**: The multiplicative identity. For any ring with $|R|>1$, $\theta\neq e$ (proof by contradiction: $e=\theta\implies \forall a\in R, a=e\cdot a=\theta\cdot a=\theta$).

**Zero Divisor**: Non zero elements $a,b\in R$ ($a\neq\theta,b\neq\theta$), such that $a\cdot b=\theta$ (e.g. $2,5\in\Z_{10}, 2\cdot5\equiv0\ (\mathrm{mod}\ 10)$).

**Integral Domain**: a commutative ring with identity that there is no zero divisors and $|R|>1$.

### Characteristic

$\mathrm{Char}\ R:=m$, where $m$ is the smallest positive integer such that $\forall a\in R,\theta=\sum_{i=1}^m a$. If such $m$ does not exists, then $m=0$.

This is similar to the additive order of a given $a\in R$, except that the characteristic of a ring is for ALL $a\in R$.

### Ideal

$(R,+,\cdot)$ is a ring, for some $I\subseteq R$, if

- $\emptyset\neq I$
- $(I,+)$ is a subgroup of $(R,+)$
- $I$ satisfies any of:
  1. $\forall r\in R,\forall a\in I\implies r\cdot a\in I$
  2. $\forall r\in R,\forall a\in I\implies a\cdot r\in I$

, then $I$ is called the "left ideal of $R$" if (1) is satisfied, the "right ideal of $R$" if (2) is satisfied, or simply "(two-sided) ideal of $R$" if both conditions are met.

#### Principal Ideal

$(aR, Ra):=({a\cdot r:r\in R}, {r\cdot a:r\in R})$ for some $a\in R$

If $aR=Ra$, then $(a):=aR$ is the principal ideal of $R$ generated by $a$.

#### Prime Ideal

If $I\subsetneq R$ and $\forall a,b\in R, a\cdot b\in I\implies a\in I\vee b\in I$, then $I$ is the prime ideal of $R$ (this is similar to $p|ab\implies p|a\vee p|b$ in prime factorization).

## Field

$(F, +, \cdot)$ is a field when:

- $(R, +)$ is an Abelian group
- $(R\setminus\{\theta\}, \cdot)$ is an Abelian group
- Distributative law holds: $\forall a,b,c\in R, a\cdot(b+c)=a\cdot b+a\cdot c$ and $(b+c)\cdot a=b\cdot a+c\cdot a$

All fields are integral domains, but only finite integral domains are fields.
