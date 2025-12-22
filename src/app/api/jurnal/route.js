import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Jurnal from '@/models/Jurnal';
import Siswa from '@/models/Siswa';
import Cerita from '@/models/Cerita';

export const runtime = 'nodejs';

export async function GET() {
  await connectToDatabase();
  try {
    const journals = await Jurnal.find()
      .populate('siswaId', 'nama kelas')
      .populate('ceritaId', 'judul')
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({ data: journals });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const payload = await request.json();
    const { ceritaId, siswaId, submissionText } = payload;

    if (!ceritaId || !siswaId || !submissionText) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi.' },
        { status: 400 }
      );
    }

    // Verify Siswa and Cerita exist
    const siswa = await Siswa.findById(siswaId);
    if (!siswa) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan.' }, { status: 404 });
    }

    const cerita = await Cerita.findById(ceritaId);
    if (!cerita) {
      return NextResponse.json({ error: 'Cerita tidak ditemukan.' }, { status: 404 });
    }

    const jurnal = await Jurnal.create({
      ceritaId,
      siswaId,
      submissionText,
    });

    return NextResponse.json({ data: jurnal }, { status: 201 });
  } catch (error) {
    console.error('Error creating journal:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menyimpan jurnal.' },
      { status: 500 }
    );
  }
}
