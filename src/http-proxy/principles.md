
## Table of Contents
---
1. [Request](#request)
    1. [URL](#url)
    2. [Proxy Parameters](#proxy-parameters)
    3. [Error](#error)
    4. [Additional Information](#addtional-information)
2. [Response](#response)


## Request
---
The inital request from client would be parsed to obtain the destinated address or domain name, and the proxy server would establish a TCP connection with the given host. Immediately after this, the proxy server would modify the request and send it to the service provider. 


### URL
---
In a HTTP request from any client, a URL in absolute form is provided; however, the absolute form contains the domain name of the server, which oftenly shows up in proxied connections. However, the goal is to prevent the server's acknowledgement of the proxy, so the proxy server would replace the entire URL with the requested path and the query string. 

### Proxy Parameters
The client would also include proxy parameters in the header of the request, such as `Proxy-Connection` or `Cache-Control` to configure the connection between the proxy and the client. However, these information does not need to be forwarded to the server, and henced, they are removed as well. 

### Error
The proxy server is required to handle some errors, such as an invalid address or domain that cannot be reached, or the client is requesting resources of the proxy server itself. These errors should be handled and returned to the client, then the connection would be terminated. 


### Addtional Information
Click link for more information about [HTTP Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_requests).


## Response
---
All responses from the server would be blindly forwarded back to the client. 
