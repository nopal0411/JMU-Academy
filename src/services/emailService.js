// src/services/emailService.js
// Layanan pengiriman email OTP via EmailJS (https://emailjs.com)
// Gratis 200 email/bulan, tanpa backend

import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Inisialisasi emailjs sekali
let initialized = false;
function ensureInit() {
  if (!initialized && PUBLIC_KEY) {
    emailjs.init({ publicKey: PUBLIC_KEY });
    initialized = true;
  }
}

/**
 * Kirim OTP ke email pengguna
 * @param {string} toEmail   - Alamat email tujuan
 * @param {string} toName    - Nama penerima
 * @param {string} otpCode   - Kode OTP 6 digit
 * @returns {Promise<void>}
 */
export async function sendOTPEmail(toEmail, toName, otpCode) {
  ensureInit();

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'Konfigurasi EmailJS belum diatur. Silakan isi VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, dan VITE_EMAILJS_PUBLIC_KEY di file .env'
    );
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    to_email:        toEmail,
    to_name:         toName || toEmail.split('@')[0],
    otp_code:        otpCode,
    expiry_minutes:  '10',
    app_name:        'JMU Academy',
  });
}

/**
 * Cek apakah EmailJS sudah dikonfigurasi
 */
export function isEmailConfigured() {
  return !!(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}
