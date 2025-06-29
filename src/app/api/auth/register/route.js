import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, password } = await req.json(); // ⬅️ Include name

  try {
    const { db } = await connectToDatabase();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      name, // ⬅️ Store name
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        userId: result.insertedId,
        name,               // ⬅️ Return name to client
        email               // ⬅️ Return email to client
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
