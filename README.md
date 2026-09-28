# JMU Academy

**People. Competence. Opportunity. A Better Tomorrow.**

Ekosistem terintegrasi untuk pelatihan, sertifikasi, pengembangan karier, dan kolaborasi profesional.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# Buka http://localhost:5173
```

---

## 📁 Struktur Folder

```
src/
├── components/
│   ├── layout/      # Navbar, Footer
│   ├── ui/          # Button, Input, Toast, ImagePlaceholder
│   ├── home/        # Hero, TrustBar, FourDomains, StatsBar, dll.
│   └── auth/        # LoginModal, RegisterForm
├── pages/           # HomePage, RegisterPage
├── data/seed.js     # Semua data statis
├── services/        # db.js (CRUD layer), authService.js
├── context/         # AuthContext
└── hooks/           # useToast, useCountUp
```

---

## 🎨 Design Tokens (tailwind.config.js)

| Token | Nilai | Digunakan |
|-------|-------|-----------|
| `primary.600` | `#0B5FFF` | Tombol utama |
| `navy` | `#0B1B8C` | Heading |
| `accent.orange` | `#F26A1B` | CTA button |
| `learn` | `#16A34A` | Domain Learn |
| `expert` | `#7C3AED` | Domain Expert |

---

## 🖼️ Mengganti Placeholder dengan Foto Asli

Semua gambar menggunakan `<ImagePlaceholder>`. Untuk mengganti:

1. Tambah file gambar ke `src/assets/images/`
2. Edit komponen yang bersangkutan, ganti `<ImagePlaceholder>` dengan `<img src="..." />`

---

## 🔄 Migrasi dari localStorage ke Backend

Edit `src/services/db.js` — ganti implementasi `getCollection`/`setCollection` dengan fetch ke REST API:

```js
// Ganti ke:
getAll: () => fetch(`${API_URL}/${collectionName}`).then(r => r.json()),
create: (data) => fetch(`${API_URL}/${collectionName}`, { method: 'POST', body: JSON.stringify(data) }).then(r => r.json()),
```

Komponen tidak perlu diubah karena service interface tetap sama.

---

© 2026 JMU Academy. All rights reserved.
