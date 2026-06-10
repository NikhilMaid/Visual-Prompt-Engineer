
import { GoogleGenAI } from "@google/genai";
import { MASTER_PROMPT } from '../constants';

// FIX: Aligned with coding guidelines to exclusively use process.env.API_KEY without checks or fallbacks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePromptFromImage(base64ImageData: string, mimeType: string): Promise<string> {
  try {
    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64ImageData,
      },
    };

    const textPart = {
      text: MASTER_PROMPT,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The request to the Gemini API failed. This could be due to an invalid API key, network issues, or the content policy.");
  }
}