import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add this to your .env.local file
});

export async function getAITaskHelp(taskDescription) {
  const prompt = `Give step-by-step guidance on how to complete this task: "${taskDescription}"`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  return completion.choices[0].message.content;
}
