## Table of Contents
---
1. [Environment](#Environment)
2. [Client Connection](#client-connection)
3. [Concurency](#concurency)



## Environment
---
Running on MacOS, this project is implmemted using the language and version of C98 with the standard C library, r. The compiler used is `Apple clang version 15.0.0`.


## Client Connection
---
In the main function, a TCP listener would be created and binded to the given address. After initialization, the proxy server would accept incoming client connections using a while loop and call the handler function with the file discriptor of the TCP connection. 

For all clients, their initial request would be parsed to obtain the desinated host and the proxy parameters, then these information would be removed from the request. This step is done by if-else statments with the `strstr` function provided by the standard C library. This is not the best approach for large scale application as it would result in lengthy code and poor readability; however, this proxy server only looks for a limited amount of parameters while leaving others untouched, this approach is a much more simpler method to implement. 

The function would then create a TCP connection to the requested server parsed in the previous step. Immediately, the modified request would be sent to the destinated server. 

After the initial request, a while loop would continuously attempts to read from both ends with blocking. If a message is receive from either ends, then the message would be blindly forwarded to the other end. In the scenario where any of the connection is closed or broken, the proxy would close both connection and the handler function would return. 



## Concurency
---
In the case when a connection is maintained for a while, the thread would be blocked to wait for incoming messages of the existing connection, thus, no new clients can be accepted, and only one client can be serviced at a time. 

To solve this problem, when TCP connection is accepted, a new thread would be created to run the handler function with the TCP file discriptor supplied. Each thread handles one client. 
