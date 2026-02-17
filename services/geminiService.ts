import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS, CATEGORIES, RESTAURANT_NAME } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI Head Chef and Sommelier at ${RESTAURANT_NAME}.
Your role is to assist diners in choosing dishes from the menu, explaining ingredients, and suggesting wine pairings.
You are sophisticated, warm, and knowledgeable.

Here is the current menu data in JSON format:
${JSON.stringify({ categories: CATEGORIES, dishes: MENU_ITEMS })}

Rules:
1. ONLY recommend dishes that are actually on the menu provided above.
2. If a user asks for something not on the menu (e.g., Pizza), politely suggest the closest alternative or explain that it's not available.
3. When suggesting a dish, mention its price and why it fits the user's request.
4. If asked about dietary restrictions (Vegan, Gluten-Free), strictly check the 'dietaryTags' in the menu data.
5. Keep answers concise (under 100 words) unless asked for a detailed explanation.
6. Use formatting like *bold* for dish names to make them stand out.
`;

export const getChefResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Convert simplified history to API format if needed, but for single-turn or simple chat, 
    // we can just use the chat feature.
    // The history passed in is expected to be compatible with the Chat API if we were maintaining state there,
    // but for simplicity in this stateless service wrapper, we might just start a new chat or append to valid history.

    const chatHistory = history.map(h => ({
      role: h.role,
      parts: h.parts
    }));

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I apologize, but I'm having trouble retrieving the menu details right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently busy in the kitchen. Please ask a human server for assistance.";
  }
};