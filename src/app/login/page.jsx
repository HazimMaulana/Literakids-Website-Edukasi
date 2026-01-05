'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store user info in localStorage for client-side usage if needed
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push(data.redirectUrl || '/dashboard');
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <img 
          src="/backgroundImages/heroSectionMobile.png"
          alt="Background Mobile"
          className="md:hidden w-full h-full object-cover"
        />
        {/* Desktop Background */}
        <img 
          src="/backgroundImages/loginPageLandscape.png"
          alt="Background Desktop"
          className="hidden md:block w-full h-full object-cover"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-4 text-white">
        <div className="bg-gray/40 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-4 border-white/50 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full opacity-50 blur-xl"></div>
        
        <div className="relative z-10 ">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Selamat Datang!</h1>
            <p className="text-white">Masuk untuk mulai membaca cerita seru</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/80 text-white rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white ml-1">Nama Pengguna</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white/50 text-gray-800 placeholder-gray-500"
                  placeholder="Masukkan namamu..."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white ml-1">Kata Sandi</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white/50 text-gray-800 placeholder-gray-500"
                  placeholder="Masukkan kata sandi..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? 'Sedang Masuk...' : 'Mulai Petualangan! 🚀'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white">
              Belum punya akun? <a href="#" className="text-white font-semibold hover:underline">Daftar disini</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
