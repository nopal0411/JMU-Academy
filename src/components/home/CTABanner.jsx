// src/components/home/CTABanner.jsx
import { Link } from 'react-router-dom';
import { BookOpen, Award, Briefcase, Zap, ArrowRight } from 'lucide-react';
import { ctaIcons } from '../../data/seed.js';

const iconMap = {
  'book-open': BookOpen,
  'award': Award,
  'briefcase': Briefcase,
  'zap': Zap,
};

export default function CTABanner() {
  return (
    <section
      className="py-14 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B1B8C 0%, #1E2A78 50%, #1560F0 100%)' }}
      aria-labelledby="cta-title"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Right decorative text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right opacity-15 hidden lg:block">
        <div className="text-white font-extrabold text-4xl leading-tight">
          <div>People</div>
          <div>Competence</div>
          <div>Opportunity</div>
          <div>A Better</div>
          <div>Tomorrow</div>
        </div>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Text + CTA */}
          <div className="flex-1 text-center lg:text-left">
            <h2 id="cta-title" className="text-2xl lg:text-3xl font-extrabold text-white mb-3">
              Bersama, Kita Membangun Masa Depan yang Lebih Baik
            </h2>
            <p className="text-white/70 text-sm mb-7 max-w-lg lg:max-w-none">
              Jadilah bagian dari komunitas profesional JMU Academy dan wujudkan potensi terbaik Anda.
            </p>
            <Link
              to="/daftar"
              id="cta-daftar-sekarang"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F26A1B] text-white font-bold rounded-lg hover:bg-[#D4560E] transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
            >
              Daftar Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Icon grid */}
          <div className="flex gap-6 lg:gap-8">
            {ctaIcons.map((item) => {
              const Icon = iconMap[item.icon] || BookOpen;
              return (
                <div key={item.id} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-white/80 text-xs font-medium text-center whitespace-pre-line leading-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
