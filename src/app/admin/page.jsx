'use client';

import {
  BookOpen,
  CheckCircle2,
  Search,
  Users,
  Trophy,
  TrendingUp
} from 'lucide-react';

const topStudents = [
  { id: 1, name: 'Alya Putri', class: '4A', reads: 45 },
  { id: 2, name: 'Budi Santoso', class: '5B', reads: 42 },
  { id: 3, name: 'Citra Dewi', class: '3A', reads: 38 },
  { id: 4, name: 'Dimas Anggara', class: '6C', reads: 35 },
  { id: 5, name: 'Eka Wijaya', class: '4B', reads: 31 },
  { id: 6, name: 'Fajar Nugraha', class: '5A', reads: 29 },
  { id: 7, name: 'Gita Pertiwi', class: '3B', reads: 28 },
  { id: 8, name: 'Hadi Saputra', class: '6A', reads: 25 },
  { id: 9, name: 'Indah Sari', class: '4C', reads: 22 },
  { id: 10, name: 'Joko Susilo', class: '5C', reads: 20 },
];

const popularStories = [
  { id: 1, title: 'Petualangan Sungai Pelangi', category: 'Bermasyarakat', reads: 1280 },
  { id: 2, title: 'Menjaga Kebersihan Sekolah', category: 'Beribadah', reads: 1043 },
  { id: 3, title: 'Kebun Sayur Ceria', category: 'Makan Bergizi', reads: 910 },
  { id: 4, title: 'Si Kancil yang Bijak', category: 'Bermasyarakat', reads: 850 },
  { id: 5, title: 'Misteri Hutan Larangan', category: 'Petualangan', reads: 720 },
  { id: 6, title: 'Belajar Berbagi', category: 'Bermasyarakat', reads: 680 },
  { id: 7, title: 'Kisah Nabi Nuh', category: 'Beribadah', reads: 650 },
  { id: 8, title: 'Makanan Sehat Tubuh Kuat', category: 'Makan Bergizi', reads: 600 },
  { id: 9, title: 'Sahabat Selamanya', category: 'Bermasyarakat', reads: 550 },
  { id: 10, title: 'Liburan ke Pantai', category: 'Petualangan', reads: 500 },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
            <header className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">Dashboard Admin</p>
                  <h1 className="text-2xl font-bold text-gray-800">Halo, Admin!</h1>
                  <p className="text-gray-600 mt-1">Pantau siswa, kelola cerita, dan lihat cerita terfavorit.</p>
                </div>
              </div>
             
            </header>

            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Total Siswa Terdaftar</p>
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-gray-800">324</h3>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+12 minggu ini</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Total Cerita</p>
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-gray-800">42</h3>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+3 baru</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Cerita Terfavorit</p>
                  <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-gray-800">12</h3>
                  <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">Top list</span>
                </div>
              </div>
            </section>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Students Table */}
              <section className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Siswa Paling Rajin</h3>
                      <p className="text-xs text-gray-500">Top 10 pembaca terbanyak</p>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-xl">Rank</th>
                        <th className="px-4 py-3">Nama Siswa</th>
                        <th className="px-4 py-3">Kelas</th>
                        <th className="px-4 py-3 rounded-tr-xl text-right">Total Baca</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {topStudents.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-600">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {student.name}
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {student.class}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-blue-600">
                            {student.reads}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Popular Stories Table */}
              <section className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Cerita Terpopuler</h3>
                      <p className="text-xs text-gray-500">Top 10 cerita paling banyak dibaca</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-xl">Rank</th>
                        <th className="px-4 py-3">Judul Cerita</th>
                        <th className="px-4 py-3">Kategori</th>
                        <th className="px-4 py-3 rounded-tr-xl text-right">Dibaca</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {popularStories.map((story, index) => (
                        <tr key={story.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-600">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {story.title}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-[10px] bg-gray-100 text-gray-600 border border-gray-200">
                              {story.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-green-600">
                            {story.reads}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
    </div>
  );
}



