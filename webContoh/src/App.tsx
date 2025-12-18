import { useState } from 'react';
import { User, KeyRound } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import imgDesktop from "figma:asset/7f07e636261cc6d50c15e379e66d89b2eb464776.png";
import imgMobile from "figma:asset/db568c3bb28b5ef60f6de6616ac352124d1ee9d2.png";

export default function App() {
  const [nama, setNama] = useState('');
  const [sandi, setSandi] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nama.trim() && sandi.trim()) {
      setLoggedInUser(nama);
      setIsLoggedIn(true);
    } else {
      alert('Silakan isi nama dan sandi terlebih dahulu');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser('');
    setNama('');
    setSandi('');
  };

  // Show Dashboard if logged in
  if (isLoggedIn) {
    return <Dashboard userName={loggedInUser} onLogout={handleLogout} />;
  }

  // Show Login Page
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Images */}
      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0">
        <img 
          src={imgMobile} 
          alt="School Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Mobile Background */}
      <div className="block md:hidden absolute inset-0">
        <img 
          src={imgDesktop} 
          alt="School Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-[358px] bg-[rgba(217,217,217,0.8)] backdrop-blur-sm rounded-[40px] p-6 md:p-8 shadow-2xl">
          <h1 className="text-black text-center mb-8">
            Selamat Datang
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Nama Input */}
            <div className="relative">
              <div className="flex items-center bg-white border border-[#acacac] rounded-[40px] px-5 py-3 h-[42px]">
                <User className="w-5 h-5 text-black mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Sandi Input */}
            <div className="relative">
              <div className="flex items-center bg-white border border-[#acacac] rounded-[40px] px-5 py-3 h-[42px]">
                <KeyRound className="w-5 h-5 text-black mr-3 flex-shrink-0" />
                <input
                  type="password"
                  placeholder="Sandi"
                  value={sandi}
                  onChange={(e) => setSandi(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Masuk Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-black text-white px-10 py-2.5 rounded-[50px] hover:bg-gray-800 transition-colors shadow-lg"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}