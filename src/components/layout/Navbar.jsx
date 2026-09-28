// src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Globe,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { AvatarPlaceholder } from '../ui/ImagePlaceholder.jsx';

// Logo SVG
function JMULogo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 flex-shrink-0 ${className}`} aria-label="JMU Academy - Beranda">
      {/* Flame/torch icon */}
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
          <path d="M12 2C9 7 7 9 7 13a5 5 0 0010 0c0-4-2-6-5-11zm0 14a2 2 0 01-2-2c0-1.5 1-2.5 2-4 1 1.5 2 2.5 2 4a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-extrabold text-[#0B1B8C] text-lg leading-none tracking-tight">
          JMU Academy
        </span>
        <span className="text-[9px] text-neutral-500 font-medium tracking-wide leading-tight">
          Learn • Certify • Grow • Belong
        </span>
      </div>
    </Link>
  );
}

const navLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Career', path: '/career' },
  { label: 'Learn', path: '/learn' },
  { label: 'Business', path: '/business' },
  { label: 'Expert', path: '/expert' },
];

export default function Navbar({ onLoginClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  function handleLogout() {
    logout();
    setProfileOpen(false);
    navigate('/');
  }

  function handleSearch(e) {
    e.preventDefault();
    // TODO: implement search
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-nav' : 'border-b border-neutral-100'
      }`}
      role="banner"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">
          {/* Logo */}
          <JMULogo />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label="Navigasi utama">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${
                    isActive
                      ? 'text-[#0B5FFF] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#0B5FFF] after:rounded-full'
                      : 'text-neutral-700 hover:text-[#0B5FFF]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xs lg:max-w-sm xl:max-w-md mx-3"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pelatihan, sertifikasi, talenta, atau solusi bisnis..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B5FFF] focus:bg-white transition-all"
                aria-label="Cari pelatihan"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            {/* Verify Credential - hanya di beranda */}
            {isHome && (
              <button className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B5FFF] border border-[#0B5FFF] rounded-lg hover:bg-[#EEF4FF] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Verify Credential
              </button>
            )}

            {/* Language Selector */}
            <button className="hidden sm:flex items-center gap-1 px-2 py-2 text-xs font-medium text-neutral-700 hover:text-[#0B5FFF] transition-colors border border-neutral-200 rounded-lg">
              <Globe className="w-3.5 h-3.5" />
              <span>ID</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Auth Buttons / User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                  id="profile-button"
                >
                  <AvatarPlaceholder size={32} name={user?.name || 'U'} />
                  <span className="hidden sm:block text-sm font-medium text-neutral-700 max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-modal border border-neutral-100 py-1 z-50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-800 truncate">{user?.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => navigate('/profil')}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <User className="w-4 h-4" /> Profil Saya
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  id="btn-masuk"
                  className="hidden sm:flex items-center px-4 py-2 text-sm font-semibold text-neutral-700 border border-neutral-200 rounded-lg hover:border-[#0B5FFF] hover:text-[#0B5FFF] transition-colors"
                >
                  Masuk
                </button>
                <Link
                  to="/daftar"
                  id="btn-daftar"
                  className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#0B5FFF] rounded-lg hover:bg-[#0B4BC0] transition-colors shadow-sm"
                >
                  Daftar
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-neutral-100 py-3 pb-4 animate-slide-down">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="search"
                  placeholder="Cari pelatihan, sertifikasi..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-neutral-200 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#0B5FFF]"
                />
              </div>
            </form>
            {/* Mobile Nav */}
            <nav className="flex flex-col" aria-label="Navigasi mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-2 py-3 text-sm font-medium border-b border-neutral-50 transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#0B5FFF]'
                      : 'text-neutral-700 hover:text-[#0B5FFF]'
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              ))}
            </nav>
            {/* Mobile Auth */}
            {!isAuthenticated && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => { onLoginClick(); setMobileOpen(false); }}
                  className="flex-1 py-2.5 text-sm font-semibold text-neutral-700 border border-neutral-200 rounded-lg hover:border-[#0B5FFF] hover:text-[#0B5FFF] transition-colors"
                >
                  Masuk
                </button>
                <Link
                  to="/daftar"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2.5 text-sm font-semibold text-white text-center bg-[#0B5FFF] rounded-lg hover:bg-[#0B4BC0] transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export { JMULogo };
