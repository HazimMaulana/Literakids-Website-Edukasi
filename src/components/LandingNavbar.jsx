'use client';

import Link from 'next/link';
import { LogIn } from 'lucide-react';

export function LandingNavbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center bg-white/40">
                <img 
                  src="/assets/logoLiterakidz.png" 
                  alt="Literakids" 
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-full transition-all shadow-lg border border-white/20 font-semibold"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
