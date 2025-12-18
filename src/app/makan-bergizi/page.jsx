'use client';

import { 
  Clock,
  BookOpen,
  Heart,
  Star
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export default function MakanBergiziPage() {
  const stories = [
    {
      id: 1,
      title: "Petualangan Sayur Si Kecil",
      description: "Belajar tentang pentingnya makan sayur melalui petualangan seru di Taman Sayuran!",
      imageUrl: "https://images.unsplash.com/photo-1731321967818-30ab0026712a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdHMlMjB2ZWdldGFibGVzJTIwbnV0cml0aW9ufGVufDF8fHx8MTc2NjAyMDc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "5 menit",
      author: "Bu Siti",
      bgColor: "from-green-400 to-emerald-500"
    },
    {
      id: 2,
      title: "Teman-Teman Buah Ajaib",
      description: "Kenali berbagai buah-buahan dan manfaatnya untuk tubuh yang sehat!",
      imageUrl: "https://images.unsplash.com/photo-1542822083-887a14216085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGtpZHMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjYwMjA3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "6 menit",
      author: "Pak Ahmad",
      bgColor: "from-orange-400 to-red-500"
    },
    {
      id: 3,
      title: "Raja Protein dan Kerajaan Sehat",
      description: "Kisah seru tentang protein yang membuat tubuh kita kuat dan sehat!",
      imageUrl: "https://images.unsplash.com/photo-1734723303964-688ca25e8f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxhbmNlZCUyMG1lYWwlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjYwMjA3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "7 menit",
      author: "Bu Nur",
      bgColor: "from-amber-400 to-orange-500"
    },
    {
      id: 4,
      title: "Sarapan Pagi Si Pintar",
      description: "Mengapa sarapan pagi itu penting? Yuk temukan jawabannya!",
      imageUrl: "https://images.unsplash.com/photo-1627747776910-6d7e50f57c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVhdGluZyUyMGhlYWx0aHl8ZW58MXx8fHwxNzY2MDIwNzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "5 menit",
      author: "Pak Budi",
      bgColor: "from-yellow-400 to-amber-500"
    },
    {
      id: 5,
      title: "Air Putih Si Pahlawan",
      description: "Cerita tentang pentingnya minum air putih yang cukup setiap hari!",
      imageUrl: "https://images.unsplash.com/photo-1542822083-887a14216085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGtpZHMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjYwMjA3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "4 menit",
      author: "Bu Ani",
      bgColor: "from-blue-400 to-cyan-500"
    },
    {
      id: 6,
      title: "Makanan Sehat vs Junk Food",
      description: "Petualangan seru memilih makanan yang baik untuk tubuh kita!",
      imageUrl: "https://images.unsplash.com/photo-1731321967818-30ab0026712a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdHMlMjB2ZWdldGFibGVzJTIwbnV0cml0aW9ufGVufDF8fHx8MTc2NjAyMDc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: "8 menit",
      author: "Bu Siti",
      bgColor: "from-lime-400 to-green-500"
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
            src="/assets/makan-hero-mobile.png"
            alt="Makan Bergizi - Mobile"
            className="md:hidden w-full h-full object-cover"
          />
          {/* Desktop Background */}
          <img 
            src="/assets/makan-hero-desktop.png"
            alt="Makan Bergizi - Desktop"
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
                <h1 className="text-white font-dynapuff font-bold text-4xl md:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Makan Bergizi</h1>
              </div>
              <p className="text-2xl md:text-2xl text-white font-bold mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-relaxed">
                Mari belajar tentang makanan sehat dan bergizi! 
                <br className="hidden md:block" />
                Cerita-cerita seru tentang pentingnya makan sehat ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="mb-8">
          <h2 className="text-gray-800 mb-2">Cerita Makanan Sehat 🍎</h2>
          <p className="text-gray-600">Belajar hidup sehat dengan cerita yang menyenangkan!</p>
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
