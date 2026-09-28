// src/services/authService.js
// Authentication service using localStorage + simple hash

import { userService } from './db.js';

// Simple hash menggunakan Web Crypto API (SHA-256)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'jmu_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const SESSION_KEY = 'jmu_session';
const REMEMBER_KEY = 'jmu_remember';

export const authService = {
  // Register pengguna baru
  async register({ email, password, accountType, name }) {
    // Cek duplikat email
    const existing = userService.findOneBy('email', email.toLowerCase());
    if (existing) {
      throw new Error('Email sudah terdaftar. Silakan gunakan email lain atau masuk.');
    }

    const hashedPassword = await hashPassword(password);
    const user = userService.create({
      email: email.toLowerCase(),
      name: name || email.split('@')[0],
      password: hashedPassword,
      accountType,
      avatar: null,
    });

    // Hapus password dari objek yang dikembalikan
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  // Login
  async login({ email, password, accountType, remember = false }) {
    const user = userService.findOneBy('email', email.toLowerCase());
    if (!user) {
      throw new Error('Email tidak ditemukan. Periksa kembali atau daftar akun baru.');
    }

    const hashedPassword = await hashPassword(password);
    if (user.password !== hashedPassword) {
      throw new Error('Kata sandi salah. Silakan coba lagi.');
    }

    if (accountType && user.accountType !== accountType) {
      throw new Error(`Akun ini terdaftar sebagai ${user.accountType}. Pilih jenis akun yang sesuai.`);
    }

    const { password: _, ...safeUser } = user;
    const session = { user: safeUser, loginAt: new Date().toISOString() };

    if (remember) {
      localStorage.setItem(REMEMBER_KEY, JSON.stringify(session));
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return safeUser;
  },

  // Logout
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  },

  // Dapatkan user saat ini dari sesi
  getCurrentUser() {
    try {
      const sessionData =
        sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(REMEMBER_KEY);
      if (!sessionData) return null;
      const session = JSON.parse(sessionData);
      return session.user || null;
    } catch {
      return null;
    }
  },

  // Cek apakah sudah login
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },
};
