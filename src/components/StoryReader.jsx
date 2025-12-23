'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Check, Book, X } from 'lucide-react';

export function StoryReader({ pages, title, onFinish, glosarium }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showGlossary, setShowGlossary] = useState(false);
  const currentAudio = pages[currentPage]?.audio;
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch || touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontal && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        nextPage();
      } else {
        prevPage();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 relative flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 overflow-hidden flex-1">
             <h2 className="font-dynapuff text-xl font-bold truncate">{title}</h2>
             {glosarium && glosarium.length > 0 && (
                <button 
                  onClick={() => setShowGlossary(true)}
                  className="bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition-colors shrink-0"
                  title="Lihat Glosarium"
                >
                   <Book className="w-4 h-4" />
                </button>
             )}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium bg-white/20 px-3 py-1 rounded-full shrink-0">
            <BookOpen className="w-4 h-4" />
            <span>Halaman {currentPage + 1} / {pages.length}</span>
          </div>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 p-6 md:p-8 relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-2xl mb-6 animate-fadeIn">
              <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white/50 bg-white/70 flex items-center justify-center">
                <img 
                  src={pages[currentPage].image} 
                  alt={`Ilustrasi halaman ${currentPage + 1}`}
                  className="w-full h-auto max-h-[420px] object-contain"
                />
              </div>
            </div>
            {currentAudio ? (
              <div className="w-full max-w-xl mb-6 animate-fadeIn">
                <audio
                  className="w-full"
                  controls
                  src={currentAudio}
                >
                  Browser kamu tidak mendukung audio.
                </audio>
              </div>
            ) : null}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 font-medium leading-relaxed animate-fadeIn max-w-3xl">
              {pages[currentPage].text}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 flex justify-between items-center bg-gray-50/50 border-t border-gray-100">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              currentPage === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-blue-600 shadow-md hover:shadow-lg hover:bg-blue-50 border border-blue-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden md:inline">Sebelumnya</span>
          </button>

          {/* Progress Dots */}
          <div className="flex gap-2">
            {pages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage ? 'w-6 bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={currentPage === pages.length - 1 && onFinish ? onFinish : nextPage}
            disabled={!onFinish && currentPage === pages.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              (!onFinish && currentPage === pages.length - 1)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg hover:opacity-90'
            }`}
          >
            <span className="hidden md:inline">{currentPage === pages.length - 1 && onFinish ? 'Selesai' : 'Selanjutnya'}</span>
            {currentPage === pages.length - 1 && onFinish ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {showGlossary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Book className="w-5 h-5" /> Glosarium
              </h3>
              <button onClick={() => setShowGlossary(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
               <div className="space-y-4">
                  {glosarium.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <h4 className="font-bold text-blue-600 mb-1">{item.kata}</h4>
                       <p className="text-gray-700 text-sm leading-relaxed">{item.arti}</p>
                    </div>
                  ))}
               </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
               <button 
                 onClick={() => setShowGlossary(false)}
                 className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg"
               >
                 Tutup
               </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
