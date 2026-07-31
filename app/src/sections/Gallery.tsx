import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryProps {
  lenisRef?: React.MutableRefObject<any>;
}

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const categories = [
  'Wszystkie',
  'Sypialnia',
  'Taras',
  'Kuchnia',
  'Łazienka',
  'Okolica',
];

const galleryImages: GalleryImage[] = [
  // Sypialnia
  { src: '/images/bedroom_bed_front_view.jpeg', alt: 'Przytulna sypialnia z szerokim łóżkiem małżeńskim', category: 'Sypialnia' },
  { src: '/images/bedroom_with_balcony_wide.jpeg', alt: 'Jasna sypialnia z panoramicznymi drzwiami tarasowymi', category: 'Sypialnia' },
  { src: '/images/studio_apartment_interior.jpeg', alt: 'Przestronne wnętrze apartamentu z widokiem na sosnowy las', category: 'Sypialnia' },

  // Taras
  { src: '/images/balcony_coffee_cups.jpeg', alt: 'Poranna kawa na tarasie wśród szumu sosen', category: 'Taras' },
  { src: '/images/balcony_forest_view.jpeg', alt: 'Malowniczy widok z tarasu na sosnowy las', category: 'Taras' },
  { src: '/images/balcony_seating_area.jpeg', alt: 'Strefa relaksu na tarasie z wygodnymi fotelami', category: 'Taras' },
  { src: '/images/balcony_loungers_lowres.jpeg', alt: 'Wypoczynek na tarasie w otoczeniu natury', category: 'Taras' },

  // Kuchnia
  { src: '/images/kitchenette_front_view.jpeg', alt: 'Nowoczesny i w pełni wyposażony aneks kuchenny', category: 'Kuchnia' },
  { src: '/images/kitchenette_sink_and_cooktop.jpeg', alt: 'Blat kuchenny, zlewozmywak oraz płyta grzewcza', category: 'Kuchnia' },
  { src: '/images/kitchenette_with_cooktop.jpeg', alt: 'Funkcjonalny aneks kuchenny w nowoczesnej zabudowie', category: 'Kuchnia' },
  { src: '/images/kitchen_counter_details.jpeg', alt: 'Starannie dobrane wyposażenie i detale kuchenne', category: 'Kuchnia' },
  { src: '/images/kitchen_cabinet_tableware.JPG', alt: 'Komplet naczyń, zastawa i szkło w szafkach kuchennych', category: 'Kuchnia' },

  // Przedpokój (Wszystkie)
  { src: '/images/apartment_entrance_hallway.jpeg', alt: 'Elegancki i jasny przedpokój wejściowy', category: 'Przedpokój' },
  { src: '/images/apartment_hallway_to_interior.jpeg', alt: 'Strefa wejściowa prowadząca do wnętrza apartamentu', category: 'Przedpokój' },

  // Łazienka
  { src: '/images/bathroom_sink_and_shower.jpeg', alt: 'Łazienka z umywalką nablatową i prysznicem walk-in', category: 'Łazienka' },
  { src: '/images/bathroom_toilet_and_shower.jpeg', alt: 'Nowoczesna łazienka z toaletą i prysznicem', category: 'Łazienka' },
  { src: '/images/bathroom_toilet_and_vanity.jpeg', alt: 'Łazienka z dużym lustrem', category: 'Łazienka' },

  // Okolica
  { src: '/images/building_exterior_and_forest.JPG', alt: 'Budynek zatopiony w sosnowym lesie', category: 'Okolica' },
  { src: '/images/children_playground.jpeg', alt: 'Bezpieczny plac zabaw dla dzieci na terenie obiektu i basen', category: 'Okolica' },
  { src: '/images/aerial_view_of_complex.jpeg', alt: 'Widok z lotu ptaka na kompleks z basenem i leżakami', category: 'Okolica' },
];

