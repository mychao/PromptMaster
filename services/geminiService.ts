import { GoogleGenAI, Type } from "@google/genai";
import { GenerationResult, OptimizationResult, FileInput } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

// Prompt for Generating a new prompt
const GENERATOR_SYSTEM_PROMPT = `
You are a World-Class Prompt Engineer and AI Optimization Specialist. 
Your goal is to accept a raw user requirement and transform it into a highly effective, structured, and professional prompt for Large Language Models (LLMs).

Output MUST be a JSON object with the following structure:
{
  "prompt": "The actual generated prompt text",
  "reasoning": "Detailed explanation of why this structure was chosen, referencing prompt engineering frameworks (e.g., CO-STAR, RTF)",
  "facts": ["Fact 1: Why X technique works", "Fact 2: Specific improvement made"]
}
`;

// Prompt for Optimizing an existing prompt
const OPTIMIZER_SYSTEM_PROMPT = `
You are a Senior Prompt Optimization Expert. 
Your task is to analyze an existing prompt (provided as text or file), identify its weaknesses (ambiguity, lack of context, weak constraints), and rewrite it into a superior version.

Output MUST be a JSON object with the following structure:
{
  "prompt": "The optimized prompt text",
  "reasoning": "Comprehensive analysis of the original vs. optimized, explaining the logical leap.",
  "facts": ["Fact 1: Original had weakness X", "Fact 2: Applied technique Y to fix it"],
  "improvementType": "One of: clarity, structure, constraints, context"
}
`;

export const generatePrompt = async (requirement: string): Promise<GenerationResult> => {
  const ai = getAiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: requirement,
      config: {
        systemInstruction: GENERATOR_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompt: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            facts: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["prompt", "reasoning", "facts"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GenerationResult;
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
};

export const optimizePrompt = async (textInput: string, fileInput?: FileInput): Promise<OptimizationResult> => {
  const ai = getAiClient();
  
  try {
    const parts: any[] = [];
    
    // If file is provided, add it to parts
    if (fileInput) {
      parts.push({
        inlineData: {
          data: fileInput.data,
          mimeType: fileInput.mimeType
        }
      });
      parts.push({ text: "Please optimize the prompt contained in this file. " + (textInput ? `Additional context: ${textInput}` : "") });
    } else {
      parts.push({ text: textInput });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: OPTIMIZER_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompt: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            facts: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            improvementType: { type: Type.STRING, enum: ["clarity", "structure", "constraints", "context"] }
          },
          required: ["prompt", "reasoning", "facts", "improvementType"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as OptimizationResult;

  } catch (error) {
    console.error("Error optimizing prompt:", error);
    throw error;
  }
};
