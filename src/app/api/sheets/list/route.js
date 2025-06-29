import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const sheets = await db
      .collection('sheets')
      .find({ userId })
      .sort({ createdAt: -1 }) // newest first
      .toArray();

    return NextResponse.json({ sheets }, { status: 200 });
  } catch (error) {
    console.error('Error fetching sheets:', error);
    return NextResponse.json({ error: 'Failed to load sheets' }, { status: 500 });
  }
}
