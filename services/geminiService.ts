
import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is set in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume it's always available.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateBountyDescription = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API Key not configured. Using placeholder description.");
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the following request, write a clear and exciting bounty description for an online gaming platform. Keep it under 150 characters. Request: "${prompt}"`,
        config: {
            temperature: 0.7,
            topP: 1,
            topK: 1,
            maxOutputTokens: 200,
        },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating bounty description:", error);
    return "Failed to generate description. Please write one manually.";
  }
};
