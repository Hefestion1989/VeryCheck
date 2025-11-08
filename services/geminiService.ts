import { GoogleGenAI } from "@google/genai";
import { FactCheckResult, Verdict, Source } from '../types';

const parseVerdict = (verdictString: string): Verdict => {
  const lowerCaseVerdict = verdictString.toLowerCase().trim();
  switch (lowerCaseVerdict) {
    case 'verdadero':
      return Verdict.TRUE;
    case 'falso':
      return Verdict.FALSE;
    case 'engañoso':
      return Verdict.MISLEADING;
    case 'incierto':
    case 'indeterminado':
      return Verdict.UNCERTAIN;
    default:
      return Verdict.UNCERTAIN;
  }
};

export const factCheckWithGemini = async (query: string): Promise<FactCheckResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
Eres un experto verificador de hechos. Tu único propósito es analizar el texto o el enlace proporcionado.
Utiliza únicamente fuentes de alta calidad y verificabilidad (proporcionadas por la búsqueda de Google) para determinar la veracidad del contenido.
Tu respuesta DEBE SER un único objeto JSON, sin formato markdown ni texto adicional. El objeto JSON debe seguir esta estructura:
{
  "veredicto": "uno de ['verdadero', 'falso', 'engañoso', 'incierto']",
  "porcentaje_confianza": "Un número entero entre 0 y 100 que representa la confianza en el veredicto",
  "explicacion": "Una explicación concisa y neutral de los hallazgos basada en las fuentes."
}

Contenido a verificar: "${query}"
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    let responseText = response.text.trim();
    
    // Clean the response to remove markdown code block fences if they exist.
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = responseText.match(jsonRegex);
    if (match && match[1]) {
      responseText = match[1];
    }
    
    const parsedJson = JSON.parse(responseText);
    
    const verdict = parseVerdict(parsedJson.veredicto);
    const percentage = parseInt(parsedJson.porcentaje_confianza, 10) || 0;
    const explanation = parsedJson.explicacion.trim();
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
      .map((chunk: any) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      }))
      .filter((source): source is Source => !!source.uri && !!source.title)
      .filter((source, index, self) =>
        index === self.findIndex((s) => s.uri === source.uri)
      );

    return { verdict, explanation, sources, percentage };
  } catch (error) {
    console.error("Error calling Gemini API or parsing JSON:", error);
     if (error instanceof SyntaxError) {
        throw new Error("La respuesta de la IA no es un JSON válido. Por favor, intenta de nuevo.");
    }
    if (error instanceof Error) {
        throw new Error(`Error al contactar al servicio de IA: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al verificar la información.");
  }
};