import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // ✅ Return name and email too
    return NextResponse.json({
      message: 'Login successful',
      userId: user._id,
      name: user.name,      // Add this line
      email: user.email     // Add this line
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
