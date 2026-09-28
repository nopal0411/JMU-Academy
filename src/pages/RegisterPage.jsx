// src/pages/RegisterPage.jsx
import { GraduationCap, Award, TrendingUp, Users, Check, ShieldCheck } from 'lucide-react';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { accountTypes } from '../data/seed.js';
import { useToast } from '../hooks/useToast.js';
import { ToastContainer } from '../components/ui/Toast.jsx';
import ImagePlaceholder from '../components/ui/ImagePlaceholder.jsx';

const leftFeatures = [
  { icon: GraduationCap, label: 'Akses ribuan pelatihan berkualitas' },
  { icon: Award, label: 'Dapatkan sertifikasi dan digital credential' },
  { icon: TrendingUp, label: 'Tingkatkan peluang karier dan jejaring profesional' },
  { icon: Users, label: 'Bersama membangun tenaga kerja yang kompeten dan berdaya saing' },
];

const accountTypeCardIcons = {
  personal: GraduationCap,
  organisasi: Users,
  asosiasi: Users,
};

const accountTypeVariants = {
  personal: 'gradient-career',
  organisasi: 'gradient-learn',
  asosiasi: 'gradient-expert',
};

function AccountTypeCard({ type }) {
  const Icon = accountTypeCardIcons[type.id] || Users;

  return (
    <div className="bg-white rounded-xl border border-neutral-100 shadow-card p-4 flex gap-4 items-start">
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#0B5FFF]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#0B1B8C] text-sm mb-2">{type.label}</h3>
        <ul className="flex flex-col gap-1 mb-3">
          {type.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-neutral-600">
              <Check className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image placeholder */}
      <div className="flex-shrink-0 w-16 rounded-lg overflow-hidden">
        <ImagePlaceholder
          width={64}
          height={80}
          variant={accountTypeVariants[type.id]}
          className="!pb-[125%]"
        />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const { toasts, removeToast, success, error } = useToast();

  return (
    <main className="min-h-screen bg-[#F3F7FF] py-8 px-4">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-start">
          {/* ======== LEFT COLUMN ======== */}
          <div className="lg:col-span-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EEF4FF] text-[#0B5FFF] text-xs font-semibold rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0B5FFF]" />
              Bergabung dengan JMU Academy
            </div>

            {/* Headline */}
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0B1B8C] leading-tight mb-4">
              Satu Platform,
              <br />
              Banyak Peluang
            </h1>

            <p className="text-neutral-600 text-sm leading-relaxed mb-7">
              Daftarkan diri Anda dan jadilah bagian dari ekosistem pembelajaran, sertifikasi, karier, dan kolaborasi profesional bersama JMU Academy.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4 mb-8">
              {leftFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#0B5FFF]" />
                    </div>
                    <span className="text-neutral-700 text-sm font-medium leading-snug">
                      {feat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quote Card */}
            <div className="bg-[#0B1B8C] rounded-xl p-5">
              <div className="text-4xl text-white/30 font-serif leading-none mb-2">"</div>
              <blockquote className="text-white text-sm font-medium italic leading-relaxed mb-3">
                Belajar hari ini, untuk masa depan yang lebih baik.
              </blockquote>
              <p className="text-white/60 text-xs font-medium">— JMU Academy</p>
            </div>
          </div>

          {/* ======== CENTER COLUMN (Form) ======== */}
          <div className="lg:col-span-1">
            <RegisterForm
              onSuccess={(msg) => success(msg)}
              onError={(msg) => error(msg)}
            />
          </div>

          {/* ======== RIGHT COLUMN ======== */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h2 className="font-bold text-[#0B1B8C] text-base leading-snug">
              Pilih Akun yang Sesuai dengan Kebutuhan Anda
            </h2>

            {accountTypes.map((type) => (
              <AccountTypeCard key={type.id} type={type} />
            ))}

            {/* Security Card */}
            <div className="bg-[#EEF4FF] rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B5FFF] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#0B1B8C] text-sm">Data Anda aman bersama kami.</p>
                <p className="text-neutral-600 text-xs mt-0.5 leading-relaxed">
                  Kami menjaga kerahasiaan dan keamanan informasi Anda sesuai standar internasional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
