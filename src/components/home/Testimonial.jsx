// src/components/home/Testimonial.jsx
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials, successStory, strategicPartners } from '../../data/seed.js';
import { AvatarPlaceholder, LogoPlaceholder } from '../ui/ImagePlaceholder.jsx';
import { ArrowRight } from 'lucide-react';

// Star Rating
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-4 h-4"
          fill={star <= rating ? '#EAB308' : 'none'}
          stroke={star <= rating ? '#EAB308' : '#CBD5E1'}
        />
      ))}
    </div>
  );
}

// Testimonial Carousel
function TestimonialCard() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  function prev() {
    setCurrent((c) => (c - 1 + total) % total);
  }
  function next() {
    setCurrent((c) => (c + 1) % total);
  }

  const t = testimonials[current];

  return (
    <div className="bg-white rounded-xl border border-neutral-100 shadow-card p-6 flex flex-col h-full">
      <h3 className="font-bold text-[#0B1B8C] text-base mb-4">Apa Kata Mereka?</h3>

      <div className="flex-1">
        <blockquote className="text-neutral-600 text-sm leading-relaxed mb-5 italic">
          {t.text}
        </blockquote>

        <div className="flex items-center gap-3">
          <AvatarPlaceholder size={40} name={t.name} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-neutral-800 text-sm truncate">{t.name}</p>
            <p className="text-neutral-500 text-xs truncate">{t.role}</p>
          </div>
          <StarRating rating={t.rating} />
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-100">
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-[#0B5FFF]' : 'bg-neutral-200'}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button
            onClick={prev}
            className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="Testimonial sebelumnya"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
          </button>
          <button
            onClick={next}
            className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="Testimonial berikutnya"
          >
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Success Story Card
function SuccessStoryCard() {
  const s = successStory;
  return (
    <div className="bg-white rounded-xl border border-neutral-100 shadow-card p-6 flex flex-col h-full">
      <h3 className="font-bold text-[#0B1B8C] text-base mb-4">Kisah Sukses</h3>

      <div className="flex-1">
        <blockquote className="text-neutral-600 text-sm leading-relaxed mb-5 italic">
          {s.text}
        </blockquote>

        <div className="flex items-center gap-3">
          <AvatarPlaceholder size={40} name={s.name} />
          <div>
            <p className="font-semibold text-neutral-800 text-sm">{s.name}</p>
            <p className="text-neutral-500 text-xs">{s.role}</p>
          </div>
        </div>

        <div className="mt-4 flex">
          <StarRating rating={5} />
        </div>
      </div>
    </div>
  );
}

// Strategic Partners Card
function StrategicPartnersCard() {
  return (
    <div className="bg-white rounded-xl border border-neutral-100 shadow-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#0B1B8C] text-base">Mitra Strategis</h3>
        <a href="/mitra" className="text-[#0B5FFF] text-xs font-semibold hover:underline flex items-center gap-1">
          Lihat Semua <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {strategicPartners.map((partner) => (
          <LogoPlaceholder
            key={partner.id}
            name={partner.shortName}
            color={partner.color}
            className="text-[9px] text-center px-1 py-1.5 justify-center"
          />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="py-12 bg-[#F3F7FF]" aria-label="Testimoni dan mitra">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TestimonialCard />
          <SuccessStoryCard />
          <StrategicPartnersCard />
        </div>
      </div>
    </section>
  );
}
