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
import { pdfGenerationPrompt, UserData } from './prompt';
require('dotenv').config();


const browserDistFolder = join(import.meta.dirname, '../browser');

var Api2Pdf = require('api2pdf');
var a2pClient = new Api2Pdf(process.env['APIPDF_KEY']);

const app = express();
const angularApp = new AngularNodeAppEngine();
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env['GEMINI_API_KEY'],
    }),
  ],
  model: googleAI.model('gemini-2.0-flash'), // set default model
});
app.use(express.json());

async function testAPI(UserData:UserData) {
  // make a generation request
  const { text } = await ai.generate(pdfGenerationPrompt(UserData));
  console.log(text);
  const cleanedText = cleanHtmlFromMarkdownBlock(text)
  return api2pdf(cleanedText);
  //return text;
}

async function api2pdf(text : string){
  return await a2pClient.wkHtmlToPdf(text, {
    inline: false,
    filename: 'test.pdf',
  });
}

function cleanHtmlFromMarkdownBlock(markdownHtmlString: string): string {
  // Check if the string starts with the markdown code block opening
  if (markdownHtmlString.startsWith('```html')) {
    // 1. Remove the first line (```html)
    let cleanedString = markdownHtmlString.substring(
      markdownHtmlString.indexOf('\n') + 1
    );

    // 2. Remove the last three characters (```) if they exist
    if (cleanedString.endsWith('```')) {
      cleanedString = cleanedString.slice(0, -3);
    }

    // 3. Optional: Remove any leading/trailing whitespace/newlines
    cleanedString = cleanedString.trim();

    return cleanedString;
  }
  // If it doesn't start with ```html, assume it's already clean or not a markdown block
  return markdownHtmlString;
}

app.put(
  'https://airesumebuilder-production-b352.up.railway.app/api/testAPI',
  async (req, res) => {
    try {
      const response = await testAPI(req.body);
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
  }
);


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
