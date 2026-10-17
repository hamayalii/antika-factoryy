import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, Zap, Truck, Calendar } from "lucide-react";
import { newsArticles, localizeNewsArticle } from "../data/newsData";
import { useLanguage } from "../contexts/LanguageContext";
import AwardBadge from "./AwardBadge";

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
  const { language, dir } = useLanguage();
  const copy = {
    ku: {
      kicker: "دەربارەی کارگەی ئەنتیکا",
      title: "پێشەنگی پیشەسازی کەپسول و خانووی کۆنتێنەر لە عێراق",
      body: "ئەنتیکا فاکتۆری لە خولیایەکی بەردەوامەوە بۆ گۆڕینی چەمکی تەقلیدیی شوێنە ئامادەکراوەکان دەستی پێکرد بە تێپەڕبوونی ساڵان و پشت بەستن بە ئەزموونێکی قووڵ، لە خولیایەکی دیزاینەوە بووین بە کارگەیەکی پێشەنگ لە دروستکردنی کاراڤانی مۆدێرن، کۆشکی بازرگانیی سەردەمیانە، و کەپسولی نیشتەجێبوون بە بەکارهێنانی باشترین کەرەستەی پیشەسازی و پێشکەوتووترین تەکنەلۆژیای بیناسازی و سیستەمی عەزل، هەر بەرهەمێکمان تێکەڵەیەکە لە پتەویی بێهاوتا و جوانییەکی ئاستبەرز کە بەرگەی سەختترین بارودۆخەکانی کەشوهەوا دەگرێت.",
      cta: "زیاتر بزانە",
      imageAlt: "کارگەی ئەنتیکە",
      badgeTitle: "بۆ خانووی ئامادەکراو و کەپسول",
      badgeSubtitle: "هەڵبژاردەی ژمارە #1 لە تەواوی عێراق",
    },
    en: {
      kicker: "About Antika Factory",
      title: "A pioneer of the capsule and container-house industry in Iraq",
      body: "Antika Factory started from an enduring passion to transform the traditional concept of prefabricated spaces. Over the years, and through deep experience, that passion for design grew into a leading factory producing modern caravans, contemporary commercial kiosks and residential capsules, using the finest industrial materials and the most advanced construction and insulation technologies. Every product we make is a blend of unmatched strength and high-end aesthetics, built to withstand the harshest weather conditions.",
      cta: "Learn more",
      imageAlt: "Antika Factory",
      badgeTitle: "For ready-made houses and capsules",
      badgeSubtitle: "The #1 choice across all of Iraq",
    },
    ar: {
      kicker: "عن أنتيكا فاكتوري",
      title: "رائد صناعة الكبسولات ومنازل الحاويات في العراق",
      body: "بدأت أنتيكا فاكتوري من شغف متواصل بتغيير المفهوم التقليدي للمساحات الجاهزة. وعلى مرّ السنين، وبالاعتماد على خبرة عميقة، تحوّل هذا الشغف بالتصميم إلى مصنع رائد في صناعة الكارافانات العصرية والأكشاك التجارية الحديثة والكبسولات السكنية، باستخدام أفضل المواد الصناعية وأحدث تقنيات البناء والعزل. وكل منتج نصنعه هو مزيج من متانة لا تُضاهى وجمالية عالية، يتحمّل أقسى الظروف المناخية.",
      cta: "اعرف المزيد",
      imageAlt: "أنتيكا فاكتوري",
      badgeTitle: "للمنازل الجاهزة والكبسولات",
      badgeSubtitle: "الخيار رقم 1 في عموم العراق",
    },
  }[language];

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Column - slides from right in RTL */}
          <Reveal animation="slide-right" className="order-2 lg:order-1">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
                <span className="h-[2px] w-6 rounded bg-brand" />
                {copy.kicker}
                <span className="h-[2px] w-6 rounded bg-brand" />
              </span>
              <h2 className="font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
                {copy.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {copy.body}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[14px] font-bold text-white transition hover:bg-brand-dark hover:shadow-lg"
              >
                {copy.cta}
                {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Link>
            </div>
          </Reveal>

          {/* Image Column - slides from left in RTL */}
          <Reveal animation="slide-left" delay={200} className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded">
                <img
                  src="/images/factory-preview.webp"
                  alt={copy.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 lg:bottom-8 lg:right-18 z-10 badge-float hidden lg:block" style={{ transform: 'scale(clamp(0.6, 8vw, 1))' }}>
                <AwardBadge title={copy.badgeTitle} subtitle={copy.badgeSubtitle} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Why Antika Products ---------------------------------- */
function WhyAntikaProducts() {
  const { language } = useLanguage();
  const copy = {
    ku: { kicker: "بۆچی ئەنتیکا؟", title: "هەڵسوکەوتی ئێمە لەگەڵ کڕیارەکانمان" },
    en: { kicker: "Why Antika?", title: "How we treat our customers" },
    ar: { kicker: "لماذا أنتيكا؟", title: "طريقة تعاملنا مع عملائنا" },
  }[language];
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-brand" />,
      ku: {
        title: "متمانە و ڕاستگۆیی لە کوالێتیدا",
        description: "ڕاستگۆیانە پشت بە باشترین کەرەستەی پیشەسازی دەبەستین تا بەرگەی سەختترین بارودۆخەکان بگرێت. لە ڕێگەی سەرپەرشتیی بەردەوامی ئەندازیارانمانەوە، کڕیارەکانمان دڵنیا دەکەینەوە لە وەرگرتنی بەرهەمێک کە تەمەنێکی درێژ و پتەوییەکی بێهاوتای هەیە",
      },
      en: {
        title: "Trust and honesty in quality",
        description: "We honestly rely on the finest industrial materials so our products withstand the harshest conditions. Through the continuous supervision of our engineers, we assure our customers of a product with a long lifespan and unmatched strength.",
      },
      ar: {
        title: "الثقة والصدق في الجودة",
        description: "نعتمد بصدق على أفضل المواد الصناعية لتتحمّل منتجاتنا أقسى الظروف. ومن خلال الإشراف المستمر من مهندسينا، نضمن لعملائنا منتجاً بعمر تشغيلي طويل ومتانة لا تُضاهى.",
      },
    },
    {
      icon: <Zap className="h-8 w-8 text-brand" />,
      ku: {
        title: "دیزاینی مۆدێرن و چارەسەری داهێنەرانە",
        description: "بڕوامان بە چارەسەری باو نییە! بە دیزاینی پێشکەوتووی 3D دەرفەت بە کڕیار دەدەین پێش جێبەجێکردن وردەکارییەکانی شوێنەکەی ببینێت و بەپێی خواست و دیدگای خۆی دایڕێژێت",
      },
      en: {
        title: "Modern design and innovative solutions",
        description: "We don't believe in ordinary solutions! With advanced 3D design we let customers see the details of their space before execution and shape it according to their own wishes and vision.",
      },
      ar: {
        title: "تصميم عصري وحلول مبتكرة",
        description: "لا نؤمن بالحلول التقليدية! عبر التصميم المتقدم بتقنية 3D نتيح لعملائنا رؤية تفاصيل مساحتهم قبل التنفيذ وتشكيلها وفق رغباتهم ورؤيتهم.",
      },
    },
    {
      icon: <Truck className="h-8 w-8 text-brand" />,
      ku: {
        title: "ڕادەستکردنی تەواوەتی",
        description: "پڕۆژەکانمان بە تەواوەتی و ئامادەکراوی بۆ بەکارهێنانی دەستبەجێ ڕادەستی کڕیارەکانمان دەکەین، بە لەبەرچاوگرتنی بەرزترین ستانداردەکانی سەلامەتی، کوالێتی و ئاسوودەیی",
      },
      en: {
        title: "Turnkey delivery",
        description: "We deliver our projects fully complete and ready for immediate use, observing the highest standards of safety, quality and comfort.",
      },
      ar: {
        title: "تسليم جاهز بالكامل",
        description: "نسلّم مشاريعنا مكتملة تماماً وجاهزة للاستخدام الفوري، مع مراعاة أعلى معايير السلامة والجودة والراحة.",
      },
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            {copy.kicker}
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
            {copy.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className="group h-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="inline-flex rounded-xl bg-brand-soft p-2 sm:p-3 shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                    {feature[language].title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">
                  {feature[language].description}
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
  const { language, dir } = useLanguage();
  const copy = {
    ku: {
      kicker: "دوایین هەواڵ و چالاکییەکانمان",
      title: "لێرەوە ئاگاداری گەشە و چالاکییەکانی ڕۆژانەمان بە",
      body: "ئاگاداری نوێترین پڕۆژەکانمان، نوێکارییەکان لە دیزاین، و بەشداریکردنمان لە پێشانگا و چالاکییە پیشەسازییەکان بن",
      cta: "هەموو هەواڵەکان ببینە",
    },
    en: {
      kicker: "Our latest news and activities",
      title: "Follow our daily progress and activities from here",
      body: "Stay updated on our newest projects, design innovations, and our participation in exhibitions and industry events.",
      cta: "See all news",
    },
    ar: {
      kicker: "آخر أخبارنا وأنشطتنا",
      title: "تابع من هنا تطوّرنا وأنشطتنا اليومية",
      body: "ابقَ على اطلاع بأحدث مشاريعنا وابتكاراتنا في التصميم ومشاركاتنا في المعارض والفعاليات الصناعية.",
      cta: "عرض جميع الأخبار",
    },
  }[language];

  const featuredArticle = newsArticles[0];
  const featured = featuredArticle ? localizeNewsArticle(featuredArticle, language) : null;

  return (
    <section style={{ backgroundColor: '#111827' }} className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Right */}
          <Reveal animation="slide-right" className="order-1 lg:order-1">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-[14px] font-bold text-white">
                <span className="h-[2px] w-6 rounded bg-brand" />
                {copy.kicker}
                <span className="h-[2px] w-6 rounded bg-brand" />
              </span>
              <h2 className="font-display font-black leading-[1.3] text-white" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
                {copy.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {copy.body}
              </p>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-dark bg-brand-dark px-8 py-3.5 text-[14px] font-bold text-white transition hover:bg-brand hover:border-brand hover:shadow-lg"
              >
                {copy.cta}
                {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Link>
            </div>
          </Reveal>

          {/* Featured News Article - Left */}
          {featured && (
            <Reveal animation="slide-left" className="order-2 lg:order-2">
              <Link
                to={`/news/${featuredArticle.slug}`}
                className="group block rounded-xl overflow-hidden bg-coal shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-video bg-gray-800 overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold text-brand">
                    <span>{featured.category}</span>
                    <span className="text-gray-500">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {featured.date}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-white line-clamp-2 group-hover:text-brand transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {featured.excerpt}
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
