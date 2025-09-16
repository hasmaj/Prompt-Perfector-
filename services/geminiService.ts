
import { GoogleGenAI, Type } from "@google/genai";
import type { PromptAnalysis, SuggestionCategory } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        taskType: { type: Type.STRING, description: "The primary task type identified (e.g., 'Summarization', 'Code Generation', 'Creative Writing')." },
        coreObjective: { type: Type.STRING, description: "A concise summary of the user's main goal." },
        overallScore: { type: Type.INTEGER, description: "A score from 0 to 100 representing the prompt's quality." },
        feedback: { type: Type.STRING, description: "A brief, high-level feedback statement on the prompt." },
        suggestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A short title for the suggestion." },
                    description: { type: Type.STRING, description: "A detailed explanation of the suggestion and why it's important." },
                    category: { type: Type.STRING, description: "The category of the suggestion ('Clarity', 'Specificity', 'Persona', 'Format', 'Constraint', 'Ambiguity')." }
                },
                 required: ["title", "description", "category"]
            }
        }
    },
    required: ["taskType", "coreObjective", "overallScore", "feedback", "suggestions"]
};

const enhancementSchema = {
    type: Type.OBJECT,
    properties: {
        suggestions: {
            type: Type.ARRAY,
            description: "A list of 3 concrete, textual suggestions to improve the prompt based on the enhancement category.",
            items: {
                type: Type.STRING,
            }
        }
    },
    required: ["suggestions"]
}

export const analyzePrompt = async (prompt: string): Promise<PromptAnalysis> => {
    const systemInstruction = `You are an expert prompt engineering assistant called "Prompt Perfector". Your task is to analyze a user's prompt and provide constructive feedback to improve it. Analyze the prompt based on clarity, specificity, persona, constraints, and desired output format.
    Provide a score from 0 to 100. A score below 50 is poor, 50-75 is decent, and above 75 is good.
    Respond ONLY with a JSON object that adheres to the provided schema. Do not add any text, markdown, or any other characters before or after the JSON object.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: analysisSchema,
        }
    });
    
    const text = response.text.trim();
    try {
        const parsed = JSON.parse(text);
        return parsed as PromptAnalysis;
    } catch (e) {
        console.error("Failed to parse JSON response:", text);
        throw new Error("Received an invalid response from the AI model.");
    }
};

export const getEnhancementSuggestions = async (prompt: string, category: SuggestionCategory): Promise<string[]> => {
    let enhancementInstruction = '';
    switch(category) {
        case 'Persona':
            enhancementInstruction = 'Suggest 3 distinct personas the AI could adopt for this prompt. For example: "Act as a senior software engineer," or "You are a witty and sarcastic travel blogger."';
            break;
        case 'Format':
            enhancementInstruction = 'Suggest 3 different output formats for this prompt. For example: "Format the output as a JSON object," or "Present the information in a markdown table."';
            break;
        case 'Constraint':
            enhancementInstruction = 'Suggest 3 useful constraints to add to this prompt. For example: "Keep the response under 200 words," or "Use only simple, non-technical language."';
            break;
        case 'Clarity':
            enhancementInstruction = 'Suggest 3 ways to rephrase parts of the prompt to be clearer and more direct.'
            break;
        default:
            enhancementInstruction = `Suggest 3 ways to improve the prompt's ${category.toLowerCase()}. Focus on adding specific details, examples, or context.`;
            break;
    }

    const systemInstruction = `You are a prompt engineering assistant. Your task is to provide concrete suggestions to improve a user's prompt based on a specific category.
    The user's prompt is: "${prompt}"
    
    ${enhancementInstruction}

    Respond ONLY with a JSON object containing a "suggestions" array with 3 string values. Do not add any explanatory text.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide suggestions for the prompt.`, // Dummy content as main prompt is in system instruction
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: enhancementSchema,
        }
    });

    const text = response.text.trim();
    try {
        const parsed = JSON.parse(text);
        return parsed.suggestions as string[];
    } catch (e) {
        console.error("Failed to parse enhancement JSON response:", text);
        throw new Error("Received an invalid response from the AI model for enhancement suggestions.");
    }
}
