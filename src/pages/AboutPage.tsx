import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Sparkles, DraftingCompass, Factory, Truck } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";
import { CertificatesMarquee } from "../components/CertificatesMarquee";
import { MaterialCertificatesMarquee } from "../components/MaterialCertificatesMarquee";
import { TeamMemberCard } from "../components/TeamMemberCard";
import { useContactModal } from "../contexts/ContactModalContext";

function useParallax(speed = 0.16) {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Disable on mobile (screens smaller than 1024px)
    const isMobile = window.innerWidth < 1024;
    if (prefersReducedMotion || isMobile) return;

    const handleScroll = () => {
      if (!ref.current || !bgRef.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if visible on screen
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const offset = (rect.top - windowHeight / 2) * speed;
        bgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [speed]);

  return { ref, bgRef };
}

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -100px 0px" }
    );

    if (imageRef.current) observer.observe(imageRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return { isVisible, imageRef, textRef, isMobile };
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 4000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setStarted(true));
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.75 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(target * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return (
    <span
      ref={ref}
      dir="ltr"
      className="inline-flex items-center tabular-nums select-none font-light"
      style={{ lineHeight: "1.2" }}
    >
      {prefix && <span>{prefix}</span>}
      <span>{current}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

function useImageSlider(interval: number = 5000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 3);
      }, interval);
    };

    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Start the interval
    startInterval();

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopInterval();
      } else {
        startInterval();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopInterval();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [interval]);

  return activeIndex;
}

export function AboutPage() {
  const parallaxSection = useParallax(0.2);
  const { isVisible, imageRef, textRef, isMobile } = useScrollAnimation();
  const { openContactModal } = useContactModal();
  const activeSlideIndex = useImageSlider(5000);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Preload images
  useEffect(() => {
    const images = ['/images/about-bg.webp', '/images/studio-about.jpg', '/images/factory-preview2.webp'];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen text-right font-body">
      <SEO
        title="دەربارەی ئێمە | کارگەی ئەنتیکا"
        description="دەربارەی کارگەی ئەنتیکا - کارگەیەک کە هونەر دەکاتە ژیان. تیمی ئەندازیار و دیزاینەری نێودەوڵەتی بە ئەزموونی زیاتر لە 20 ساڵ."
        canonical="https://antika-factory.netlify.app/about"
        image="/images/logo.png"
      />

      {/* Hero Section - Full-width Image Slider */}
      <section
        className="innovation-slider relative w-full overflow-hidden"
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Slides */}
        {['/images/diognal-1.webp', '/images/hero-antika.webp', '/images/hero-2.webp'].map((image, index) => (
          <div
            key={index}
            className={`slide absolute inset-0 w-full h-full ${index === activeSlideIndex ? 'is-active' : ''}`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: index === activeSlideIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        ))}

        {/* Grey haze overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(120, 118, 110, 0.38)',
            '--overlay-color': 'rgba(120, 117, 110, 0.38)',
          } as React.CSSProperties}
        />

        {/* Content */}
        <div
          className="content relative z-10 flex flex-col items-center justify-center px-[5%] text-center"
          style={{
            height: 'calc(100vh - 80px)',
            marginTop: '80px',
          }}
        >
          <div dir="rtl" className="text-center w-full max-w-[1100px]">
            <h1
              className="font-display font-black leading-[1.15] text-white text-center"
              style={{
                fontSize: 'clamp(28px, 3vw, 56px)',
                fontWeight: 600,
              }}
            >
              داهێنان لە پشت
              <br />
              بەرهەمەکانمانەوە
            </h1>
            <p
              className="mt-[0.6em] font-normal leading-[1.6] text-white text-center"
              style={{
                fontSize: 'clamp(16px, 1.5vw, 26px)',
                letterSpacing: '0.04em',
                fontWeight: 400,
              }}
            >
              ئێمە خاوەنی ئەزموونێکی فراوانین لە دیزاینکردن و دروستکردنی
              <br /> خانووە کەپسولییە ئاستبەرزەکاندا
            </p>
            <p
              className="mt-4 font-normal leading-[1.6] text-white text-center"
              style={{
                fontSize: 'clamp(16px, 1.5vw, 26px)',
                letterSpacing: '0.04em',
                fontWeight: 400,
              }}
            >
              چاوێک بە نموونەی کارەکانماندا بخشێنە کە تێیدا ئەو پڕۆژانە <br />
              خراونەتەڕوو کە
              بۆ کڕیارە ڕازییەکانمان لە سەرانسەری <br />
              عێراق جێبەجێمان کردوون
            </p>
          </div>
        </div>
      </section>

      {/* 3-Icon Steps Strip */}
      <section
        className="relative w-full"
        style={{
          backgroundColor: '#f8f9fe',
          paddingBlock: '48px',
        }}
      >
        <div
          className="mx-auto"
          style={{
            width: '88%',
            maxWidth: '1400px',
          }}
        >
          <div
            className="grid gap-6 md:gap-8 lg:gap-10"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            <style>{`
              @media (max-width: 768px) {
                [data-stack-mobile="true"] {
                  grid-template-columns: 1fr !important;
                  gap: 28px !important;
                }
              }
            `}</style>
            {/* Step 1 */}
            <div
              dir="rtl"
              className="flex items-start gap-[18px]"
            >
              <Truck
                className="shrink-0"
                style={{
                  width: '44px',
                  height: '44px',
                  color: '#4a4a4a',
                }}
              />
              <div className="flex flex-col">
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 300,
                    color: '#555',
                  }}
                >
گواستنەوە و ڕادەستکردن (Turnkey)                                  </span>
                <span
                  className="mt-3"
                  style={{
                    fontSize: '17px',
                    fontWeight: 400,
                    color: '#999',
                  }}
                >
جێبەجێکردنی خێرا و دانانی تەواوەتی پڕۆژەکە لە هەر شوێنێکی عێراق بێت               </span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              dir="rtl"
              className="flex items-start gap-[18px]"
            >
              <DraftingCompass
                className="shrink-0"
                style={{
                  width: '44px',
                  height: '44px',
                  color: '#4a4a4a',
                }}
              />
              <div className="flex flex-col">
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 300,
                    color: '#555',
                  }}
                >
