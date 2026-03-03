# MCP Server for Cover-Letter Generation

Link to GitHub Repository: [https://github.com/jianxun-p/cover-letter-generation-mcp](https://github.com/jianxun-p/cover-letter-generation-mcp)

A lot of people uses AI to generate cover letters, but the problem is that they have to copy and paste the job description and their resume to the AI model and produce a PDF, which is time consuming (converting them into LaTeX and compile into PDF) and may have privacy concerns. This project is a simple MCP server that allows users to generate cover letters without having to share their sensitive data with any third-party services. The server is built with Python and FastMCP.

It ensures consistent format and style for all cover letters by leveraging a LaTeX template, making it easier for users to create professional and personalized cover letters for their job applications. The server can be easily deployed on any platform that can run Docker Images.

This MCP server provides prompts for the AI model to generate the content of the cover letter. Functionality for compiling the generated LaTeX into PDF is also provided for the model to use (the model have access to **neither** the intermediate results nor the final PDF).

## Privacy and Security

Your sensitive information such as name, phone number, address, links are not shared with any third-party services (including the model for generating the content of the cover letter), they are only used to fill in the LaTeX template and generate the cover letter. 



