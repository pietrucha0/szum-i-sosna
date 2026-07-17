import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Snowflake, Wifi, Car, Waves, TreePine, Coffee, Bath, Wind } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { icon: Snowflake, title: 'Klimatyzacja', desc: 'Przyjemny chłód nawet w najgorętsze dni' },
  { icon: Wifi, title: 'Wi-Fi', desc: 'Szybkie łącze fibre w całym apartamencie' },
  { icon: Car, title: 'Parking', desc: 'Darmowe miejsce parkingowe na terenie obiektu' },
  { icon: Waves, title: 'Blisko plaży', desc: 'Zaledwie 100 metrów do morza' },
  { icon: TreePine, title: 'Las sosnowy', desc: 'Widok na zielony las z okien' },
  { icon: Coffee, title: 'Duży taras', desc: 'Przestronny taras na poranną kawę' },
  { icon: Bath, title: 'Łazienka', desc: 'Nowoczesna łazienka z prysznicem' },
  { icon: Wind, title: 'Cisza i spokój', desc: 'Oaza spokoju z dala od zgiełku' },
];

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !grid) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Heading animation
    tl.to(heading.children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Grid items stagger
    const items = grid.querySelectorAll('.amenity-item');
    tl.to(
      items,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#f3efe8',
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <span
            className="mb-4 inline-block font-body text-[12px] font-medium uppercase opacity-0"
            style={{ color: '#6b7b73', letterSpacing: '0.12em', transform: 'translateY(30px)' }}
          >
            UDOGODNIENIA
          </span>
          <h2
            className="font-display font-normal opacity-0"
            style={{
              color: '#1f2421',
              fontSize: 'clamp(36px, 5vw, 48px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              transform: 'translateY(30px)',
            }}
          >
            Wszystko, czego potrzebujesz
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {amenities.map((amenity) => (
            <div
              key={amenity.title}
              className="amenity-item group flex flex-col items-center text-center opacity-0"
              style={{ transform: 'translateY(50px)' }}
            >
              <div className="transition-transform duration-300 group-hover:scale-[1.08]">
                <amenity.icon size={40} style={{ color: '#3a7d5c' }} />
              </div>
              <h3
                className="mt-4 font-body text-[18px] font-medium"
                style={{ color: '#1f2421' }}
              >
                {amenity.title}
              </h3>
              <p
                className="mt-2 font-body text-[14px] font-normal"
                style={{ color: '#6b7b73', lineHeight: 1.6 }}
              >
                {amenity.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
