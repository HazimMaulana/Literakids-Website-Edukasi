'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { StoryCard } from '../../components/StoryCard';
import { filterCeritaByCategory, mapCeritaToCard } from '../../lib/ceritaMapper';

export default function BermasyarakatPage() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchStories = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const response = await fetch('/api/cerita');
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload?.error || 'Gagal memuat cerita.');
        }
        const payload = await response.json();
        const items = Array.isArray(payload?.data) ? payload.data : [];
        const filtered = filterCeritaByCategory(items, 'Bermasyarakat');
        if (isMounted) {
          setStories(filtered.map(mapCeritaToCard));
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
          {isLoading && (
            <div className="col-span-full text-sm text-gray-500">Memuat cerita...</div>
          )}
          {!isLoading && loadError && (
            <div className="col-span-full text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-2">
              {loadError}
            </div>
          )}
          {!isLoading && !loadError && stories.length === 0 && (
            <div className="col-span-full text-sm text-gray-500">Belum ada cerita.</div>
          )}
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
