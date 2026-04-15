'use server';
/**
 * @fileOverview This file implements a Genkit flow for personalized learning recommendations.
 * It analyzes a learner's progress and quiz performance to suggest the next best lesson or challenge.
 *
 * - aiPersonalizedLearningRecommendation - The main function to get learning recommendations.
 * - AIPersonalizedLearningRecommendationInput - The input type for the recommendation function.
 * - AIPersonalizedLearningRecommendationOutput - The return type for the recommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIPersonalizedLearningRecommendationInputSchema = z.object({
  completedTopics: z.array(z.string()).describe('List of topics the user has already completed.'),
  quizPerformance: z.record(
    z.string().describe('Quiz name or topic'),
    z.number().min(0).max(100).describe('Score for the quiz (0-100)')
  ).describe('An object containing quiz scores for different topics.'),
  allAvailableTopics: z.object({
    beginner: z.array(z.string()).describe('List of all beginner-level topics available.'),
    intermediate: z.array(z.string()).describe('List of all intermediate-level topics available.'),
    advanced: z.array(z.string()).describe('List of all advanced-level topics available.'),
  }).describe('A structured list of all available learning topics by difficulty level.'),
});

export type AIPersonalizedLearningRecommendationInput = z.infer<typeof AIPersonalizedLearningRecommendationInputSchema>;

const AIPersonalizedLearningRecommendationOutputSchema = z.object({
  recommendedTopic: z.string().describe('The name of the next recommended lesson or topic.'),
  recommendationType: z.enum(['lesson', 'quiz', 'challenge']).describe('The type of activity recommended (lesson, quiz, or challenge).'),
  reason: z.string().describe('A brief explanation of why this topic or activity was recommended.'),
});

export type AIPersonalizedLearningRecommendationOutput = z.infer<typeof AIPersonalizedLearningRecommendationOutputSchema>;

export async function aiPersonalizedLearningRecommendation(input: AIPersonalizedLearningRecommendationInput): Promise<AIPersonalizedLearningRecommendationOutput> {
  return aiPersonalizedLearningRecommendationFlow(input);
}

const recommendationPrompt = ai.definePrompt({
  name: 'personalizedLearningRecommendationPrompt',
  input: { schema: AIPersonalizedLearningRecommendationInputSchema },
  output: { schema: AIPersonalizedLearningRecommendationOutputSchema },
  prompt: `You are an AI learning assistant for "AIML Quest". Your goal is to provide personalized learning recommendations to users based on their completed topics and quiz performance.

Here is the user's current progress and quiz performance:
Completed Topics: {{#each completedTopics}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Quiz Performance:
{{#each quizPerformance}}
- Quiz: {{{@key}}}, Score: {{{this}}}
{{/each}}

Available Learning Path Topics (categorized by difficulty):
Beginner: {{#each allAvailableTopics.beginner}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Intermediate: {{#each allAvailableTopics.intermediate}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Advanced: {{#each allAvailableTopics.advanced}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on the above information, recommend the single best next lesson, quiz, or challenge for the user. Consider topics the user has not yet completed. Prioritize topics where they might have lower quiz scores or the next logical step in the learning path. Explain your reasoning clearly. The recommendation should guide them through the learning journey effectively, building on previously learned concepts.

Respond with a JSON object containing 'recommendedTopic', 'recommendationType' (either 'lesson', 'quiz', or 'challenge'), and 'reason'.`,
});

const aiPersonalizedLearningRecommendationFlow = ai.defineFlow(
  {
    name: 'aiPersonalizedLearningRecommendationFlow',
    inputSchema: AIPersonalizedLearningRecommendationInputSchema,
    outputSchema: AIPersonalizedLearningRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await recommendationPrompt(input);
    return output!;
  }
);
