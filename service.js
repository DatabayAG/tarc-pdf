const http = require('node:http');
const qs = require('node:querystring');
const puppeteer = require('puppeteer');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer(async (request, response) =>
{
  let body = '';
  request.on('data', function (data) {
    body += data;
    if (body.length > 100000000) {
      request.connection.destroy();
    }
  });

  request.on('end', async function () {
    // POST must be "content-type: application/x-www-form-urlencoded"
    const post = qs.parse(body);
    const pdf = await generatePDF(
      post.html,
      post.format
    );

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Length', pdf.length);
    response.end(pdf);

  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Generate PDF with puppeteer
 * @param {string} html
 * @param {string} format
 * @returns {Promise<*>}
 */
async function generatePDF(html, format) {
  const browser = await puppeteer.launch({ headless: true,args:  getPuppeteerArgs()});
  const page = await browser.newPage();
  await page.setContent(html, {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: format });
  await browser.close();
  return pdf;
}

/**
 * Get arguments for launching puppeteer
 * @see https://apitemplate.io/blog/tips-for-generating-pdfs-with-puppeteer/
 * @returns {string[]}
 */
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

