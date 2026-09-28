// src/components/ui/Input.jsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Input field dengan label, error, dan ikon opsional
 */
export function Input({
  label,
  error,
  icon: Icon,
  rightIcon,
  className = '',
  id,
  required,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          className={`
            w-full px-4 py-3 border rounded-lg text-neutral-700 placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-[#0B5FFF] focus:border-transparent
            transition-all duration-200 text-sm bg-white
            ${Icon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200'}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

/**
 * Password field dengan toggle tampil/sembunyi
 */
export function PasswordInput({ label, error, id, className = '', required, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className={`
            w-full pl-10 pr-10 py-3 border rounded-lg text-neutral-700 placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-[#0B5FFF] focus:border-transparent
            transition-all duration-200 text-sm bg-white
            ${error ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200'}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

export default Input;
