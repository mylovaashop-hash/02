
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAssistantResponse = async (
  query: string,
  products: Product[],
  history: { role: 'user' | 'model', text: string }[]
) => {
  const model = 'gemini-3-flash-preview';
  
  const productContext = products.map(p => 
    `- ${p.name} ($${p.price}): ${p.description} (Category: ${p.category})`
  ).join('\n');

  const systemInstruction = `
    You are LovaBot, the heart of mylova.shop. 
    Your mission is to help customers find meaningful, personalized gifts that create deep emotional connections.
    Your tone is warm, empathetic, and romantic. Use words like "cherish," "memory," "unique," and "heartfelt."
    
    Current Inventory:
    ${productContext}

    Guidelines:
    1. Focus on the emotional value of the gifts.
    2. Help users find the right gift for specific occasions (anniversaries, births, first dates).
    3. Emphasize that these are personalized and custom-made for the recipient.
    4. Be encouraging and supportive in your recommendations.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    return response.text || "I'm here to help you find something truly special. Could you tell me more about who this gift is for?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "LovaBot is momentarily overwhelmed with emotion. Please try again in a heartbeat!";
  }
};
