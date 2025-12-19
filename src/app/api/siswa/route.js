import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { connectToDatabase } from '@/lib/mongoose';
import Siswa from '@/models/Siswa';

export const runtime = 'nodejs';

export async function GET() {
  await connectToDatabase();

  const siswa = await Siswa.find({}, '-passwordHash').sort({ createdAt: -1 }).lean();
  return NextResponse.json({ data: siswa });
}

export async function POST(request) {
  await connectToDatabase();

  const payload = await request.json();
  const nama = payload?.nama?.trim();
  const nisn = payload?.nisn?.trim();
  const kelas = payload?.kelas?.trim();
  const username = payload?.username?.trim();
  const password = payload?.password?.trim();

  if (!nama || !nisn || !kelas || !username || !password) {
    return NextResponse.json(
      { error: 'Semua field wajib diisi.' },
      { status: 400 }
    );
  }

  const passwordHash = createHash('sha256').update(password).digest('hex');

  try {
    const created = await Siswa.create({
      nama,
      nisn,
      kelas,
      username,
      passwordHash,
    });

    return NextResponse.json(
      {
        data: {
          _id: created._id,
          nama: created.nama,
          nisn: created.nisn,
          kelas: created.kelas,
          username: created.username,
          jumlahCeritaDibaca: created.jumlahCeritaDibaca,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json(
        { error: 'NISN atau username sudah terdaftar.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Gagal menambahkan siswa.' },
      { status: 500 }
    );
  }
}