دیزاین و نەخشەسازیی ورد                </span>
                <span
                  className="mt-3"
                  style={{
                    fontSize: '17px',
                    fontWeight: 400,
                    color: '#999',
                  }}
                >
گۆڕینی خەیاڵ و پێداویستییەکانی کڕیار بۆ دیزاینی 3D و ئەندازیاریی سەرنجڕاکێش                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              dir="rtl"
              className="flex items-start gap-[18px]"
            >
              <Factory
                className="shrink-0"
                style={{
                  width: '44px',
                  height: '44px',
                  color: '#4a4a4a',
                }}
              />
              <div className="flex flex-col">
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 300,
                    color: '#555',
                  }}
                >
دروستکردن بە کوالێتیی بەرز                </span>
                <span
                  className="mt-3"
                  style={{
                    fontSize: '17px',
                    fontWeight: 400,
                    color: '#999',
                  }}
                >
پشت بەستن بە کەرەستەی بڕوانامەدار و تەکنەلۆجیای مۆدێرن لە کارگەی تایبەتی خۆماندا                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 overflow-x-hidden" style={{ scrollMarginTop: '80px' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Text RIGHT - RTL content */}
            <div className="order-1 lg:order-2 w-full">
              <div 
                ref={textRef}
                dir="rtl"
                className="text-right inline-block w-full"
                style={{
                  transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? 'translateY(0)' 
                    : isMobile 
                      ? 'translateY(40px)' 
                      : 'translateX(80px)'
                }}
              >
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13px] font-bold text-brand">
                    <Sparkles className="h-4 w-4" />
                    دەربارەی ئێمە
                  </span>
                  <h2 className="mt-5 font-display text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-black leading-[1.3] text-gray-900 text-right">
                    کارگەیەک کە هونەر
                    <br />
                    دەکاتە <span className="text-brand">ژیان</span>
                  </h2>
                  <p className="mt-5 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] font-light leading-5 sm:leading-6 md:leading-7 lg:leading-9 text-gray-600 text-right">
                    ئێمە لە کارگەی ئەنتیکا ژینگەیەک بونیاد دەنێین کە شایەنی متمانەی ئێوەبێت
                    تیمەکەمان لە کۆمەڵێک ئەندازیار و تەکنیککاری خاوەن ئەزموون پێکهاتووە کە ساڵانێکی درێژە لە بواری بیناسازی
                    و خانوی کەپسولیدا کار دەکەن...<br></br>
                    ئامانجی ئێمە دابینکردنی شوێنێکی مۆدێرن و ئارامە بۆ ئەوەی داهاتوویەکی گەش بۆ خۆت و خێزانەکەت مسۆگەر بکەیت
                  </p>
                </Reveal>
                <Reveal delay={150}>
                  <ul className="mt-6 space-y-3.5">
                    {[
                      "تیمی ئەندازیار و دیزاینەری نێودەوڵەتی",
                      "کارگەی تایبەتی خۆمان بۆ بەرهەمهێنان",
                      "مەوادی کوالێتی بەرز و ئۆرجیناڵ",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-3 text-[14.5px] font-semibold text-gray-700">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={250}>
                  <div className="mt-8">
                    <button
                      onClick={openContactModal}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[14.5px] font-bold text-white transition hover:bg-brand-dark"
                    >
                      پەیوەندیمان پێوە بکە
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
            
            {/* Images LEFT with parallax and scroll animation */}
            <div 
              ref={imageRef}
              className="order-2 lg:order-2"
              style={{
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? 'translateY(0)' 
                  : isMobile 
                    ? 'translateY(40px)' 
                    : 'translateX(-80px)'
              }}
            >
              <div className="relative" ref={parallaxSection.ref}>
                <div
                  ref={parallaxSection.bgRef}
                  className="zoom-img overflow-hidden rounded-2xl shadow-lg will-change-transform"
                >
                  <img
                    src="/images/factory-preview2.webp"
                    alt="ستۆدیۆی ANTIKA FACTORY"
                    className="h-[400px] w-full object-cover sm:h-[500px]"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {[
                { target: 300, suffix: "+", l: "پرۆژەی تەواو", d: 4000 },
                { target: 20, suffix: "", l: "ساڵ ئەزموون", d: 2500 },
                { target: 100, suffix: "%", l: "ڕەزامەندی", d: 3500 },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-transparent border border-gray-600 p-8 sm:p-12 lg:p-16 text-center h-full flex flex-col justify-center"
                >
                  <div className="font-display text-[48px] font-light text-white sm:text-[64px] md:text-[72px] lg:text-[88px] pt-8 sm:pt-12 lg:pt-16">
                    <AnimatedCounter target={s.target} suffix={s.suffix} duration={s.d} />
                  </div>
                  <div className="mt-4 sm:mt-6 lg:mt-8 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-normal text-gray-400">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Member Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div dir="rtl" className="text-right">
              <p className="text-[20px] sm:text-[16px] md:text-[20px] font-normal leading-relaxed text-gray-700">
                کارگەی ئەنتیکا لە تێبینییەکی سادەوە سەری هەڵدا: شێوازی نەریتیی بیناسازی زۆر خاو، تێچووی زۆر و زۆر نەگونجاو بوو بۆ پێداویستییە سەردەمییەکان و وەک کەسێک کە بە قووڵی لە بواری ئەندازیاری و بیناسازیدا کارم کردووە، بە چاوی خۆم دەمبینی کە چۆن کڕیاران لە عێراقدا کێشەی دۆزینەوەی خانووی پێشوەختە دروستکراوی باوەڕپێکراویان هەیە. بازاڕ پڕ بوو لە بژاردە، کەچی هیچ ڕێگەیەکی ڕوون نەبوو بۆ بەراوردکردنی کوالێتی، پتەوی، یان بەهای کارەکان
              </p>
              <p className="mt-6 text-[20px] sm:text-[16px] md:text-[20px] font-normal leading-relaxed text-gray-700">
                مەرجە شاراوەکان، ڕوون نەبوونی تایبەتمەندییەکان و نەبوونی ڕێنمایی پیشەگەرانە، پرۆسەی بڕیاردانیان زۆر ماندووکەر کردبوو ئەو کاتەی کە دەبوو بۆ دروستکردنی شوێنی جوان تەرخان بکرێت، لە گەڕان و دوودڵیدا بەفیڕۆ دەچوو
              </p>
              <p className="mt-6 text-[20px] sm:text-[16px] md:text-[20px] font-normal leading-relaxed text-gray-700">
                دەرکم بەوە کرد کە دەبێت ڕێگەیەکی باشتر هەبێت — کارگەیەک کە نەک تەنها بەرهەم، بەڵکو شەفافییەتی تەواو، ئامۆژگاریی شارەزایان و چارەسەری گشتگیر (Turnkey) پێشکەش بکات. بە پشتبەستن بە ٢٠ ساڵ ئەزموونی ئەندازیاری و بە پاڵپشتیی تیمێکی نێودەوڵەتی لە پسپۆڕان، کارگەی ئەنتیکام دامەزراند بۆ ئەوەی ببێتە ئەو هاوبەشە جێمتمانەیە و ئێمە تەنها کەپسوول و پێکهاتەی پێشوەختە دروستکراو بەرهەم ناهێنین؛ بەڵکو شارەزایی، کەرەستەی کوالێتی بەرز و پاڵپشتییەکی پیشەگەرانە پێشکەش دەکەین کە دڵنیایی دەدات لە سەرکەوتنی هەر پڕۆژەیەک، لە دیزاینی سەرەتاییەوە تا قۆناغی کۆتایی جێگیرکردن لە سەرتاسەری عێراقدا
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <TeamMemberCard
                name="Karzan"
                description="An expert in Capsules, Prefab Houses, Apple Cabins & Container Homes"
                imageSrc="/images/factory-preview2.webp"
                style={{ marginLeft: '76px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Marquee */}
      <CertificatesMarquee />

      {/* Material Certificates Marquee */}
      <MaterialCertificatesMarquee variant="about" />
    </div>
  );
}