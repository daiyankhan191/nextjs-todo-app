// src/app/api/todo/list/route.js

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
  const { userId } = await req.json();

  try {
    const { db } = await connectToDatabase();

    const todos = await db
      .collection('todos')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ todos }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}
