// src/components/home/AssociationSection.jsx
import { ArrowRight, Users, BookOpen, Calendar, FileText, Award } from 'lucide-react';
import { associations, associationFeatures } from '../../data/seed.js';
import { LogoPlaceholder } from '../ui/ImagePlaceholder.jsx';

const featureIconMap = {
  users: Users,
  'book-open': BookOpen,
  calendar: Calendar,
  'file-text': FileText,
  award: Award,
};

export default function AssociationSection() {
  return (
    <section className="py-12 bg-[#F3F7FF]" aria-labelledby="association-title">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 id="association-title" className="text-2xl lg:text-3xl font-bold text-[#0B1B8C]">
              Asosiasi & Ekosistem Profesional
            </h2>
            <p className="text-neutral-500 text-sm mt-1">
              Terhubung dengan asosiasi profesi, institusi, dan mitra strategis untuk memperluas pengakuan, jejaring, CPD, dan peluang karier Anda.
            </p>
          </div>
          <a
            href="/asosiasi"
            className="hidden sm:inline-flex items-center gap-1 text-[#0B5FFF] text-sm font-semibold hover:gap-2 transition-all duration-200 whitespace-nowrap mt-1"
          >
            Lihat Semua Asosiasi
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Main Panel */}
        <div className="bg-white rounded-xl border border-neutral-100 shadow-card overflow-hidden mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-100">
            {/* Untuk Profesional */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#0B5FFF]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1B8C] text-base">Untuk Profesional</h3>
                </div>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                Temukan asosiasi profesi yang relevan dengan kompetensi dan karier Anda, ikuti program, dapatkan pengakuan, dan perluas jejaring profesional.
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#0B5FFF] text-[#0B5FFF] text-xs font-semibold rounded-lg hover:bg-[#EEF4FF] transition-colors">
                Lihat Semua Asosiasi
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Asosiasi Logos */}
            <div className="p-6 flex-1">
              <p className="text-xs font-semibold text-neutral-500 mb-4">Beberapa Asosiasi Mitra Kami</p>
              <div className="flex flex-wrap gap-3 items-center">
                {associations.map((assoc) => (
                  <LogoPlaceholder
                    key={assoc.id}
                    name={assoc.shortName}
                    color={assoc.color}
                    className="text-xs"
                  />
                ))}
              </div>
            </div>

            {/* Untuk Asosiasi */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] flex items-center justify-center">
                  <div className="flex">
                    <div className="w-3 h-4 bg-[#0B5FFF] rounded-l-sm opacity-80" />
                    <div className="w-3 h-4 bg-[#0B5FFF] rounded-r-sm ml-0.5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1B8C] text-base">Untuk Asosiasi</h3>
                </div>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                Bergabung dengan ekosistem JMU Academy untuk mengelola anggota, kompetensi, CPD, program, dan peluang profesional.
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B5FFF] text-white text-xs font-semibold rounded-lg hover:bg-[#0B4BC0] transition-colors shadow-sm">
                Gabung sebagai Mitra Asosiasi
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-6">
          {associationFeatures.map((feat) => {
            const Icon = featureIconMap[feat.icon] || Award;
            return (
              <div key={feat.id} className="flex items-center gap-2 text-neutral-600">
                <div className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-[#0B5FFF]" />
                </div>
                <span className="text-xs font-medium">{feat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
