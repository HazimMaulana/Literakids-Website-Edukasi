import { 
  LogOut,
  Sparkles,
  Star,
  Heart,
  PiggyBank,
  Smile,
  Landmark,
  Menu,
  X,
  Church,
  Apple,
  Users
} from 'lucide-react';
import { useState } from 'react';
import imgStudent from "figma:asset/3ea130afdc3d01ab39f1960f277c82b7fa23758b.png";
import imgHeroMobile from "figma:asset/7782b58360c38fdc4e21dfcd79bc37e0e38eb84e.png";
import imgHeroDesktop from "figma:asset/ec661e142b8c05937c49e4e93d6517e0b22e3cc8.png";

interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

interface StoryCategory {
  id: number;
  title: string;
  description: string;
  emoji: string;
  imageUrl: string;
  bgColor: string;
  storyCount: number;
}

export function Dashboard({ userName, onLogout }: DashboardProps) {
  const categories: StoryCategory[] = [
    {
      id: 1,
      title: "Dongeng Peri",
      description: "Petualangan ajaib di negeri dongeng penuh keajaiban!",
      emoji: "🧚‍♀️",
      imageUrl: "https://images.unsplash.com/photo-1674816795411-899170a81626?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWlyeSUyMHRhbGUlMjBjYXN0bGV8ZW58MXx8fHwxNzY1OTE3NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-green-400 to-emerald-500",
      storyCount: 12
    },
    {
      id: 2,
      title: "Petualangan Luar Angkasa",
      description: "Terbang ke bintang-bintang dan planet yang menakjubkan!",
      emoji: "🚀",
      imageUrl: "https://images.unsplash.com/photo-1759702132767-1e01a3dc6b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGFkdmVudHVyZSUyMGtpZHN8ZW58MXx8fHwxNzY1OTc5OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-blue-400 to-sky-500",
      storyCount: 10
    },
    {
      id: 3,
      title: "Sahabat Hewan",
      description: "Kisah seru tentang hewan-hewan lucu dan menggemaskan!",
      emoji: "🐾",
      imageUrl: "https://images.unsplash.com/photo-1747184046952-8890127c598a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBmcmllbmRzJTIwY2FydG9vbnxlbnwxfHx8fDE3NjU5Nzk5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-green-400 to-teal-500",
      storyCount: 15
    },
    {
      id: 4,
      title: "Pahlawan Super",
      description: "Cerita seru tentang keberanian dan persahabatan!",
      emoji: "🦸",
      imageUrl: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBraWRzfGVufDF8fHx8MTc2NTk3OTkwMHww&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-yellow-400 to-amber-500",
      storyCount: 8
    },
    {
      id: 5,
      title: "Hutan Ajaib",
      description: "Jelajahi hutan penuh misteri dan teman-teman baru!",
      emoji: "🌳",
      imageUrl: "https://images.unsplash.com/photo-1542425967-a2dd69fefbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBmb3Jlc3QlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzY1OTc5OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-emerald-400 to-green-600",
      storyCount: 11
    },
    {
      id: 6,
      title: "Zaman Dinosaurus",
      description: "Bertemu dengan dinosaurus yang ramah dan seru!",
      emoji: "🦕",
      imageUrl: "https://images.unsplash.com/photo-1631504582707-8cd32292973a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5vc2F1ciUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NTk3OTkwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-lime-400 to-green-500",
      storyCount: 9
    }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      {/* Floating Header - Overlay on Hero */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/30 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <h2 className="text-white drop-shadow-lg">Perpustakaan Cerita</h2>
                  <p className="text-sm text-white/90 drop-shadow-md">SDN 5 Taliwang</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="hidden lg:flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white hover:text-green-600 transition-all border border-white/30 shadow-sm">
                  <Church className="w-4 h-4" />
                  <span>Beribadah</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white hover:text-yellow-600 transition-all border border-white/30 shadow-sm">
                  <Apple className="w-4 h-4" />
                  <span>Makan Bergizi</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white hover:text-blue-600 transition-all border border-white/30 shadow-sm">
                  <Users className="w-4 h-4" />
                  <span>Bermasyarakat</span>
                </button>
              </nav>
              
              <div className="flex items-center gap-3">
                {/* Burger Menu Button - Mobile Only */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white transition-all border border-white/30 shadow-sm"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm hover:bg-black/80 text-white rounded-full transition-colors shadow-lg border border-gray-700/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Keluar</span>
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu Dropdown */}
            {isMenuOpen && (
              <div className="lg:hidden mt-4 p-4 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl">
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 bg-white/40 backdrop-blur-sm text-white rounded-xl hover:bg-white/60 hover:text-green-700 transition-all border border-white/30"
                  >
                    <Church className="w-5 h-5" />
                    <span>Beribadah</span>
                  </button>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 bg-white/40 backdrop-blur-sm text-white rounded-xl hover:bg-white/60 hover:text-yellow-700 transition-all border border-white/30"
                  >
                    <Apple className="w-5 h-5" />
                    <span>Makan Bergizi</span>
                  </button>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 bg-white/40 backdrop-blur-sm text-white rounded-xl hover:bg-white/60 hover:text-blue-700 transition-all border border-white/30"
                  >
                    <Users className="w-5 h-5" />
                    <span>Bermasyarakat</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section - Full Width with Background Image */}
      <div className="relative py-32 md:py-40 mb-12 overflow-hidden">
        {/* Background Images - Responsive */}
        <div className="absolute inset-0">
          {/* Mobile Background */}
          <img 
            src={imgHeroMobile}
            alt="SDN 5 Taliwang - Mobile"
            className="md:hidden w-full h-full object-cover"
          />
          {/* Desktop Background */}
          <img 
            src={imgHeroDesktop}
            alt="SDN 5 Taliwang - Desktop"
            className="hidden md:block w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="relative z-10 py-8 md:py-12">
            {/* Content - Text Only without background */}
            <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <span className="text-5xl md:text-6xl animate-bounce drop-shadow-2xl">👋</span>
                <h1 className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Halo, {userName}!</h1>
              </div>
              <p className="text-xl md:text-3xl text-white mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-relaxed">
                Selamat datang di Perpustakaan Cerita SDN 5 Taliwang! 
                <br className="hidden md:block" />
                Pilih kategori favoritmu dan mulai petualangan seru! ✨
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-white drop-shadow-lg" />
                  <span className="text-lg text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">65 Cerita</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
                  <span className="text-lg text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">6 Kategori</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-800 mb-2">Pilih Kategori Cerita 📖</h2>
              <p className="text-gray-600">Klik kategori untuk melihat cerita-cerita seru!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                className="group relative bg-white/40 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer text-left border border-white/50 hover:border-green-300/70"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={category.imageUrl} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.bgColor} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                  <div className="absolute top-4 right-4 text-5xl drop-shadow-lg">
                    {category.emoji}
                  </div>
                </div>
                
                {/* Content with Glassmorphism */}
                <div className="p-6 bg-white/60 backdrop-blur-md">
                  <h3 className="text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-700 mb-4 text-sm">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-semibold">
                      {category.storyCount} cerita
                    </span>
                    <div className="bg-green-100/80 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm group-hover:bg-green-600 group-hover:text-white transition-colors border border-green-200/50">
                      Lihat Cerita →
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