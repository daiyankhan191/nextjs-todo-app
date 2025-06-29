// File: /app/api/auth/forgot-password/route.js

import { NextResponse } from 'next/server';
import { sendResetEmail } from '@/lib/nodemailer';
import crypto from 'crypto';

// Simulated in-memory store (replace with DB in production)
const tokenStore = new Map();

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes expiry

  tokenStore.set(token, { email, expires });

  try {
    await sendResetEmail(email, token);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending reset email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

// Optional: You can create a GET route to validate the token later
