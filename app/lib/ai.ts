import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_AI_STUDIO_KEY});

/**
 * Generate the AI Response from Gemini Google
 * @param prompt 
 * @returns 
 */
async function generateResponse(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response;
}

export {
    generateResponse
}