'use client';

import { usePathname } from 'next/navigation';

export function BackgroundOrnaments() {
  const pathname = usePathname();

  // Jangan tampilkan di halaman admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Layer 1: Main Elements */}
      
      {/* Top Left - Kijang Peeking */}
      <div className="absolute -top-10 -left-10 w-48 h-48 md:w-72 md:h-72 opacity-[0.15] animate-float-slow">
        <img src="/ornaments/kijang.png" alt="" className="w-full h-full object-contain rotate-12" />
      </div>

      {/* Top Right - Rusa */}
      <div className="absolute -top-5 -right-10 w-56 h-56 md:w-80 md:h-80 opacity-[0.15] animate-sway">
        <img src="/ornaments/rusa.png" alt="" className="w-full h-full object-contain -rotate-12" />
      </div>

      {/* Bottom Left - Kuda */}
      <div className="absolute -bottom-10 -left-10 w-64 h-64 md:w-96 md:h-96 opacity-[0.15] animate-float-reverse">
        <img src="/ornaments/kuda.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Bottom Right - Rumah Panggung (Anchor) */}
      <div className="absolute -bottom-5 -right-5 w-72 h-72 md:w-[500px] md:h-[500px] opacity-[0.2] animate-float-slow">
        <img src="/ornaments/rumahpanggung.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Layer 2: Floating/Scattered Echoes (Creating depth) */}
      
      {/* Middle Left - Faint Rusa */}
      <div className="absolute top-[40%] -left-10 w-32 h-32 opacity-[0.05] animate-sway hidden lg:block">
        <img src="/ornaments/rusa.png" alt="" className="w-full h-full object-contain rotate-45" />
      </div>

      {/* Middle Right - Faint Kijang */}
      <div className="absolute top-[30%] -right-10 w-40 h-40 opacity-[0.05] animate-float-fast hidden lg:block">
        <img src="/ornaments/kijang.png" alt="" className="w-full h-full object-contain -rotate-12" />
      </div>

      {/* Center Background - Very Faint House Outline */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] animate-pulse-slow hidden md:block">
        <img src="/ornaments/rumahpanggung.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Layer 3: Mobile Specific Elements */}
      <div className="absolute top-[15%] right-2 w-20 h-20 opacity-[0.1] animate-float-fast md:hidden">
         <img src="/ornaments/kuda.png" alt="" className="w-full h-full object-contain rotate-12" />
      </div>


      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-2deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.03; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.05; transform: translate(-50%, -50%) scale(1.05); }
        }
        
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        .animate-sway { animation: sway 7s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