export default function Gallery({ lenisRef }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const coverflowRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Swipe gesture variables
  const touchStartX = useRef<number | null>(null);
  const lastWheelTime = useRef<number>(0);

  // Filtered images list
  const filteredImages = useMemo(() => {
    if (activeCategory === 'Wszystkie') return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  // Reset active index when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(0);
  };

  // GSAP Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const coverflow = coverflowRef.current;
    if (!section || !heading || !coverflow) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(heading.children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    }).to(
      coverflow,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Hover & Lenis Scroll Lock
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (lenisRef?.current) {
      lenisRef.current.stop();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (lenisRef?.current) {
      lenisRef.current.start();
    }
  };

  // Mouse Wheel listener specifically on Coverflow cards
  useEffect(() => {
    const coverflow = coverflowRef.current;
    if (!coverflow) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent page vertical scroll completely while scrolling over coverflow
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTime.current < 200) return;

      if (e.deltaY > 0) {
        // Scroll DOWN -> Next photo
        lastWheelTime.current = now;
        setActiveIndex((prev) => (prev + 1) % filteredImages.length);
      } else if (e.deltaY < 0) {
        // Scroll UP -> Prev photo
        lastWheelTime.current = now;
        setActiveIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
      }
    };

    coverflow.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      coverflow.removeEventListener('wheel', handleWheel);
    };
  }, [filteredImages.length]);

  // Auto-scroll loop sideways when NOT hovering
  useEffect(() => {
    if (isHovered || lightboxOpen || filteredImages.length <= 1) return;
    const autoTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredImages.length);
    }, 4200);
    return () => clearInterval(autoTimer);
  }, [isHovered, lightboxOpen, filteredImages.length]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        setActiveIndex((prev) => (prev + 1) % filteredImages.length);
      } else {
        // Swiped right -> prev
        setActiveIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
  };

  // Lightbox Keyboard Navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
    },
    [lightboxOpen, filteredImages.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent scroll when Lightbox open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      if (lenisRef?.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisRef?.current && !isHovered) lenisRef.current.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (lenisRef?.current) lenisRef.current.start();
    };
  }, [lightboxOpen, isHovered, lenisRef]);

  const openLightboxForCurrent = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // 3D Position calculations for Coverflow Card
  const getCardStyle = (index: number) => {
    const total = filteredImages.length;
    let offset = index - activeIndex;

    // Handle wrapping around for smooth circular rotation
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const spacing = isMobile ? 50 : 72; // percentage spacing

    if (offset === 0) {
      return {
        transform: 'translate3d(0%, 0, 0) scale(1)',
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 10px 25px -5px rgba(0, 0, 0, 0.15)',
        cursor: 'pointer',
      };
    }

    if (offset === 1 || offset === -1) {
      const dir = offset > 0 ? 1 : -1;
      return {
        transform: `translate3d(${dir * spacing}%, 0, -120px) scale(0.85) rotateY(${-dir * 12}deg)`,
        zIndex: 20,
        opacity: 0.78,
        filter: 'brightness(0.82)',
        boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
      };
    }

    if (offset === 2 || offset === -2) {
      const dir = offset > 0 ? 1 : -1;
      return {
        transform: `translate3d(${dir * (spacing * 1.6)}%, 0, -240px) scale(0.68) rotateY(${-dir * 22}deg)`,
        zIndex: 10,
        opacity: 0.45,
        filter: 'brightness(0.65)',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
      };
    }

    const dir = offset > 0 ? 1 : -1;
    return {
      transform: `translate3d(${dir * (spacing * 2.1)}%, 0, -360px) scale(0.5) rotateY(${-dir * 30}deg)`,
      zIndex: 0,
      opacity: 0,
      pointerEvents: 'none' as const,
    };
  };

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{
          background: '#faf8f5',
          padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 60px)',
        }}
      >
        <div className="mx-auto max-w-[1280px] w-full">
          {/* Header */}
          <div ref={headingRef} className="mb-8 text-center">
            <span
              className="mb-3 inline-block font-body text-[12px] font-medium uppercase opacity-0"
              style={{ color: '#6b7b73', letterSpacing: '0.14em', transform: 'translateY(25px)' }}
            >
              GALERIA FOTOGRAFII
            </span>
            <h2
              className="font-display font-normal opacity-0"
              style={{
                color: '#1f2421',
                fontSize: 'clamp(36px, 5vw, 48px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                transform: 'translateY(25px)',
              }}
            >
              Odkryj Szumi Sosna
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2 px-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full px-5 py-2 font-body text-[13px] font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1f2421] text-[#faf8f5] shadow-md scale-105'
                      : 'bg-white/80 text-[#556059] border border-black/10 hover:bg-white hover:text-[#1f2421]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 3D Coverflow Container */}
          <div
            ref={coverflowRef}
            data-lenis-prevent="true"
            className="relative mx-auto w-full opacity-0"
            style={{
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
              paddingTop: '15px',
              paddingBottom: '25px',
              transform: 'translateY(40px)',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative mx-auto flex items-center justify-center" style={{ height: '420px', maxWidth: '330px' }}>
              {filteredImages.map((img, idx) => {
                const style = getCardStyle(idx);
                const isCenter = idx === activeIndex;

                return (
                  <div
                    key={img.src + idx}
                    onClick={() => {
                      if (isCenter) {
                        openLightboxForCurrent(idx);
                      } else {
                        setActiveIndex(idx);
                      }
                    }}
                    className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-700 ease-out select-none group"
                    style={{
                      ...style,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay & Zoom Icon for Active Center Card */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-6">
                        <div className="self-end rounded-full bg-white/20 p-2.5 backdrop-blur-md text-white border border-white/30">
                          <Maximize2 size={18} />
                        </div>
                        <p className="font-body text-[14px] font-medium text-white tracking-wide leading-snug">
                          {img.alt}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls Below */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1f2421]/20 bg-white text-[#1f2421] transition-all duration-300 hover:border-[#1f2421] hover:bg-[#1f2421] hover:text-white shadow-sm hover:scale-105 active:scale-95"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft size={22} />
            </button>

            <span className="font-body text-[13px] font-medium tracking-widest text-[#6b7b73] px-2">
              {activeIndex + 1} / {filteredImages.length}
            </span>

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % filteredImages.length)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1f2421]/20 bg-white text-[#1f2421] transition-all duration-300 hover:border-[#1f2421] hover:bg-[#1f2421] hover:text-white shadow-sm hover:scale-105 active:scale-95"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.94)' }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105"
            onClick={() => setLightboxOpen(false)}
            aria-label="Zamknij"
          >
            <X size={24} color="#ffffff" />
          </button>

          {/* Prev button */}
          <button
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105 lg:left-8"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
            }}
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft size={30} color="#ffffff" />
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105 lg:right-8"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
            }}
            aria-label="Następne zdjęcie"
          >
            <ChevronRight size={30} color="#ffffff" />
          </button>

          {/* Image & Title */}
          <div
            className="flex flex-col items-center justify-center max-h-[88vh] max-w-[88vw] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex]?.src}
              alt={filteredImages[lightboxIndex]?.alt}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <p className="mt-4 font-body text-[15px] font-normal text-white/90 text-center tracking-wide">
              {filteredImages[lightboxIndex]?.alt}
            </p>
          </div>

          {/* Counter */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-[13px] tracking-widest"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </>
  );
}
