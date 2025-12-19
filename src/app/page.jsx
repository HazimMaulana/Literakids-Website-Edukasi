'use client';

import { Navbar } from '../components/Navbar';
import { StoryCard } from '../components/StoryCard';
import { allStories } from '../lib/stories';

export default function Home({ userName = "Teman", onLogout }) {


  return (
    <div className="min-h-screen bg-blue-100">
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
          <div className="absolute inset-0 bg-black/40"></div>
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

      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Stories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-800 mb-2 font-dynapuff text-3xl font-semibold">Pilih Cerita Untukmu Hari Ini! 📚</h2>
              <p className="text-gray-600 font-dynapuff">kamu bisa pilih cerita favoritmu!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allStories.map((story) => (
              <StoryCard key={story.id} story={story} />
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
