'use client';

import {
  Edit3,
  Plus,
  Search,
  Trash2,
  Users,
} from 'lucide-react';

const students = [
  { id: 1, nis: '2024001', name: 'Alya Putri', kelas: '4A', progress: '18 cerita', status: 'Aktif' },
  { id: 2, nis: '2024002', name: 'Rafi Nugraha', kelas: '5B', progress: '22 cerita', status: 'Aktif' },
  { id: 3, nis: '2024003', name: 'Salsa Rahma', kelas: '3C', progress: '12 cerita', status: 'Tidak aktif' },
  { id: 4, nis: '2024004', name: 'Bagas Pratama', kelas: '2A', progress: '9 cerita', status: 'Aktif' },
];

export default function AdminSiswaPage() {
  return (
    <div className="space-y-6">
        <header className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Admin - Siswa</p>
              <h1 className="text-2xl font-bold text-gray-800">Kelola siswa</h1>
              <p className="text-gray-600 mt-1">Lihat daftar siswa, tambah baru, atau nonaktifkan.</p>
            </div>
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm shadow-lg">
              Tambah siswa
            </button>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
            <Search className="w-4 h-4 text-gray-400" />
            <input className="w-full bg-transparent outline-none text-sm" placeholder="Cari siswa..." />
          </div>
        </header>

        <section className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">List Data Siswa</h3>
                <p className="text-xs">Kelola data siswa terdaftar</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-xl">Siswa</th>
                    <th className="px-4 py-3">Kelas</th>
                    <th className="px-4 py-3">Progress</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-tr-xl text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-800">{student.name}</div>
                        <div className="text-xs text-gray-500">NIS: {student.nis}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{student.kelas}</td>
                      <td className="px-4 py-3 text-gray-600">{student.progress}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] px-2 py-1 rounded-full border ${
                            student.status === 'Aktif'
                              ? 'bg-green-50 text-green-700 border-green-100'
                              : 'bg-gray-50 text-gray-600 border-gray-100'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 space-y-4">
            <p className="text-sm text-gray-500">Tambah / kurangi siswa</p>
            <h3 className="text-lg font-bold text-gray-800">Kelola data siswa</h3>
            <div className="space-y-3">
              <input
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none"
                placeholder="Nomor Induk Siswa (NIS)"
              />
              <input
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none"
                placeholder="Nama siswa"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none"
                  placeholder="Kelas"
                />
                <input
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none"
                  placeholder="Jumlah cerita dibaca"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm shadow-lg">
                  Simpan siswa
                </button>
                <button className="px-4 py-3 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  Kurangi
                </button>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}




