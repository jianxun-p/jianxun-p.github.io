## Table of Contents
---
1. [Documentation](#documentation)
2. [Code](#code)
    1. [Style](#style)
    2. [Robustness](#robustness)
3. [Testing](#testing)

## Documentation
---
There are no function documentations.



## Code
---
### Style
The code is not properly formatted and documented for readability. It is filled with long functions with heavily nested if-else statements, and the control flow is not clear. 

The messages printed to standard inputs and error are not properly formatted. In addition, the error messages do not contain enough information and no stack trace of any sort is presented. 

Few comments are presented.


### Robustness
There is neither error handling nor bound checking for indexing. An array is statically allocated to store `pthread_t`s created, but the index used to record the number of threads created grows with bound checking. It would definitely cause an overflow when the total amount of clients exceeds the limit. There is also no maintaining functionality for the array to continuously check the status of the threads and removed them from array when the thread is joined. This made the problem worse. However, this is simple to implement, and this project is meant for learning, so there won't be a huge amount of requests. 



## Testing
---
There are neither function tests nor unit tests. All tests performed were done by executing the compiled program and sending requests with the Google Chrome.

