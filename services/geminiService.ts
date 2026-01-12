
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string, category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a catchy, high-converting e-commerce product description for a ${productName} in the ${category} category. Keep it under 100 words and highlight benefits.`,
    });
    // The GenerateContentResponse object features a text property (not a method)
    return response.text || "Description could not be generated at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI description.";
  }
};
