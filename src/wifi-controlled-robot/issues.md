## Table of Contents
---
1. [Documentation](#documentation)
2. [Firewall](#firewall)
3. [Code](#code)
    1. [Style](#style)
    2. [Robustness](#robustness)
4. [Testing](#testing)
5. [Compatibility](#compatibility)

## Documentation
---
Many of the videos and images of the project were lost and cannot be documented in the engineering log. 



## Firewall
---
Under certain networks, the connection might be identified as a threat by the firewall and be terminated the connection between the client and the robot. This problem occured when testing under the TDSB (Toronto District School Board) network. 



## Code
---
### Style
The code is not properly formated and documented for readibility. It is filled with long functions with heavily nested if-else statements, and the control flow is not clear. 

### Robustness
The error handling only does not cover all possible exceptions. 




## Testing
---
There are neither function tests nor unit tests. All tests performed were done by executing the compiled program. 




## Compatibility
---
There were issues with cross-platform compatibility, the Win32 API is different from the API for UNIX like operating systems, and code had to be re-written for the same functionality on a different operating system.
