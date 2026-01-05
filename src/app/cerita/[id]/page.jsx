'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { StoryReader } from '../../../components/StoryReader';
import { Navbar } from '../../../components/Navbar';
import { JournalForm } from '../../../components/JournalForm';
import { allStories } from '../../../lib/stories';
import { mapCeritaToStory, calculateTotalDuration } from '../../../lib/ceritaMapper';

export default function StoryPage() {
  const params = useParams();
  const id = params?.id;
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showJournal, setShowJournal] = useState(false);
  const [journalSubmitted, setJournalSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const isObjectId = typeof id === 'string' && /^[a-f0-9]{24}$/i.test(id);
    if (!isObjectId) {
      const numericId = Number.parseInt(id, 10);
      const localStory = allStories.find((item) => item.id === numericId);
      if (isMounted) {
        setStory(localStory || null);
        setIsLoading(false);
        setLoadError(localStory ? '' : 'Cerita tidak ditemukan.');

        if (localStory && localStory.content) {
          calculateTotalDuration(localStory.content).then(realDuration => {
              if (realDuration && isMounted) {
                  setStory(prev => prev ? ({ ...prev, duration: realDuration }) : null);
              }
          });
        }
      }
      return () => {
        isMounted = false;
      };
    }

    const fetchStory = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const response = await fetch(`/api/cerita/${id}`);
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload?.error || 'Cerita tidak ditemukan.');
        }
        const payload = await response.json();
        if (payload?.data?.status && payload.data.status !== 'Published') {
          throw new Error('Cerita belum dipublikasikan.');
        }
        const mapped = mapCeritaToStory(payload?.data);
        
        if (mapped.content && mapped.content.length > 0) {
           const realDuration = await calculateTotalDuration(mapped.content);
           if (realDuration) {
             mapped.duration = realDuration;
           }
        }

        if (isMounted) {
          setStory(mapped);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error.message);
          setStory(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStory();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">Memuat cerita...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {loadError || 'Cerita tidak ditemukan'}
          </h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  if (journalSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
           <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 animate-fadeIn">
             <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
             <h2 className="text-3xl font-bold font-dynapuff text-green-600 mb-4">Terima Kasih!</h2>
             <p className="text-xl text-gray-700 mb-8">Jurnal kamu sudah disimpan. Guru akan membacanya nanti.</p>
             <Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg">
               Kembali ke Beranda
             </Link>
           </div>
        </div>
      </div>
    );
  }

  if (showJournal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
           <JournalForm 
              storyId={story._id || story.id}
              storyTitle={story.title}
              onCancel={() => setShowJournal(false)}
              onSuccess={() => setJournalSubmitted(true)}
           />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors font-bold bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Daftar Cerita
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 sticky top-24">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative shadow-lg">
                <img 
                  src={story.imageUrl} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${story.bgColor} opacity-40`}></div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-dynapuff leading-tight">
                {story.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {story.duration}
                </div>
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  {story.category}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Penulis</h3>
                  <p className="text-gray-800 font-medium">{story.author}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Glosarium</h3>
                  {story.glosarium && story.glosarium.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {story.glosarium.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-700 bg-white/50 p-2 rounded-lg">
                          <span className="font-bold text-blue-600 block">{item.kata}</span>
                          <span className="text-gray-600">{item.arti}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Tidak ada glosarium.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <StoryReader 
              pages={story.content} 
              title={story.title} 
              glosarium={story.glosarium}
              onFinish={() => setShowJournal(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
