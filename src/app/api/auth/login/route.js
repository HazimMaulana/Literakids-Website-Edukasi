import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { connectToDatabase } from '@/lib/mongoose';
import Siswa from '@/models/Siswa';
import { cookies } from 'next/headers';

export async function POST(request) {
  await connectToDatabase();

  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
  }

  // 1. Check for Admin (Using Environment Variables)
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === adminUsername && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('auth_token', 'admin-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    cookieStore.set('user_role', 'admin', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    
    return NextResponse.json({ 
      success: true, 
      user: { username: 'admin', role: 'admin' },
      redirectUrl: '/admin' 
    });
  }

  // 2. Check for Student
  const passwordHash = createHash('sha256').update(password).digest('hex');
  
  // We need to find the user AND check the password. 
  // Since the API /api/siswa excludes passwordHash, we must query directly here.
  const user = await Siswa.findOne({ username });

  if (!user) {
    return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 401 });
  }

  if (user.passwordHash !== passwordHash) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 });
  }

  // Login successful
  const cookieStore = await cookies();
  cookieStore.set('auth_token', user._id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  cookieStore.set('user_role', 'student', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ 
    success: true, 
    user: { 
      _id: user._id, // Include _id in the response
      username: user.username, 
      nama: user.nama, 
      role: 'student' 
    },
    redirectUrl: '/dashboard'
  });
}
