import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustBadges = [
  { icon: Shield, text: 'Bezpieczna płatność' },
  { icon: Zap, text: 'Potwierdzenie natychmiastowe' },
  { icon: Calendar, text: 'Elastyczne warunki anulowania' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const elements = content.querySelectorAll('.contact-animate');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      style={{
        background: '#1f2421',
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div ref={contentRef} className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Heading */}
        <div className="text-center">
          <span
            className="contact-animate mb-4 inline-block font-body text-[12px] font-medium uppercase opacity-0"
            style={{
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.12em',
              transform: 'translateY(30px)',
            }}
          >
            KONTAKT
          </span>
          <h2
            className="contact-animate font-display font-normal opacity-0"
            style={{
              color: '#ffffff',
              fontSize: 'clamp(36px, 5vw, 48px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              transform: 'translateY(30px)',
            }}
          >
            Zarezerwuj swój pobyt
          </h2>
        </div>

        {/* Contact Grid */}
        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          {/* Left — Direct contact */}
          <div
            className="contact-animate opacity-0"
            style={{ transform: 'translateY(30px)' }}
          >
            <h3
              className="mb-5 font-body text-[16px] font-medium"
              style={{ color: '#c2a57f' }}
            >
              Napisz lub zadzwoń
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@easy-rent.com.pl"
                className="font-body text-[16px] transition-colors duration-200 hover:underline"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                info@easy-rent.com.pl
              </a>
              <a
                href="tel:+48693198766"
                className="font-body text-[16px] transition-colors duration-200 hover:underline"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                +48 693 198 766
              </a>
              <a
                href="https://wa.me/48693198766"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-[16px] transition-colors duration-200 hover:underline"
                style={{ color: 'rgba(255,255,255,0.88)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                </svg>
                693 198 766
              </a>
            </div>
          </div>

          {/* Right — Booking platforms */}
          <div
            className="contact-animate opacity-0"
            style={{ transform: 'translateY(30px)' }}
          >
            <h3
              className="mb-5 font-body text-[16px] font-medium"
              style={{ color: '#c2a57f' }}
            >
              Zarezerwuj przez
            </h3>

            <p
              className="mb-4 font-body text-[16px]"
              style={{ color: 'rgba(255,255,255,0.88)' }}
            >
              Strona: easyrent szum i sosna
            </p>

            <div className="flex flex-col gap-3">
              <button
                className="w-full max-w-[220px] font-body text-[14px] font-medium transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: 24,
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#c2a57f';
                  el.style.color = '#c2a57f';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(255,255,255,0.3)';
                  el.style.color = '#ffffff';
                }}
              >
                Booking.com
              </button>
              <button
                className="w-full max-w-[220px] font-body text-[14px] font-medium transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: 24,
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#c2a57f';
                  el.style.color = '#c2a57f';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(255,255,255,0.3)';
                  el.style.color = '#ffffff';
                }}
              >
                Airbnb
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="contact-animate mt-14 flex flex-wrap items-center justify-center gap-8 opacity-0" style={{ transform: 'translateY(30px)' }}>
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2">
              <badge.icon size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <span
                className="font-body text-[13px]"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
