// src/components/home/WhyJMU.jsx
import { ShieldCheck, BarChart2, Users, TrendingUp, Layers, Heart } from 'lucide-react';
import { whyJMU } from '../../data/seed.js';

const iconMap = {
  'shield-check': ShieldCheck,
  'bar-chart-2': BarChart2,
  'users': Users,
  'trending-up': TrendingUp,
  'layers': Layers,
  'heart': Heart,
};

function WhyCard({ item }) {
  const Icon = iconMap[item.icon] || ShieldCheck;
  return (
    <div className="flex flex-col items-center text-center p-4 group">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: item.color + '15' }}
      >
        <Icon className="w-7 h-7" style={{ color: item.color }} />
      </div>
      <h3 className="font-bold text-[#0B1B8C] text-sm mb-2 leading-tight">{item.title}</h3>
      <p className="text-neutral-500 text-xs leading-relaxed">{item.description}</p>
    </div>
  );
}

export default function WhyJMU() {
  return (
    <section className="py-12 bg-white" aria-labelledby="why-jmu-title">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 id="why-jmu-title" className="text-2xl lg:text-3xl font-bold text-[#0B1B8C]">
            Mengapa JMU Academy?
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
            Lebih dari sekadar training, kami membangun ekosistem kompetensi yang berkelanjutan.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {whyJMU.map((item) => (
            <WhyCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
