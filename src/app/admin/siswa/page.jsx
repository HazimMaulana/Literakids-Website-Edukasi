'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Edit3,
  Plus,
  Search,
  Trash2,
  Users,
  UserPlus,
  ArrowLeft,
  Save,
  X
} from 'lucide-react';

export default function AdminSiswaPage() {
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [dataList, setDataList] = useState([]); // Renamed from students to avoid confusion
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '', 
    nisn: '',
    nama: '',
    kelas: '',
    username: '',
    password: '', // Optional for edit
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch Data
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const response = await fetch('/api/siswa');
        if (!response.ok) throw new Error('Gagal memuat data siswa.');
        const payload = await response.json();
        if (isMounted) setDataList(Array.isArray(payload?.data) ? payload.data : []);
      } catch (error) {
        if (isMounted) setLoadError(error.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  // Handlers
  const handleCreate = () => {
    setIsEditing(false);
    setFormData({ nisn: '', nama: '', kelas: '', username: '', password: '' });
    setSubmitError('');
    setView('form');
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setFormData({
      id: student._id,
      nisn: student.nisn || '',
      nama: student.nama || '',
      kelas: student.kelas || '',
      username: student.username || '',
      password: '', // Password empty by default on edit
    });
    setSubmitError('');
    setView('form');
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah anda yakin ingin menghapus siswa ini?')) return;
    
    try {
        const res = await fetch(`/api/siswa/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Gagal menghapus siswa');
        
        // Remove from list
        setDataList(prev => prev.filter(item => item._id !== id));
    } catch (err) {
        alert(err.message);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
        const url = isEditing ? `/api/siswa/${formData.id}` : '/api/siswa';
        const method = isEditing ? 'PUT' : 'POST';
        
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Terjadi kesalahan saat menyimpan.');

        // Update local list
        if (isEditing) {
            setDataList(prev => prev.map(item => item._id === result.data._id ? result.data : item));
        } else {
            setDataList(prev => [result.data, ...prev]);
        }

        setView('list');
    } catch (err) {
        setSubmitError(err.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  const displayStudents = useMemo(
    () =>
      dataList.map((student) => ({
        id: student._id,
        nisn: student.nisn,
        name: student.nama,
        kelas: student.kelas,
        username: student.username, 
        original: student,
        progress: `${student.jumlahCeritaDibaca ?? 0} cerita`,
        status: 'Aktif',
      })),
    [dataList]
  );

  // --- View: FORM ---
  if (view === 'form') {
    return (
        <div className="space-y-6">
             {/* Form Header */}
             <header className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-xl text-green-600">
                        {isEditing ? <Edit3 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}</h1>
                        <p className="text-gray-600 text-sm">{isEditing ? 'Perbarui informasi siswa.' : 'Isi data siswa untuk mulai digunakan.'}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm font-medium shadow-lg flex items-center gap-2 disabled:opacity-70"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
             </header>
    
             {/* Form Content */}
             <form className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-8 space-y-6" onSubmit={handleSubmit}>
                {submitError && (
                    <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm">
                        {submitError}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Induk Siswa (NISN) *</label>
                      <input
                        type="text"
                        name="nisn"
                        value={formData.nisn}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                        placeholder="Contoh: 0061234567"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                        placeholder="Masukkan nama siswa"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kelas *</label>
                      <select
                        name="kelas"
                        value={formData.kelas}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                        required
                      >
                         <option value="">Pilih Kelas</option>
                         <option value="1">Kelas 1</option>
                         <option value="2">Kelas 2</option>
                         <option value="3">Kelas 3</option>
                         <option value="4">Kelas 4</option>
                         <option value="5">Kelas 5</option>
                         <option value="6">Kelas 6</option>
                      </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username Login *</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleFormChange}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                            placeholder="Username untuk login"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {isEditing ? 'Password Baru (Isi jika ingin mengubah)' : 'Password *'}
                        </label>
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                            placeholder={isEditing ? "Biarkan kosong jika tidak ingin mengganti password" : "Masukkan password"}
                            required={!isEditing}
                        />
                    </div>
                </div>
             </form>
        </div>
    );
  }

  // --- View: LIST ---
  return (
    <div className="space-y-6">
      <header className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">Admin - Siswa</p>
            <h1 className="text-2xl font-bold text-gray-800">Kelola siswa</h1>
            <p className="text-gray-600 mt-1">Lihat daftar siswa, tambah baru, atau nonaktifkan.</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah siswa
          </button>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input className="w-full bg-transparent outline-none text-sm" placeholder="Cari siswa..." />
        </div>
      </header>

      <section className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <div className="p-2 bg-green-100 rounded-lg text-green-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">List Data Siswa</h3>
            <p className="text-xs">Kelola data siswa terdaftar</p>
          </div>
        </div>

        {loadError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-2">
            {loadError}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 rounded-tl-xl">Siswa</th>
                <th className="px-4 py-3">Kelas</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3 text-right rounded-tr-xl">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={5}>
                    Memuat data siswa...
                  </td>
                </tr>
              )}
              {!isLoading && displayStudents.length === 0 && !loadError && (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={5}>
                    Belum ada siswa terdaftar.
                  </td>
                </tr>
              )}
              {displayStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{student.name}</div>
                    <div className="text-xs text-gray-500">NISN: {student.nisn}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-medium">Kelas {student.kelas}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{student.username}</td>
                  <td className="px-4 py-3 text-gray-600">{student.progress}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(student.original)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        title="Edit Siswa"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        title="Hapus Siswa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
