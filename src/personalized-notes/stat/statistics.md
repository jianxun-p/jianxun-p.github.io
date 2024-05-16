# Statistics

## Table of Contents

---

- [Combination, Permutation and Ordering](#combination-permutation-and-ordering)
  - [Multinomial Coefficient](#multinomial-coefficient)
  - [Permutation and Ordering](#permutation-and-ordering)
  - [Partition into Multiple Categories](#partition-into-multiple-categories)
- [Probability Distributions](#probability-distributions)
  - [Binomial and Multinomial Distribution](#binomial-and-multinomial-distribution)
  - [Poisson Distribution](#poisson-distribution)

## Combination, Permutation and Ordering

---

### Multinomial Coefficient

In context of combinations, the number of ways to choose $r$ objects from a total of $n$ is given by $\binom{n}{r} = \frac{n!}{r!(n-r)!}$. This is because the act of choosing is equvilant to categorizing or labeling the objects into 2 distinct categories, the chosen ones or the ones that is not chosen. There are $n!$ ways to order $n$ objects. However, the order of both the chosen group and the non chosen group does not matter, and there are $r!$ ways to order the chosen group, $(n-r)!$ ways of ordering the non chosen group; hence, the number of ways to categorize the objects is $\binom{n}{r} = \frac{n!}{r!(n-r)!}$.

Extending this concept, to partitioning the objects into $m$ categories, then if we need $k_i$ indistinguishable objects in the $i\in\{1,2,\dots,m\}$ th category, then the number of ways to categorize is given by the multinomial coefficient $\binom{n}{k_1,k_2,\dots,k_m} = \frac{n!}{k_1!k_2!\cdots k_m!}$.

Note: $k_1 + k_2 + \dots + k_m = n$ must be true.

#### Example

The number of distinct words that can be produced from the letters `STATISTICS` is $\binom{10}{3,3,1,2,1}$, because the count of each letter is given by {`S`: 3, `T`: 3, `A`: 1, `I`: 2, `C`: 1}.

### Permutation and Ordering

When the ordering is important, it is equivalent to categorizing $n$ objects into $r+1$ distinct categories, the category for the non-chosen objects and the categories with labels first, second, third, etc... Each category except for the non-chosen category contains exactly 1 object. Therefore, the number of ways to choose $r$ objects from $n$ is $n^{(r)} = \binom{n}{n-r,1,1,\dots,1} = \frac{n!}{(n-r)!}$.

In other words, the act of ordering is fundamentally the same as giving unique labels.

### Partition into Multiple Categories

The number of ways to partition $n$ indistinguishable objects into $k$ categories is given by \
$\binom{n+k-1}{n} = \binom{n+k-1}{k-1} = \binom{n+k-1}{n,k-1}$. To partition the objects into $k$ categories, we need $k-1$ sticks to seperate them. Hence,  it requires $n+k-1$ spaces in total to place all objects and sticks. Out of those spots, $k-1$ of them would be for sticks and $n$ of them for objects.

To ensure that each category has at least $c$ object, the sticks have to be seperated by at least $c$ object (e.g. for $c=2$, $\mathrm{OO}|\mathrm{OO}|\mathrm{OO}|\cdots|\mathrm{OO}|\mathrm{OO}$). Then, we have to categorized (i.e. insert) the remaining $n-ck$ objects, and by the result above, there are $\binom{n+k(1-c)-1}{k-1}$ ways of doing so.

Note: Each category is distinguishable, so $(1, 2, 3)$ is different from $(2, 1, 3)$.

The difference with the *[multinomial coefficient](#multinomial-coefficient)* scenario is that this partition does not restrict the number of objects in each category, but both requires that every object is in one of the categories.

#### Examples

1. Number of ways to give $n$ indistinguishable coconuts to $k$ distinguishable friends:
$\binom{n+k-1}{n}$
2. Number of possible tallies of 20 indistinguishable votes to 6 distinguishable canidates:
$\binom{25}{6}$

## Probability Distributions

---

### Binomial and Multinomial Distribution

For $x$ Successes in $n$ bernoulli trials, there are $\binom{n}{x}$ ways of arranging the Successes and Failures. Therefore, the probability of $x$ successes is given by $\binom{n}{x}p^x(1-p)^{n-x}$ where $p$ is the probability of success in each bernoulli trial.

For experiments that have more than 2 possible outcomes in each trial, the *[multinomial coefficient](#multinomial-coefficient)* would be useful.

Note: each trial is independent and the union of all outcomes requires to be the entire sample space.

#### Example

3 dices are rolled independently, find the probability of getting 2 six's and 1 five.
The outcome of each trial is either 5, 6 or other, so the probability is:
$\binom{3}{2,1,0}(\frac{1}{6})^2(\frac{1}{6})^1(\frac{4}{6})^0 = \frac{1}{72}$.

Alternatively, the only outcomes of the experiment that satisfy the conditions are $(5, 6, 6), (6, 5, 6), (6, 6, 5)$, and we get the same result: $\frac{3}{6^3} = \frac{1}{72}$.

### Poisson Distribution

For any interval $I$ of space time, it can be uniformly partitioned into $n$ non overlapping sub-intervals ($I_1,I_2,\dots,I_n$). Assume that each event is independent from each other. If an event occured in $I$, then it is equally likely to occur in any of the $n$ sub-intervals. For each of the event that happened, the probability of it being in any of the sub-interval follows the ***discrete uniform distribution***.

This is a different interpretation of the *[binomial distribution](#binomial-and-multinomial-distribution)*, this interpretation can be extended further to obtain the poisson distribution. As $n$ approaches $\infin$, each sub-interval becomes a single moment in space time. The distribution of the probability of an occurance being at any of the moments is still uniform due to the property of independence; In fact, a ***continuous uniform distribution***. The probability of occurances at a given moment, however, approaches 0.

If $k=\lambda (b-a)$ occurances are expected in the interval $I=[a,b]$, then the probability of $x$ occurances actually takes place is $P(X=x)=\lim_{n\rightarrow\infin}\binom{n}{x}(\frac{k}{n})^x(\frac{n-k}{n})^{n-x} = \frac{\lambda^x e^{-\lambda}}{x!}$.

Due to their similarity, the poisson distribution can be approximated with the binomial distribution when $n$ is large.
