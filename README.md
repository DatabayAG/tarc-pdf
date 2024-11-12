# PDF Generation Server with Puppeteer

- Author: Fred Neumann
- Status: experimental

This is a simple node.js server to create a PDF from HTML using [Puppeteer](https://pptr.dev/).

## Direct Installation on a Server

Create a user account that should be used for running the server:
````
groupadd -r tarc-pdf
useradd -rm -g tarc-pdf -G audio,video tarc-pdf
````

Log in as that user and clone this repository. Go to the cloned directory and install puppeteer:

````
npm install puppeteer
````

To run the service go the cloned directory an execute:
````
node service.js
````

It should show you this message:
````
Server running on port 8080
````

You should put this service behind a reverse proxy to call it with https from outside.

## Installation as a Docker Container

Log in a a user that is able to build and run docker images.  Clone this repository.
Go to the cloned repository and build the container:

````
docker build -t tarc-pdf .
````

Run the container:

````
docker run -p 8080:8080 tarc-pdf
````

## Usage

The service is called with a POST request and returns the generated PDF as inline content. The POST must be delivered as 
`content-type: application/x-www-form-urlencoded`.

| POST Field       | Content                                  |
|------------------|------------------------------------------|
| html             | The HTML content to be rendered          |
| format           | e.g. 'A4'                                |
| landscape        | '0' or '1'                               |
| headerTemplate   | html code of the template for the header |
| footerTemplate   | html code of the template for the footer |

see https://pptr.dev/api/puppeteer.pdfoptions for details.

## Acknowledgements

The implementation adapts examples from:

- https://apitemplate.io/blog/tips-for-generating-pdfs-with-puppeteer/
- https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
- https://blog.apify.com/puppeteer-docker/

