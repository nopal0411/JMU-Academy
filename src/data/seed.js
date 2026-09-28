// src/data/seed.js
// Seed data for JMU Academy - semua data statis diambil dari sini

export const statistics = [
  { id: 1, value: 250000, suffix: '+', label: 'Profesional Terdaftar', icon: 'users' },
  { id: 2, value: 1250, suffix: '+', label: 'Program Pembelajaran', icon: 'book-open' },
  { id: 3, value: 320, suffix: '+', label: 'Skema Sertifikasi', icon: 'award' },
  { id: 4, value: 2850, suffix: '+', label: 'Perusahaan Mitra', icon: 'building-2' },
  { id: 5, value: 150, suffix: '+', label: 'Asosiasi Profesi', icon: 'network' },
  { id: 6, value: 45000, suffix: '+', label: 'Peluang Karier & Proyek', icon: 'briefcase' },
  { id: 7, value: 98, suffix: '%', label: 'Tingkat Kepuasan', icon: 'star' },
];

export const domains = [
  {
    id: 'career',
    title: 'Career',
    subtitle: 'Career & Talent Intelligence Network',
    description: 'Kenali nilai Anda, temukan peluang, dan bangun masa depan karier.',
    color: '#1560F0',
    bgColor: '#EEF4FF',
    buttonColor: 'bg-[#1560F0]',
    buttonHover: 'hover:bg-[#0B4BC0]',
    buttonLabel: 'Jelajahi Career',
    icon: 'briefcase',
    gradientFrom: '#1E40AF',
    gradientTo: '#1560F0',
  },
  {
    id: 'learn',
    title: 'Learn',
    subtitle: 'Learning, Development & Certification',
    description: 'Belajar, berkembang, buktikan kompetensi, dan raih pengakuan.',
    color: '#16A34A',
    bgColor: '#F0FDF4',
    buttonColor: 'bg-[#16A34A]',
    buttonHover: 'hover:bg-[#15803D]',
    buttonLabel: 'Jelajahi Learn',
    icon: 'book-open',
    gradientFrom: '#166534',
    gradientTo: '#16A34A',
  },
  {
    id: 'business',
    title: 'Business',
    subtitle: 'Business Solutions',
    description: 'Solusi strategis untuk pengembangan organisasi dan peningkatan kinerja berbasis kompetensi.',
    color: '#F26A1B',
    bgColor: '#FFF7ED',
    buttonColor: 'bg-[#F26A1B]',
    buttonHover: 'hover:bg-[#D4560E]',
    buttonLabel: 'Jelajahi Business',
    icon: 'building-2',
    gradientFrom: '#9A3412',
    gradientTo: '#F26A1B',
  },
  {
    id: 'expert',
    title: 'Expert',
    subtitle: 'Expert Knowledge & Opportunity Network',
    description: 'Ubah keahlian dan pengetahuan Anda menjadi dampak nyata dan peluang ekonomi.',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    buttonColor: 'bg-[#7C3AED]',
    buttonHover: 'hover:bg-[#6D28D9]',
    buttonLabel: 'Jelajahi Expert',
    icon: 'users',
    gradientFrom: '#4C1D95',
    gradientTo: '#7C3AED',
  },
];

export const trustItems = [
  { id: 1, label: 'Pelatihan Berkualitas', icon: 'shield-check' },
  { id: 2, label: 'Sertifikasi Terpercaya', icon: 'award' },
  { id: 3, label: 'Diakui Industri', icon: 'building' },
  { id: 4, label: 'Terhubung dengan Asosiasi', icon: 'network' },
  { id: 5, label: 'Berbasis Data & AI', icon: 'brain-circuit' },
  { id: 6, label: 'Peluang Karier Global', icon: 'globe' },
];

