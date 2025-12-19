'use client';

import { useState } from 'react';
import {
  BookOpen,
  Edit3,
  FileText,
  Headphones,
  Image as ImageIcon,
  Layers,
  Plus,
  Search,
  Trash2,
  Upload,
  ArrowLeft,
  Save,
  X,
  CheckCircle2
} from 'lucide-react';

const initialStories = [
  {
    id: 1,
    title: 'Petualangan Sungai Pelangi',
    category: 'Bermasyarakat',
    likes: 342,
    reads: 1280,
    completion: 94,
    cover: '/assets/dashboard-hero-mobile.png',
    pages: 12,
    audio: 12,
    images: 12,
    status: 'Published',
  },
  {
    id: 2,
    title: 'Menjaga Kebersihan Sekolah',
    category: 'Beribadah',
    likes: 298,
    reads: 1043,
    completion: 89,
    cover: '/assets/bermasyarakat-hero-mobile.png',
    pages: 8,
    audio: 8,
    images: 7,
    status: 'Draft',
  },
  {
    id: 3,
    title: 'Kebun Sayur Ceria',
    category: 'Makan Bergizi',
    likes: 251,
    reads: 910,
    completion: 87,
    cover: '/assets/dashboard-hero-desktop.png',
    pages: 10,
    audio: 10,
    images: 10,
    status: 'Published',
  },
];

export default function AdminCeritaPage() {
  const [view, setView] = useState('list'); // 'list', 'form'
  const [isEditing, setIsEditing] = useState(false);
  const [stories, setStories] = useState(initialStories);
  const [formData, setFormData] = useState(null);

  const handleCreate = () => {
    setIsEditing(false);
    setFormData({
      title: '',
      category: 'Bermasyarakat',
      status: 'Draft',
      pages: 0,
      cover: ''
    });
    setView('form');
  };

  const handleEdit = (story) => {
    setIsEditing(true);
    setFormData(story);
    setView('form');
  };

  const handleBack = () => {
    setView('list');
    setFormData(null);
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
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm font-medium shadow-lg flex items-center gap-2">
              <Save className="w-4 h-4" />
              Simpan
            </button>
         </header>

         {/* Form Content */}
         <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Cerita</label>
                  <input 
                    type="text" 
                    defaultValue={formData?.title}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                    placeholder="Masukkan judul cerita..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select 
                    defaultValue={formData?.category}
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
                    defaultValue={formData?.status}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-400 outline-none bg-white/50"
                  >
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Cover Cerita</label>
                 <div className="border-2 border-dashed border-gray-300 rounded-2xl h-64 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
                    {formData?.cover ? (
                        <img src={formData.cover} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <ImageIcon className="w-12 h-12 mb-2" />
                            <span className="text-sm">Klik untuk upload cover</span>
                        </>
                    )}
                 </div>
              </div>
            </div>
            
            {/* Page Structure Mockup */}
            <div className="mt-8 pt-8 border-t border-gray-100">
               <h3 className="text-lg font-bold text-gray-800 mb-4">Struktur Halaman</h3>
               <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500 border border-gray-200 border-dashed">
                  <Layers className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>Konten halaman (Teks, Audio, Gambar) akan dikelola di sini.</p>
                  <button className="mt-4 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-blue-600 shadow-sm hover:bg-gray-50">
                    + Tambah Halaman
                  </button>
               </div>
            </div>
         </div>
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
          <div className="grid md:grid-cols-3 gap-4">
            {stories.map((story) => (
              <div
                key={story.id}
                className="rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-36 bg-gray-100 relative group">
                  <img src={story.cover} alt={story.title} className="w-full h-full object-cover" />
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




