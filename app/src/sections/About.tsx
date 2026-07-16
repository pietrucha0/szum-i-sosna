import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Waves, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const img = imgRef.current;
    if (!section || !left || !right || !img) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(left, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to(
        right,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.65'
      )
      .fromTo(
        img,
        { scale: 1.03 },
        { scale: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const features = [
    { icon: Leaf, text: 'Widok na sosnowy las' },
    { icon: Waves, text: '100 metrów od plaży' },
    { icon: Sun, text: 'Przestronny taras' },
  ];

  return (
    <section
      id="apartament"
      ref={sectionRef}
      style={{
        background: '#faf8f5',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div className="mx-auto grid items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-16" style={{ maxWidth: 1200 }}>
        {/* Left — text */}
        <div ref={leftRef} className="opacity-0" style={{ transform: 'translateY(40px)' }}>
          <span
            className="mb-4 inline-block font-body text-[12px] font-medium uppercase"
            style={{ color: '#6b7b73', letterSpacing: '0.12em' }}
          >
            O APARTAMENCIE
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
            Przestrzeń, w której odpoczywasz
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
            Przestronny apartament zaprojektowany z myślą o komforcie i bliskości natury. Z okien rozpościera się widok na sosnowy las, a zaledwie 100 metrów dzieli Cię od plaży. Przestronny taras zachęca do spędzenia czasu przy porannej kawie lub wieczornego relaksu przy zachodzie słońca.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center gap-3">
                <feature.icon size={18} style={{ color: '#3a7d5c', flexShrink: 0 }} />
                <span className="font-body text-[15px] font-normal" style={{ color: '#1f2421' }}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div
          ref={rightRef}
          className="overflow-hidden rounded-xl opacity-0"
          style={{ transform: 'translateY(60px)' }}
        >
          <img
            ref={imgRef}
            src="/images/studio_apartment_interior.jpeg"
            alt="Wnętrze apartamentu Szum i Sosna"
            className="h-auto w-full object-cover"
            style={{ aspectRatio: '4/5' }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
