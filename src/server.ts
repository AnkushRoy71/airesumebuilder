import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';


const browserDistFolder = join(import.meta.dirname, '../browser');

var Api2Pdf = require('api2pdf');
var a2pClient = new Api2Pdf('e88c6fe1-d659-425e-8a0c-7fa4748aeedf');

const app = express();
const angularApp = new AngularNodeAppEngine();
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyCUBqDcHLbps9OK05_l3iFbEnKD0-WKAho',
    }),
  ],
  model: googleAI.model('gemini-2.0-flash'), // set default model
});
app.use(express.json());

async function testAPI() {
  // make a generation request
  const { text } = await ai.generate(
    'create me a random resume html of a 3y experience software engineer having worked on 6 projects . headings will be of green color and content should adjust in one page and he has also recieved 2 award from previous company and just return html wrapped in single quote'
  );
  console.log(text);
  api2pdf(text);
  return text;
}

function api2pdf(text : string){
  a2pClient.wkHtmlToPdf(text).then(function (result:any) {
    console.log(result);
  });
}

app.get('/api/testAPI', async (req, res) => {
  try {
    const response = await testAPI();
    console.log(response, 'ti');
    res.status(200).send({
      result: response,
      error: [],
    });
  } catch (error) {
    res.status(400).send({
      result: null,
      error: [error],
    });
  }
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
