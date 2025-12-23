import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Cerita from '@/models/Cerita';

export const runtime = 'nodejs';

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '');

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'ID cerita tidak valid.' }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const cerita = await Cerita.findById(id).lean();
    if (!cerita) {
      return NextResponse.json(
        { error: 'Cerita tidak ditemukan.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: cerita });
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal memuat cerita.' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'ID cerita tidak valid.' }, { status: 400 });
  }

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

  try {
    const updated = await Cerita.findByIdAndUpdate(
      id,
      { judul, kategori, status, coverUrl, halaman, glosarium },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: 'Cerita tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal memperbarui cerita.' },
      { status: 500 }
    );
  }
}
