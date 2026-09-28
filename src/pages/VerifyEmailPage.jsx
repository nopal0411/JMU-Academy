// src/pages/VerifyEmailPage.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, CheckCircle, RefreshCw, ArrowLeft, ShieldCheck } from 'lucide-react';
import { verifyOTP, getOTPRemainingSeconds, savePendingOTP, generateOTP } from '../services/otpService.js';
import { sendOTPEmail, isEmailConfigured } from '../services/emailService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../hooks/useToast.js';
import { ToastContainer } from '../components/ui/Toast.jsx';
import Button from '../components/ui/Button.jsx';

// ── Komponen 6 kotak input OTP ──────────────────────────────────────────────
function OTPInput({ value, onChange, disabled }) {
  const inputsRef = useRef([]);

  function handleChange(i, e) {
    const val = e.target.value.replace(/\D/g, '').slice(-1); // hanya angka, 1 digit
    const arr = value.split('');
    arr[i] = val;
    const next = arr.join('').padEnd(6, '');
    onChange(next);
    // Auto-focus next
    if (val && i < 5) inputsRef.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace') {
      const arr = value.split('');
      if (!arr[i] && i > 0) {
        arr[i - 1] = '';
        onChange(arr.join('').padEnd(6, ''));
        inputsRef.current[i - 1]?.focus();
      } else {
        arr[i] = '';
        onChange(arr.join('').padEnd(6, ''));
      }
    }
    if (e.key === 'ArrowLeft' && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 5) inputsRef.current[i + 1]?.focus();
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted.padEnd(6, ''));
    // Focus pada digit terakhir yang di-paste
    const focusIdx = Math.min(pasted.length, 5);
    inputsRef.current[focusIdx]?.focus();
  }

  return (
    <div className="flex gap-3 justify-center" role="group" aria-label="Masukkan kode OTP">
      {Array.from({ length: 6 }, (_, i) => {
        const digit = value[i] || '';
        const isFilled = digit !== '';
        return (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            aria-label={`Digit ${i + 1}`}
            className={`
              w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none
              transition-all duration-200 select-none
              ${disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white cursor-text'}
              ${isFilled
                ? 'border-[#0B5FFF] text-[#0B1B8C] bg-[#EEF4FF] shadow-sm'
                : 'border-neutral-200 text-neutral-800 hover:border-neutral-300'
              }
              focus:border-[#0B5FFF] focus:ring-2 focus:ring-[#0B5FFF]/20 focus:bg-[#EEF4FF]
            `}
          />
        );
      })}
    </div>
  );
}

