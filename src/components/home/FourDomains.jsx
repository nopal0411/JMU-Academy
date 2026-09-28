// src/components/home/FourDomains.jsx
import { ArrowRight, Briefcase, BookOpen, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { domains } from '../../data/seed.js';

const iconMap = {
  'briefcase': Briefcase,
  'book-open': BookOpen,
  'building-2': Building2,
  'users': Users,
};

const variantMap = {
  career: 'gradient-career',
  learn: 'gradient-learn',
  business: 'gradient-business',
  expert: 'gradient-expert',
};

function DomainCard({ domain }) {
  const Icon = iconMap[domain.icon] || Briefcase;

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
      style={{ backgroundColor: domain.color }}
    >
      {/* Card Header */}
      <div className="p-5 flex-1" style={{ background: `linear-gradient(135deg, ${domain.gradientFrom} 0%, ${domain.gradientTo} 100%)` }}>
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-white" />
        </div>
        {/* Title */}
        <h3 className="text-lg font-bold text-white leading-tight">{domain.title}</h3>
        <p className="text-white/80 text-xs font-medium mt-0.5 mb-3">{domain.subtitle}</p>
        {/* Description */}
        <p className="text-white/70 text-xs leading-relaxed mb-5">{domain.description}</p>

        {/* Image placeholder */}
        <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)', height: '120px' }}>
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center opacity-40"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            <span className="text-white/40 text-xs">Foto {domain.title}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4" style={{ background: `linear-gradient(135deg, ${domain.gradientFrom} 0%, ${domain.gradientTo} 100%)`, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        <Link
          to={`/${domain.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-colors group-hover:gap-3"
          aria-label={domain.buttonLabel}
        >
          {domain.buttonLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function FourDomains() {
  return (
    <section className="py-12 bg-white" aria-labelledby="four-domains-title">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 id="four-domains-title" className="text-2xl lg:text-3xl font-bold text-[#0B1B8C]">
              Empat Domain untuk Satu Tujuan
            </h2>
            <p className="text-neutral-500 text-sm mt-1">
              Jelajahi ekosistem JMU Academy sesuai kebutuhan Anda.
            </p>
          </div>
          <Link
            to="/ekosistem"
            className="hidden sm:inline-flex items-center gap-1 text-[#0B5FFF] text-sm font-semibold hover:gap-2 transition-all duration-200 whitespace-nowrap mt-1"
          >
            Lihat Seluruh Ekosistem
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>

        {/* Mobile: Lihat Seluruh Ekosistem */}
        <div className="sm:hidden mt-5 text-center">
          <Link
            to="/ekosistem"
            className="inline-flex items-center gap-1 text-[#0B5FFF] text-sm font-semibold"
          >
            Lihat Seluruh Ekosistem
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
