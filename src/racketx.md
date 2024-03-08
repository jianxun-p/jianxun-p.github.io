# racketx
---

Link to repository: [https://github.com/jianxun-p/racketx](https://github.com/jianxun-p/racketx)

### Brief
This project is a meant for learning purpose. After taking the course CS135, which I learned Racket, I was inspired by the concepts of functional programming and the essentials of Racket, so I started this project that allows me to write Racket code in Rust. 


### Macros
Macros and metaprogramming are considered one of the significant part of the Rust programming language, it avoids many repetition of code and embeds Domain Specific Languages. I started off with using `macro_rules`, which provided extensive pattern matching capabilities, but it was not enough for this complicated task. As a solution, I turned towards using `proc_macro`. It was very powerful, yet, it consumes supprisingly more time to compile. 

### Example
Here is an example of using the `racket` macro.
```rust
extern crate racketx;
use racketx::racket;
pub fn main() {
    racket!{
        (define add_2_num (lambda (x y) (+ x y)))
        (define result (add_2_num 239 (- 9)))
    };
    assert_eq!(result, 230);
}
```


### Features
- [x] definition of constants
- [x] lambda
- [x] integer operations (+, -, *, /)
- [ ] negative integer (alternate solution: express with subtraction, e.g. `-8` would be `(- 8)`)
- [ ] non-integer
- [ ] conditional statements
- [ ] lists
- [ ] function definitions (alternate solution: use constants definition with lambda)
- [ ] modulo arithmetic