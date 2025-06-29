// src/app/api/todo/complete/route.js

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  const { id } = await req.json();

  try {
    const { db } = await connectToDatabase();

    await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: true } }
    );

    return NextResponse.json({ message: 'Marked as completed' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}
