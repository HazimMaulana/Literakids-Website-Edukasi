'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { StoryCard } from '../../components/StoryCard';
import { mapCeritaToCard, calculateTotalDuration } from '../../lib/ceritaMapper';

export default function Home() {
  const router = useRouter();
  const [displayStories, setDisplayStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('Teman');

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (isMounted) setUserName(user.nama || user.username || 'Teman');
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }

    const fetchAndCombineStories = async () => {
      try {
        // 1. Fetch stories from API
        const response = await fetch('/api/cerita', { cache: 'no-store' });
        let dbStories = [];
        
        if (response.ok) {
          const payload = await response.json();
          const items = Array.isArray(payload?.data) ? payload.data : [];
          
          // Filter only published stories (case insensitive and trimmed)
          dbStories = items
            .filter(item => {
              const status = item.status ? item.status.trim().toLowerCase() : '';
              return status === 'published';
            })
            .map(mapCeritaToCard);
        }

        // 2. Only use DB stories (Remove local dummy stories)
        const combined = [...dbStories];

        // 3. Limit to 6 stories
        const limitedStories = combined.slice(0, 6);

        if (isMounted) {
          setDisplayStories(limitedStories);
          setIsLoading(false);

          // 4. Calculate real durations for DB stories in background
          limitedStories.forEach(async (story) => {
             if (story.rawPages && story.rawPages.length > 0) {
                const realDuration = await calculateTotalDuration(story.rawPages);
                if (realDuration && isMounted) {
                   setDisplayStories(prev => {
                      const newStories = [...prev];
                      const targetIndex = newStories.findIndex(s => s.id === story.id);
                      if (targetIndex !== -1) {
                          newStories[targetIndex] = { ...newStories[targetIndex], duration: realDuration };
                      }
                      return newStories;
                   });
                }
             }
          });
        }
      } catch (error) {
        console.error("Failed to fetch stories:", error);
        if (isMounted) {
          // If API fails, show empty state instead of dummy data
          setDisplayStories([]);
          setIsLoading(false);
        }
      }
    };

    fetchAndCombineStories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar onLogout={handleLogout} />

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

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-500 font-dynapuff animate-pulse">Sedang memuat cerita seru...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
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
