import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#events', label: 'Events' },
    { href: '#clubs', label: 'Clubs' },
    { href: '#hackathons', label: 'Hackathons' },
    { href: '#register', label: 'Register' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 px-4 md:px-8'
          : 'py-5 px-4 md:px-8'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0F2557]/80 backdrop-blur-xl rounded-full px-6 py-2 shadow-2xl border border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2B71F8] to-[#5B9AFF] flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className={`font-bold text-lg text-white transition-all ${isScrolled ? 'hidden md:block' : ''}`}>
              SRM Events
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#2B71F8] group-hover:w-1/2 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA / User */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-[#2B71F8] flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm text-white/90">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Button
                className="bg-[#2B71F8] hover:bg-[#5B9AFF] text-white rounded-full px-6 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#2B71F8]/30"
                asChild
              >
                <a href="/login">Login</a>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-4 right-4 mt-2 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-[#0F2557]/95 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          {isAuthenticated ? (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-[#2B71F8] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-white/50 text-xs">{user?.regNumber}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-2 flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <Button className="w-full mt-4 bg-[#2B71F8] hover:bg-[#5B9AFF] text-white rounded-full" asChild>
              <a href="/login">Login</a>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
