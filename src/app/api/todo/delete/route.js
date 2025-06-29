// src/app/api/todo/delete/route.js

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  const { id } = await req.json();

  try {
    const { db } = await connectToDatabase();

    await db.collection('todos').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
