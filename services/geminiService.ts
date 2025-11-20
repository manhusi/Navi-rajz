
import { GoogleGenAI } from "@google/genai";
import { PROMPT_ENHANCER_INSTRUCTION } from "../constants";

// Initialize the client
// Note: We assume process.env.API_KEY is available in this environment.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing from environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates an illustration based on the user prompt.
 * 
 * Process:
 * 1. Uses 'gemini-2.5-flash' to transform the user's input into a detailed "Navi" style prompt.
 * 2. Uses 'imagen-4.0-generate-001' to generate the image with the specific aspect ratio.
 *    (We switched from Flash Image to Imagen because Flash Image defaults to 1:1).
 */
export const generateIllustration = async (userPrompt: string, aspectRatio: string): Promise<string> => {
  const ai = getClient();
  
  // Step 1: Enhance the prompt (Text-to-Text)
  // We include the aspect ratio in the context so the enhancer can describe the composition correctly (e.g. wide vs tall).
  let enhancedPrompt = userPrompt;
  
  try {
    const textResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User Input: "${userPrompt}"\nRequested Aspect Ratio: ${aspectRatio}`,
      config: {
        systemInstruction: PROMPT_ENHANCER_INSTRUCTION,
      }
    });

    if (textResponse.text) {
      enhancedPrompt = textResponse.text;
    }
  } catch (error) {
    console.warn("Prompt enhancement failed, falling back to basic formatting.", error);
    enhancedPrompt = `Hand-drawn illustration on aged textured paper. ${userPrompt}. Imperfect lines, blue doodle characters, orange accents, signed "by Navi".`;
  }

  // Step 2: Generate Image (Text-to-Image)
  // We use Imagen 4.0 here because it supports the 'aspectRatio' config parameter natively.
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: enhancedPrompt,
      config: {
        numberOfImages: 1,
        aspectRatio: aspectRatio as any, // Cast to match allowed string literals if needed
        outputMimeType: 'image/jpeg',
      },
    });

    // Extract the image data from the generateImages response structure
    const generatedImage = response.generatedImages?.[0];
    
    if (generatedImage?.image?.imageBytes) {
      return `data:image/jpeg;base64,${generatedImage.image.imageBytes}`;
    }

    throw new Error("No image data found in the response.");
  } catch (error) {
    console.error("Gemini API Error during image generation:", error);
    throw error;
  }
};