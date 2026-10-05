import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DraftingCompass, Factory, Truck, Shield, Award, Layout } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";
import { CertificatesMarquee } from "../components/CertificatesMarquee";
import { MaterialCertificatesMarquee } from "../components/MaterialCertificatesMarquee";
import { TeamMemberCard } from "../components/TeamMemberCard";

function usePromoScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return { isVisible, sectionRef };
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
  const { isVisible: promoVisible, sectionRef: promoSectionRef } = usePromoScrollAnimation();
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
          backgroundColor: '#EDE6F2',
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

      {/* Split-Screen Promo Section */}
      <section ref={promoSectionRef} className="relative w-full overflow-hidden" style={{ minHeight: '600px' }}>
        <div className="flex flex-col lg:flex-row w-full" style={{ minHeight: '600px' }}>
          {/* RIGHT half - Orange background with text (first in RTL = appears on right) */}
          <div
            className="relative w-full lg:w-1/2 flex items-center"
            style={{
              backgroundColor: '#ff5a00',
              minHeight: '320px',
              padding: '40px 24px',
            }}
          >
            <style>{`
              @media (min-width: 1024px) {
                [data-promo-orange="true"] {
                  min-height: 600px;
                  padding: 80px 40px 80px 40px;
                }
              }
            `}</style>
            <div data-promo-orange="true" className="w-full">
              <div
                dir="rtl"
                className="w-full"
                style={{
                  maxWidth: '460px',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  opacity: promoVisible ? 1 : 0,
                  transform: promoVisible ? 'translateY(0)' : 'translateY(30px)',
                }}
              >
                <h2
                  className="font-display font-black text-white leading-tight"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    marginBottom: '24px',
                    opacity: promoVisible ? 1 : 0,
                    transition: 'opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s',
                    transform: promoVisible ? 'translateY(0)' : 'translateY(30px)',
                  }}
                >
                  کار و دیزاینەکانمان ببینە
                </h2>
                <p
                  className="text-white font-body"
                  style={{
                    fontSize: 'clamp(16px, 2vw, 20px)',
                    lineHeight: '1.8',
                    marginBottom: '32px',
                    opacity: promoVisible ? 0.9 : 0,
                    transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
                    transform: promoVisible ? 'translateY(0)' : 'translateY(30px)',
                  }}
                >
                  گەر بەدوای کەپسول (Apple Cabin)، کۆشک، یان خانووی ئامادەکراوی قەبارە جیاوازدا دەگەڕێیت، ئێمە هەموو جۆرەکانمان بۆ ئامادەکردوون بە باشترین کوالێتی
                </p>
                <Link
                  to="/products"
                  className="inline-block font-bold text-white"
                  style={{
                    fontSize: '16px',
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    borderColor: 'white',
                    padding: '14px 40px',
                    opacity: promoVisible ? 1 : 0,
                    transition: 'opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s, background-color 0.25s ease-out, color 0.25s ease-out',
                    transform: promoVisible ? 'translateY(0)' : 'translateY(30px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#ff5a00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  بینینی دیزاینەکان
                </Link>
              </div>
            </div>
          </div>

          {/* LEFT half - Image (second in RTL = appears on left) */}
          <div className="relative w-full lg:w-1/2" style={{ minHeight: '280px' }}>
            <style>{`
              @media (min-width: 1024px) {
                [data-promo-image="true"] {
                  min-height: 600px;
                }
              }
            `}</style>
            <div data-promo-image="true" className="relative w-full h-full">
              <img
                src="/images/factory-preview.webp"
                alt="Factory Preview"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: promoVisible ? 'scale(1)' : 'scale(1.06)',
                  transition: 'transform 1s ease-out',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  pointerEvents: 'none',
                }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
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

      {/* Leadership Section */}
      <section className="py-16 sm:py-24" style={{ background: 'var(--page-bg-5, #EDE6F2)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
              پێشەنگ لە پیشەسازی خانوو و کابینەی ئامادەکراودا
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-brand" />,
                title: "پێشەنگ لە پیشەسازی خانووی ئامادەکراو",
                description: "گەشەی بەردەوامی تۆڕی کڕیارانی ئەنتیکا هاوشان لەگەڵ کوالێتیی بەرز و متمانەی بەردەوام وایکردووە کارگەی ئەنتیکا ببێتە یەکێک لە گەورەترین و متمانەپێکراوترین ناوەندەکانی دروستکردنی خانوو و کابینەی مۆدێرن لە تەواوی عێراقدا",
              },
              {
                icon: <Award className="h-8 w-8 text-brand" />,
                title: "سەدان پڕۆژەی جێبەجێکراو",
                description: "کارگەی ئەنتیکا سەدان خانووی ئامادەکراو و کابینەی لە سەرانسەری عێراقدا دروستکردووە و ڕادەستی کڕیارانی کردووە، هاوکات بەرهەمەکانمان بۆ چەندین کەرتی جیاوازی گشتی و تایبەت دابینکراون",
              },
              {
                icon: <Layout className="h-8 w-8 text-brand" />,
                title: "هەمەجۆریی لە دیزاین و ڕووبەردا",
                description: "کارگەی ئەنتیکا نەخشە و دیزاینی جۆراوجۆری نیشتەجێبوون پێشکەشی کڕیاران دەکات کە ڕووبەرەکانیان لە ٥٠ مەترەوە بۆ ٥٠٠ مەتر دووجا دەستپێدەکات، ئەمە جگە لە جێبەجێکردنی چەندین پڕۆژەی بازرگانی، کارگێڕی و یەکەی نیشتەجێبوونی تایبەت",
              },
            ].map((feature, index) => (
              <Reveal key={index} delay={index * 150}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="inline-flex rounded-xl bg-brand-soft p-3 shrink-0">
                      {feature.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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