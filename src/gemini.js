// Gemini AI integration - Based on javascript_gemini blueprint
import { GoogleGenAI } from "@google/genai";

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: import.meta.env.GEMINI_API_KEY || "" });

export async function generateWebsiteLayout(request) {
  try {
    const prompt = `
You are a professional web designer. Create a complete website layout based on this request:

Description: ${request.description}
Industry: ${request.industry || 'general'}
Style: ${request.style || 'modern'}
Preferred Colors: ${request.colors?.join(', ') || 'modern color scheme'}
Required Features: ${request.features?.join(', ') || 'standard features'}

Generate a JSON response with:
1. page: Basic page info (name, slug, seo metadata)
2. components: Array of website components with positioning
3. theme: Color scheme and typography that matches the request

Available component types: hero, navbar, footer, card, form, testimonial, pricing, feature, text, image, button

Respond with valid JSON only:
{
  "page": {
    "name": "string",
    "slug": "string", 
    "seo": {
      "title": "string",
      "description": "string",
      "keywords": ["string"]
    }
  },
  "components": [
    {
      "type": "hero|navbar|footer|card|form|testimonial|pricing|feature|text|image|button",
      "props": {
        "title": "string",
        "subtitle": "string",
        "content": "string",
        "buttonText": "string",
        "imageUrl": "string"
      },
      "styles": {
        "background": "string",
        "color": "string", 
        "padding": "string",
        "textAlign": "left|center|right"
      },
      "position": {"x": 0, "y": 0},
      "size": {"width": 100, "height": 300}
    }
  ],
  "theme": {
    "colors": {
      "primary": "string",
      "secondary": "string", 
      "accent": "string",
      "background": "string",
      "text": "string"
    },
    "fonts": {
      "heading": "string",
      "body": "string"
    }
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Failed to generate website layout:", error);
    throw new Error(`AI generation failed: ${error}`);
  }
}

export async function enhanceComponent(component, instructions) {
  try {
    const prompt = `
Enhance this website component based on the instructions:

Current Component:
${JSON.stringify(component, null, 2)}

Enhancement Instructions: ${instructions}

Return the enhanced component as JSON with improved props, styles, and positioning.
Keep the same component type and ID.

Respond with valid JSON only:
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const enhancedComponent = JSON.parse(response.text || "{}");
    return { ...component, ...enhancedComponent };
  } catch (error) {
    console.error("Failed to enhance component:", error);
    throw new Error(`Component enhancement failed: ${error}`);
  }
}

export async function generateContent(contentType, context) {
  try {
    const prompt = `Generate professional ${contentType} content for a website.
Context: ${context}

Make it engaging, professional, and suitable for web display.
Return only the content text, no formatting or explanations.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Generated content not available";
  } catch (error) {
    console.error("Failed to generate content:", error);
    return "Content generation failed";
  }
}