export const whyJMU = [
  {
    id: 1,
    icon: 'shield-check',
    title: 'Terverifikasi & Terakreditasi',
    description: 'Standar nasional dan internasional',
    color: '#0B5FFF',
  },
  {
    id: 2,
    icon: 'bar-chart-2',
    title: 'Berbasis Data & AI',
    description: 'Rekomendasi personal dan insight pasar',
    color: '#F26A1B',
  },
  {
    id: 3,
    icon: 'users',
    title: 'Terhubung dengan Industri',
    description: 'Peluang nyata dan kolaborasi profesional',
    color: '#0B5FFF',
  },
  {
    id: 4,
    icon: 'trending-up',
    title: 'Pengembangan Berkelanjutan',
    description: 'Learning, certification dan CPD',
    color: '#16A34A',
  },
  {
    id: 5,
    icon: 'layers',
    title: 'Ekosistem Terintegrasi',
    description: 'Individu, organisasi dan para expert',
    color: '#7C3AED',
  },
  {
    id: 6,
    icon: 'heart',
    title: 'Dampak untuk Masa Depan',
    description: 'Profesional yang lebih baik, organisasi yang lebih kuat, masyarakat yang lebih aman',
    color: '#EF4444',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Siti Rahmawati',
    role: 'HSE Professional',
    company: 'PT Pertamina',
    rating: 5,
    text: '"JMU Academy membantu saya meningkatkan kompetensi dan membuka peluang karier baru, di industri yang saya impikan."',
    avatar: null,
  },
  {
    id: 2,
    name: 'Budi Santoso',
    role: 'Quality Manager',
    company: 'PT Astra International',
    rating: 5,
    text: '"Platform terlengkap untuk pengembangan profesional. Sertifikasi yang saya dapatkan langsung diakui oleh industri."',
    avatar: null,
  },
  {
    id: 3,
    name: 'Dewi Kusuma',
    role: 'HR Director',
    company: 'PT PLN',
    rating: 5,
    text: '"Ekosistem JMU Academy memungkinkan kami mengelola pengembangan talenta perusahaan secara menyeluruh dan terstruktur."',
    avatar: null,
  },
];

export const successStory = {
  name: 'Andi Pratama',
  role: 'Quality Management Consultant',
  company: 'Independent Consultant',
  text: '"Dari peserta training menjadi konsultan, semua dimulai dari JMU Academy."',
  avatar: null,
};

export const strategicPartners = [
  { id: 1, name: 'Pertamina', shortName: 'PERTAMINA', color: '#1B6EC2' },
  { id: 2, name: 'PLN', shortName: 'PLN', color: '#FFD700' },
  { id: 3, name: 'Astra', shortName: 'ASTRA', color: '#E31E24' },
  { id: 4, name: 'Unilever', shortName: 'Unilever', color: '#003C88' },
  { id: 5, name: 'SIG', shortName: 'SIG', color: '#E31E24' },
  { id: 6, name: 'Telkom Indonesia', shortName: 'Telkom', color: '#E31E24' },
  { id: 7, name: 'Adaro', shortName: 'adaro', color: '#0077B6' },
  { id: 8, name: 'Mind ID', shortName: 'MIND ID', color: '#003366' },
];

export const associations = [
  { id: 1, name: 'AHLI K3 INDONESIA', shortName: 'AHLI K3', color: '#0B5FFF' },
  { id: 2, name: 'IAI', shortName: 'IAI', color: '#1E2A78' },
  { id: 3, name: 'IEMA', shortName: 'IEMA', color: '#16A34A' },
  { id: 4, name: 'ASQ', shortName: 'ASQ', color: '#EF4444' },
  { id: 5, name: 'APMI', shortName: 'APMI', color: '#F26A1B' },
];

export const associationFeatures = [
  { id: 1, icon: 'users', label: 'Keanggotaan Profesional' },
  { id: 2, icon: 'book-open', label: 'Program CPD Bersama' },
  { id: 3, icon: 'calendar', label: 'Seminar & Konferensi' },
  { id: 4, icon: 'file-text', label: 'Publikasi & Riset' },
  { id: 5, icon: 'award', label: 'Pengakuan Kompetensi' },
];

