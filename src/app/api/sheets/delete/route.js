import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sheet from '../../../models/sheet';


export async function POST(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'Sheet ID is required' }, { status: 400 });
    }

    await connectDB();

    const deleted = await Sheet.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Sheet not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ success: false, error: 'Server error while deleting sheet' }, { status: 500 });
  }
}
