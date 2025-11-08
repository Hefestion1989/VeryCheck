import { GoogleGenAI, Type } from "@google/genai";
import type { FactCheckResult } from "../types";

// JSON Schema for structured output (forces the model to conform to this format)
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    veredicto: {
      type: Type.STRING,
      enum: ["verdadero", "falso", "engañoso", "indeterminado"],
    },
    confianza: { type: Type.NUMBER },
    explicacion: { type: Type.STRING },
    citas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          titulo: { type: Type.STRING },
          url: { type: Type.STRING },
        },
        required: ["url"],
      },
    },
    claim_normalizado: { type: Type.STRING },
  },
  required: ["veredicto", "confianza", "explicacion", "citas", "claim_normalizado"],
};

const SUPER_PROMPT = `
Sos un verificador de hechos. Evaluá una afirmación concreta, buscá evidencia pública y devolvé un dictamen objetivo.
Si no hay evidencia suficiente, devolvé "indeterminado".
No inventes URLs ni conclusiones. Prioridad de fuentes: primarias (organismos, papers, datos oficiales); luego medios reputados.
Salida OBLIGATORIA en JSON (según schema). "explicacion" ≤120 palabras.
Procedimiento:
1) Normalizá el claim en una oración clara.
2) Buscá evidencia y listá 2–6 fuentes actuales; evitá blogs opacos o wikis sin respaldo.
3) Decidí: verdadero | falso | engañoso | indeterminado.
4) Explicá brevemente el porqué.
5) Si las fuentes no respaldan, usar "indeterminado".
`;

/**
 * Performs a fact-check using Gemini with a stable, structured output.
 */
export async function factCheckWithGemini(userInput: string): Promise<FactCheckResult> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set in environment variables.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `${SUPER_PROMPT}\n\nClaim del usuario:\n"""${userInput.trim()}"""\n\nDevolvé SOLO el JSON.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro", // Using latest and recommended Pro model
      contents: prompt,
      config: {
        temperature: 0.25,
        maxOutputTokens: 8192, // Increased token limit to max to prevent premature cutoff
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    
    // The .text accessor should always return a string.
    // If it's empty, the response was likely blocked or contained no text parts.
    if (!text) {
        let reason = "Razón desconocida.";
        const blockReason = response.promptFeedback?.blockReason;
        const finishReason = response.candidates?.[0]?.finishReason;

        if (blockReason) {
            reason = `La solicitud fue bloqueada por seguridad (${blockReason}). Intenta reformular la consulta.`;
        } else if (finishReason && finishReason !== 'STOP') {
            reason = `La generación de la respuesta se detuvo prematuramente (motivo: ${finishReason}).`;
        }
        
        console.error("API response did not contain text. Full response:", response);
        throw new Error(`La respuesta de la API estaba vacía. ${reason}`);
    }

    let jsonText = text.trim();
    
    // Robustly strip Markdown code block fences
    const match = jsonText.match(/^```json\s*([\s\S]*?)\s*```$/);
    if (match) {
        jsonText = match[1];
    }

    let parsed: FactCheckResult;

    try {
       parsed = JSON.parse(jsonText) as FactCheckResult;
    } catch {
       console.error("Failed to parse JSON:", jsonText);
       const finishReason = response.candidates?.[0]?.finishReason;
       if (finishReason === 'MAX_TOKENS') {
         throw new Error("La respuesta del modelo fue demasiado larga y se truncó. Intente con una consulta más específica.");
       }
       // This error is now more indicative of a malformed JSON from the model itself.
       throw new Error("No se pudo estructurar la respuesta del modelo en el formato requerido.");
    }
   
    // Basic sanitization
    if (!parsed?.veredicto || !parsed?.explicacion) {
        throw new Error("La respuesta no cumplió con el esquema esperado.");
    }

    // Clamp confidence between 0 and 1
    const conf = Math.max(0, Math.min(1, Number(parsed.confianza) || 0));
    parsed.confianza = conf;

    // Filter for valid URLs and avoid common shorteners
    parsed.citas = (parsed.citas || []).filter(c => {
      try {
        if (!c.url) return false;
        const u = new URL(c.url);
        const host = u.hostname.toLowerCase();
        if (host.includes("bit.ly") || host.includes("t.co") || host.includes("goo.gl")) return false;
        return ["http:", "https:"].includes(u.protocol);
      } catch {
        return false;
      }
    });

    return parsed;

  } catch (error) {
    console.error("Error calling Gemini API or processing response:", error);
    // Return a safe "indeterminate" response on hard failure
    const safeResponse: FactCheckResult = {
      veredicto: "indeterminado",
      confianza: 0.3,
      explicacion: "No se pudo obtener o procesar una respuesta válida del modelo de IA. Por favor, revisa la consulta o inténtalo de nuevo.",
      citas: [],
      claim_normalizado: userInput.trim(),
    };
     if (error instanceof Error) {
        safeResponse.explicacion = `Error al verificar: ${error.message}`;
    }
    return safeResponse;
  }
}