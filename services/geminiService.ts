import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

// FIX: Removed SEARCH_ID check as it's no longer used.

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function searchWithGoogle(query: string): Promise<{ text: string; sources: GroundingChunk[] }> {
  try {
    const enhancedQuery = `Provide a comprehensive and detailed answer for the following query, citing multiple web sources. Query: "${query}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: enhancedQuery,
      config: {
        // FIX: The `searchId` property does not exist on the `googleSearch` tool.
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const apiSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // FIX: Filter sources to ensure they conform to the local GroundingChunk type,
    // which requires web, web.uri, and web.title to be defined. This resolves
    // the type mismatch between the library's optional types and the app's required types.
    const sources: GroundingChunk[] = apiSources.filter(
      (source): source is GroundingChunk =>
        Boolean(source.web && source.web.uri && source.web.title)
    );

    return { text, sources };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch search results: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching search results.");
  }
}