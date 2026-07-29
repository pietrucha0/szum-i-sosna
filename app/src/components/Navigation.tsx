import { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(id, { offset: -72 });
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Apartament', target: '#apartament' },
    { label: 'Galeria', target: '#galeria' },
    { label: 'Okolica', target: '#okolica' },
    { label: 'Kontakt', target: '#kontakt' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-[400ms] ease-out"
        style={{
          height: 72,
          background: isScrolled ? 'rgba(250, 248, 245, 0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="mx-auto flex h-full items-center justify-between px-6 lg:px-12" style={{ maxWidth: 1200 }}>
          {/* Brand */}
          <button
            onClick={() => scrollTo('#hero')}
            className="font-display text-[20px] font-normal tracking-[-0.01em] transition-colors duration-[400ms]"
            style={{ color: isScrolled ? '#1f2421' : '#ffffff' }}
          >
            Szum i Sosna
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="relative font-body text-[14px] font-normal tracking-[0.02em] transition-colors duration-[400ms] hover:opacity-70"
                style={{ color: isScrolled ? '#1f2421' : '#ffffff' }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://client24006.idobooking.com/book-now/index.php?ob[77]"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body text-[13px] font-medium tracking-[0.04em] transition-all duration-300 hover:translate-y-[-1px]"
              style={{
                background: '#1f2421',
                color: '#faf8f5',
                padding: '10px 28px',
                borderRadius: 24,
              }}
            >
              Zarezerwuj
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-[5px] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[1.5px] w-6 transition-all duration-300"
              style={{
                background: isScrolled ? '#1f2421' : '#ffffff',
                transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
              }}
            />
            <span
              className="block h-[1.5px] w-6 transition-all duration-300"
              style={{
                background: isScrolled ? '#1f2421' : '#ffffff',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[1.5px] w-6 transition-all duration-300"
              style={{
                background: isScrolled ? '#1f2421' : '#ffffff',
                transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className="fixed inset-0 z-[99] transition-all duration-500 md:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute right-0 top-0 h-full w-[280px] transition-transform duration-500 ease-out"
          style={{
            background: '#faf8f5',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <div className="flex flex-col gap-6 px-8 pt-24">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="text-left font-body text-[18px] font-normal"
                style={{ color: '#1f2421' }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://client24006.idobooking.com/book-now/index.php?ob[77]"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-block text-center font-body text-[14px] font-medium tracking-[0.04em]"
              style={{
                background: '#1f2421',
                color: '#faf8f5',
                padding: '12px 28px',
                borderRadius: 24,
              }}
            >
              Zarezerwuj
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
