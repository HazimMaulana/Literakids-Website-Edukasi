import { LandingNavbar } from '../components/LandingNavbar';
import Link from 'next/link';
import { BookOpen, Star, Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-indigo-100 to-purple-200">
      <LandingNavbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Background Image - Made bolder and more visible */}
           <img 
            src="/assets/dashboard-hero-desktop.png"
            alt="Background"
            className="w-full h-full object-cover opacity-40 saturate-150"
          />
          {/* Gradient overlay to ensure text readability while keeping colors */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 drop-shadow-sm">
            Belajar Membaca Menjadi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 drop-shadow-sm">
              Lebih Menyenangkan
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-2xl text-slate-800 mb-10 font-bold">
            Literakids hadir untuk menemani anak-anak belajar membaca dengan cerita interaktif, 
            jurnal harian, dan aktivitas seru lainnya.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="/login"
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full font-extrabold text-xl shadow-[0_10px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_25px_rgba(249,115,22,0.5)] hover:scale-105 transition-all transform border-4 border-white/50"
            >
              Mulai Petualangan 🚀
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Blue Theme */}
            <div className="p-8 rounded-3xl bg-blue-50 border-4 border-blue-400 text-center hover:shadow-2xl transition-all hover:-translate-y-2 transform hover:rotate-1">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg border-4 border-blue-200">
                <BookOpen className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-blue-900 mb-3">Cerita Interaktif</h3>
              <p className="text-blue-800 text-lg font-medium">
                Berbagai koleksi cerita mendidik yang dilengkapi dengan gambar menarik.
              </p>
            </div>

            {/* Card 2 - Orange Theme */}
            <div className="p-8 rounded-3xl bg-orange-50 border-4 border-orange-400 text-center hover:shadow-2xl transition-all hover:-translate-y-2 transform hover:-rotate-1">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg border-4 border-orange-200">
                <Star className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-orange-900 mb-3">Jurnal Harian</h3>
              <p className="text-orange-800 text-lg font-medium">
                Catat aktivitas harianmu dan kembangkan kebiasaan menulis sejak dini.
              </p>
            </div>

            {/* Card 3 - Green Theme */}
            <div className="p-8 rounded-3xl bg-green-50 border-4 border-green-400 text-center hover:shadow-2xl transition-all hover:-translate-y-2 transform hover:rotate-1">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg border-4 border-green-200">
                <Heart className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-green-900 mb-3">Pendidikan Karakter</h3>
              <p className="text-green-800 text-lg font-medium">
                Belajar nilai-nilai kebaikan melalui cerita dan aktivitas yang positif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
