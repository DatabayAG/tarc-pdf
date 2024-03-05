# PDF Generation Server with Puppeteer

Author: Fred Neumann
Status: experimental

This is a simple node.js script to create a PDF from HTML using [Puppeteer](https://pptr.dev/).

## Installation

First install puppeteer:

````
npm install puppeteer
````

Then clone this repository to the directory in which you installed the puppeteer.

## Start

To run the service go the cloned directory an execute:
````
node service.js
````

It should show you this message:
````
Server running on port 3000
````

You should put this service behind a reverse proxy to call it with https from outside.

## Usage

The service is called with a POST requests and returns the generated PDF as inline content. The POST must be delivered as 
`content-type: application/x-www-form-urlencoded`.

| POST Field | Content                         |
|------------|---------------------------------|
| html       | The HTML content to be rendered |
| format     | e.g. 'A4'                       |


## Acknowledgements

The implementation adapts examples from:

- https://apitemplate.io/blog/tips-for-generating-pdfs-with-puppeteer/
- https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js

