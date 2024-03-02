const http = require('node:http');
const puppeteer = require('puppeteer');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer(async (request, response) =>
{
  const queryData = url.parse(request.url, true).query;

  const browser = await puppeteer.launch({ headless: true,args:  getPuppeteerArgs()});
  const page = await browser.newPage();
  await page.goto(queryData.url, {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/pdf');
  response.setHeader('Content-Length', pdf.length);
  response.end(pdf);

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getPuppeteerArgs() {
  return [
    '--disable-features=IsolateOrigins',
    '--disable-site-isolation-trials',
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain'];
}

