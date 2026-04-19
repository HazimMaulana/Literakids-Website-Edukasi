import { LandingNavbar } from '../components/LandingNavbar';
import Link from 'next/link';
import {
  Apple,
  ArrowDown,
  BookOpen,
  CheckCircle2,
  Headphones,
  Heart,
  Home,
  Instagram,
  Linkedin,
  PenSquare,
  Star,
  Users,
} from 'lucide-react';

export default function LandingPage() {
  const usageSteps = [
    {
      title: 'Masuk dengan akunmu',
      description: 'Login memakai nama dan kata sandi untuk membuka semua fitur belajar di Literakids.',
      icon: CheckCircle2,
      accent: 'from-sky-500 to-cyan-400',
    },
    {
      title: 'Pilih kategori cerita favorit',
      description: 'Temukan tema bacaan yang kamu sukai agar sesi membaca terasa lebih seru.',
      icon: BookOpen,
      accent: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Nikmati cerita dan ilustrasinya',
      description: 'Baca setiap halaman sambil mengamati gambar supaya cerita lebih mudah dipahami.',
      icon: Star,
      accent: 'from-purple-500 to-fuchsia-500',
    },
    {
      title: 'Aktifkan audio narasi',
      description: 'Gunakan narasi suara untuk membantu menyimak dan melatih pelafalan kata.',
      icon: Headphones,
      accent: 'from-orange-500 to-amber-400',
    },
    {
      title: 'Buka glosarium kata sulit',
      description: 'Jika menemukan kata baru, cek glosarium agar maknanya langsung dipahami.',
      icon: Apple,
      accent: 'from-emerald-500 to-lime-500',
    },
    {
      title: 'Selesaikan evaluasi bacaan',
      description: 'Kerjakan evaluasi setelah membaca untuk mengukur pemahamanmu.',
      icon: PenSquare,
      accent: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Kembali ke beranda',
      description: 'Setelah selesai, pulang ke beranda dan pilih petualangan cerita berikutnya.',
      icon: Home,
      accent: 'from-teal-500 to-cyan-500',
    },
  ];

  const developers = [
    {
      name: 'Titis Dea Mascambuan',
      role: 'Education of Elementary School',
      image: '/profile/tis.jpeg',
      description:
        'Memanfaatkan pengetahuan dan pengalaman dalam pendidikan untuk memastikan konten cerita dan aktivitas di Literakids sesuai dengan kebutuhan belajar anak-anak.',
      socials: [
        { label: 'Instagram', href: 'https://instagram.com/titisdea_', icon: Instagram },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/', icon: Linkedin },
      ],
    },
    {
      name: 'Muhammad Hazim Maulana',
      role: 'Informatics Engineering',
      image: '/profile/jim.jpg',
      description:
        'Mengembangkan dan memelihara platform Literakids dengan teknologi terkini untuk memberikan pengalaman belajar membaca yang interaktif, aman, dan menyenangkan bagi anak-anak.',
      socials: [
        { label: 'Instagram', href: 'https://instagram.com/hazim_maulana', icon: Instagram },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/hazim-maulana-698192396/', icon: Linkedin },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-200 via-indigo-100 to-purple-200">
      <LandingNavbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Background Image - Made bolder and more visible */}
           <img 
            src="/assets/dashboard-hero-desktop.png"
            alt="Background"
            className="w-full h-full object-cover opacity-40 saturate-150"
          />
          {/* Gradient overlay to ensure text readability while keeping colors */}
          <div className="absolute inset-0 bg-linear-to-b from-white/30 via-white/50 to-white/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 drop-shadow-sm">
            Belajar Membaca Menjadi <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-pink-600 to-purple-700 drop-shadow-sm">
              Lebih Menyenangkan
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-2xl text-slate-800 mb-10 font-bold">
            Literakids hadir untuk menemani anak-anak belajar membaca dengan cerita interaktif, 
            jurnal harian, dan aktivitas seru lainnya.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="/login"
              className="px-10 py-5 bg-linear-to-r from-orange-500 to-pink-600 text-white rounded-full font-extrabold text-xl shadow-[0_10px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_25px_rgba(249,115,22,0.5)] hover:scale-105 transition-all transform border-4 border-white/50"
            >
              Mulai Petualangan 🚀
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Blue Theme */}
            <div className="p-8 rounded-3xl bg-blue-50 border-4 border-blue-400 text-center hover:shadow-2xl transition-all hover:-translate-y-2 transform hover:rotate-1">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg border-4 border-blue-200">
                <BookOpen className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-blue-900 mb-3">Cerita Interaktif</h3>
              <p className="text-blue-800 text-lg font-medium">
                Berbagai koleksi cerita mendidik yang dilengkapi dengan gambar menarik.
              </p>
            </div>

            {/* Card 2 - Orange Theme */}
            <div className="p-8 rounded-3xl bg-orange-50 border-4 border-orange-400 text-center hover:shadow-2xl transition-all hover:-translate-y-2 transform hover:-rotate-1">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg border-4 border-orange-200">
                <Star className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-orange-900 mb-3">Jurnal Harian</h3>
              <p className="text-orange-800 text-lg font-medium">
                Catat aktivitas harianmu dan kembangkan kebiasaan menulis sejak dini.
              </p>
            </div>

            {/* Card 3 - Green Theme */}
            <div className="p-8 rounded-3xl bg-green-50 border-4 border-green-400 text-center hover:shadow-2xl transition-all hover:-translate-y-2 transform hover:rotate-1">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg border-4 border-green-200">
                <Heart className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-green-900 mb-3">Pendidikan Karakter</h3>
              <p className="text-green-800 text-lg font-medium">
                Belajar nilai-nilai kebaikan melalui cerita dan aktivitas yang positif.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Guide Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white/35 rounded-4xl p-6 md:p-10 border border-white/60 shadow-[0_20px_45px_rgba(59,130,246,0.15)] backdrop-blur-xl overflow-hidden relative">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-sky-200/35 blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-indigo-200/30 blur-3xl"></div>

          <div className="relative z-10 text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 mt-6 leading-tight">
              Ikuti 7 Langkah,
              <br />
              Belajar Membaca Jadi Lebih Asyik
            </h2>
            <p className="max-w-3xl mx-auto text-slate-700 text-lg">
              Alur ini dirancang agar anak-anak bisa belajar mandiri dengan nyaman, terarah, dan menyenangkan dari awal sampai akhir.
            </p>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-6 bottom-6 w-1 rounded-full bg-slate-300/60">
              <div className="w-full h-full rounded-full bg-linear-to-b from-sky-400/60 via-blue-400/50 to-teal-400/60 animate-pulse" />
            </div>

            {usageSteps.map((step, index) => {
              const Icon = step.icon;
              const isLastStep = index === usageSteps.length - 1;
              return (
                <div
                  key={step.title}
                  className={`relative pl-14 pb-2 md:pl-0 ${index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'}`}
                >
                  <span className="absolute left-5 top-8 w-5 h-5 rounded-full bg-white border-4 border-sky-300 shadow-[0_0_0_6px_rgba(255,255,255,0.5)] md:left-1/2 md:-translate-x-1/2" />

                  <article
                    className={`group rounded-3xl border border-white/70 bg-white/65 backdrop-blur-md p-5 hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 animate-[fadeInUp_0.5s_ease-out_both] ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <div className={`w-11 h-11 rounded-2xl bg-linear-to-br ${step.accent} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold tracking-wider text-slate-700 px-2 py-1 rounded-full bg-slate-100/80 border border-white">
                        Langkah {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-700 leading-relaxed">{step.description}</p>
                  </article>

                  {!isLastStep && (
                    <div className="relative h-9 md:h-11">
                      <span className="absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-700 bg-white/75 border border-white rounded-full p-1.5 md:left-1/2 md:-translate-x-1/2">
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(12px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </section>

      {/* Developer Profile Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3">
              Tim di Balik Literakids
            </h2>
            <p className="max-w-2xl mx-auto text-slate-700 text-lg">
              Dua pengembang yang berkolaborasi untuk menghadirkan pengalaman belajar membaca yang hangat, aman, dan interaktif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developers.map((dev) => (
              <article
                key={dev.name}
                className="group rounded-3xl bg-white/80 border-2 border-white p-7 shadow-[0_20px_40px_rgba(30,41,59,0.15)] backdrop-blur-sm"
              >
                <div className="flex items-start gap-5 mb-6">
                  <img
                    src={dev.image}
                    alt={`Foto ${dev.name}`}
                    className="shrink-0 w-32 h-44 md:w-36 md:h-52 rounded-2xl object-cover object-top shadow-[0_16px_28px_rgba(15,23,42,0.24)] transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">{dev.name}</h3>
                    <p className="text-slate-600 font-semibold mb-3">{dev.role}</p>
                    <p className="text-slate-700 leading-relaxed mb-4">{dev.description}</p>

                    <div className="flex flex-wrap items-center gap-3">
                      {dev.socials.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={`${dev.name}-${social.label}`}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-900 transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{social.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
