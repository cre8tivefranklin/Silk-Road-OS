import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from "../constants";
import { TradeAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeTradeRoute = async (cities: string[]): Promise<TradeAnalysis> => {
    const routeDescription = cities.join(" -> ");

    if (!apiKey) {
        // Mock response if no API key for demo purposes
        return {
            route: routeDescription,
            goods: ["Unknown", "Commodities"],
            risks: ["Data Unavailable"],
            diseases: ["Epidemiological Data Unavailable"],
            benefits: "API Key missing. Cannot compute economic value.",
            historicalContext: "System offline."
        };
    }

    const prompt = `Analyze the Silk Road trade route traversing these cities in order: ${routeDescription}. 
    Focus STRICTLY on the era 1000 CE - 1020 CE.
    Reference specific powers like the Northern Song, Fatimids, Basil II's Byzantium, Buyids, or Kara-Khanids where relevant.
    Include:
    1. Cumulative exchange of goods.
    2. Specific dangers (human/political).
    3. Disease Demography: Identify endemic diseases or health risks along this specific path during this era (e.g. malaria in wetlands, dysentery in caravans, leprosy pockets, heatstroke).
    4. Strategic value.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
                responseMimeType: 'application/json'
            }
        });

        const text = response.text;
        if (!text) throw new Error("Empty response");
        
        return JSON.parse(text) as TradeAnalysis;
    } catch (error) {
        console.error("Gemini analysis failed:", error);
        return {
            route: routeDescription,
            goods: ["Error"],
            risks: ["Analysis Failed"],
            diseases: ["Analysis Failed"],
            benefits: "Could not retrieve data.",
            historicalContext: "Connection severed."
        };
    }
};