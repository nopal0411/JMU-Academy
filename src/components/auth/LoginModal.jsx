// src/components/auth/LoginModal.jsx
import { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, User, Building2, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { loginAccountTypes } from '../../data/seed.js';
import { PasswordInput } from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

const loginSchema = z.object({
  accountType: z.string().min(1, 'Pilih jenis akun'),
  email: z.string().email('Format email tidak valid').min(1, 'Email wajib diisi'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
  remember: z.boolean().optional(),
});

const accountIconMap = {
  personal: User,
  organisasi: Building2,
  asosiasi: Users,
};

function AccountTypeDropdown({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const selected = loginAccountTypes.find((t) => t.id === value);
  const SelectedIcon = selected ? accountIconMap[selected.id] : User;

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-sm font-medium text-neutral-700">
        Jenis Akun
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-2 px-3 py-3 border rounded-lg text-sm bg-white transition-all ${
            error ? 'border-red-400' : open ? 'border-[#0B5FFF] ring-2 ring-[#0B5FFF]' : 'border-neutral-200'
          }`}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <div className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center flex-shrink-0">
            <SelectedIcon className="w-4 h-4 text-[#0B5FFF]" />
          </div>
          <span className={`flex-1 text-left ${selected ? 'text-neutral-700' : 'text-neutral-400'}`}>
            {selected ? selected.label : 'Pilih jenis akun'}
          </span>
          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-modal z-50 overflow-hidden animate-slide-down" role="listbox">
            {loginAccountTypes.map((type) => {
              const Icon = accountIconMap[type.id] || User;
              const isSelected = value === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => { onChange(type.id); setOpen(false); }}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[#F3F7FF] transition-colors ${
                    isSelected ? 'bg-[#EEF4FF]' : ''
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#0B5FFF]" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">{type.label}</p>
                    <p className="text-neutral-500 text-xs mt-0.5 leading-relaxed">{type.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs">⚠ {error}</p>}
    </div>
  );
}

// Logo for modal
function ModalLogo() {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
          <path d="M12 2C9 7 7 9 7 13a5 5 0 0010 0c0-4-2-6-5-11zm0 14a2 2 0 01-2-2c0-1.5 1-2.5 2-4 1 1.5 2 2.5 2 4a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <div>
        <p className="font-extrabold text-[#0B1B8C] text-base leading-none">JMU Academy</p>
        <p className="text-[9px] text-neutral-400 font-medium tracking-wide">Learn • Certify • Grow • Belong</p>
      </div>
    </div>
  );
}

export default function LoginModal({ isOpen, onClose, onRegisterClick, onSuccess }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [accountType, setAccountType] = useState('');
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { accountType: '', email: '', password: '', remember: false },
  });

  // Sync accountType state with form value
  function handleAccountTypeChange(val) {
    setAccountType(val);
    setValue('accountType', val, { shouldValidate: true });
  }

  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  async function onSubmit(data) {
    setLoading(true);
    setServerError('');
    try {
      await login({ email: data.email, password: data.password, remember: data.remember });
      reset();
      setAccountType('');
      onSuccess?.('Selamat datang kembali! Anda berhasil masuk.');
      onClose();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleMockSocial(provider) {
    onSuccess?.(`Fitur masuk dengan ${provider} segera hadir.`);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-modal w-full max-w-md mx-4 overflow-hidden max-h-[95vh] overflow-y-auto animate-slide-up"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
          aria-label="Tutup modal login"
          id="modal-close-btn"
        >
          <X className="w-4 h-4 text-neutral-600" />
        </button>

        {/* Content */}
        <div className="p-7">
          <ModalLogo />

          <h2 id="login-modal-title" className="text-xl font-extrabold text-[#0B1B8C] mb-1">
            Masuk ke JMU Academy
          </h2>
          <p className="text-neutral-500 text-sm mb-5">
            Pilih jenis akun Anda untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            {/* Account Type */}
            <AccountTypeDropdown
              value={accountType}
              onChange={handleAccountTypeChange}
              error={errors.accountType?.message}
            />

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="login-email" className="text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="Masukkan email Anda"
                {...register('email')}
                className={`w-full px-4 py-3 border rounded-lg text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B5FFF] focus:border-transparent transition-all ${
                  errors.email ? 'border-red-400' : 'border-neutral-200'
                }`}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-xs">⚠ {errors.email.message}</p>}
            </div>

            {/* Password */}
            <PasswordInput
              id="login-password"
              label="Kata Sandi"
              placeholder="Masukkan kata sandi"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="login-remember"
                  {...register('remember')}
                  className="w-4 h-4 rounded border-neutral-300 text-[#0B5FFF] focus:ring-[#0B5FFF] accent-[#0B5FFF]"
                />
                <span className="text-sm text-neutral-600">Ingat saya</span>
              </label>
              <a href="/lupa-sandi" className="text-sm text-[#0B5FFF] hover:underline">
                Lupa kata sandi?
              </a>
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-red-600 text-sm">⚠ {serverError}</p>
              </div>
            )}

            {/* Submit */}
            <Button type="submit" variant="primary" fullWidth loading={loading} size="md" id="btn-login-submit">
              Masuk →
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400 font-medium">atau masuk dengan</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleMockSocial('Google')}
              id="btn-login-google"
              className="flex items-center justify-center gap-2 px-3 py-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-700"
            >
              {/* Google icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleMockSocial('Microsoft')}
              id="btn-login-microsoft"
              className="flex items-center justify-center gap-2 px-3 py-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-700"
            >
              {/* Microsoft icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
              </svg>
              Microsoft
            </button>
            <button
              type="button"
              onClick={() => handleMockSocial('SSO')}
              id="btn-login-sso"
              className="flex items-center justify-center gap-2 px-3 py-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-700"
            >
              <svg className="w-4 h-4 text-[#0B5FFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SSO
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-neutral-500 mt-5">
            Belum punya akun?{' '}
            <Link
              to="/daftar"
              onClick={onClose}
              className="text-[#0B5FFF] font-semibold hover:underline"
              id="link-to-register"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
