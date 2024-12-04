# PDF Generation Server with Puppeteer

A node.js server to create a PDF from HTML using [Puppeteer](https://pptr.dev/). 
It can be used by the [TestArchiveCreator](https://github.com/DatabayAG/TestArchiveCreator) plugin for ILIAS.

## Direct Installation on a Server

Create a user account that should be used for running the server:
````
useradd -rm -G audio,video tarc-pdf
````

Log in as that user and clone this repository. Go to the cloned directory and install puppeteer:

````
npm install puppeteer
````

To run the service go to the cloned directory an execute:
````
node service.js
````

It should show you this message:
````
Server running on port 8080
````

You should put this service behind a reverse proxy to call it with https from outside.

## Installation as a Docker Container

Log in as a user that is able to build and run docker images.  Clone this repository.
Go to the cloned repository and build the container:

````
docker build -t tarc-pdf .
````

Run the container:

````
docker run -p 8080:8080 tarc-pdf
````

Ther service should then be avalilable on port 8080 of your docker host. You should put it behind a reverse proxy to call it with https from outside.

## Usage in ILIAS

Open the configuration of the [TestArchiveCreator](https://github.com/DatabayAG/TestArchiveCreator) in your ILIAS installation.

Choose "Puppeteer on Separate Server" at PDF generation and enter the URL of your PDF generation server, e.g. for a server running on your host:

````
http://localhost:8080
````

Create an archive of a test. Depending on what you configured as content, it should contain PDF files for the questions and answers of participants.

### ILIAS Configuration

The server receives the pure HTML code of a page that should be rendered. It needs to load *asset files* (styles, scripts and images) from ILIAS afterwards. 

* In a *production environment* make sure that the URL of your ILIAS installation can be accessed by the PDF generation server.

* A *docker container* on a *local development machine* will not be able to load the images from a URL with `localhost`. Look up the IP address of your local web server, e.g. with the `ifconfig` command and...
  * ... use it for your ILIAS address in the browser when you generate the archive interactively, 
  * ... configure it as `http_path` the `[server]` section of your `ilias.ini.php` when you generate the archive in a cron hob.

## Implementation

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

