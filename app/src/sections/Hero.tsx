import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import OceanCanvas from '../components/OceanCanvas';

interface HeroProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const h1Line1Ref = useRef<HTMLSpanElement>(null);
  const h1Line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to(
        h1Line1Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        h1Line2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.75'
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        chevronRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToContact = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#kontakt', { offset: -72 });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 520 }}
    >
      {/* WebGL Ocean Background */}
      <OceanCanvas />

      {/* Soft radial overlay for text readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,0,0,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6"
        style={{ paddingTop: '0' }}
      >
        <div className="text-center" style={{ marginTop: '-4vh' }}>
          <span
            ref={labelRef}
            className="mb-4 inline-block font-body text-[11px] sm:text-[12px] font-medium uppercase opacity-0"
            style={{
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.15em',
              transform: 'translateY(20px)',
            }}
          >
            APARTAMENT NAD MORZEM
          </span>

          <h1 className="font-display font-normal" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <span
              ref={h1Line1Ref}
              className="block opacity-0"
              style={{
                color: '#ffffff',
                textShadow: '0 2px 30px rgba(0,0,0,0.25)',
                fontSize: 'clamp(38px, 8vw, 96px)',
                transform: 'translateY(30px)',
              }}
            >
              Twój azyl
            </span>
            <span
              ref={h1Line2Ref}
              className="block opacity-0"
              style={{
                color: '#ffffff',
                textShadow: '0 2px 30px rgba(0,0,0,0.25)',
                fontSize: 'clamp(38px, 8vw, 96px)',
                transform: 'translateY(30px)',
              }}
            >
              blisko morza
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mx-auto mt-5 sm:mt-7 font-body font-normal opacity-0"
            style={{
              color: 'rgba(255,255,255,0.88)',
              fontSize: 'clamp(14px, 2vw, 18px)',
              lineHeight: 1.6,
              maxWidth: 520,
              textShadow: '0 1px 12px rgba(0,0,0,0.2)',
              transform: 'translateY(20px)',
            }}
          >
            Nowoczesny apartament położony zaledwie 100 metrów od plaży to idealne miejsce na wypoczynek! Z okien rozpościera się widok na sosnowy las.
          </p>

          <a
            ref={ctaRef as any}
            href="https://client24006.idobooking.com/book-now/index.php?ob[77]"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 sm:mt-9 inline-block font-body text-[13px] sm:text-[14px] font-medium opacity-0 transition-all duration-300 hover:translate-y-[-1px]"
            style={{
              background: '#ffffff',
              color: '#1f2421',
              padding: '12px 32px',
              borderRadius: 28,
              letterSpacing: '0.03em',
              transform: 'translateY(15px)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#f0ece4';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#ffffff';
            }}
          >
            Zarezerwuj teraz
          </a>
        </div>
      </div>

      {/* Scroll indicator chevron */}
      <div
        ref={chevronRef}
        className="absolute left-1/2 z-[2] opacity-0 cursor-pointer"
        style={{
          bottom: 'clamp(20px, 4vh, 36px)',
          transform: 'translateX(-50%)',
        }}
        onClick={() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo('#apartament', { offset: -72 });
          }
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce-chevron"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
