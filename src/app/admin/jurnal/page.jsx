'use client';

import { useEffect, useState } from 'react';
import { Loader2, Search, BookOpen, User, Calendar } from 'lucide-react';

export default function AdminJurnalPage() {
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await fetch('/api/jurnal');
      const data = await res.json();
      if (data.data) {
        setJournals(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch journals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJournals = journals.filter((journal) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      journal.siswaId?.nama?.toLowerCase().includes(searchLower) ||
      journal.ceritaId?.judul?.toLowerCase().includes(searchLower) ||
      journal.submissionText?.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jurnal Siswa</h1>
          <p className="text-gray-500">Lihat apa yang dipelajari siswa dari cerita mereka</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari siswa atau cerita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredJournals.map((journal) => (
          <div key={journal._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{journal.siswaId?.nama || 'Siswa Tidak Dikenal'}</h3>
                  <p className="text-sm text-gray-500">{journal.siswaId?.kelas || '-'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full self-start">
                <Calendar className="w-4 h-4" />
                {new Date(journal.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-purple-600 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Membaca: {journal.ceritaId?.judul || 'Cerita Tidak Dikenal'}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {journal.submissionText}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredJournals.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
            <p className="text-gray-500">Belum ada jurnal yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
