// src/pages/HomePage.jsx
import { useState } from 'react';
import Hero from '../components/home/Hero.jsx';
import TrustBar from '../components/home/TrustBar.jsx';
import FourDomains from '../components/home/FourDomains.jsx';
import StatsBar from '../components/home/StatsBar.jsx';
import AssociationSection from '../components/home/AssociationSection.jsx';
import WhyJMU from '../components/home/WhyJMU.jsx';
import TestimonialSection from '../components/home/Testimonial.jsx';
import NewsSection from '../components/home/NewsSection.jsx';
import EventSection from '../components/home/EventSection.jsx';
import CTABanner from '../components/home/CTABanner.jsx';

export default function HomePage({ onLoginClick }) {
  return (
    <main id="main-content">
      <Hero onLoginClick={onLoginClick} />
      <TrustBar />
      <FourDomains />
      <StatsBar />
      <AssociationSection />
      <WhyJMU />
      <TestimonialSection />
      {/* News & Events side by side on large screens */}
      <div className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* News */}
            <div>
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-2xl font-bold text-[#0B1B8C]">Berita & Artikel Terbaru</h2>
                <a href="/berita" className="text-[#0B5FFF] text-sm font-semibold hover:underline flex items-center gap-1">
                  Lihat Semua →
                </a>
              </div>
              <div className="flex flex-col gap-4">
                {/* News cards inline */}
                <NewsCardsInline />
              </div>
            </div>
            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-2xl font-bold text-[#0B1B8C]">Event Mendatang</h2>
                <a href="/event" className="text-[#0B5FFF] text-sm font-semibold hover:underline flex items-center gap-1">
                  Lihat Semua →
                </a>
              </div>
              <EventCardsInline />
            </div>
          </div>
        </div>
      </div>
      <CTABanner />
    </main>
  );
}

// Inline news cards for the combined section
import { news, events } from '../data/seed.js';
import { Calendar, MapPin } from 'lucide-react';
import ImagePlaceholder from '../components/ui/ImagePlaceholder.jsx';

const categoryColors = {
  Artikel: { bg: '#EEF4FF', text: '#0B5FFF' },
  Berita: { bg: '#F0FDF4', text: '#16A34A' },
};

function NewsCardsInline() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {news.map((item) => {
        const colors = categoryColors[item.category] || categoryColors.Artikel;
        return (
          <article key={item.id} className="bg-white rounded-xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-shadow overflow-hidden group">
            <div className="relative">
              <ImagePlaceholder width={350} height={180} label={item.title} variant="news" />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: colors.bg, color: colors.text }}>
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-1 text-neutral-400 text-xs mb-1.5">
                <Calendar className="w-3 h-3" />
                <span>{item.date}</span>
              </div>
              <h3 className="font-bold text-[#0B1B8C] text-xs leading-snug line-clamp-3 group-hover:text-[#0B5FFF] transition-colors">
                {item.title}
              </h3>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const typeBadgeColors = {
  Konferensi: { bg: '#EEF4FF', text: '#0B5FFF' },
  Webinar: { bg: '#F5F3FF', text: '#7C3AED' },
  Roundtable: { bg: '#FFF7ED', text: '#F26A1B' },
};

const modeBadgeColors = {
  blue: { bg: '#EEF4FF', text: '#0B5FFF' },
  green: { bg: '#F0FDF4', text: '#16A34A' },
  orange: { bg: '#FFF7ED', text: '#F26A1B' },
};

function EventCardsInline() {
  return (
    <div className="flex flex-col gap-3">
      {events.map((event) => {
        const typeBadge = typeBadgeColors[event.type] || typeBadgeColors.Konferensi;
        const modeBadge = modeBadgeColors[event.modeColor] || modeBadgeColors.blue;
        return (
          <div key={event.id} className="flex gap-4 items-start bg-white rounded-xl border border-neutral-100 shadow-card p-4 hover:shadow-card-hover transition-shadow group">
            <div className="flex-shrink-0 w-14 text-center">
              <div className="text-2xl font-extrabold text-[#0B1B8C] leading-none">{event.day}</div>
              <div className="text-xs font-bold text-[#0B5FFF] uppercase tracking-wide">{event.month}</div>
              <div className="text-xs text-neutral-400">{event.year}</div>
            </div>
            <div className="w-px self-stretch bg-neutral-100 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1 mb-1.5">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: typeBadge.bg, color: typeBadge.text }}>{event.type}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: modeBadge.bg, color: modeBadge.text }}>{event.mode}</span>
              </div>
              <h3 className="font-bold text-[#0B1B8C] text-sm leading-snug mb-1 group-hover:text-[#0B5FFF] transition-colors">{event.title}</h3>
              <div className="flex items-center gap-1 text-neutral-400 text-xs">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </div>
            </div>
            <a href={`/event/${event.slug}`} className="flex-shrink-0 px-3 py-2 bg-[#0B5FFF] text-white text-xs font-semibold rounded-lg hover:bg-[#0B4BC0] transition-colors">
              Daftar
            </a>
          </div>
        );
      })}
    </div>
  );
}
