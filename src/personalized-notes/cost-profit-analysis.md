# Cost-Profit Analysis

## Introduction

Companies may provide different products/services that generates revenue. It is common that customers/clients will be in different stages before the final payment. For example, a company may post advertisements that attracts potential customers/clients to use a free sample/trial, which leads them to make a payment. In this example, there are 3 different stages (viewed ads $\rightarrow$ tried sample/trial $\rightarrow$ purchased product/service). For the company, each stage may incurr some costs/investments. With the previous example:
| Stage | Possible Costs |
|--|--|
|viewed ads|advertisment cost|
|tried sample/trial| cost of sample product/service |
|purchased| cost of product/service, commissions to sales personals, sales' base salary|

These investements will impact the number of potential clients in the previous stage to continue progressing down the pipeline. In this previous example, increasing the spending on sample products/services (provide better sample products/services) will encourage people to try the sample. 

In detailed, each stage can be broken down into different categories:

- Purchased: product A, product B, etc...
- Ads: ads for product A, ads for product B, etc...

The problem is: which part should be invested more to produce the optimal profit?

## Definitions and Notation

**Revenue** ($R(\mathbf{c})$ or $R$): The total amount of all client payments.

**Client Value**: The revenue contribution of a given client.

**Category** ($K$): A set of clients.

**Stage** ($S$): A set of categories $S = \{K_1,K_2,\dots\}$.

**Category Value** ($V_K$): For a given category $K$, the category value is a numerical value that describes the revenue contribution of $K$. In other words, it is the sum of client values for all clients in the $K$. This definition implies that $R = \sum_{K_i\in S} V_{K_i}$ for any stage $S$.

**Category Costs** ($\mathbf{c^{[K]}}$ or $\vec{c}^{[K]}$): A vector in $\mathbb R^{+n}$ that represents all costs associated with the category $K$, where $n$ is the number of costs associated with the category. For example, let $K$ be the category "Purchased Product A", and let's say the cost assoicated with the category $K$ has 3 components: cost of product (\$10 per unit sold), commission to sales personals (\$2 per unit sold), sales' base salary (\$1000), then $\mathbf{c^{[K]}} = \begin{bmatrix}10, 2, 1000\end{bmatrix}^\intercal$.

**Costs** ($\vec{c}$ or $\mathbf{c}$): A vector in $\mathbb R^{+n}$ that represents all costs, where $n$ is the number of costs. 

**Category Cost Function** ($C_K: \mathbb R^{+n}\rightarrow\mathbb R^+$): A function that that takes in a category cost vector $\mathbf{c^{[K]}}$ and outputs the total cost incurred by category $K$ (e.g. advertisement cost for product A). The . For the previous example, $C_K\left(\mathbf{c^{[K]}}\right)=\mathbf{c_3^{[K]}}+\lvert K\rvert\cdot\left(\mathbf{c_1^{[K]}}+\mathbf{c_2^{[K]}}\right)=1000+12\lvert K\rvert$.

**L1-Norm** ($\lVert\cdot\rVert$): Unless specified otherwise, the norm used in this paper is the L1-Norm. Given a $\mathbf{v}\in\mathbb R^n$, $\lVert\mathbf{v}\rVert=|\mathbf{v}_1|+|\mathbf{v}_2|+\cdots+|\mathbf{v}_n|$

## Model

The revenue is determine by the costs/investments.

The profit, $P = R(\mathbf c)-\lVert\mathbf{c}\rVert$, is also dependent on the costs/investments.

The objective is to maximize profit. $\max R(\mathbf c)-\lVert\mathbf{c}\rVert$

