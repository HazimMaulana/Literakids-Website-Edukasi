'use client';

import { 
  Clock,
  BookOpen,
  Heart,
  Star
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function BermasyarakatPage() {
  const stories = [
    {
      id: 1,
      title: "Gotong Royong di Kampung",
      description: "Belajar tentang pentingnya bekerja sama membersihkan lingkungan bersama!",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 menit",
      author: "Bu Siti",
      bgColor: "from-green-400 to-teal-500"
    },
    {
      id: 2,
      title: "Menanam Pohon Bersama",
      description: "Petualangan seru menanam pohon untuk membuat lingkungan lebih hijau!",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "7 menit",
      author: "Pak Ahmad",
      bgColor: "from-lime-400 to-green-500"
    },
    {
      id: 3,
      title: "Membantu Tetangga",
      description: "Kisah indah tentang membantu tetangga yang membutuhkan bantuan!",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "5 menit",
      author: "Bu Nur",
      bgColor: "from-blue-400 to-cyan-500"
    },
    {
      id: 4,
      title: "Berbagi dengan Teman",
      description: "Belajar tentang kebahagiaan berbagi dengan teman-teman!",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 menit",
      author: "Pak Budi",
      bgColor: "from-yellow-400 to-orange-500"
    },
    {
      id: 5,
      title: "Kerja Bakti Sekolah",
      description: "Seru-seruan bersih-bersih sekolah bersama teman-teman sekelas!",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "5 menit",
      author: "Bu Ani",
      bgColor: "from-purple-400 to-pink-500"
    },
    {
      id: 6,
      title: "Kunjungan ke Posyandu",
      description: "Belajar pentingnya menjaga kesehatan dengan rutin ke Posyandu!",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBraWRzfGVufDF8fHx8MTc2NjAyMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 menit",
      author: "Bu Siti",
      bgColor: "from-orange-400 to-red-500"
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
            src="/assets/bermasyarakat-hero-mobile.png"
            alt="Bermasyarakat - Mobile"
            className="md:hidden w-full h-full object-cover"
          />
          {/* Desktop Background */}
          <img 
            src="/backgroundImages/heroSectionBermasyarakatDesktop.png"
            alt="Bermasyarakat - Desktop"
            className="hidden md:block w-full h-full object-cover"
          />
          {/* Dim overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/35 md:bg-black/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="relative z-10 py-8 md:py-12 flex justify-center md:justify-start">
            {/* Content - Text Only without background */}
            <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left font-dynapuff">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <h1 className="text-white font-dynapuff font-bold text-4xl md:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Bermasyarakat</h1>
              </div>
              <p className="text-2xl md:text-2xl text-white font-bold mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-relaxed">
                Mari belajar tentang kehidupan bermasyarakat! 
                <br className="hidden md:block" />
                Cerita-cerita seru tentang gotong royong dan kepedulian ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="mb-8">
          <h2 className="text-gray-800 mb-2">Cerita Bermasyarakat 👥</h2>
          <p className="text-gray-600">Belajar hidup rukun dengan cerita yang menyenangkan!</p>
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
