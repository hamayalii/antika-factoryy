import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Zap, Truck, Calendar } from "lucide-react";
import { newsArticles } from "../data/newsData";

/* ---------------------------------- Reveal ---------------------------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
  animation = "fade-up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animation?: "fade-up" | "slide-left" | "slide-right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const animationClass = animation === "slide-left" ? "reveal-slide-left" :
                        animation === "slide-right" ? "reveal-slide-right" : "reveal";

  return (
    <div
      ref={ref}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={`${animationClass} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- About Antika Factory ---------------------------------- */
function AboutAntikaFactory() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Column - slides from right in RTL */}
          <Reveal animation="slide-right" className="order-2 lg:order-1">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
                <span className="h-[2px] w-6 rounded bg-brand" />
                دەربارەی کارگەی ئەنتیکا
                <span className="h-[2px] w-6 rounded bg-brand" />
              </span>
              <h2 className="font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
                پێشەنگی پیشەسازی کەپسول و خانووی کۆنتێنەر لە عێراق
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                ئەنتیکا فاکتۆری لە خولیایەکی بەردەوامەوە بۆ گۆڕینی چەمکی تەقلیدیی شوێنە ئامادەکراوەکان دەستی پێکرد بە تێپەڕبوونی ساڵان و پشت بەستن بە ئەزموونێکی قووڵ، لە خولیایەکی دیزاینەوە بووین بە کارگەیەکی پێشەنگ لە دروستکردنی کاراڤانی مۆدێرن، کۆشکی بازرگانیی سەردەمیانە، و کەپسولی نیشتەجێبوون بە بەکارهێنانی باشترین کەرەستەی پیشەسازی و پێشکەوتووترین تەکنەلۆژیای بیناسازی و سیستەمی عەزل، هەر بەرهەمێکمان تێکەڵەیەکە لە پتەویی بێهاوتا و جوانییەکی ئاستبەرز کە بەرگەی سەختترین بارودۆخەکانی کەشوهەوا دەگرێت.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[14px] font-bold text-white transition hover:bg-brand-dark hover:shadow-lg"
              >
                زیاتر بزانە
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Image Column - slides from left in RTL */}
          <Reveal animation="slide-left" delay={200} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/factory-preview.webp"
                alt="کارگەی ئەنتیکە"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Why Antika Products ---------------------------------- */
function WhyAntikaProducts() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-brand" />,
      title: "متمانە و ڕاستگۆیی لە کوالێتیدا",
      description: "ڕاستگۆیانە پشت بە باشترین کەرەستەی پیشەسازی دەبەستین تا بەرگەی سەختترین بارودۆخەکان بگرێت. لە ڕێگەی سەرپەرشتیی بەردەوامی ئەندازیارانمانەوە، کڕیارەکانمان دڵنیا دەکەینەوە لە وەرگرتنی بەرهەمێک کە تەمەنێکی درێژ و پتەوییەکی بێهاوتای هەیە",
    },
    {
      icon: <Zap className="h-8 w-8 text-brand" />,
      title: "دیزاینی مۆدێرن و چارەسەری داهێنەرانە",
      description: "بڕوامان بە چارەسەری باو نییە! بە دیزاینی پێشکەوتووی 3D دەرفەت بە کڕیار دەدەین پێش جێبەجێکردن وردەکارییەکانی شوێنەکەی ببینێت و بەپێی خواست و دیدگای خۆی دایڕێژێت",
    },
    {
      icon: <Truck className="h-8 w-8 text-brand" />,
      title: "ڕادەستکردنی تەواوەتی",
      description: "پڕۆژەکانمان بە تەواوەتی و ئامادەکراوی بۆ بەکارهێنانی دەستبەجێ ڕادەستی کڕیارەکانمان دەکەین، بە لەبەرچاوگرتنی بەرزترین ستانداردەکانی سەلامەتی، کوالێتی و ئاسوودەیی",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            بۆچی ئەنتیکا؟
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
هەڵسوکەوتی ئێمە لەگەڵ کڕیارەکانمان        
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
  );
}

/* ---------------------------------- Latest News & Activities ---------------------------------- */
function LatestNewsActivities() {
  const featuredArticle = newsArticles[0];

  return (
    <section style={{ backgroundColor: '#111827' }} className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Right */}
          <Reveal animation="slide-right" className="order-1 lg:order-1">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-[14px] font-bold text-white">
                <span className="h-[2px] w-6 rounded bg-brand" />
                دوایین هەواڵ و چالاکییەکانمان
                <span className="h-[2px] w-6 rounded bg-brand" />
              </span>
              <h2 className="font-display font-black leading-[1.3] text-white" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
لێرەوە ئاگاداری گەشە و چالاکییەکانی ڕۆژانەمان بە              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
ئاگاداری نوێترین پڕۆژەکانمان، نوێکارییەکان لە دیزاین، و بەشداریکردنمان لە پێشانگا و چالاکییە پیشەسازییەکان بن              </p>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-dark bg-brand-dark px-8 py-3.5 text-[14px] font-bold text-white transition hover:bg-brand hover:border-brand hover:shadow-lg"
              >
                هەموو هەواڵەکان ببینە
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Featured News Article - Left */}
          {featuredArticle && (
            <Reveal animation="slide-left" className="order-2 lg:order-2">
              <Link
                to={`/news/${featuredArticle.slug}`}
                className="group block rounded-xl overflow-hidden bg-coal shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-video bg-gray-800 overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.titleKu}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold text-brand">
                    <span>{featuredArticle.categoryKu}</span>
                    <span className="text-gray-500">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {featuredArticle.date}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-white line-clamp-2 group-hover:text-brand transition-colors">
                    {featuredArticle.titleKu}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {featuredArticle.excerptKu}
                  </p>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Main Component ---------------------------------- */
export function FactoryInfoSection() {
  return (
    <>
      <AboutAntikaFactory />
      <WhyAntikaProducts />
      <LatestNewsActivities />
    </>
  );
}
