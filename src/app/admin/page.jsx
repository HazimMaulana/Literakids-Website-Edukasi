'use client';

import { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Search,
  Users,
  Trophy,
  TrendingUp
} from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalCerita: 0,
    totalJurnal: 0
  });
  const [topStudents, setTopStudents] = useState([]);
  const [popularStories, setPopularStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setTopStudents(data.topStudents);
          setPopularStories(data.popularStories);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
            <h3 className="text-3xl font-bold text-gray-800">{stats.totalSiswa}</h3>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Aktif</span>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Cerita</p>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3 flex items-end justify-between">
            <h3 className="text-3xl font-bold text-gray-800">{stats.totalCerita}</h3>
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Tersedia</span>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Jurnal Masuk</p>
            <CheckCircle2 className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="mt-3 flex items-end justify-between">
            <h3 className="text-3xl font-bold text-gray-800">{stats.totalJurnal}</h3>
            <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">Terkumpul</span>
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
                {topStudents.length > 0 ? (
                  topStudents.map((student, index) => (
                    <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {student.nama}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {student.kelas}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-blue-600">
                        {student.jumlahCeritaDibaca}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                      Belum ada data siswa
                    </td>
                  </tr>
                )}
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
                {popularStories.length > 0 ? (
                  popularStories.map((story, index) => (
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                      Belum ada data cerita yang dibaca
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}



