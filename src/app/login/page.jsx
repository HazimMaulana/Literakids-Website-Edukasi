'use client';

import { useState } from 'react';
import { KeyRound, User } from 'lucide-react';

function Dashboard({ userName, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 flex flex-col items-center justify-center">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8 text-center space-y-4 max-w-lg w-full mx-4">
        <p className="text-sm text-gray-500">Dashboard</p>
        <h1 className="text-3xl font-bold text-gray-800">Halo, {userName || 'Teman'}!</h1>
        <p className="text-gray-600">Kamu sudah masuk. Gunakan navigasi utama untuk mulai membaca cerita.</p>
        <button
          onClick={onLogout}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold shadow-md"
        >
          Keluar
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const res = await fetch('/api/siswa');
        const data = await res.json();
        const user = data.data?.find(u => u.username === username);
        
        if (user) {
           localStorage.setItem('user', JSON.stringify(user));
           setIsLoggedIn(true);
        } else {
           // Fallback for demo/testing if user not found in DB but wants to proceed
           // Note: Journal submission will fail if user doesn't have valid _id
           console.warn('User not found in DB, logging in as guest/demo');
           setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
        setIsLoggedIn(true);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('user');
  };

  if (isLoggedIn) {
    return <Dashboard userName={username} onLogout={handleLogout} />;
  }

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

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white ml-1">Nama Pengguna</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white/50"
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white/50"
                  placeholder="Masukkan kata sandi..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
            >
              Mulai Petualangan! 🚀
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
