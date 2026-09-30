import { useEffect, useRef, useState } from "react";

const features = [
  {
    id: 1,
    title: "بەرگریی ئاگر لە ئاستی A2 ",
    description: "دیوارە عەزلکراوەکان بەرگرییەکی زۆر بەرزیان بۆ ئاگر هەیە لەگەڵ توانایەکی نایاب بۆ هێشتنەوەی پلەی گەرمی (بۆ ڕێگریکردن لە گەرمای تاقەتپڕووکێنی هاوین و سەرمای زستان)، ئەمەش سەلامەتی و پاشەکەوتکردنی وزە زیاتر دەکات",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 4L8 14v24c0 14.4 10.4 27.8 24 30 13.6-2.2 24-15.6 24-30V14L32 4z" />
        <path d="M32 22v8" />
        <path d="M32 14h.5" />
        <path d="M26 32l6 6 6-6" />
      </svg>
    ),
    row: 1,
    isKurdish: true
  },
  {
    id: 2,
    title: "بەرگەگرتنی با لە ئاستی ١١ ",
    description: "تەنانەت لە کاتی هەڵکردنی گەردەلول و ڕەشەبای زۆر بەهێزیشدا (بای ئاستی ١١)، کەپسولەکانمان سەقامگیریی و پتەویی خۆیان لەدەست نادەن ئەم هێزە ئەندازیارییە تەمەندرێژییەکی زۆر و ژینگەیەکی سەلامەت و بێدەنگ بۆ کڕیارەکانمان مسۆگەر دەکات، جا پڕۆژەکەت لە هەر کوێیەکی ئەم سروشتەدا بێت",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20c2-4 6-6 10-4s6 6 4 10" />
        <path d="M10 32c2-4 6-6 10-4s6 6 4 10" />
        <path d="M8 44c2-4 6-6 10-4s6 6 4 10" />
        <rect x="40" y="16" width="8" height="32" rx="1" />
        <line x1="40" y1="22" x2="48" y2="22" />
        <line x1="40" y1="28" x2="48" y2="28" />
        <line x1="40" y1="34" x2="48" y2="34" />
        <line x1="40" y1="40" x2="48" y2="40" />
      </svg>
    ),
    row: 1,
    isKurdish: false
  },
  {
    id: 3,
    title: "بەرگەگرتنی بومەلەرزە لە ئاستی ٧",
    description: "بەشێوەیەک کاری ئەندازیاری بۆ کەپسولەکان کراوە کە بەرگەی جووڵە بەهێزەکانی بومەلەرزە بگرێت، بۆ دڵنیابوون لە سەلامەتی و جێگیریی پێکهاتەی کەپسولەکە و ئەوەشی لە ناویەتی",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 50h24" />
        <path d="M24 50V30l8-20 8 20v20" />
        <path d="M28 50V35" />
        <path d="M36 50V35" />
        <path d="M20 50c2-4 6-2 8 0s6 4 8 0" />
        <path d="M36 50c2-4 6-2 8 0" />
      </svg>
    ),
    row: 1,
    isKurdish: false
  },
  {
    id: 4,
    title: "پانێڵی بەتەواوی عەزلکراو (Insulated)",
    description: "بەهۆی بوونی سیستەمێکی عەزلی گشتگیر لە سەرانسەری کەپسولەکەدا، باشترین ئاستی پاراستنی پلەی گەرمی و ئاسوودەیی تەواو بۆ سەرنشینەکانی مسۆگەر دەکات",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 56h48" />
        <path d="M12 56V12l20-8 20 8v44" />
        <path d="M16 20h32" />
        <path d="M16 28h32" />
        <path d="M16 36h32" />
        <path d="M16 44h32" />
        <path d="M20 8v48" />
        <path d="M44 8v48" />
        <path d="M32 4v4" />
        <path d="M28 4l4 4 4-4" />
      </svg>
    ),
    row: 1,
    isKurdish: false
  },
  {
    id: 5,
    title: "ڕووکەشی شووشەیی پانۆراما (بە جامی دەبڵ)",
    description: "کەپسولەکانمان ڕووکەشێکی شووشەیی پانۆرامای سەرنجڕاکێشیان هەیە بە جامی دەبڵ، کە جگە لە بەخشینی دیمەنێکی فراوان بۆ بینینی سروشتی دەرەوە، لە هەمان کاتدا عەزلێکی نایابی دەنگ و پلەی گەرمی دابین دەکات",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="48" height="48" rx="2" />
        <line x1="32" y1="8" x2="32" y2="56" />
        <line x1="8" y1="32" x2="56" y2="32" />
        <path d="M8 32l20-16v32L8 32" />
        <path d="M56 32l-20 16V16l20 32" />
        <path d="M24 24l2 2" />
        <path d="M40 40l2 2" />
      </svg>
    ),
    row: 2,
    isKurdish: false
  },
  {
    id: 6,
    title: "دەرگای چوونەژوورەوەی مۆدێرن بە قفڵی زیرەک",
    description: "دەرگاکانمان بە کوالێتییەکی بەرز و بە دیزاینێکی مۆدێرن دروستکراون کە گونجاوە بۆ شێوەی ئەندازەیی کەپسولەکە، هەروەها بە سیستەمی قفڵی زیرەک (Smart Lock) ڕێکخراون کە ئاسایشێکی تەواو و بەکارهێنانێکی سەردەمیانە بەیەکەوە کۆدەکاتەوە",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="4" width="40" height="56" rx="2" />
        <path d="M16 8h32v48H16z" />
        <path d="M20 12h24v40H20z" />
        <circle cx="32" cy="32" r="2" />
        <path d="M32 8v24" />
        <rect x="28" y="28" width="8" height="16" rx="1" />
      </svg>
    ),
    row: 2,
    isKurdish: false
  }
];

