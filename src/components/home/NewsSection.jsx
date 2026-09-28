// src/components/home/NewsSection.jsx
import { ArrowRight, Calendar } from 'lucide-react';
import { news } from '../../data/seed.js';
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx';

const categoryColors = {
  Artikel: { bg: '#EEF4FF', text: '#0B5FFF' },
  Berita: { bg: '#F0FDF4', text: '#16A34A' },
  Event: { bg: '#FFF7ED', text: '#F26A1B' },
};

function NewsCard({ item }) {
  const colors = categoryColors[item.category] || categoryColors.Artikel;
  return (
    <article className="bg-white rounded-xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative">
        <ImagePlaceholder
          width={400}
          height={220}
          label={item.title}
          variant="news"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{item.date}</span>
        </div>
        <h3 className="font-bold text-[#0B1B8C] text-sm leading-snug mb-3 line-clamp-3 group-hover:text-[#0B5FFF] transition-colors">
          {item.title}
        </h3>
        <a
          href={`/berita/${item.slug}`}
          className="inline-flex items-center gap-1 text-[#0B5FFF] text-xs font-semibold hover:gap-2 transition-all"
        >
          Baca Selengkapnya
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}

export default function NewsSection() {
  return (
    <section className="py-12 bg-white" aria-labelledby="news-title">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-7">
          <h2 id="news-title" className="text-2xl lg:text-3xl font-bold text-[#0B1B8C]">
            Berita & Artikel Terbaru
          </h2>
          <a
            href="/berita"
            className="inline-flex items-center gap-1 text-[#0B5FFF] text-sm font-semibold hover:gap-2 transition-all"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
