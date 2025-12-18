'use client';

import { 
  Clock,
  BookOpen,
  Heart,
  Star
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function BeribadahPage() {
  const stories = [
    {
      id: 1,
      title: "Adzan Pagi yang Indah",
      description: "Belajar tentang keindahan adzan dan pentingnya sholat lima waktu!",
      imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 menit",
      author: "Bu Siti",
      bgColor: "from-green-400 to-teal-500"
    },
    {
      id: 2,
      title: "Wudhu yang Benar",
      description: "Yuk belajar cara berwudhu yang baik dan benar sesuai tuntunan!",
      imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "5 menit",
      author: "Pak Ahmad",
      bgColor: "from-blue-400 to-cyan-500"
    },
    {
      id: 3,
      title: "Doa Sehari-hari",
      description: "Mengenal doa-doa yang sering kita pakai dalam kehidupan sehari-hari!",
      imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "7 menit",
      author: "Bu Nur",
      bgColor: "from-purple-400 to-pink-500"
    },
    {
      id: 4,
      title: "Berbagi di Bulan Ramadhan",
      description: "Kisah indah tentang berbagi dan kepedulian di bulan penuh berkah!",
      imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "8 menit",
      author: "Pak Budi",
      bgColor: "from-yellow-400 to-orange-500"
    },
    {
      id: 5,
      title: "Sholat Berjamaah",
      description: "Belajar tentang keutamaan sholat berjamaah bersama teman-teman!",
      imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 menit",
      author: "Bu Ani",
      bgColor: "from-emerald-400 to-green-500"
    },
    {
      id: 6,
      title: "Rajin Mengaji",
      description: "Petualangan seru belajar membaca Al-Quran dengan lancar!",
      imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "7 menit",
      author: "Bu Siti",
      bgColor: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <Navbar />
      {/* Hero Section - Full Width with Background Image */}
      <div className="relative py-32 md:py-40 mb-12 overflow-hidden">
        {/* Background Images - Responsive */}
        <div className="absolute inset-0">
          {/* Mobile Background */}
          <img 
            src="/backgroundImages/heroSectionBeribadahMobile.png"
            alt="Beribadah - Mobile"
            className="md:hidden w-full h-full object-cover"
          />
          {/* Desktop Background */}
          <img 
            src="/backgroundImages/heroSectionBeribadahDesktop.png"
            alt="Beribadah - Desktop"
            className="hidden md:block w-full h-full object-cover"
          />
          {/* Dim overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/35 md:bg-black/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="relative z-10 py-8 md:py-12 flex justify-center md:justify-end">
            {/* Content - Text Only without background */}
            <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-right font-dynapuff">
              <div className="flex items-center justify-center md:justify-end gap-3 mb-6">
                <h1 className="text-white font-dynapuff font-bold text-4xl md:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Beribadah</h1>
              </div>
              <p className="text-2xl md:text-2xl text-white font-bold mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-relaxed">
                Mari belajar indahnya toleransi dan kerukunan antar umat beragama! 
                <br className="hidden md:block" />
                Saling menghormati dan menyayangi teman berbeda agama itu keren! 
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="mb-8">
          <h2 className="text-gray-800 mb-2">Cerita Beribadah 🕌</h2>
          <p className="text-gray-600">Belajar beribadah dengan cerita yang menyenangkan!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <button
              key={story.id}
              className="group relative bg-white/40 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer text-left border border-white/50 hover:border-green-300/70"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={story.imageUrl} 
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${story.bgColor} opacity-50 group-hover:opacity-60 transition-opacity`}></div>
                
                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Clock className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-gray-700 font-semibold">{story.duration}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 bg-white/60 backdrop-blur-md">
                <h3 className="text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-700 mb-4 text-sm line-clamp-2">
                  {story.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{story.author}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="bg-green-100/80 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm group-hover:bg-green-600 group-hover:text-white transition-colors border border-green-200/50 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Baca
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
