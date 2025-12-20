'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Edit3,
  FileText,
  Headphones,
  Image as ImageIcon,
  Search,
  Trash2,
  ArrowLeft,
  Save
} from 'lucide-react';



export default function AdminCeritaPage() {
  const [view, setView] = useState('list'); // 'list', 'form'
  const [isEditing, setIsEditing] = useState(false);
  const [stories, setStories] = useState([]);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchStories = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const response = await fetch('/api/cerita');
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload?.error || 'Gagal memuat data cerita.');
        }
        const payload = await response.json();
        if (isMounted) {
          setStories(Array.isArray(payload?.data) ? payload.data : []);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error.message);
          setStories([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStories();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayStories = useMemo(
    () =>
      stories.map((story) => {
        const halaman = Array.isArray(story.halaman) ? story.halaman : [];
        const totalImages = halaman.filter((page) => page?.gambarUrl).length;
        const totalAudio = halaman.filter((page) => page?.audioUrl).length;
        return {
          id: story._id,
          title: story.judul,
          category: story.kategori || 'Umum',
          status: story.status || 'Draft',
          cover: story.coverUrl || '',
          pages: halaman.length,
          images: totalImages,
          audio: totalAudio,
        };
      }),
    [stories]
  );

  const handleCreate = () => {
    setIsEditing(false);
    setFormData({
      judul: '',
      kategori: 'Bermasyarakat',
      status: 'Draft',
      coverUrl: '',
      halaman: [
        {
          gambarUrl: '',
          teks: '',
          audioUrl: '',
        },
      ],
    });
    setView('form');
  };

  const handleEdit = (story) => {
    setIsEditing(true);
    const target = stories.find((item) => item._id === story.id) || story;
    setFormData({
      id: target._id || story.id,
      judul: target.judul || story.title || '',
      kategori: target.kategori || story.category || 'Bermasyarakat',
      status: target.status || story.status || 'Draft',
      coverUrl: target.coverUrl || story.cover || '',
      halaman:
        Array.isArray(target.halaman) && target.halaman.length > 0
          ? target.halaman
          : [
              {
                gambarUrl: '',
                teks: '',
                audioUrl: '',
              },
            ],
    });
    setView('form');
  };

  const handleBack = () => {
    setView('list');
    setFormData(null);
    setSubmitError('');
    setUploadError('');
  };

  const uploadFile = async (file, folder) => {
    setUploadError('');
    setUploadingCount((prev) => prev + 1);
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || 'Gagal upload file.');
      }

      const payload = await response.json();
      return payload.publicUrl || payload.url || payload.path || '';
    } catch (error) {
      setUploadError(error.message);
      throw error;
    } finally {
      setUploadingCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverFile = async (file) => {
    const url = await uploadFile(file, 'covers');
    setFormData((prev) => ({ ...prev, coverUrl: url }));
  };

  const handleCoverChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await handleCoverFile(file);
    event.target.value = '';
  };

  const handleCoverDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await handleCoverFile(file);
  };

  const handleCoverDragOver = (event) => {
    event.preventDefault();
  };

  const handlePageChange = (index, field, value) => {
    setFormData((prev) => {
      const nextPages = [...prev.halaman];
      nextPages[index] = { ...nextPages[index], [field]: value };
      return { ...prev, halaman: nextPages };
    });
  };

  const handlePageFile = async (index, field, file, folder) => {
    const url = await uploadFile(file, folder);
    setFormData((prev) => {
      const nextPages = [...prev.halaman];
      nextPages[index] = { ...nextPages[index], [field]: url };
      return { ...prev, halaman: nextPages };
    });
  };

  const handlePageFileChange = (index, field, folder) => async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await handlePageFile(index, field, file, folder);
    event.target.value = '';
  };

  const handlePageDrop = (index, field, folder) => async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await handlePageFile(index, field, file, folder);
  };

  const handlePageDragOver = (event) => {
    event.preventDefault();
  };

  const handleAddPage = () => {
    setFormData((prev) => ({
      ...prev,
      halaman: [
        ...prev.halaman,
        { gambarUrl: '', teks: '', audioUrl: '' },
      ],
    }));
  };

  const handleRemovePage = (index) => {
    setFormData((prev) => ({
      ...prev,
      halaman: prev.halaman.filter((_, pageIndex) => pageIndex !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const isUpdate = isEditing && formData?.id;
      const response = await fetch(
        isUpdate ? `/api/cerita/${formData.id}` : '/api/cerita',
        {
          method: isUpdate ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || 'Gagal menyimpan cerita.');
      }

      const payload = await response.json();
      setStories((prev) => {
        if (isUpdate) {
          return prev.map((item) =>
            item._id === payload.data._id ? payload.data : item
          );
        }
        return [payload.data, ...prev];
      });
      setView('list');
      setFormData(null);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (view === 'form') {
    return (
      <div className="space-y-6">
         {/* Form Header */}
         <header className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit Cerita' : 'Tambah Cerita Baru'}</h1>
                <p className="text-gray-600 text-sm">Isi detail cerita di bawah ini.</p>
              </div>
            </div>
            <button
              className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm font-medium shadow-lg flex items-center gap-2 disabled:opacity-70"
              type="submit"
              form="cerita-form"
              disabled={isSubmitting || uploadingCount > 0}
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Menyimpan...' : uploadingCount > 0 ? 'Mengupload...' : 'Simpan'}
            </button>
         </header>

         {/* Form Content */}
         <form
           id="cerita-form"
           className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-8"
           onSubmit={handleSubmit}
         >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Cerita</label>
                  <input 
                    type="text" 
                    name="judul"
                    value={formData?.judul || ''}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                    placeholder="Masukkan judul cerita..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select 
                    name="kategori"
                    value={formData?.kategori || 'Bermasyarakat'}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                  >
                    <option>Bermasyarakat</option>
                    <option>Beribadah</option>
                    <option>Makan Bergizi</option>
                  </select>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData?.status || 'Draft'}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                  >
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Cover Cerita</label>
                 <label
                   className="border-2 border-dashed border-gray-300 rounded-2xl h-64 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden"
                   onDragOver={handleCoverDragOver}
                   onDrop={handleCoverDrop}
                 >
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleCoverChange}
                    />
                    {formData?.coverUrl ? (
                        <img src={formData.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <ImageIcon className="w-12 h-12 mb-2" />
                            <span className="text-sm">Klik atau drag & drop untuk upload cover</span>
                        </>
                    )}
                 </label>
                 {formData?.coverUrl && (
                   <p className="text-xs text-gray-500 break-all">{formData.coverUrl}</p>
                 )}
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
               <h3 className="text-lg font-bold text-gray-800 mb-4">Struktur Halaman</h3>
               <div className="space-y-4">
                  {formData?.halaman?.map((page, index) => (
                    <div
                      key={`page-${index}`}
                      className="bg-gray-50 rounded-2xl p-5 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold text-gray-700">Halaman {index + 1}</p>
                        <button
                          type="button"
                          onClick={() => handleRemovePage(index)}
                          className="text-xs text-red-500 hover:text-red-600"
                          disabled={formData?.halaman?.length === 1}
                        >
                          Hapus
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div
                          className="border border-dashed border-gray-300 rounded-xl p-4 bg-white/70"
                          onDragOver={handlePageDragOver}
                          onDrop={handlePageDrop(index, 'gambarUrl', 'halaman')}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm text-blue-600 shadow-sm hover:bg-gray-50 cursor-pointer">
                              <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handlePageFileChange(index, 'gambarUrl', 'halaman')}
                              />
                              Upload gambar
                            </label>
                            {page.gambarUrl ? (
                              <span className="text-xs text-gray-500">Gambar tersimpan</span>
                            ) : (
                              <span className="text-xs text-gray-400">Klik atau drop gambar</span>
                            )}
                          </div>
                          {page.gambarUrl && (
                            <p className="mt-2 text-xs text-gray-500 break-all">{page.gambarUrl}</p>
                          )}
                        </div>
                        <textarea
                          value={page.teks}
                          onChange={(event) => handlePageChange(index, 'teks', event.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/70 min-h-[110px]"
                          placeholder="Teks cerita..."
                          required
                        />
                        <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-white/70">
                          <div className="flex items-center justify-between gap-3">
                            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm text-blue-600 shadow-sm hover:bg-gray-50 cursor-pointer">
                              <input
                                type="file"
                                accept="audio/*"
                                className="sr-only"
                                onChange={handlePageFileChange(index, 'audioUrl', 'audio')}
                              />
                              Upload audio
                            </label>
                            {page.audioUrl ? (
                              <span className="text-xs text-gray-500">Audio tersimpan</span>
                            ) : (
                              <span className="text-xs text-gray-400">Pilih file mp3</span>
                            )}
                          </div>
                          {page.audioUrl && (
                            <p className="mt-2 text-xs text-gray-500 break-all">{page.audioUrl}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddPage}
                    className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-blue-600 shadow-sm hover:bg-gray-50"
                  >
                    + Tambah Halaman
                  </button>
               </div>
            </div>
            {uploadError && (
              <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-2">
                {uploadError}
              </div>
            )}
            {submitError && (
              <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-2">
                {submitError}
              </div>
            )}
         </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <header className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Admin - Cerita</p>
              <h1 className="text-2xl font-bold text-gray-800">Kelola cerita</h1>
              <p className="text-gray-600 mt-1">Pantau cerita favorit, tambah cerita baru, dan kelola konten per halaman.</p>
            </div>
            <button 
              onClick={handleCreate}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm shadow-lg hover:shadow-xl transition-all"
            >
              Tambah cerita
            </button>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
            <Search className="w-4 h-4 text-gray-400" />
            <input className="w-full bg-transparent outline-none text-sm" placeholder="Cari cerita..." />
          </div>
        </header>

        <section className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Cerita Tersedia</h3>
                  <p className="text-xs text-gray-500">Daftar semua cerita yang telah dibuat</p>
                </div>
             </div>
          </div>
          {loadError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-2">
              {loadError}
            </div>
          )}
          <div className="grid md:grid-cols-3 gap-4">
            {isLoading && (
              <div className="col-span-full text-sm text-gray-500">Memuat data cerita...</div>
            )}
            {!isLoading && displayStories.length === 0 && !loadError && (
              <div className="col-span-full text-sm text-gray-500">Belum ada cerita.</div>
            )}
            {displayStories.map((story) => (
              <div
                key={story.id}
                className="rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-36 bg-gray-100 relative group">
                  {story.cover ? (
                    <img src={story.cover} alt={story.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Tidak ada cover
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button 
                        onClick={() => handleEdit(story)}
                        className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-xs font-medium shadow-lg"
                     >
                        Edit Tampilan
                     </button>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{story.category}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${story.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {story.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 line-clamp-1">{story.title}</h4>
                  
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 pt-1">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {story.pages} Hal
                      </div>
                      <div className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" /> {story.images} Img
                      </div>
                      <div className="flex items-center gap-1">
                        <Headphones className="w-3 h-3" /> {story.audio} Aud
                      </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-2">
                    <button 
                      onClick={() => handleEdit(story)}
                      className="text-sm text-blue-600 flex items-center gap-2 hover:text-blue-700"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="text-sm text-red-500 flex items-center gap-2 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}
