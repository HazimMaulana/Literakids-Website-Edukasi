'use client';

import Link from 'next/link';
import { Save, UserPlus, X } from 'lucide-react';

export default function AdminTambahSiswaPage() {
  return (
    <div className="relative min-h-[70vh]">
      <div className="fixed inset-0 lg:left-64 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 lg:left-64 z-10 flex">
        <div className="w-full h-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl overflow-y-auto">
          <div className="p-6 flex items-start justify-between gap-4 border-b border-gray-100 bg-white/70">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-xl text-green-600">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Admin - Siswa</p>
                <h1 className="text-xl font-bold text-gray-800">Tambah Siswa Baru</h1>
                <p className="text-sm text-gray-600 mt-1">Isi data siswa untuk mulai digunakan.</p>
              </div>
            </div>
            <Link
              href="/admin/siswa"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </Link>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Induk Siswa (NISN)</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                placeholder="Contoh: 0061234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama siswa</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                placeholder="Masukkan nama siswa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                placeholder="Contoh: 4A"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                  placeholder="Buat username siswa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                  placeholder="Buat password siswa"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50/60 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              href="/admin/siswa"
              className="px-4 py-2 rounded-2xl border border-gray-200 text-gray-600 text-sm hover:bg-white"
            >
              Batal
            </Link>
            <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm shadow-lg flex items-center gap-2">
              <Save className="w-4 h-4" />
              Simpan siswa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
