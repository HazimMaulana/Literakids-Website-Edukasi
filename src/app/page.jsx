'use client';

import { 
  Sparkles,
  Star,
  Heart,
  Clock,
  BookOpen
} from 'lucide-react';
import { Navbar } from '../components/Navbar';

export default function Home({ userName = "Teman", onLogout }) {
  // All stories from all categories
  const allStories = [
    // Dongeng Peri (2 stories)
    {
      id: 1,
      title: "Peri Bunga dan Taman Ajaib",
      description: "Petualangan seru bersama peri bunga di taman yang penuh keajaiban!",
      imageUrl: "https://images.unsplash.com/photo-1674816795411-899170a81626?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWlyeSUyMHRhbGUlMjBjYXN0bGV8ZW58MXx8fHwxNzY1OTE3NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "7 menit",
      author: "Bu Siti",
      bgColor: "from-pink-400 to-purple-500",
      category: "Dongeng Peri"
    },
    {
      id: 2,
      title: "Kastil Pelangi",
      description: "Kisah tentang kastil indah di atas awan yang penuh warna!",
      imageUrl: "https://images.unsplash.com/photo-1674816795411-899170a81626?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWlyeSUyMHRhbGUlMjBjYXN0bGV8ZW58MXx8fHwxNzY1OTE3NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 menit",
      author: "Pak Ahmad",
      bgColor: "from-purple-400 to-pink-500",
      category: "Dongeng Peri"
    },
    // Petualangan Luar Angkasa (2 stories)
    {
      id: 3,
      title: "Roket ke Planet Merah",
      description: "Terbang ke Mars dan bertemu alien yang ramah!",
      imageUrl: "https://images.unsplash.com/photo-1759702132767-1e01a3dc6b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGFkdmVudHVyZSUyMGtpZHN8ZW58MXx8fHwxNzY1OTc5OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "8 menit",
      author: "Bu Nur",
      bgColor: "from-blue-400 to-indigo-500",
      category: "Luar Angkasa"
    },
    {
      id: 4,
      title: "Bintang-Bintang Berbisik",
      description: "Mendengarkan cerita dari bintang-bintang di galaksi jauh!",
      imageUrl: "https://images.unsplash.com/photo-1759702132767-1e01a3dc6b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGFkdmVudHVyZSUyMGtpZHN8ZW58MXx8fHwxNzY1OTc5OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "5 menit",
      author: "Pak Budi",
      bgColor: "from-indigo-400 to-purple-500",
      category: "Luar Angkasa"
    },
    // Sahabat Hewan (2 stories)
    {
      id: 5,
      title: "Kelinci dan Kura-Kura",
      description: "Kisah persahabatan antara kelinci cepat dan kura-kura bijak!",
      imageUrl: "https://images.unsplash.com/photo-1747184046952-8890127c598a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBmcmllbmRzJTIwY2FydG9vbnxlbnwxfHx8fDE3NjU5Nzk5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 menit",
      author: "Bu Ani",
      bgColor: "from-green-400 to-teal-500",
      category: "Sahabat Hewan"
    },
    {
      id: 6,
      title: "Gajah yang Baik Hati",
      description: "Gajah besar yang selalu membantu teman-teman kecilnya!",
      imageUrl: "https://images.unsplash.com/photo-1747184046952-8890127c598a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBmcmllbmRzJTIwY2FydG9vbnxlbnwxfHx8fDE3NjU5Nzk5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "7 menit",
      author: "Bu Siti",
      bgColor: "from-teal-400 to-cyan-500",
      category: "Sahabat Hewan"
    },
    // Pahlawan Super (2 stories)
    {
      id: 7,
      title: "Kapten Berani",
      description: "Pahlawan cilik yang melindungi kota dari monster jahat!",
      imageUrl: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBraWRzfGVufDF8fHx8MTc2NTk3OTkwMHww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "9 menit",
      author: "Pak Ahmad",
      bgColor: "from-red-400 to-orange-500",
      category: "Pahlawan Super"
    },
    {
      id: 8,
      title: "Tim Super Sekolah",
      description: "Anak-anak dengan kekuatan super bekerja sama!",
      imageUrl: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBraWRzfGVufDF8fHx8MTc2NTk3OTkwMHww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "8 menit",
      author: "Bu Nur",
      bgColor: "from-yellow-400 to-red-500",
      category: "Pahlawan Super"
    },
    // Hutan Ajaib (2 stories)
    {
      id: 9,
      title: "Pohon yang Bisa Bicara",
      description: "Pohon tua yang menceritakan kisah-kisah magis!",
      imageUrl: "https://images.unsplash.com/photo-1542425967-a2dd69fefbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBmb3Jlc3QlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzY1OTc5OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 menit",
      author: "Pak Budi",
      bgColor: "from-emerald-400 to-green-600",
      category: "Hutan Ajaib"
    },
    {
      id: 10,
      title: "Sungai Kristal",
      description: "Menemukan sungai ajaib yang airnya bisa menyembuhkan!",
      imageUrl: "https://images.unsplash.com/photo-1542425967-a2dd69fefbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBmb3Jlc3QlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzY1OTc5OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "7 menit",
      author: "Bu Ani",
      bgColor: "from-green-400 to-teal-600",
      category: "Hutan Ajaib"
    },
    // Zaman Dinosaurus (2 stories)
    {
      id: 11,
      title: "Dinosaurus Kecil yang Lucu",
      description: "Berteman dengan dinosaurus kecil yang suka bermain!",
      imageUrl: "https://images.unsplash.com/photo-1631504582707-8cd32292973a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5vc2F1ciUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NTk3OTkwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "8 menit",
      author: "Bu Siti",
      bgColor: "from-lime-400 to-green-500",
      category: "Dinosaurus"
    },
    {
      id: 12,
      title: "Telur Dinosaurus Ajaib",
      description: "Menemukan telur dinosaurus yang sangat istimewa!",
      imageUrl: "https://images.unsplash.com/photo-1631504582707-8cd32292973a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5vc2F1ciUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NTk3OTkwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "7 menit",
      author: "Pak Ahmad",
      bgColor: "from-yellow-400 to-lime-500",
      category: "Dinosaurus"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <Navbar onLogout={onLogout} />

      {/* Hero Section - Full Width with Background Image */}
      <div className="relative py-32 md:py-40 mb-12 overflow-hidden">
        {/* Background Images - Responsive */}
        <div className="absolute inset-0">
          {/* Mobile Background */}
          <img 
            src="/assets/dashboard-hero-mobile.png"
            alt="SDN 5 Taliwang - Mobile"
            className="md:hidden w-full h-full object-cover"
          />
          {/* Desktop Background */}
          <img 
            src="/assets/dashboard-hero-desktop.png"
            alt="SDN 5 Taliwang - Desktop"
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
                <h1 className="text-white font-dynapuff font-bold text-4xl md:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Halo, {userName}!</h1>
              </div>
              <p className="text-3xl md:text-2xl text-white mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-relaxed">
                Selamat datang di Perpustakaan Cerita SDN 5 Taliwang! 
                <br className="hidden md:block" />
                Pilih kategori favoritmu dan mulai petualangan seru! ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-800 mb-2">Cerita Pilihan Untukmu 📚</h2>
              <p className="text-gray-600">2 cerita menarik dari setiap kategori!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allStories.map((story) => (
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
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <span className="text-xs text-gray-700 font-semibold">{story.category}</span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Clock className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-gray-700 font-semibold">{story.duration}</span>
                  </div>
                </div>
                
                {/* Content with Glassmorphism */}
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
                      <Star className="w-4 h-4 text-gray-300" />
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

        {/* Fun Footer with Glassmorphism */}
        <div className="mt-12 relative rounded-3xl p-8 text-center shadow-2xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-teal-500 opacity-80"></div>
          {/* Glass overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/10 border border-white/20"></div>
          
          <div className="relative z-10">
            <p className="text-2xl text-white mb-3 drop-shadow-lg">
              ✨ Selamat Membaca dan Terus Berimajinasi! ✨
            </p>
            <p className="text-white/95 drop-shadow-md">
              Jangan lupa untuk membaca setiap hari ya! 📚
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
