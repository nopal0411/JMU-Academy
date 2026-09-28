// src/components/ui/ImagePlaceholder.jsx
// Komponen placeholder gambar - ganti dengan foto asli saat tersedia

import { ImageIcon } from 'lucide-react';

/**
 * ImagePlaceholder - placeholder untuk semua gambar di JMU Academy
 * @param {number} width - lebar dalam pixel (untuk aspect ratio)
 * @param {number} height - tinggi dalam pixel (untuk aspect ratio)
 * @param {string} label - label yang ditampilkan di tengah
 * @param {string} className - class tambahan
 * @param {string} variant - 'default' | 'dark' | 'gradient' | 'avatar'
 */
export default function ImagePlaceholder({
  width = 400,
  height = 300,
  label = '',
  className = '',
  variant = 'default',
  style = {},
}) {
  const ratio = (height / width) * 100;

  const variantStyles = {
    default: 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400',
    dark: 'bg-gradient-to-br from-slate-700 to-slate-900 text-slate-500',
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-300',
    'gradient-career': 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-400',
    'gradient-learn': 'bg-gradient-to-br from-green-100 to-green-200 text-green-400',
    'gradient-business': 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-400',
    'gradient-expert': 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-400',
    avatar: 'bg-gradient-to-br from-blue-200 to-blue-300 text-blue-500 rounded-full',
    hero: 'bg-gradient-to-br from-slate-600 to-slate-800 text-slate-500',
    news: 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400',
  };

  const baseClass = variantStyles[variant] || variantStyles.default;

  return (
    <div
      className={`relative overflow-hidden ${baseClass} ${className}`}
      style={{ paddingBottom: `${ratio}%`, ...style }}
      role="img"
      aria-label={label || 'Gambar placeholder'}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
        <ImageIcon className="w-8 h-8 opacity-40" />
        {label && (
          <span className="text-xs font-medium text-center opacity-60 max-w-[80%] leading-tight">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

// Avatar placeholder bulat
export function AvatarPlaceholder({ size = 48, name = '', className = '' }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      aria-label={`Avatar ${name}`}
    >
      {initials || <span style={{ fontSize: size * 0.4 }}>👤</span>}
    </div>
  );
}

// Logo placeholder mitra/asosiasi
export function LogoPlaceholder({ name = '', color = '#0B5FFF', className = '' }) {
  return (
    <div
      className={`inline-flex items-center justify-center px-3 py-2 rounded-lg border font-bold text-sm tracking-wide ${className}`}
      style={{ borderColor: color + '40', color, backgroundColor: color + '10' }}
    >
      {name}
    </div>
  );
}
