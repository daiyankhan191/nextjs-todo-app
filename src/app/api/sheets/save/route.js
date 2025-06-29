import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
  const { userId, title, deadline, tasks } = await req.json();

  if (!userId || !title || !deadline || !tasks?.length) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('sheets').insertOne({ userId, title, deadline, tasks });

    return NextResponse.json({ success: true, sheet: { _id: result.insertedId, title, deadline, tasks } });
  } catch (err) {
    console.error('Error saving sheet:', err);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
