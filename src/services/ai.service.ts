import { streamGeminiResponse } from '@/lib/ai/gemini';
import { deductCredits, getWorkspaceCredits } from '@/lib/ai/credits';

export interface StreamChatParams {
  prompt: string;
  model?: string;
  workspaceId?: string;
  creditCost?: number;
}

export class AIService {
  /**
   * Retrieves current credit balance for workspace
   */
  async getBalance(workspaceId: string) {
    return await getWorkspaceCredits(workspaceId);
  }

  /**
   * Deducts credits and produces an async token stream
   */
  async *generateStream({ prompt, model, workspaceId = 'ws_demo_cloud_01', creditCost = 5 }: StreamChatParams) {
    // Deduct usage credit before streaming
    await deductCredits(workspaceId, creditCost);

    // Stream generation from provider
    for await (const chunk of streamGeminiResponse({ prompt, model })) {
      yield chunk;
    }
  }
}

export const aiService = new AIService();
