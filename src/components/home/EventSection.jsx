// src/components/home/EventSection.jsx
import { ArrowRight, MapPin } from 'lucide-react';
import { events } from '../../data/seed.js';

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

function EventItem({ event }) {
  const typeBadge = typeBadgeColors[event.type] || typeBadgeColors.Konferensi;
  const modeBadge = modeBadgeColors[event.modeColor] || modeBadgeColors.blue;

  return (
    <div className="flex gap-4 items-start bg-white rounded-xl border border-neutral-100 shadow-card p-4 hover:shadow-card-hover transition-shadow group">
      {/* Date Block */}
      <div className="flex-shrink-0 w-14 text-center">
        <div className="text-2xl font-extrabold text-[#0B1B8C] leading-none">{event.day}</div>
        <div className="text-xs font-bold text-[#0B5FFF] uppercase tracking-wide">{event.month}</div>
        <div className="text-xs text-neutral-400">{event.year}</div>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-neutral-100 flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: typeBadge.bg, color: typeBadge.text }}
          >
            {event.type}
          </span>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: modeBadge.bg, color: modeBadge.text }}
          >
            {event.mode}
          </span>
        </div>
        <h3 className="font-bold text-[#0B1B8C] text-sm leading-snug mb-1 group-hover:text-[#0B5FFF] transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-1 text-neutral-400 text-xs">
          <MapPin className="w-3 h-3" />
          <span>{event.location}</span>
        </div>
      </div>

      {/* CTA */}
      <a
        href={`/event/${event.slug}`}
        className="flex-shrink-0 px-3 py-2 bg-[#0B5FFF] text-white text-xs font-semibold rounded-lg hover:bg-[#0B4BC0] transition-colors"
      >
        Daftar
      </a>
    </div>
  );
}

export default function EventSection() {
  return (
    <section className="py-12 bg-[#F3F7FF]" aria-labelledby="event-title">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-7">
          <h2 id="event-title" className="text-2xl lg:text-3xl font-bold text-[#0B1B8C]">
            Event Mendatang
          </h2>
          <a
            href="/event"
            className="inline-flex items-center gap-1 text-[#0B5FFF] text-sm font-semibold hover:gap-2 transition-all"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
