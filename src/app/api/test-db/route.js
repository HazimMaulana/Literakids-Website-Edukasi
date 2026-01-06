import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const startTime = Date.now();
    await connectToDatabase();
    const duration = Date.now() - startTime;
    
    // Check connection state
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    const state = mongoose.connection.readyState;
    const stateMap = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting',
    };

    return NextResponse.json({ 
      status: 'success', 
      message: 'Database connection successful',
      connectionState: stateMap[state] || state,
      duration: `${duration}ms`,
      envVarCheck: {
        hasUri: !!process.env.MONGODB_URI,
        uriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0
      }
    });

  } catch (error) {
    console.error("Test DB Connection Error:", error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Failed to connect to database',
      error: error.message, 
      stack: error.stack 
    }, { status: 500 });
  }
}
