## $\lambda$-Calculus
---
All mathematical objects can be described as a lambda expression, 
including numbers, data structures etc...
It was also proven to be equivalently capable to Turing's machine. 


### Table of Contents
---
- [Syntax and Notation](#syntax-and-notation)
- [Beta-Reduction](#reduction)
- [Combinators](#combinators)
    - [Identity](#identity)
    - [Mockingbird](#mockingbird)
    - [Kestrel](#kestrel)
    - [Kite](#kite)
    - [Cardinal](#cardinal)
    - [Bluebird](#bluebird)
    - [Y Fixed-Point Combinator](#y-fixed-point-combinator)
- [Boolean](#boolean)
    - [True and False](#true-and-false)
    - [Negation](#negation)
    - [Conjunction](#conjunction)
    - [Disjunction](#disjunction)
- [Data Structure](#data-structure)
- [Church Numeral](#church-numeral)
    - [Successor](#successor) 
    - [Addition](#addition) 
    - [Predecessor](#predecessor) 
    - [Subtraction](#subtraction) 
    - [Multiplication](#multiplication) 
    - [Power](#power)
    - [Is Zero](#is-zero)     
    - [Ordering](#ordering) 


### Syntax and Notation
---
In lambda calculus, the functions are defined to take only one argument, 
with a signifier $\lambda$ indicating the start of a function definition, 
followed by a placeholder for the parameter with a '$.$' symbol to separate the parameter 
with the return expression. 

For examples $\lambda x.x$ is the identity function. 

For any functions and parameters, an application of function $f$ to the parameter $x$ is denoted as 
$fx$. For multiple application of function, 
$fab$ in lambda calculus is equivalent to $(f(a))(b)$ in mathematics. 
One could use parenthesis to change the order of function application. 
$f(ab)$ would be equivalent to $(f\circ a)(b)$. 

This does not provide the ability for multiple parameters, 
but it could be achieved with curing. For example, $\lambda f.\lambda x.fx$. 
A shorthand notation would be $\lambda fx.fx$, but it is not a function with two parameters, 
but instead a function that takes in a function $f$, and returns another function, 
which takes an argument $x$ and returns $fx$. The ordering does matter, and in this example, 
this lambda expression is different from $\lambda xf.fx$.

### $\beta$-Reduction
---
The $\beta$-reduction is a process of reducing a given lambda expression to the 
"$\beta$-normal form" (the simplest form).
Example:

$((\lambda a.a)\lambda b.\lambda c.b)(x)\lambda e.f$

$\implies(\lambda b.\lambda c.b)(x)\lambda e.f$

$\implies(\lambda c.x)\lambda e.f$

$\implies x$


### Combinators
---
A combinator is a lambda expression that every variable is quantified. For examples, $\lambda fx.fx$ is a combinator while $\lambda x.fx$ is not, because $f$ is not quantified in the second example. 

#### Identity
$I:=\lambda x.x$ is the identity, which maps all inputs to themselves. 

#### Mockingbird
$M:=\lambda f.ff$ is the mockingbird combinator. It applies itself to itself. 
When $I$ is supplied to $M$, $MI$ can be reduced down to $I$. 
However, $MM$ would result in an infinite number of self application when reducing it. 

#### Kestrel
$K:=\lambda ab.a$ always returns the first curried argument, so $KMI$ could be reduced to $M$. 
It can be used as a constant, after applying an argument to it once, the result of a second application is 
not dependent on the second parameter. For example, $KM$ is a function that always returns $M$ no matter the input. 

#### Kite
$KI$ always returns the second curried argument, so $KIMI$ could be reduced to $I$. 
By expanding this combinator, we obtain $(\lambda ab.a)\lambda x.x=\lambda bx.x$. 

#### Cardinal
$C:=\lambda fab.fba$ reverses the arguments of a function application. 
For example, $\lambda f.Cf$ can be reduced to $\lambda ab.fba$.

#### Bluebird
$B:=\lambda fgx.f(gx)$ is a combinator that allows composition of functions. 
It composes the function $f$ and $g$.

#### Y Fixed-Point Combinator
This combinator is defined as $Y:=\lambda f.(\lambda x.f(xx))(\lambda x.f(xx))$, 
and it is equivalent to $\lambda f.M(\lambda x.f(Mx))$. 
By reducing this combinator we obtain:

$\implies\lambda f.f(M(\lambda x.f(Mx)))$

$\implies\lambda f.f(f(M(\lambda x.f(Mx))))$

$\implies\lambda f.f(f(f(M(\lambda x.f(Mx)))))$

and so on. This combinator's behavior is similar to a non-stopping recursion. 
With some modifications, it is equivalent to recursion in Turing machines. 

### Boolean
---
Logical operations can be performed with lambda calculus.

#### True and False
However, a definition for the logical true and false is required. 
Recall that everything in lambda calculus are functions, 
so the true and false can be defined as functions that take two arguments. 
- True: returns the first argument (the $K$ combinator)
- False: returns the second argument (the $KI$ combinator)

#### Negation
$N_{ot} := \lambda x.x(KI)K$ is the combinator for the logical not operation. When x is true, 
it would return $KI$ which represents false. Otherwise, it would return $K$ which represents true. 
Notice that the cardinal combinator is exactly identical, 
which means that the cardinal is the combinator for boolean negation.

#### Conjunction
$A_{nd} := \lambda ab.ab(KI)$ is the combinator for the logical and operation. Consider both cases of $a$, 
this expression is also equivalent to $\lambda ab.aba$

#### Disjunction
$O_{r} := \lambda ab.aKb$ is the combinator for the logical or operation. Consider both cases of $a$, 
this expression is also equivalent to $\lambda ab.aab$


### Data Structure
---
$$\lambda xf.fx$$
Data structure are used to hold data to be processed after, 
so the function would be given and applied after the data is stored. 
It would hold the data $x$ until $f$ is given, 
which will then return the value of the processed data. 

For example, let the data structure $D$ be $\lambda abf.fab$, 
this structure stores a pair of values. 
If we store the value true and false, we obtain $X:=DK(KI)$. 
At this point, $X$ is a function that takes in an argument $f$ and returns $fK(KI)$, 
so applying the logical or operator would give $X(\lambda ab.aab)=K$,
while supplying the logical or and operator yields $X(\lambda ab.aba)=KI$. 

Since everything in lambda calculus is expressed in functions, 
there is no data types, so the same combinator can be used for different types of data. 



### Church Numeral
---
Everything in lambda calculus are functions, 
so the natural numbers can be defined as functions that has two arguments: 
1. a function $f$
2. an argument $x$ that will be supplied to $f$

In lambda calculus, a natural number $n$ are defined as a combinator that applied $f$ $n$ time on $x$. 

For examples:

0. $\lambda fx.x$
1. $\lambda fx.fx$
2. $\lambda fx.f(fx)$
3. $\lambda fx.f(f(fx))$

#### Successor
A successor combinator is needed to allow the creation of any natural number by induction. 
$$S_{ucc}:=\lambda nfx.f(nfx)$$
It first applies $f$ $n$ times on $x$, then an addition application. 
Notice that this is equivalent to $\lambda nf.Bf(nf)$.

#### Addition
Addition of numbers $a$ and $b$ can be defined as the $b^{th}$ succession of $a$, 
or equivalently, the $a^{th}$ succession of $b$. 
$$A_{dd}:=\lambda ab.a(S_{ucc})b=\lambda ab.b(S_{ucc})a$$

#### Predecessor
In order to perform subtraction, we would need a combinator for the predecessor of the church numerals. 
Suppose there is a pair of values, where the second value is one greater than the first value, 
then the first value is the predecessor of the second. 

Definitions:

$P_{air} := \lambda abf.fab$ as defined in [Data Structure](#data-structure)

$1_{st} := \lambda ab.a$ returns the first value of a pair

$2_{nd} := \lambda ab.b$ returns the second value of a pair

$P_{zero} := P_{air}(\lambda fx.x)(\lambda fx.x)$ is the pair $(0,0)$

$\Phi := \lambda p.(P_{air} (p2_{nd}) S_{ucc}(p2_{nd}))$ constructs a successor pair of the given pair. 

Notice that when $\Phi$ is applied $n$ times to the pair $(0,0)$, the second value 
of the resultant pair would be $n$, and since the first value is always the predecessor of the second, 
the first value would be $n-1$ for all $n>0$. For $n = 0$. 
Hence, the predecessor combinator for all $n>0$ would be: 
$$P_{red} := \lambda n.(n \Phi P_{zero})1_{st} $$

This definition of predecessor implies that the predecessor of 0 is 0 itself. 


#### Subtraction
Subtraction of the natural numbers $a$ and $b$ can be defined as the $b^{th}$ predecessor of $a$. 
$$S_{ub}:=\lambda ab.b(P_{red})a$$

For $b>a$, after $a$ or more application of $P_{red}$ on $a$, the return value would always be 0. 


#### Multiplication
Multiplication of natural numbers is repeated addition. 
$$M_{ul}:=\lambda abf.a(bf)$$

#### Power
Exponential of natural numbers is repeated multiplication. 
$$P_{ow}:=\lambda be.eb$$

#### Is Zero
$$I_{s0}:=\lambda n.n(K(KI))(K)$$
When n is zero, there is no function application. Otherwise, the function $K(KI)$, 
which is the constant function for false, would be called (perhaps repeatedly). 

#### Ordering
$$L_{eq}:=\lambda ab.I_{s0}(S_{ub}ab)$$
This definition uses the property discussed in [subtraction](#subtraction). 

$$E_{q}:=\lambda ab.A_{nd}(I_{s0}(S_{ub}ab))(I_{s0}(S_{ub}ab))$$
If $a\leq b$ and $b\leq a$, then $a=b$.

$$G_{t}:=\lambda ab.N_{ot}(L_{eq}ab)$$
If $\neg(a\leq b)$, then $a>b$.

$$G_{eq}:=\lambda ab.O_{r}(G_{t}ab)(E_{q}ab)$$
If $(a>b)\vee(a=b)$, then $a\geq b$.