export const news = [
  {
    id: 1,
    category: 'Artikel',
    date: '19 Nov 2026',
    title: 'Tren Kompetensi 2026: Skill yang Paling Dicari Industri',
    image: null,
    slug: 'tren-kompetensi-2026',
  },
  {
    id: 2,
    category: 'Berita',
    date: '12 Nov 2026',
    title: 'JMU Academy Jalin Kerjasama dengan PLN untuk Pengembangan Kompetensi Talenta',
    image: null,
    slug: 'kerjasama-pln',
  },
  {
    id: 3,
    category: 'Artikel',
    date: '08 Nov 2026',
    title: 'Peran AI dalam Pengembangan Kompetensi dan Karier',
    image: null,
    slug: 'peran-ai-kompetensi',
  },
];

export const events = [
  {
    id: 1,
    day: '15',
    month: 'NOV',
    year: '2026',
    title: 'Indonesia HSE Forum 2026',
    location: 'Jakarta Convention Center',
    type: 'Konferensi',
    mode: 'Hybrid',
    modeColor: 'blue',
    slug: 'indonesia-hse-forum-2026',
  },
  {
    id: 2,
    day: '22',
    month: 'NOV',
    year: '2026',
    title: 'Expert Masterclass: AI for Safety Management',
    location: 'Online',
    type: 'Webinar',
    mode: 'Online',
    modeColor: 'green',
    slug: 'expert-masterclass-ai',
  },
  {
    id: 3,
    day: '05',
    month: 'DES',
    year: '2026',
    title: 'HSE Leaders Roundtable',
    location: 'Bandung',
    type: 'Roundtable',
    mode: 'On-site',
    modeColor: 'orange',
    slug: 'hse-leaders-roundtable',
  },
];

export const accountTypes = [
  {
    id: 'personal',
    label: 'Personal / Individu',
    description: 'Untuk profesional, siswa, trainer, assessor, konsultan, dan individu lainnya.',
    icon: 'user',
    features: ['Ikuti pelatihan', 'Dapatkan sertifikasi', 'Kembangkan karier', 'Bangun portofolio'],
  },
  {
    id: 'organisasi',
    label: 'Organisasi / Perusahaan',
    description: 'Untuk perusahaan, institusi, lembaga pelatihan, dan organisasi bisnis.',
    icon: 'building-2',
    features: ['Kelola karyawan', 'Ikuti program pelatihan', 'Ajukan sertifikasi', 'Akses solusi bisnis'],
  },
  {
    id: 'asosiasi',
    label: 'Asosiasi',
    description: 'Untuk asosiasi profesi, komunitas, dan organisasi nirlaba.',
    icon: 'users',
    features: ['Kelola anggota', 'Kolaborasi program', 'Dukung pengembangan kompetensi', 'Perluas jejaring'],
  },
];

export const loginAccountTypes = [
  {
    id: 'personal',
    label: 'Personal / Individu',
    description: 'Untuk profesional, pelajar, trainer, assessor, konsultan, dan individu lainnya.',
    icon: 'user',
  },
  {
    id: 'organisasi',
    label: 'Organisasi / Perusahaan',
    description: 'Untuk perusahaan, instansi, dan organisasi bisnis.',
    icon: 'building-2',
  },
  {
    id: 'asosiasi',
    label: 'Asosiasi / Institusi',
    description: 'Untuk asosiasi profesi, lembaga, dan institusi pendukung.',
    icon: 'users',
  },
];

export const ctaIcons = [
  { id: 1, icon: 'book-open', label: 'Belajar\ntanpa Batas' },
  { id: 2, icon: 'award', label: 'Kompetensi\nTerverifikasi' },
  { id: 3, icon: 'briefcase', label: 'Peluang\nLebih Luas' },
  { id: 4, icon: 'zap', label: 'Dampak\nNyata' },
];
