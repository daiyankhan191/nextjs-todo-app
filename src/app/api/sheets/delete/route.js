import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // ✅ This is the correct import

export async function POST(req) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ success: false, message: 'Missing sheet ID' }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('sheets').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Sheet not found' }, { status: 404 });
    }
  } catch (err) {
    console.error('Delete error:', err);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
