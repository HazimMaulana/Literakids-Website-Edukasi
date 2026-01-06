import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Siswa from '@/models/Siswa';
import { createHash } from 'node:crypto';

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '');

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const payload = await request.json();
    const nama = normalizeText(payload?.nama);
    const nisn = normalizeText(payload?.nisn);
    const kelas = normalizeText(payload?.kelas);
    const username = normalizeText(payload?.username);
    const password = normalizeText(payload?.password);

    if (!nama || !nisn || !kelas || !username) {
        return NextResponse.json({ error: 'Nama, NISN, Kelas dan Username wajib diisi' }, { status: 400 });
    }

    const updateData = {
        nama,
        nisn,
        kelas,
        username,
    };

    // Only update password if provided
    if (password) {
        updateData.passwordHash = createHash('sha256').update(password).digest('hex');
    }

    const updatedSiswa = await Siswa.findByIdAndUpdate(
        id,
        updateData,
        { new: true } // Return the updated document
    );

    if (!updatedSiswa) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ 
        message: 'Data siswa berhasil diperbarui', 
        data: updatedSiswa 
    });

  } catch (error) {
    console.error('Failed to update student:', error);
    // Handle duplicate key error (e.g. NISN or Username already exists)
    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return NextResponse.json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} sudah digunakan.` }, { status: 400 });
    }
    return NextResponse.json({ error: 'Gagal memperbarui data siswa' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const deletedSiswa = await Siswa.findByIdAndDelete(id);

    if (!deletedSiswa) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Siswa berhasil dihapus' });
  } catch (error) {
    console.error('Failed to delete student:', error);
    return NextResponse.json({ error: 'Gagal menghapus siswa' }, { status: 500 });
  }
}
