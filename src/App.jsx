// src/App.jsx
import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import LoginModal from './components/auth/LoginModal.jsx';
import { ToastContainer } from './components/ui/Toast.jsx';
import { useToast } from './hooks/useToast.js';

// Lazy-load pages
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));

// Loading spinner
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#EEF4FF] border-t-[#0B5FFF] rounded-full animate-spin" />
        <p className="text-neutral-400 text-sm">Memuat...</p>
      </div>
    </div>
  );
}

// 404
function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-6xl font-extrabold text-[#EEF4FF]">404</div>
      <h2 className="text-2xl font-bold text-[#0B1B8C]">Halaman tidak ditemukan</h2>
      <p className="text-neutral-500 text-sm text-center max-w-sm">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <a
        href="/"
        className="mt-2 px-6 py-3 bg-[#0B5FFF] text-white font-semibold rounded-lg hover:bg-[#0B4BC0] transition-colors text-sm"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}

function AppShell() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { toasts, removeToast, success, error, info } = useToast();
  const location = useLocation();
  const isRegisterPage = location.pathname === '/daftar';

  function handleLoginSuccess(msg) {
    success(msg || 'Berhasil masuk!');
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <Navbar onLoginClick={() => setLoginOpen(true)} />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage onLoginClick={() => setLoginOpen(true)} />} />
          <Route path="/daftar" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {!isRegisterPage && <Footer />}
      {isRegisterPage && <Footer />}

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}
