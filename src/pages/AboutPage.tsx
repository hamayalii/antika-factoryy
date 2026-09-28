import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";
import { CertificatesMarquee } from "../components/CertificatesMarquee";

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

export function AboutPage() {
  const parallaxSection = useParallax(0.2);
  const { isVisible, imageRef, textRef, isMobile } = useScrollAnimation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-white min-h-screen text-right font-body">
      <SEO
        title="دەربارەی ئێمە | کارگەی ئەنتیکا"
        description="دەربارەی کارگەی ئەنتیکا - کارگەیەک کە هونەر دەکاتە ژیان. تیمی ئەندازیار و دیزاینەری نێودەوڵەتی بە ئەزموونی زیاتر لە 20 ساڵ."
        canonical="https://antika-factory.netlify.app/about"
        image="/images/logo.png"
      />

      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-32 lg:pb-32 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* Image LEFT - Second in RTL order (appears on left) */}
            <div className="order-2 lg:order-2">
              <Reveal>
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl shadow-xl bg-gray-100 flex items-center justify-center">
                    <img
                      src="/images/al-4.jpg"
                      alt="Container Home - ANTIKA FACTORY"
                      className="max-h-[320px] w-full object-contain sm:max-h-[400px] lg:max-h-[450px]"
                      loading="eager"
                      decoding="async"
                      width="800"
                      height="600"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Text RIGHT - First in RTL order (appears on right) */}
            <div className="order-1 lg:order-1 w-full">
              <div dir="rtl" className="text-right inline-block w-full">
                <Reveal>
                  <h1 className="font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-black leading-[1.2] text-gray-900 text-right">
                    داهێنان لە پشت
                    <br />
                    بەرهەمەکانمانەوە
                  </h1>
                  <p className="mt-6 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-normal leading-relaxed text-gray-600 text-right">
                    ئێمە خاوەنی ئەزموونێکی فراوانین لە دیزاینکردن و دروستکردنی خانووە کەپسولییە ئاستبەرزەکاندا
                  </p>
                  <p className="mt-4 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-normal leading-relaxed text-gray-600 text-right">
                    چاوێک بە نموونەی کارەکانماندا بخشێنە کە تێیدا ئەو پڕۆژانە خراونەتەڕوو کە بۆ کڕیارە ڕازییەکانمان لە سەرانسەری عێراق جێبەجێمان کردوون.
                  </p>
                </Reveal>
                <Reveal delay={150}>
                  <div className="mt-8">
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand-dark shadow-lg hover:shadow-xl"
                    >
                      بینینی کارەکانمان
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16 sm:py-24 overflow-x-hidden" style={{ scrollMarginTop: '80px' }}>
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
                    <Link
                      to="/#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[14.5px] font-bold text-white transition hover:bg-brand-dark"
                    >
                      پەیوەندیمان پێوە بکە
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
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
                    src="/images/studio-about.jpg"
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

      {/* Certificates Marquee */}
      <CertificatesMarquee />
    </div>
  );
}