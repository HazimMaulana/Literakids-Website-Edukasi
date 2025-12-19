import Link from 'next/link';
import { 
  Sparkles,
  Star,
  Heart,
  Clock,
  BookOpen
} from 'lucide-react';

export function StoryCard({ story }) {
  return (
    <Link href={`/cerita/${story.id}`} className="block">
      <div
        className="group relative bg-white backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer text-left border border-white/50 hover:border-green-300/70 h-full"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${story.bgColor} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
          <img 
            src={story.imageUrl} 
            alt={story.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-lg flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-500" />
            {story.duration}
          </div>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-purple-600 shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {story.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors font-dynapuff line-clamp-1">
            {story.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-medium">
            {story.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border border-blue-200">
                <span className="text-xs">👤</span>
              </div>
              {story.author}
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-pink-50 text-pink-400 hover:bg-pink-100 hover:text-pink-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-yellow-50 text-yellow-400 hover:bg-yellow-100 hover:text-yellow-500 transition-colors">
                <Star className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          {/* Read Button that appears on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl font-bold text-center shadow-lg flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Baca Sekarang
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
