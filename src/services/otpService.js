// src/services/otpService.js
// Manajemen OTP: generate, simpan, verifikasi

const OTP_KEY = 'jmu_pending_otp';
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 menit

/**
 * Generate kode OTP 6 digit
 */
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Simpan OTP + data user sementara ke sessionStorage
 * @param {string} otp
 * @param {object} userData - data form registrasi (email, name, password, accountType)
 */
export function savePendingOTP(otp, userData) {
  const payload = {
    otp,
    userData,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
  };
  sessionStorage.setItem(OTP_KEY, JSON.stringify(payload));
}

/**
 * Ambil data OTP yang tersimpan
 */
export function getPendingOTP() {
  try {
    const raw = sessionStorage.getItem(OTP_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Verifikasi OTP yang dimasukkan user
 * @param {string} inputOTP - kode yang diketik user
 * @returns {{ success: boolean, error?: string, userData?: object }}
 */
export function verifyOTP(inputOTP) {
  const pending = getPendingOTP();

  if (!pending) {
    return { success: false, error: 'Sesi OTP tidak ditemukan. Silakan daftar ulang.' };
  }

  if (Date.now() > pending.expiresAt) {
    clearPendingOTP();
    return { success: false, error: 'Kode OTP sudah kadaluarsa. Silakan daftar ulang.' };
  }

  // Tambah counter percobaan
  pending.attempts += 1;
  if (pending.attempts > 5) {
    clearPendingOTP();
    return { success: false, error: 'Terlalu banyak percobaan. Silakan daftar ulang.' };
  }
  sessionStorage.setItem(OTP_KEY, JSON.stringify(pending));

  if (inputOTP.trim() !== pending.otp) {
    const remaining = 5 - pending.attempts;
    return {
      success: false,
      error: `Kode OTP salah. Sisa percobaan: ${remaining}`,
    };
  }

  // OTP benar → kembalikan userData untuk proses registrasi
  clearPendingOTP();
  return { success: true, userData: pending.userData };
}

/**
 * Hapus data OTP dari session
 */
export function clearPendingOTP() {
  sessionStorage.removeItem(OTP_KEY);
}

/**
 * Sisa waktu OTP dalam detik
 */
export function getOTPRemainingSeconds() {
  const pending = getPendingOTP();
  if (!pending) return 0;
  return Math.max(0, Math.floor((pending.expiresAt - Date.now()) / 1000));
}
