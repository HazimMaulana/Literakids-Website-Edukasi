import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Cerita from '@/models/Cerita';

export const runtime = 'nodejs';

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '');

export async function GET() {
  try {
    await connectToDatabase();
    const cerita = await Cerita.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data: cerita });
  } catch (error) {
    console.error('[API] Error fetching stories:', error);
    return NextResponse.json({ error: 'Gagal memuat data cerita.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const payload = await request.json();
    const judul = normalizeText(payload?.judul);
    const kategori = normalizeText(payload?.kategori);
    const status = normalizeText(payload?.status) || 'Draft';
    const coverUrl = normalizeText(payload?.coverUrl);

    if (!judul) {
      return NextResponse.json(
        { error: 'Judul cerita wajib diisi.' },
        { status: 400 }
      );
    }

    const halamanInput = Array.isArray(payload?.halaman) ? payload.halaman : [];
    const halaman = halamanInput.map((page) => ({
      gambarUrl: normalizeText(page?.gambarUrl),
      teks: normalizeText(page?.teks),
      audioUrl: normalizeText(page?.audioUrl),
    }));

    if (
      halaman.some((page) => !page.gambarUrl || !page.teks || !page.audioUrl)
    ) {
      return NextResponse.json(
        { error: 'Setiap halaman wajib memiliki gambar, teks, dan audio.' },
        { status: 400 }
      );
    }

    const glosariumInput = Array.isArray(payload?.glosarium) ? payload.glosarium : [];
    const glosarium = glosariumInput.map((item) => ({
      kata: normalizeText(item?.kata),
      arti: normalizeText(item?.arti),
    })).filter(item => item.kata && item.arti);

    const created = await Cerita.create({
      judul,
      kategori,
      status,
      coverUrl,
      halaman,
      glosarium,
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error('[API] Error creating story:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan cerita. ' + error.message },
      { status: 500 }
    );
  }
}
