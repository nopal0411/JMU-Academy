// src/components/home/StatsBar.jsx
import { useRef, useEffect, useState } from 'react';
import { Users, BookOpen, Award, Building2, Network, Briefcase, Star } from 'lucide-react';
import { statistics } from '../../data/seed.js';

const iconMap = {
  'users': Users,
  'book-open': BookOpen,
  'award': Award,
  'building-2': Building2,
  'network': Network,
  'briefcase': Briefcase,
  'star': Star,
};

function StatItem({ stat, animate }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!animate || started.current) return;
    started.current = true;

    const duration = 1800;
    const start = performance.now();
    const end = stat.value;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [animate, stat.value]);

  const Icon = iconMap[stat.icon] || Star;

  // Format number
  function formatNum(n) {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 0) + '.000';
    return n.toString();
  }

  // Special: 250000 → "250.000"
  function displayCount(n, suffix) {
    if (n >= 1000) {
      return `${Math.floor(n / 1000).toLocaleString('id-ID')}.${String(n % 1000).padStart(3, '0')}${suffix}`;
    }
    return `${n.toLocaleString('id-ID')}${suffix}`;
  }

  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-5 h-5 text-[#0B5FFF]" aria-hidden="true" />
        <span className="text-xl lg:text-2xl font-extrabold text-[#0B1B8C]">
          {displayCount(count, stat.suffix)}
        </span>
      </div>
      <span className="text-xs text-neutral-500 font-medium leading-tight max-w-[100px]">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-8 bg-white border-t border-b border-neutral-100"
      aria-label="Statistik JMU Academy"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 divide-x-0 lg:divide-x divide-neutral-100">
          {statistics.map((stat, i) => (
            <StatItem key={stat.id} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