// ── Countdown Timer ──────────────────────────────────────────────────────────
function CountdownTimer({ onExpired }) {
  const [seconds, setSeconds] = useState(getOTPRemainingSeconds());

  useEffect(() => {
    if (seconds <= 0) {
      onExpired?.();
      return;
    }
    const id = setInterval(() => {
      const remaining = getOTPRemainingSeconds();
      setSeconds(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        onExpired?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  if (seconds <= 0) return null;

  return (
    <span
      className={`font-mono font-bold text-base ${seconds <= 60 ? 'text-red-500' : 'text-[#0B5FFF]'}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {mins}:{secs}
    </span>
  );
}

// ── Halaman Utama ────────────────────────────────────────────────────────────
export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const { toasts, removeToast, success, error, info } = useToast();

  // Data dikirim via router state dari RegisterForm
  const email  = location.state?.email  || '';
  const name   = location.state?.name   || '';
  const fromRegister = !!email;

  const [otp, setOtp]             = useState('');
  const [loading, setLoading]     = useState(false);
  const [resending, setResending] = useState(false);
  const [expired, setExpired]     = useState(false);
  const [verified, setVerified]   = useState(false);
  const [errorMsg, setErrorMsg]   = useState('');
  const [resendCooldown, setResendCooldown] = useState(0); // detik cooldown kirim ulang

  // Jika tidak ada email (akses langsung), redirect ke daftar
  useEffect(() => {
    if (!fromRegister) {
      navigate('/daftar', { replace: true });
    }
  }, [fromRegister, navigate]);

  // Cooldown kirim ulang
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(id); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  // Submit OTP
  async function handleVerify() {
    if (otp.replace(/\s/g, '').length < 6) {
      setErrorMsg('Masukkan 6 digit kode OTP.');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const result = verifyOTP(otp);
      if (!result.success) {
        setErrorMsg(result.error);
        setOtp('');
        return;
      }

      // OTP valid → buat akun
      await register(result.userData);
      setVerified(true);
      success('Email berhasil diverifikasi! Akun Anda sudah aktif.');

      // Redirect ke beranda setelah 2 detik
      setTimeout(() => navigate('/', { replace: true }), 2000);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Kirim ulang OTP
  async function handleResend() {
    if (resendCooldown > 0) return;
    setResending(true);
    setErrorMsg('');
    setExpired(false);
    setOtp('');

    try {
      const newOtp      = generateOTP();
      const userData    = location.state?.userData;
      savePendingOTP(newOtp, userData);

      if (isEmailConfigured()) {
        await sendOTPEmail(email, name, newOtp);
        info(`Kode OTP baru telah dikirim ke ${email}`);
      } else {
        // Dev mode: tampilkan OTP di toast
        info(`[DEV] Kode OTP baru: ${newOtp}`);
      }

      setResendCooldown(60); // cooldown 60 detik
    } catch (err) {
      error('Gagal mengirim ulang OTP. Coba lagi.');
    } finally {
      setResending(false);
    }
  }

  // Saat OTP berubah, hapus error
  function handleOTPChange(val) {
    setOtp(val);
    if (errorMsg) setErrorMsg('');
  }

  // Auto-submit ketika 6 digit terisi
  useEffect(() => {
    if (otp.replace(/\s/g, '').length === 6 && !loading && !verified) {
      handleVerify();
    }
  }, [otp]);

  // ── Email tidak dikenal / akses langsung ─────────────────────────────────
  if (!fromRegister) return null;

  // ── Sukses verifikasi ─────────────────────────────────────────────────────
  if (verified) {
    return (
      <div className="min-h-screen bg-[#F3F7FF] flex items-center justify-center px-4">
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        <div className="bg-white rounded-2xl shadow-card p-10 max-w-sm w-full text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0B1B8C] mb-2">Email Terverifikasi!</h2>
          <p className="text-neutral-500 text-sm mb-4">
            Akun Anda sudah aktif. Mengalihkan ke beranda...
          </p>
          <div className="w-8 h-8 border-4 border-[#EEF4FF] border-t-[#0B5FFF] rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // ── Halaman verifikasi OTP ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F3F7FF] flex items-center justify-center px-4 py-10">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate('/daftar')}
          className="flex items-center gap-2 text-neutral-500 hover:text-[#0B5FFF] text-sm font-medium mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Pendaftaran
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {/* Header biru */}
          <div
            className="px-8 pt-8 pb-6 text-white text-center"
            style={{ background: 'linear-gradient(135deg, #0B1B8C 0%, #1560F0 100%)' }}
          >
            {/* Ikon amplop animasi */}
            <div className="relative inline-block mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              {/* Badge shield */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>

            <h1 className="text-xl font-extrabold mb-1">Verifikasi Email Anda</h1>
            <p className="text-white/75 text-sm leading-relaxed">
              Kami telah mengirim kode <span className="font-bold text-white">6 digit</span> ke
            </p>
            <p className="text-orange-300 font-bold text-sm mt-1 break-all">{email}</p>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            {/* Timer */}
            {!expired ? (
              <div className="flex items-center justify-center gap-2 mb-6 text-sm text-neutral-500">
                <span>Kode berlaku selama</span>
                <CountdownTimer onExpired={() => setExpired(true)} />
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 text-center">
                <p className="text-red-600 text-sm font-medium">
                  ⏰ Kode OTP sudah kadaluarsa. Kirim ulang untuk mendapatkan kode baru.
                </p>
              </div>
            )}

            {/* Label */}
            <p className="text-center text-sm font-medium text-neutral-600 mb-4">
              Masukkan kode OTP
            </p>

            {/* OTP Input */}
            <OTPInput
              value={otp}
              onChange={handleOTPChange}
              disabled={loading || verified || expired}
            />

            {/* Error */}
            {errorMsg && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center animate-fade-in">
                <p className="text-red-600 text-sm">⚠ {errorMsg}</p>
              </div>
            )}

            {/* Verify Button */}
            <div className="mt-6">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
                disabled={otp.replace(/\s/g, '').length < 6 || expired || verified}
                onClick={handleVerify}
                id="btn-verify-otp"
              >
                {loading ? 'Memverifikasi...' : 'Verifikasi & Buat Akun →'}
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-neutral-100" />
              <span className="text-xs text-neutral-400">tidak menerima email?</span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            {/* Resend */}
            <button
              onClick={handleResend}
              disabled={resending || resendCooldown > 0}
              id="btn-resend-otp"
              className={`
                w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold
                border-2 transition-all duration-200
                ${resendCooldown > 0 || resending
                  ? 'border-neutral-100 text-neutral-300 cursor-not-allowed bg-neutral-50'
                  : 'border-[#0B5FFF] text-[#0B5FFF] hover:bg-[#EEF4FF] cursor-pointer'
                }
              `}
            >
              <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
              {resending
                ? 'Mengirim ulang...'
                : resendCooldown > 0
                ? `Kirim Ulang (${resendCooldown}s)`
                : 'Kirim Ulang Kode OTP'}
            </button>

            {/* Pesan cek spam */}
            <p className="text-center text-xs text-neutral-400 mt-4 leading-relaxed">
              Cek folder <span className="font-medium">Spam / Promosi</span> jika email tidak masuk dalam beberapa menit.
            </p>
          </div>

          {/* Footer card */}
          <div className="px-8 pb-6">
            <div className="bg-[#F3F7FF] rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0B5FFF] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-500 leading-relaxed">
                Kode ini bersifat rahasia dan hanya berlaku <strong>10 menit</strong>. Jangan bagikan kode ini kepada siapapun, termasuk tim JMU Academy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
