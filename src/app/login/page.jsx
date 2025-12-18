import { useState } from 'react';
import { Dashboard } from '../../components/Dashboard';
import { KeyRound, User } from 'lucide-react';

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
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
          src="/webContoh/7f07e636261cc6d50c15e379e66d89b2eb464776.png"
          alt="Background Desktop"
          className="hidden md:block w-full h-full object-cover"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-4">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-4 border-white/50 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full opacity-50 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg animate-bounce">
              <span className="text-4xl">📚</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang!</h1>
            <p className="text-gray-600">Masuk untuk mulai membaca cerita seru</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Nama Pengguna</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
              <label className="text-sm font-semibold text-gray-700 ml-1">Kata Sandi</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
            <p className="text-sm text-gray-500">
              Belum punya akun? <a href="#" className="text-green-600 font-semibold hover:underline">Daftar disini</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}