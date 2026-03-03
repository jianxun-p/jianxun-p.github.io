# HTTP Proxy

## Table of Contents
---
1. [Introduction](#introduction)
2. [Objectives](#objectives)
3. [Principles](#principles)
    - [Request](#request)
    - [Response](#response)
4. [Implementation](#implementation)
    - [Environment](#environment)
    - [Client Connection](#client-connection)
    - [Concurrency](#concurrency)
5. [Issues](#issues)
    - [Documentation](#documentation)
    - [Code](#code)
        - [Style](#style)
        - [Robustness](#robustness)
    - [Testing](#testing)


## Introduction
---
This project is meant to learn and understand how the internet works. This simple HTTP proxy server forwards all client requests to the targeted server, and provide an additional layer of security for the users. 

## Objectives
---
On a HTTP request to the server, the client establishes a TCP connection with the server. However, in order to do so, both client and server have to know the TCP port number of the other side. Similarly, to establish a TCP connection, IP packets containing information of the IP address of both end will be sent between them. Both connection ends will know the IP address and TCP port of the other end. 

This can be a problem for the client. The location of the device can be easily figured out using IP lookups, and the server may respond differently based on the region/area of the client. For example, the same product on the same website might offer a different price for customers in Canada in comparison with the ones in Russia. Which is against the will of customers for goods of lower prices. 

By hiding the IP address and TCP port information of the client from the server, proxy servers provides an additional level of anonymity to the clients. 

## Principles
---

### Request

The initial request from client would be parsed to obtain the designated address or domain name, and the proxy server would establish a TCP connection with the given host. Immediately after this, the proxy server would modify the request and send it to the service provider. 

#### URL

In a HTTP request from any client, a URL in absolute form is provided; however, the absolute form contains the domain name of the server, which often shows up in proxies connections. However, the goal is to prevent the server's acknowledgement of the proxy, so the proxy server would replace the entire URL with the requested path and the query string. 

#### Proxy Parameters

The client would also include proxy parameters in the header of the request, such as `Proxy-Connection` or `Cache-Control` to configure the connection between the proxy and the client. However, this information does not need to be forwarded to the server, and hence, they are removed as well. 

#### Error

The proxy server is required to handle some errors, such as an invalid address or domain that cannot be reached, or the client is requesting resources of the proxy server itself. These errors should be handled and returned to the client, then the connection would be terminated. 


#### Additional Information

Click link for more information about [HTTP Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_requests).

### Response

All responses from the server would be blindly forwarded back to the client. 

## Implementation
---

### Environment

Running on macOS, this project is implemented using the language and version of C98 with the standard C library, r. The compiler used is `Apple clang version 15.0.0`.


### Client Connection

In the main function, a TCP listener would be created and binded to the given address. After initialization, the proxy server would accept incoming client connections using a while loop and call the handler function with the file descriptor of the TCP connection. 

For all clients, their initial request would be parsed to obtain the designated host and the proxy parameters, then this information would be removed from the request. This step is done by if-else statements with the `strstr` function provided by the standard C library. This is not the best approach for large scale application as it would result in lengthy code and poor readability; however, this proxy server only looks for a limited amount of parameters while leaving others untouched, this approach is a much simpler method to implement. 

The function would then create a TCP connection to the requested server parsed in the previous step. Immediately, the modified request would be sent to the designated server. 

After the initial request, a while loop would continuously attempt to read from both ends with blocking. If a message is received from either ends, then the message would be blindly forwarded to the other end. In the scenario where any of the connection is closed or broken, the proxy would close both connection and the handler function would return. 

### Concurrency

In the case when a connection is maintained for a while, the thread would be blocked to wait for incoming messages of the existing connection, thus, no new clients can be accepted, and only one client can be serviced at a time. 

To solve this problem, when TCP connection is accepted, a new thread would be created to run the handler function with the TCP file descriptor supplied. Each thread handles one client. 


## Issues
---

### Documentation

There are no function documentations.

### Code

#### Style

The code is not properly formatted and documented for readability. It is filled with long functions with heavily nested if-else statements, and the control flow is not clear. 

The messages printed to standard inputs and error are not properly formatted. In addition, the error messages do not contain enough information and no stack trace of any sort is presented. 

Few comments are presented.

#### Robustness

There is neither error handling nor bound checking for indexing. An array is statically allocated to store `pthread_t`s created, but the index used to record the number of threads created grows with bound checking. It would definitely cause an overflow when the total amount of clients exceeds the limit. There is also no maintaining functionality for the array to continuously check the status of the threads and removed them from array when the thread is joined. This made the problem worse. However, this is simple to implement, and this project is meant for learning, so there won't be a huge amount of requests. 

### Testing

There are neither function tests nor unit tests. All tests performed were done by executing the compiled program and sending requests with the Google Chrome.



