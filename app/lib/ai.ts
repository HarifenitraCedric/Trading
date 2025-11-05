import { convertToModelMessages, generateText, streamText, UIMessage } from "ai";
import { createGoogleGenerativeAI,google} from '@ai-sdk/google';

const ai = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_STUDIO_KEY
});


/**
 * Generate the AI Response from Gemini Google
 * @param prompt 
 * @returns 
 */
async function generateResponse(prompt: UIMessage[]) {
  const response = streamText({
    model: ai.chat("gemini-2.5-flash"),
    messages: convertToModelMessages(prompt)
  });

  return response;
}

export {
    generateResponse
}