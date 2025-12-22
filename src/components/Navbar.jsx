'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LogOut,
  Menu,
  X,
  Church,
  Apple,
  Users,
} from 'lucide-react';

export function Navbar({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isStoryPage = pathname?.startsWith('/cerita');
  const textColorClass = isStoryPage ? 'text-gray-800' : 'text-white';
  const buttonBgClass = isStoryPage ? 'bg-white/50 hover:bg-white/70' : 'bg-white/30 hover:bg-white/50';

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className=" backdrop-blur-sm px-4 py-2 rounded-full shadow-lg  flex items-center">
                <img 
                  src="/assets/logoLiterakidz.png" 
                  alt="Literakids" 
                  className="h-8 w-auto object-contain"
                />
              </div>

            </Link>

            {/* Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link 
                href="/beribadah"
                className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30 shadow-sm ${buttonBgClass} ${textColorClass} hover:text-green-600`}
              >
                <Church className="w-4 h-4" />
                <span>Beribadah</span>
              </Link>
              <Link 
                href="/makan-bergizi"
                className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30 shadow-sm ${buttonBgClass} ${textColorClass} hover:text-yellow-600`}
              >
                <Apple className="w-4 h-4" />
                <span>Makan Bergizi</span>
              </Link>
              <Link 
                href="/bermasyarakat"
                className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/30 shadow-sm ${buttonBgClass} ${textColorClass} hover:text-blue-600`}
              >
                <Users className="w-4 h-4" />
                <span>Bermasyarakat</span>
              </Link>
            </nav>
            
            <div className="flex items-center gap-3">
              {/* Burger Menu Button - Mobile Only */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm transition-all border border-white/30 shadow-sm ${buttonBgClass} ${textColorClass}`}
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
                <Link 
                  href="/beribadah"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 backdrop-blur-sm rounded-xl transition-all border border-white/30 ${buttonBgClass} ${textColorClass} hover:text-green-700`}
                >
                  <Church className="w-5 h-5" />
                  <span>Beribadah</span>
                </Link>
                <Link 
                  href="/makan-bergizi"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 backdrop-blur-sm rounded-xl transition-all border border-white/40 ${buttonBgClass} ${textColorClass} hover:text-yellow-700`}
                >
                  <Apple className="w-5 h-5" />
                  <span>Makan Bergizi</span>
                </Link>
                <Link 
                  href="/bermasyarakat"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 backdrop-blur-sm rounded-xl transition-all border border-white/30 ${buttonBgClass} ${textColorClass} hover:text-blue-700`}
                >
                  <Users className="w-5 h-5" />
                  <span>Bermasyarakat</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
