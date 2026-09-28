// src/services/seedUsers.js
// Seeder akun demo - dijalankan sekali saat aplikasi pertama dibuka
// Untuk reset: buka DevTools > Application > localStorage > hapus key "jmu_users" & "jmu_seeded"

import { userService } from './db.js';

const SEED_KEY = 'jmu_seeded_v1';

// Hash password menggunakan SHA-256 + salt (sama dengan authService)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'jmu_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Data akun demo
const demoUsers = [
  {
    id: 'demo-personal-001',
    name: 'Siti Rahmawati',
    email: 'personal@demo.com',
    password: 'Demo1234',   // akan di-hash
    accountType: 'personal',
    avatar: null,
    createdAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: 'demo-organisasi-001',
    name: 'PT Maju Bersama',
    email: 'organisasi@demo.com',
    password: 'Demo1234',   // akan di-hash
    accountType: 'organisasi',
    avatar: null,
    createdAt: '2026-02-01T08:00:00.000Z',
  },
  {
    id: 'demo-asosiasi-001',
    name: 'Asosiasi Profesi Indonesia',
    email: 'asosiasi@demo.com',
    password: 'Demo1234',   // akan di-hash
    accountType: 'asosiasi',
    avatar: null,
    createdAt: '2026-03-10T08:00:00.000Z',
  },
];

export async function seedDemoUsers() {
  // Jika sudah pernah di-seed, skip
  if (localStorage.getItem(SEED_KEY)) return;

  try {
    for (const user of demoUsers) {
      // Cek apakah email sudah ada
      const existing = userService.findOneBy('email', user.email);
      if (existing) continue;

      const hashedPassword = await hashPassword(user.password);
      // Insert langsung ke localStorage (bypass userService.create agar id tetap)
      const users = JSON.parse(localStorage.getItem('jmu_users') || '[]');
      users.push({ ...user, password: hashedPassword });
      localStorage.setItem('jmu_users', JSON.stringify(users));
    }

    // Tandai sudah di-seed
    localStorage.setItem(SEED_KEY, 'true');
    console.info('[JMU Academy] ✅ Demo accounts seeded successfully');
  } catch (err) {
    console.warn('[JMU Academy] Seed failed:', err);
  }
}
