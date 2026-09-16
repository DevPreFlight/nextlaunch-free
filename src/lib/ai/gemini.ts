import { GoogleGenAI } from '@google/genai';

/**
 * Google GenAI SDK Client Initialization
 */
export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn('[Gemini AI Engine] GEMINI_API_KEY is not set. Demo simulated mode will be used.');
  }
  return new GoogleGenAI({ apiKey });
}

export interface StreamChatParams {
  prompt: string;
  model?: string;
  systemInstruction?: string;
}

/**
 * Streams AI responses from Google Gemini 2.5 Flash / Pro
 */
export async function* streamGeminiResponse({
  prompt,
  model = 'gemini-2.5-flash',
  systemInstruction,
}: StreamChatParams) {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback demo simulation if API key is not configured locally
  if (!apiKey) {
    const simulatedWords = [
      '**NextLaunch AI Copilot Engine** is live and operational.\n\n',
      'Here is an example response generated for your prompt: `', prompt, '`\n\n',
      '```typescript\n',
      '// NextLaunch Pro: Production Type-Safe Pattern\n',
      'export async function executeAiWorkflow(data: { prompt: string }) {\n',
      '  const response = await fetch("/api/ai/chat", {\n',
      '    method: "POST",\n',
      '    body: JSON.stringify(data),\n',
      '  });\n',
      '  return response.body;\n',
      '}\n',
      '```\n\n',
      '✨ To connect real Google Gemini 2.5 models, simply set `GEMINI_API_KEY` in your `.env.local`.'
    ];

    for (const chunk of simulatedWords) {
      yield chunk;
      await new Promise((r) => setTimeout(r, 60));
    }
    return;
  }

  try {
    const ai = getGeminiClient();
    const responseStream = await ai.models.generateContentStream({
      model,
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (err: any) {
    console.error('[Gemini Streaming Error]:', err);
    yield `\n\n⚠️ Error during AI generation: ${err.message}`;
  }
}
