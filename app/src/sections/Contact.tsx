import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Calendar, Mail, Phone, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustBadges = [
  { icon: Shield, text: 'Bezpieczna płatność online' },
  { icon: Zap, text: 'Natychmiastowe potwierdzenie' },
  { icon: Calendar, text: 'Gwarancja najniższej ceny' },
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
      stagger: 0.12,
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
        background: '#1a1e1b',
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div ref={contentRef} className="mx-auto max-w-[1140px]">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="contact-animate mb-3 inline-block font-body text-[12px] font-medium uppercase opacity-0 tracking-[0.14em]"
            style={{ color: '#c2a57f', transform: 'translateY(25px)' }}
          >
            REZERWACJA & KONTAKT
          </span>
          <h2
            className="contact-animate font-display font-normal opacity-0"
            style={{
              color: '#ffffff',
              fontSize: 'clamp(36px, 5vw, 48px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              transform: 'translateY(25px)',
            }}
          >
            Zaplanuj swój wypoczynek
          </h2>
        </div>

        {/* 2 Matching Symmetrical Luxury Cards */}
        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          
          {/* Card 1: Kontakt bezpośredni */}
          <div
            className="contact-animate opacity-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-md transition-all duration-300 hover:border-white/20"
            style={{ transform: 'translateY(30px)' }}
          >
            <div>
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-[#c2a57f] block mb-2">
                Masz pytania?
              </span>
              <h3 className="font-display text-[26px] font-normal text-white mb-3">
                Kontakt bezpośredni
              </h3>
              <p className="font-body text-[14px] text-white/70 leading-relaxed mb-8">
                Chętnie odpowiemy na Twoje pytania i pomożemy w zaplanowaniu idealnego pobytu w Szum i Sosna.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:info@easy-rent.com.pl"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#c2a57f]/50 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c2a57f]/10 text-[#c2a57f] transition-colors group-hover:bg-[#c2a57f] group-hover:text-[#1a1e1b]">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block font-body text-[11px] uppercase tracking-wider text-white/50">Napisz e-mail</span>
                  <span className="font-body text-[15px] font-medium text-white group-hover:text-[#c2a57f] transition-colors">
                    info@easy-rent.com.pl
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+48693198766"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#c2a57f]/50 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c2a57f]/10 text-[#c2a57f] transition-colors group-hover:bg-[#c2a57f] group-hover:text-[#1a1e1b]">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block font-body text-[11px] uppercase tracking-wider text-white/50">Zadzwoń do nas</span>
                  <span className="font-body text-[15px] font-medium text-white group-hover:text-[#c2a57f] transition-colors">
                    +48 693 198 766
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/48693198766"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#c2a57f]/50 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c2a57f]/10 text-[#c2a57f] transition-colors group-hover:bg-[#c2a57f] group-hover:text-[#1a1e1b]">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="block font-body text-[11px] uppercase tracking-wider text-white/50">Wiadomość WhatsApp</span>
                  <span className="font-body text-[15px] font-medium text-white group-hover:text-[#c2a57f] transition-colors">
                    Napisz na WhatsApp
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Card 2: Rezerwacja Online */}
          <div
            className="contact-animate opacity-0 flex flex-col justify-between rounded-2xl border border-[#c2a57f]/30 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 sm:p-10 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-[#c2a57f]/60"
            style={{ transform: 'translateY(30px)' }}
          >
            <div>
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-[#c2a57f] block mb-2">
                Dostępność w czasie rzeczywistym
              </span>
              <h3 className="font-display text-[26px] font-normal text-white mb-3">
                Rezerwacja online
              </h3>
              <p className="font-body text-[14px] text-white/70 leading-relaxed mb-8">
                Wybrany termin rezerwujesz natychmiastowo w oficjalnym systemie online bez zbędnych formalności.
              </p>
            </div>

            <div className="mt-auto">
              <a
                href="https://client24006.idobooking.com/book-now/index.php?ob[77]"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-3 rounded-full font-body text-[15px] font-medium tracking-wide shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: '#c2a57f',
                  color: '#1a1e1b',
                  padding: '16px 32px',
                }}
              >
                <Calendar size={19} className="transition-transform group-hover:scale-110" />
                <span>Zarezerwuj termin online</span>
              </a>
            </div>
          </div>

        </div>

        {/* Trust badges */}
        <div className="contact-animate mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-10 opacity-0" style={{ transform: 'translateY(25px)' }}>
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2.5">
              <badge.icon size={16} className="text-[#c2a57f]" />
              <span className="font-body text-[13px] text-white/60">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
