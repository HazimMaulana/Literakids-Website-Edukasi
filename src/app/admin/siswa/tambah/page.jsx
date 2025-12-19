'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Save, UserPlus, X } from 'lucide-react';

export default function AdminTambahSiswaPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    nisn: '',
    nama: '',
    kelas: '',
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/siswa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || 'Gagal menyimpan siswa.');
      }

      router.push('/admin/siswa');
      router.refresh();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Induk Siswa (NISN)</label>
              <input
                type="text"
                name="nisn"
                value={formState.nisn}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                placeholder="Contoh: 0061234567"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama siswa</label>
              <input
                type="text"
                name="nama"
                value={formState.nama}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                placeholder="Masukkan nama siswa"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
              <input
                type="text"
                name="kelas"
                value={formState.kelas}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                placeholder="Contoh: 4A"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                  placeholder="Buat username siswa"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/80"
                  placeholder="Buat password siswa"
                  required
                />
              </div>
            </div>
            {submitError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-2">
                {submitError}
              </p>
            )}
            <div className="p-6 bg-gray-50/60 border-t border-gray-100 flex items-center justify-end gap-3 -mx-6 -mb-6 mt-6">
              <Link
                href="/admin/siswa"
                className="px-4 py-2 rounded-2xl border border-gray-200 text-gray-600 text-sm hover:bg-white"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm shadow-lg flex items-center gap-2 disabled:opacity-70"
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Menyimpan...' : 'Simpan siswa'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
