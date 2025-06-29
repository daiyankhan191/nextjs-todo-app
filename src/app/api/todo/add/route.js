import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
  const { userId, task } = await req.json();

  try {
    const { db } = await connectToDatabase();

    const result = await db.collection('todos').insertOne({
      userId,
      task,
      completed: false,
      createdAt: new Date(),
    });

    return NextResponse.json({ todo: { _id: result.insertedId, userId, task } }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
}
