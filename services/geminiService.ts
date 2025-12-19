import { GoogleGenAI, Type } from "@google/genai";
import { GenerationResult, OptimizationResult, FileInput, Language } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

const SCENARIO_INSTRUCTIONS: Record<string, string> = {
  general: "Follow general best practices (CO-STAR, RTF).",
  rag: "Focus on faithful retrieval, citation of sources, avoiding hallucinations, and strict adherence to provided context. Ensure instructions explicitly state to use ONLY provided context.",
  code: "Focus on clean, efficient, and well-commented code. Prioritize best practices, error handling, and edge cases.",
  writing: "Focus on engaging narrative, strong voice, showing rather than telling, and creative flair.",
  data: "Focus on analytical precision, clear interpretation of data patterns, and suggesting appropriate visualizations.",
  persona: "Focus on maintaining a consistent character voice, tone, and personality traits. Strict adherence to the role.",
  prd: "Focus on structural completeness (User Stories, Acceptance Criteria), clarity, and technical feasibility.",
  hr: "Focus on clarity, professional tone, compliance, and easy-to-understand explanations of rules."
};

// Prompt for Generating a new prompt
const getGeneratorSystemPrompt = (lang: Language, scenarioKey: string) => {
  const instruction = SCENARIO_INSTRUCTIONS[scenarioKey] || SCENARIO_INSTRUCTIONS['general'];

  return `
You are a World-Class Prompt Engineer and AI Optimization Specialist. 
Your goal is to accept a raw user requirement and transform it into a highly effective, structured, and professional prompt for Large Language Models (LLMs).

CONTEXT/SCENARIO: The user has specified the target scenario key as: "${scenarioKey}".
Specific Scenario Instructions: ${instruction}

IMPORTANT: The user has requested the output in ${lang === 'zh' ? 'Chinese (Simplified)' : 'English'}.
The "prompt" field itself should be written in English if it's for an English task, or Chinese if it's for a Chinese task. However, if the user requirement is in Chinese, generate a Chinese prompt unless specified otherwise.
The "reasoning" and "facts" fields MUST be written in ${lang === 'zh' ? 'Chinese (Simplified)' : 'English'}.

Output MUST be a JSON object with the following structure:
{
  "prompt": "The actual generated prompt text",
  "reasoning": "Detailed explanation of why this structure was chosen, referencing prompt engineering frameworks (e.g., CO-STAR, RTF) and how it fits the selected scenario.",
  "facts": ["Fact 1: Why X technique works", "Fact 2: Specific improvement made for the scenario"]
}
`;
};

// Prompt for Optimizing an existing prompt
const getOptimizerSystemPrompt = (lang: Language, scenarioKey: string) => {
  const instruction = SCENARIO_INSTRUCTIONS[scenarioKey] || SCENARIO_INSTRUCTIONS['general'];

  return `
You are a Senior Prompt Optimization Expert. 
Your task is to analyze an existing prompt (provided as text or file), identify its weaknesses (ambiguity, lack of context, weak constraints), and rewrite it into a superior version.

CONTEXT/SCENARIO: The user has specified the target scenario key as: "${scenarioKey}".
Specific Scenario Instructions: ${instruction}

IMPORTANT: The user has requested the output in ${lang === 'zh' ? 'Chinese (Simplified)' : 'English'}.
The "prompt" field (the optimized result) should be in the same language as the original prompt, unless explicitly asked to translate.
The "reasoning" and "facts" fields MUST be written in ${lang === 'zh' ? 'Chinese (Simplified)' : 'English'}.

Output MUST be a JSON object with the following structure:
{
  "prompt": "The optimized prompt text",
  "reasoning": "Comprehensive analysis of the original vs. optimized, explaining the logical leap and alignment with the selected scenario.",
  "facts": ["Fact 1: Original had weakness X", "Fact 2: Applied technique Y to fix it for the scenario"],
  "improvementType": "One of: clarity, structure, constraints, context"
}
`;
};

export const generatePrompt = async (requirement: string, language: Language = 'en', scenario: string = 'general'): Promise<GenerationResult> => {
  const ai = getAiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: requirement,
      config: {
        systemInstruction: getGeneratorSystemPrompt(language, scenario),
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

export const optimizePrompt = async (textInput: string, fileInput: FileInput | undefined, language: Language = 'en', scenario: string = 'general'): Promise<OptimizationResult> => {
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
        systemInstruction: getOptimizerSystemPrompt(language, scenario),
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