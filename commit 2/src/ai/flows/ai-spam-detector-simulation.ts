'use server';
/**
 * @fileOverview An AI agent for simulating a spam detector.
 *
 * - aiSpamDetectorSimulation - A function that classifies a text message as spam or not spam.
 * - AiSpamDetectorSimulationInput - The input type for the aiSpamDetectorSimulation function.
 * - AiSpamDetectorSimulationOutput - The return type for the aiSpamDetectorSimulation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiSpamDetectorSimulationInputSchema = z.object({
  message: z.string().describe('The text message to classify as spam or not spam.'),
});
export type AiSpamDetectorSimulationInput = z.infer<typeof AiSpamDetectorSimulationInputSchema>;

const AiSpamDetectorSimulationOutputSchema = z.object({
  classification: z.union([z.literal('Spam'), z.literal('Not Spam')]).describe('The classification of the message as "Spam" or "Not Spam".'),
  explanation: z.string().describe('A brief explanation for the classification.'),
});
export type AiSpamDetectorSimulationOutput = z.infer<typeof AiSpamDetectorSimulationOutputSchema>;

export async function aiSpamDetectorSimulation(input: AiSpamDetectorSimulationInput): Promise<AiSpamDetectorSimulationOutput> {
  return aiSpamDetectorSimulationFlow(input);
}

const spamDetectorPrompt = ai.definePrompt({
  name: 'spamDetectorPrompt',
  input: { schema: AiSpamDetectorSimulationInputSchema },
  output: { schema: AiSpamDetectorSimulationOutputSchema },
  prompt: `You are an AI spam detector. Your task is to classify the following text message as "Spam" or "Not Spam".
Provide a brief explanation for your classification. Ensure your response strictly adheres to the JSON schema.

Message: "{{{message}}}"`,
});

const aiSpamDetectorSimulationFlow = ai.defineFlow(
  {
    name: 'aiSpamDetectorSimulationFlow',
    inputSchema: AiSpamDetectorSimulationInputSchema,
    outputSchema: AiSpamDetectorSimulationOutputSchema,
  },
  async (input) => {
    const { output } = await spamDetectorPrompt(input);
    return output!;
  }
);
