import { NextResponse } from 'next/server';
import { getAITaskHelp } from '@/lib/askAI';

export async function POST(req) {
  const { task } = await req.json();

  if (!task) {
    return NextResponse.json({ error: 'Task is required' }, { status: 400 });
  }

  try {
    const answer = await getAITaskHelp(task);
    return NextResponse.json({ result: answer });
  } catch (error) {
    console.error('AI error:', error);
    return NextResponse.json({ error: 'AI failed to respond' }, { status: 500 });
  }
}
