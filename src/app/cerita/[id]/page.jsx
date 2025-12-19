import { allStories } from '../../../lib/stories';
import { StoryReader } from '../../../components/StoryReader';
import { Navbar } from '../../../components/Navbar';
import Link from 'next/link';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';

export default async function StoryPage({ params }) {
  const { id } = await params;
  const story = allStories.find(s => s.id === parseInt(id));

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Cerita tidak ditemukan 😢</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors font-bold bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Daftar Cerita
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Info Sidebar */}
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
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Sinopsis</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {story.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story Reader Area */}
          <div className="lg:col-span-2">
            <StoryReader 
              pages={story.content || [{ text: story.description, image: story.imageUrl }]} 
              title={story.title} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
