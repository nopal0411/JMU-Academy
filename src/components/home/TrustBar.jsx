// src/components/home/TrustBar.jsx
import { ShieldCheck, Award, Building, Network, BrainCircuit, Globe } from 'lucide-react';
import { trustItems } from '../../data/seed.js';

const iconMap = {
  'shield-check': ShieldCheck,
  'award': Award,
  'building': Building,
  'network': Network,
  'brain-circuit': BrainCircuit,
  'globe': Globe,
};

export default function TrustBar() {
  return (
    <section
      className="bg-[#0B5FFF] py-4"
      aria-label="Keunggulan JMU Academy"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4 lg:gap-2">
          {trustItems.map((item) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 text-white"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold whitespace-nowrap">{item.label}</span>
                {item.id < trustItems.length && (
                  <span className="hidden lg:block text-white/30 ml-2">|</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
