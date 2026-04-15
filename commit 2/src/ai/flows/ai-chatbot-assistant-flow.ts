'use server';
/**
 * @fileOverview An AI chatbot assistant that provides instant answers to AIML questions,
 * understands complex topics, and offers coding help.
 *
 * - aiChatbotAssistant - A function that handles the AI chatbot's responses.
 * - AIChatbotAssistantInput - The input type for the aiChatbotAssistant function.
 * - AIChatbotAssistantOutput - The return type for the aiChatbotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotAssistantInputSchema = z
  .string()
  .describe('The user\u0027s question or request for the AI chatbot assistant.');
export type AIChatbotAssistantInput = z.infer<
  typeof AIChatbotAssistantInputSchema
>;

const AIChatbotAssistantOutputSchema = z
  .string()
  .describe('The AI chatbot\u0027s response to the user\u0027s query.');
export type AIChatbotAssistantOutput = z.infer<
  typeof AIChatbotAssistantOutputSchema
>;

export async function aiChatbotAssistant(
  input: AIChatbotAssistantInput
): Promise<AIChatbotAssistantOutput> {
  return aiChatbotAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotAssistantPrompt',
  input: {schema: AIChatbotAssistantInputSchema},
  output: {schema: AIChatbotAssistantOutputSchema},
  prompt: `You are an AI chatbot assistant specializing in Artificial Intelligence and Machine Learning (AIML).
Your purpose is to provide instant, clear, and concise answers to user questions about AIML concepts, explain complex topics simply, and offer coding help.

User's Request: {{{.}}}

AI Assistant's Response:`,
});

const aiChatbotAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatbotAssistantFlow',
    inputSchema: AIChatbotAssistantInputSchema,
    outputSchema: AIChatbotAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
