'use server';
/**
 * @fileOverview An AI agent that provides intelligent hints for coding challenges.
 *
 * - aiCodingHintGenerator - A function that generates a coding hint based on the problem, user's code, and desired difficulty.
 * - AICodingHintGeneratorInput - The input type for the aiCodingHintGenerator function.
 * - AICodingHintGeneratorOutput - The return type for the aiCodingHintGenerator function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AICodingHintGeneratorInputSchema = z.object({
  problemDescription: z.string().describe('The description of the coding challenge.'),
  userCode: z.string().describe('The current code written by the user.'),
  difficulty: z.enum(['easy', 'medium', 'hard', 'no-solution']).describe('The desired difficulty level of the hint. "no-solution" means to avoid giving away explicit code snippets.'),
});
export type AICodingHintGeneratorInput = z.infer<typeof AICodingHintGeneratorInputSchema>;

const AICodingHintGeneratorOutputSchema = z.object({
  hint: z.string().describe('An intelligent hint that guides the user without revealing the full solution.'),
});
export type AICodingHintGeneratorOutput = z.infer<typeof AICodingHintGeneratorOutputSchema>;

export async function aiCodingHintGenerator(input: AICodingHintGeneratorInput): Promise<AICodingHintGeneratorOutput> {
  return aiCodingHintGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCodingHintGeneratorPrompt',
  input: { schema: AICodingHintGeneratorInputSchema },
  output: { schema: AICodingHintGeneratorOutputSchema },
  prompt: `You are an AI coding assistant. Your goal is to provide helpful hints for coding challenges without giving away the full solution. The hint should guide the user towards understanding the problem and finding the solution themselves.

Here is the coding challenge description:
Problem Description: {{{problemDescription}}}

Here is the user's current code:
User Code: 
```python
{{{userCode}}}
```

Desired hint difficulty/directness: {{{difficulty}}}

Based on the problem description, the user's code, and the desired difficulty, provide an intelligent hint. Avoid giving explicit code snippets, especially if the difficulty is 'no-solution'. Focus on conceptual guidance, debugging strategies, or pointing towards relevant algorithms/data structures.`, // eslint-disable-line max-len
});

const aiCodingHintGeneratorFlow = ai.defineFlow(
  {
    name: 'aiCodingHintGeneratorFlow',
    inputSchema: AICodingHintGeneratorInputSchema,
    outputSchema: AICodingHintGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
