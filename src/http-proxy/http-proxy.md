# HTTP Proxy


## Introduction
---
This project is meant to learn and understand how the internet works. This simple HTTP proxy server forwards all client requests to the targeted server, and provide an additional layer of security for the users. 


## Objectives
---
On a HTTP request to the server, the client establishes a TCP connection with the server. However, in order to do so, both client and server have to know the TCP port number of the other side. Similarily, to establish a TCP connection, IP packets containing information of the IP address of both end will be sent between them. Both connection ends will know the IP address and TCP port of the other end. 

This can be a problem for the client. The location of the device can be easily figured out using IP lookups, and the server may respond differently based on the region/area of the client. For example, the same product on the same website might offer a different price for customers in Canada in comparison with the ones in Russia. Which is against the will of customers for goods of lower prices. 

By hiding the IP address and TCP port information of the client from the server, proxy servers provides an additional level of anonymity to the clients. 