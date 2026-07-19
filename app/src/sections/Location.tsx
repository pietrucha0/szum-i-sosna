import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '100m', label: 'do plaży' },
  { value: '2 min', label: 'spacerem' },
  { value: '5★', label: 'ocena gości' },
];

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(left, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
    }).to(
      right,
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
      },
      '-=0.75'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="okolica"
      ref={sectionRef}
      style={{
        background: '#ffffff',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div className="mx-auto grid items-center gap-12 lg:grid-cols-2 lg:gap-16" style={{ maxWidth: 1200 }}>
        {/* Left — image */}
        <div
          ref={leftRef}
          className="overflow-hidden rounded-xl opacity-0"
          style={{ transform: 'translateX(-40px)' }}
        >
          <img
            src="/images/aerial_view_of_complex.jpeg"
            alt="Widok z lotu ptaka na sosnowy las i plażę"
            className="h-auto w-full object-cover"
            style={{ aspectRatio: '1/1' }}
            loading="lazy"
          />
        </div>

        {/* Right — text */}
        <div
          ref={rightRef}
          className="opacity-0"
          style={{ transform: 'translateX(40px)' }}
        >
          <span
            className="mb-4 inline-block font-body text-[12px] font-medium uppercase"
            style={{ color: '#6b7b73', letterSpacing: '0.12em' }}
          >
            OKOLICA
          </span>

          <h2
            className="font-display font-normal"
            style={{
              color: '#1f2421',
              fontSize: 'clamp(36px, 5vw, 48px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Natura na wyciągnięcie ręki
          </h2>

          <p
            className="mt-6 font-body font-normal"
            style={{
              color: '#1f2421',
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Apartament Szum i Sosna znajduje się w unikalnej lokalizacji — na styku sosnowego lasu i plaży. Poranne spacery wśród szumiących drzew, popołudniowy relaks na plaży, wieczorne oglądanie zachodu słońca z tarasu. To miejsce, gdzie natura staje się częścią Twojego wypoczynku.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="font-display"
                  style={{ color: '#3a7d5c', fontSize: 36, lineHeight: 1.2 }}
                >
                  {stat.value}
                </span>
                <span
                  className="mt-1 font-body text-[14px]"
                  style={{ color: '#6b7b73' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
