import { googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyCUBqDcHLbps9OK05_l3iFbEnKD0-WKAho',
    }),
  ],
  model: googleAI.model('gemini-2.0-flash'), // set default model
});

const MenuItemSchema = z.object({
  dishname: z.string(),
  description: z.string(),
});

export const menuSuggestionFlowWithSchema = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: MenuItemSchema,
  },
  async ({ theme }) => {
    console.log(theme)
    const { output } = await ai.generate({
      model: googleAI.model('gemini-2.0-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
      output: { schema: MenuItemSchema },
    });
    if (output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }
    console.log('ii ba',output)
    return output;
  }
);