export function SpecialFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Scroll-linked animation for row 2
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const handleScroll = () => {
      const row2 = row2Ref.current;
      if (!row2) return;

      const rect = row2.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress
      const p = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.6)));
      
      // Ease-out cubic
      const e = 1 - Math.pow(1 - p, 3);

      setScrollProgress(e);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion, isMobile]);

  const row1Features = features.filter(f => f.row === 1);
  const row2Features = features.filter(f => f.row === 2);

  return (
    <section
      ref={sectionRef}
      style={{
        unicodeBidi: 'isolate',
        textAlign: 'center',
        backgroundColor: '#111827',
        paddingTop: 'clamp(60px, 8vw, 90px)',
        paddingBottom: 'clamp(60px, 8vw, 110px)',
        overflowX: 'hidden'
      }}
    >


      <div
        style={{
          maxWidth: '1664px',
          width: 'clamp(92%, 95%, 92%)',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 20px)'
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 110px)', textAlign: 'center' }}>
          <h2
            dir="rtl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 5vw, 48px)',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '-0.5px',
              marginBottom: '12px',
              margin: '0 0 clamp(8px, 2vw, 12px) 0',
              textAlign: 'center'
            }}
          >
            ئەو تایبەتمەندیانەی پێشکەشتان ئەکەین
          </h2>
          <p
            dir="rtl"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 'clamp(16px, 3vw, 20px)',
              color: '#FFFFFF',
              margin: '0',
              textAlign: 'center',
              padding: '0 clamp(8px, 2vw, 20px)'
            }}
          >
            کارگەی ئەنتیکا هەموو پێداویستییەکانی ژیانێکی مۆدێرن لە کوردستان و عێراق دابین دەکات
          </p>
        </div>

        {/* Row 1: 4-column grid */}
        <div
          className="special-features-row1"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? 'clamp(24px, 4vw, 32px)' : isTablet ? 'clamp(24px, 4vw, 32px)' : '0',
            marginBottom: 'clamp(40px, 6vw, 70px)'
          }}
        >
          {row1Features.map((feature, index) => {
            const animationDelay = index * 120; // 0, 120, 240, 360ms

            const initialState = reducedMotion ? {
              opacity: 1,
              transform: 'translateY(0)',
              color: '#FFFFFF',
              descriptionColor: '#FFFFFF',
              iconColor: '#FFFFFF'
            } : {
              opacity: 0,
              transform: 'translateY(40px)',
              color: '#9ca3af',
              descriptionColor: '#9ca3af',
              iconColor: '#9ca3af'
            };

            const finalState = {
              opacity: 1,
              transform: 'translateY(0)',
              color: '#FFFFFF',
              descriptionColor: '#FFFFFF',
              iconColor: '#FFFFFF'
            };

            const animationDuration = '700ms';
            const animationEasing = 'cubic-bezier(0.22, 1, 0.36, 1)';

            return (
              <div
                key={feature.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  maxWidth: '260px',
                  margin: '0 auto',
                  opacity: isVisible ? finalState.opacity : initialState.opacity,
                  transform: isVisible ? finalState.transform : initialState.transform,
                  transition: reducedMotion ? 'none' : `opacity ${animationDuration} ${animationEasing} ${animationDelay}ms, transform ${animationDuration} ${animationEasing} ${animationDelay}ms`
                }}
              >
                {/* Icon Box */}
                <div
                  style={{
                    width: isMobile ? '64px' : '84px',
                    height: isMobile ? '64px' : '84px',
                    border: '2px solid #FFFFFF',
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: isMobile ? '16px' : '24px',
                    transition: reducedMotion ? 'none' : `border-color ${animationDuration} ${animationEasing} ${animationDelay}ms`
                  }}
                >
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke={isVisible ? finalState.iconColor : initialState.iconColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: isMobile ? '60%' : '65%',
                      height: isMobile ? '60%' : '65%',
                      transition: reducedMotion ? 'none' : `stroke ${animationDuration} ${animationEasing} ${animationDelay}ms`
                    }}
                  >
                    {feature.icon}
                  </svg>
                </div>

                {/* Title */}
                <h3
                  dir={feature.isKurdish ? "rtl" : "ltr"}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: isMobile ? '20px' : '26px',
                    lineHeight: '1.15',
                    color: isVisible ? finalState.color : initialState.color,
                    marginBottom: isMobile ? '8px' : '12px',
                    margin: `0 0 ${isMobile ? '8px' : '12px'} 0`,
                    textAlign: 'center',
                    transition: reducedMotion ? 'none' : `color ${animationDuration} ${animationEasing} ${animationDelay}ms`
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  dir={feature.isKurdish ? "rtl" : "ltr"}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: isMobile ? '14px' : '16.5px',
                    lineHeight: '1.45',
                    color: isVisible ? finalState.descriptionColor : initialState.descriptionColor,
                    maxWidth: isMobile ? '280px' : '255px',
                    margin: '0',
                    textAlign: 'center',
                    transition: reducedMotion ? 'none' : `color ${animationDuration} ${animationEasing} ${animationDelay}ms`
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Row 2: 2-column grid with scroll-linked animation */}
        <div
          ref={row2Ref}
          style={{
            width: '90%',
            maxWidth: '1730px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
            gap: isMobile ? 'clamp(24px, 4vw, 32px)' : '0'
          }}
        >
          {row2Features.map((feature, index) => {
            const isLeft = index === 0; // Window card (left)

            const opacity = reducedMotion || isMobile ? 1 : Math.min(1, scrollProgress * 3.5);
            // Icons come FROM sides TO center: left from -200px, right from 200px
            const translateX = reducedMotion || isMobile ? 0 : (1 - scrollProgress) * (isLeft ? -200 : 200);

            return (
              <div
                key={feature.id}
                dir="ltr"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  maxWidth: '260px',
                  margin: '0 auto',
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  willChange: 'transform'
                }}
              >
                {/* Icon Box */}
                <div
                  style={{
                    width: isMobile ? '72px' : '112px',
                    height: isMobile ? '72px' : '112px',
                    border: '2px solid #FFFFFF',
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: isMobile ? '16px' : '24px'
                  }}
                >
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: isMobile ? '60%' : '65%',
                      height: isMobile ? '60%' : '65%'
                    }}
                  >
                    {feature.icon}
                  </svg>
                </div>

                {/* Title */}
                <h3
                  dir={feature.isKurdish ? "rtl" : "ltr"}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: isMobile ? '22px' : '26px',
                    lineHeight: '1.15',
                    color: '#FFFFFF',
                    marginBottom: isMobile ? '8px' : '12px',
                    margin: `0 0 ${isMobile ? '8px' : '12px'} 0`
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  dir={feature.isKurdish ? "rtl" : "ltr"}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: isMobile ? '14px' : '16.5px',
                    lineHeight: '1.45',
                    color: '#FFFFFF',
                    maxWidth: isMobile ? '300px' : '255px',
                    margin: '0'
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 992px) {
          .special-features-row1 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 576px) {
          .special-features-row1 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
