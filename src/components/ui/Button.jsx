// src/components/ui/Button.jsx
import { Loader2 } from 'lucide-react';

/**
 * Button komponen reusable
 * @param {string} variant - 'primary' | 'secondary' | 'orange' | 'outline' | 'outline-white' | 'ghost' | 'danger'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} loading
 * @param {boolean} fullWidth
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-[#0B5FFF] text-white hover:bg-[#0B4BC0] active:bg-[#0A3FA8] focus:ring-[#0B5FFF] shadow-sm hover:shadow-md',
    secondary:
      'bg-navy text-white hover:bg-navy-medium active:bg-navy-dark focus:ring-navy shadow-sm',
    orange:
      'bg-[#F26A1B] text-white hover:bg-[#D4560E] active:bg-[#B84A0B] focus:ring-[#F26A1B] shadow-sm hover:shadow-md',
    outline:
      'border-2 border-[#0B5FFF] text-[#0B5FFF] hover:bg-[#0B5FFF] hover:text-white focus:ring-[#0B5FFF]',
    'outline-white':
      'border-2 border-white text-white hover:bg-white hover:text-[#0B1B8C] focus:ring-white',
    'outline-gray':
      'border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 focus:ring-neutral-400',
    ghost:
      'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-400',
    danger:
      'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
