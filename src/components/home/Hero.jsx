// src/components/home/Hero.jsx
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ onLoginClick }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #061260 0%, #0B1B8C 30%, #1E2A78 60%, #1560F0 100%)',
        minHeight: '520px',
      }}
      aria-label="Hero section"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #ffffff 1px, transparent 1px), 
                              radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* City skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <svg viewBox="0 0 1440 120" className="w-full" fill="white" preserveAspectRatio="none">
          <path d="M0,80 L40,80 L40,40 L60,40 L60,60 L80,60 L80,20 L100,20 L100,60 L120,60 L120,40 L160,40 L160,70 L200,70 L200,30 L220,30 L220,50 L240,50 L240,70 L280,70 L280,50 L300,50 L300,30 L320,30 L320,60 L360,60 L360,40 L380,40 L380,70 L400,70 L400,50 L420,50 L420,30 L460,30 L460,60 L500,60 L500,80 L560,80 L560,40 L600,40 L600,70 L640,70 L640,50 L660,50 L660,30 L680,30 L680,60 L720,60 L720,40 L760,40 L760,70 L800,70 L800,50 L840,50 L840,30 L880,30 L880,60 L920,60 L920,80 L960,80 L960,50 L1000,50 L1000,70 L1040,70 L1040,40 L1080,40 L1080,60 L1120,60 L1120,80 L1160,80 L1160,40 L1200,40 L1200,70 L1240,70 L1240,50 L1280,50 L1280,80 L1320,80 L1320,40 L1360,40 L1360,70 L1400,70 L1400,80 L1440,80 L1440,120 L0,120 Z"/>
        </svg>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">
                JMU ACADEMY
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-5">
              People. Competence.
              <br />
              Opportunity.
              <br />
              <span className="text-orange-400">A Better Tomorrow.</span>
            </h1>

            {/* Description */}
            <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-8 max-w-md">
              Ekosistem terintegrasi untuk belajar, memperoleh sertifikasi, 
              terhubung dengan industri dan asosiasi, menemukan peluang karier, 
              dan memberikan dampak nyata bagi individu, organisasi, 
              dan masyarakat.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/daftar"
                id="cta-mulai-perjalanan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F26A1B] text-white font-semibold rounded-lg hover:bg-[#D4560E] transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              >
                Mulai Perjalanan Anda
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                id="cta-jelajahi"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0B1B8C] transition-all duration-200 text-sm"
              >
                Jelajahi Ekosistem
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-orange-400 pl-4">
              <p className="text-white/70 text-sm italic leading-relaxed">
                "Kompetensi hari ini, peluang esok hari, masa depan yang lebih baik."
              </p>
            </blockquote>
          </div>

          {/* Right Content */}
          <div className="relative hidden lg:flex items-center justify-end">
            {/* Handwriting text */}
            <div className="absolute right-0 top-0 text-right">
              <div className="text-white/30 font-serif italic text-lg leading-loose tracking-wide">
                <div>Learn</div>
                <div>Grow</div>
                <div>Belong</div>
                <div>Create Impact</div>
              </div>
            </div>

            {/* Quote card */}
            <div className="absolute top-8 right-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-w-[200px]">
              <p className="text-white text-xs italic leading-relaxed mb-2">
                "Kompetensi hari ini, peluang esok hari, masa depan yang lebih baik."
              </p>
              <p className="text-orange-300 text-xs font-semibold">— JMU Academy</p>
            </div>

            {/* Hero Image Placeholder - orang profesional */}
            <div className="relative w-full max-w-md">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ paddingBottom: '75%', position: 'relative' }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-end p-8"
                  style={{
                    background: 'linear-gradient(160deg, rgba(30,42,120,0.3) 0%, rgba(11,27,140,0.6) 100%)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '16px',
                  }}
                >
                  {/* Silhouette of 3 professionals */}
                  <svg viewBox="0 0 400 300" className="w-full opacity-60" fill="none">
                    {/* Left person */}
                    <ellipse cx="120" cy="200" rx="40" ry="70" fill="rgba(255,255,255,0.15)" />
                    <circle cx="120" cy="110" r="30" fill="rgba(255,255,255,0.15)" />
                    {/* Middle person (taller) */}
                    <ellipse cx="200" cy="190" rx="45" ry="85" fill="rgba(255,255,255,0.2)" />
                    <circle cx="200" cy="90" r="35" fill="rgba(255,255,255,0.2)" />
                    {/* Right person with hijab */}
                    <ellipse cx="285" cy="195" rx="42" ry="75" fill="rgba(255,255,255,0.15)" />
                    <circle cx="285" cy="105" r="32" fill="rgba(255,255,255,0.15)" />
                    <ellipse cx="285" cy="95" rx="40" ry="15" fill="rgba(255,255,255,0.1)" />
                  </svg>
                  <p className="text-white/50 text-xs text-center mt-2">
                    Foto Profesional JMU Academy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
