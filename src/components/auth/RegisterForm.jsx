// src/components/auth/RegisterForm.jsx
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, User, Building2, Users, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { accountTypes } from '../../data/seed.js';
import { PasswordInput } from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { generateOTP, savePendingOTP } from '../../services/otpService.js';
import { sendOTPEmail, isEmailConfigured } from '../../services/emailService.js';

const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  accountType: z.string().min(1, 'Pilih jenis akun'),
  password: z
    .string()
    .min(8, 'Kata sandi minimal 8 karakter')
    .regex(/[A-Z]/, 'Minimal 1 huruf kapital')
    .regex(/[0-9]/, 'Minimal 1 angka'),
  confirmPassword: z.string(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'Anda harus menyetujui Syarat dan Ketentuan' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Konfirmasi kata sandi tidak cocok',
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

  const selected = accountTypes.find((t) => t.id === value);
  const SelectedIcon = selected ? accountIconMap[selected.id] : User;

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-sm font-medium text-neutral-700">
        Jenis Akun <span className="text-red-500">*</span>
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
          id="account-type-trigger"
        >
          <div className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center flex-shrink-0">
            <SelectedIcon className="w-4 h-4 text-[#0B5FFF]" />
          </div>
          <span className={`flex-1 text-left ${selected ? 'text-neutral-700' : 'text-neutral-400'}`}>
            {selected ? selected.label : 'Pilih jenis akun'}
          </span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          )}
        </button>

        {open && (
          <div
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-modal z-30 overflow-hidden animate-slide-down"
            role="listbox"
          >
            {accountTypes.map((type) => {
              const Icon = accountIconMap[type.id] || User;
              const isSelected = value === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => { onChange(type.id); setOpen(false); }}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-[#F3F7FF] transition-colors border-b border-neutral-50 last:border-0 ${
                    isSelected ? 'bg-[#EEF4FF]' : ''
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#EEF4FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#0B5FFF]" />
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

export default function RegisterForm({ onSuccess, onError }) {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [accountType, setAccountType] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      accountType: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  function handleAccountTypeChange(val) {
    setAccountType(val);
    setValue('accountType', val, { shouldValidate: true });
  }

  async function onSubmit(data) {
    setLoading(true);
    setServerError('');
    try {
      // 1. Cek apakah email sudah terdaftar
      const { userService } = await import('../../services/db.js');
      const existing = userService.findOneBy('email', data.email.toLowerCase());
      if (existing) {
        throw new Error('Email sudah terdaftar. Silakan gunakan email lain atau masuk.');
      }

      // 2. Generate OTP & simpan data sementara
      const otp = generateOTP();
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        accountType: data.accountType,
      };
      savePendingOTP(otp, userData);

      // 3. Kirim OTP ke email
      if (isEmailConfigured()) {
        await sendOTPEmail(data.email, data.name, otp);
        onSuccess?.(`Kode OTP telah dikirim ke ${data.email}`);
      } else {
        // Mode development: tampilkan OTP di konsol & pesan
        console.info(`[DEV MODE] Kode OTP untuk ${data.email}: ${otp}`);
        onSuccess?.(`[DEV] Kode OTP: ${otp} (cek konsol browser)`);
      }

      // 4. Redirect ke halaman verifikasi
      navigate('/verifikasi-email', {
        state: { email: data.email, name: data.name, userData },
      });
    } catch (err) {
      setServerError(err.message);
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleMockSocial(provider) {
    onError?.(`Fitur daftar dengan ${provider} segera hadir.`);
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-7">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center">
          <User className="w-5 h-5 text-[#0B5FFF]" />
        </div>
        <div>
          <h2 className="font-extrabold text-[#0B1B8C] text-xl leading-tight">Buat Akun Baru</h2>
          <p className="text-neutral-500 text-xs">Pilih jenis akun Anda untuk memulai.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {/* Account Type Dropdown */}
        <AccountTypeDropdown
          value={accountType}
          onChange={handleAccountTypeChange}
          error={errors.accountType?.message}
        />

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reg-name" className="text-sm font-medium text-neutral-700">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            placeholder="Masukkan nama lengkap"
            {...register('name')}
            className={`w-full px-4 py-3 border rounded-lg text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B5FFF] focus:border-transparent transition-all ${
              errors.name ? 'border-red-400' : 'border-neutral-200'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs">⚠ {errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="reg-email" className="text-sm font-medium text-neutral-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="Masukkan email Anda"
            {...register('email')}
            className={`w-full px-4 py-3 border rounded-lg text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B5FFF] focus:border-transparent transition-all ${
              errors.email ? 'border-red-400' : 'border-neutral-200'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs">⚠ {errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="grid grid-cols-2 gap-3">
          <PasswordInput
            id="reg-password"
            label="Kata Sandi"
            placeholder="Buat kata sandi"
            autoComplete="new-password"
            required
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordInput
            id="reg-confirm-password"
            label="Konfirmasi Kata Sandi"
            placeholder="Ulangi kata sandi"
            autoComplete="new-password"
            required
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              id="reg-agree-terms"
              {...register('agreeTerms')}
              className="w-4 h-4 mt-0.5 rounded border-neutral-300 accent-[#0B5FFF] flex-shrink-0"
            />
            <span className="text-xs text-neutral-600 leading-relaxed">
              Saya telah membaca dan menyetujui{' '}
              <a href="/syarat-ketentuan" className="text-[#0B5FFF] hover:underline font-medium">
                Syarat dan Ketentuan
              </a>{' '}
              serta{' '}
              <a href="/kebijakan-privasi" className="text-[#0B5FFF] hover:underline font-medium">
                Kebijakan Privasi
              </a>{' '}
              JMU Academy.
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-red-500 text-xs mt-1">⚠ {errors.agreeTerms.message}</p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <p className="text-red-600 text-sm">⚠ {serverError}</p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          size="lg"
          id="btn-daftar-sekarang"
        >
          Daftar Sekarang
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="text-xs text-neutral-400 font-medium">atau daftar dengan</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      {/* Social Register */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => handleMockSocial('Google')}
          id="btn-reg-google"
          className="flex items-center justify-center gap-2 px-3 py-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-700"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Daftar dengan Google
        </button>
        <button
          type="button"
          onClick={() => handleMockSocial('LinkedIn')}
          id="btn-reg-linkedin"
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0077B5] text-white rounded-lg hover:bg-[#006699] transition-colors text-xs font-semibold"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Daftar dengan LinkedIn
        </button>
        <button
          type="button"
          onClick={() => handleMockSocial('Microsoft')}
          id="btn-reg-microsoft"
          className="flex items-center justify-center gap-2 px-3 py-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-700"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
            <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
            <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
            <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
          </svg>
          Daftar dengan Microsoft
        </button>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-neutral-500 mt-5">
        Sudah punya akun?{' '}
        <Link to="/" className="text-[#0B5FFF] font-semibold hover:underline" id="link-to-login">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
