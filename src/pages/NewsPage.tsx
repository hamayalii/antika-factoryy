import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Video,
  Search,
  PhoneCall,
  Mail,
  Home,
  Lamp,
  ShieldCheck,
  Building2,
  Newspaper
} from "lucide-react";
import { newsArticles, localizeNewsArticle } from "../data/newsData";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
import { useContactModal } from "../contexts/ContactModalContext";
import { SelectiveHydration } from "../components/SelectiveHydration";

function getHighlightIcon(iconName: string) {
  switch (iconName) {
    case "home":
      return <Home className="h-5 w-5 text-brand" />;
    case "lamp":
      return <Lamp className="h-5 w-5 text-brand" />;
    case "shield":
      return <ShieldCheck className="h-5 w-5 text-brand" />;
    default:
      return <Building2 className="h-5 w-5 text-brand" />;
  }
}

/* ---------------- Slanted Parallax Banner 1 (Before Info Section) ---------------- */
function NewsSlantedBannerTop() {
  const { language } = useLanguage();
  const copy = {
    ku: {
      aria: "کەپسولی نیشتەجێبوون و مۆدێرنی کارگەی ئەنتیکا",
      badge: "داهێنان لە پیشەسازی و تەلارسازی مۆدیولار",
      title: "بەرزترین ئاستی کوالێتی و متمانە",
      subtitle: "ئەنتیکا فاکتۆری، پێشەنگ لە بەرهەمهێنانی کەپسول و پێداویستییە ئەندازیارییەکان",
    },
    en: {
      aria: "The modern residential capsule by Antika Factory",
      badge: "Innovation in modular industry and architecture",
      title: "The highest level of quality and trust",
      subtitle: "Antika Factory, a pioneer in manufacturing capsules and engineering supplies",
    },
    ar: {
      aria: "الكبسولة السكنية العصرية من أنتيكا فاكتوري",
      badge: "الابتكار في الصناعة والعمارة المودولار",
      title: "أعلى مستويات الجودة والثقة",
      subtitle: "أنتيكا فاكتوري، رائد في إنتاج الكبسولات والمستلزمات الهندسية",
    },
  }[language];

  return (
    <div className="bg-[#111827]">
      <section className="slanted-parallax-section relative isolate min-h-[340px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center -mt-px" style={{ '--wedge-top': '#f8f9fb' } as React.CSSProperties} aria-label={copy.aria}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[12px] sm:text-[13.5px] font-bold text-white backdrop-blur-md mb-3 shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              {copy.badge}
            </div>
            <h3 className="font-display text-[24px] sm:text-[34px] md:text-[42px] font-black text-white drop-shadow-xl leading-[1.3]">
              {copy.title}
            </h3>
            <p className="mt-2 text-[13px] sm:text-[16px] text-gray-200/90 max-w-xl mx-auto drop-shadow font-medium">
              {copy.subtitle}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Slanted Parallax Banner 2 (After Info Section) ---------------- */
function NewsSlantedBannerBottom() {
  const { language } = useLanguage();
  const copy = {
    ku: {
      badge: "کارگەی ئەنتیکا",
      title: "پەیوەندیمان پێوە بکە بۆ زانیاری زیاتر و ڕاوێژکاری",
      subtitle: "ئامادەین بۆ دابینکردنی باشترین چارەسەری نیشتەجێبوون و بازرگانی بۆ پڕۆژەکەت",
    },
    en: {
      badge: "Antika Factory",
      title: "Contact us for more information and consultation",
      subtitle: "We are ready to provide the best residential and commercial solutions for your project",
    },
    ar: {
      badge: "أنتيكا فاكتوري",
      title: "تواصل معنا لمزيد من المعلومات والاستشارة",
      subtitle: "نحن مستعدون لتقديم أفضل الحلول السكنية والتجارية لمشروعك",
    },
  }[language];

  return (
    <div className="bg-[#111827]">
      <section className="contact-cta-parallax relative isolate">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/20 px-4 py-1.5 text-[13px] font-bold text-brand-light backdrop-blur-md mb-4">
              {copy.badge}
            </span>
            <h2 className="font-display text-[26px] sm:text-[34px] md:text-[44px] font-black leading-[1.3] text-white drop-shadow-lg">
              {copy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14.5px] sm:text-[16px] font-medium text-white/90 drop-shadow-md">
              {copy.subtitle}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+9647501234567"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white shadow-xl transition hover:bg-brand-dark hover:scale-105"
              >
                <PhoneCall className="h-5 w-5" />
                <span dir="ltr">+964 750 123 4567</span>
              </a>
              <a
                href="mailto:info@antika-factory.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-gray-900"
              >
                <Mail className="h-5 w-5" />
                info@antika-factory.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export function NewsPage() {
  const { language, t, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { openContactModal } = useContactModal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Category chips are rendered in the active language; a selection made in one
  // language must not silently filter everything out after a switch.
  useEffect(() => {
    setSelectedCategory("all");
  }, [language]);

  const localized = newsArticles.map((article) => ({
    article,
    copy: localizeNewsArticle(article, language),
  }));

  const categories = Array.from(new Set(localized.map(({ copy }) => copy.category)));

  const filteredEntries = localized.filter(({ copy }) => {
    const matchesSearch =
      copy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      copy.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || copy.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredArticle = newsArticles[0];

  return (
    <div className="pt-24 min-h-screen text-start font-body">
      <SEO
        title={t("news.seoTitle")}
        description={t("news.seoDescription")}
        canonical="https://antika-factory.netlify.app/news"
        image={featuredArticle?.image || "/images/logo.png"}
      />

      {/* 1. Breadcrumb Bar */}
      <nav aria-label={t("product.breadcrumbAria")} className="border-b border-gray-200/80 backdrop-blur-md py-3.5 sticky top-20 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <ol className="flex items-center gap-2 text-[13px] text-gray-500 flex-wrap">
              <li className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-1.5 transition hover:text-brand">
                  <HomeIcon className="h-3.5 w-3.5" />
                  <span>{t("nav.home")}</span>
                </Link>
                {dir === "rtl" ? (
                  <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                )}
              </li>
              <li className="font-bold text-gray-900" aria-current="page">
                {t("news.title")}
              </li>
            </ol>
          </div>
        </div>
      </nav>

      {/* 2. Hero Header */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-gray-200/70">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-bold text-brand mb-4 shadow-sm">
              <Newspaper className="h-4 w-4" />
              {t("news.hero.badge")}
            </span>
            <h1
              className="font-display font-black leading-[1.25] text-gray-900"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              {t("news.hero.title")}
            </h1>
            <p className="mt-4 text-[15px] sm:text-[16.5px] text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
              {t("news.hero.subtitle")}
            </p>
          </Reveal>

          {/* Search and Filter Row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${selectedCategory === "all"
                  ? "bg-brand text-white shadow-md shadow-brand/20"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {t("news.filterAll")} ({newsArticles.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${selectedCategory === cat
                    ? "bg-brand text-white shadow-md shadow-brand/20"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72 shrink-0">
              <input
                type="text"
                placeholder={t("news.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white py-2.5 ps-10 pe-4 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 transition shadow-sm"
              />
              <Search className="absolute start-3.5 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredEntries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-sm max-w-lg mx-auto">
              <p className="text-gray-500 text-[15px]">
                {t("news.empty")}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredEntries.map(({ article, copy }, idx) => {
                return (
                  <SelectiveHydration key={article.id} threshold={0.1} rootMargin="0px 0px 400px 0px">
                    <Reveal delay={idx * 100}>
                    <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand/30">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        {/* Image Column */}
                        <div className="relative lg:col-span-6 overflow-hidden bg-gray-900 group min-h-[340px] sm:min-h-[420px] flex items-center justify-center">
                          <img
                            src={article.image}
                            alt={copy.title}
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:hidden" />

                          {/* Top Badge */}
                          <div className="absolute top-5 right-5 flex items-center gap-2">
                            <span className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-white shadow-md">
                              {copy.category}
                            </span>
                            <span className="rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white shadow-md flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-brand" />
                              {t("news.readTime", { n: copy.readMinutes })}
                            </span>
                          </div>

                          {/* Video prompt badge if video exists */}
                          {article.videoUrl && (
                            <a
                              href={article.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-gray-900 shadow-lg transition hover:bg-white hover:text-brand"
                            >
                              <Video className="h-4 w-4 text-brand" />
                              {t("news.watchVideo")}
                            </a>
                          )}
                        </div>

                        {/* Content Column */}
                        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:col-span-6 text-start">
                          <div>
                            {/* Metadata date */}
                            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-brand" />
                                {copy.date}
                              </span>
                              <span>•</span>
                              <span>{copy.category}</span>
                            </div>

                            {/* Title */}
                            <Link to={`/news/${article.slug}`}>
                              <h2 className="font-display text-xl sm:text-2xl lg:text-[26px] font-black leading-[1.4] text-gray-900 hover:text-brand transition-colors">
                                {copy.title}
                              </h2>
                            </Link>

                            {/* Excerpt */}
                            <p className="mt-4 text-[14.5px] sm:text-[15.5px] text-gray-600 leading-relaxed font-normal">
                              {copy.excerpt}
                            </p>

                            {/* Highlight Product Bullets with clean Lucide icons */}
                            <div className="mt-6 space-y-3 bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100">
                              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                {t("news.highlights")}
                              </p>
                              {copy.highlightItems.map((item, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-3">
                                  <span className="p-2 rounded-xl bg-brand/10 shrink-0 mt-0.5">
                                    {getHighlightIcon(item.icon)}
                                  </span>
                                  <div>
                                    <span className="font-bold text-[13.5px] text-gray-900">{item.title}: </span>
                                    <span className="text-[13px] text-gray-600">{item.desc}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Footer */}
                          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-1.5">
                              {copy.tags.slice(0, 3).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1 text-[11.5px] font-medium text-gray-600"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <Link
                              to={`/news/${article.slug}`}
                              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-[13.5px] font-bold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-dark hover:gap-3"
                            >
                              <span>{t("news.readMore")}</span>
                              {dir === "rtl" ? (
                                <ArrowLeft className="h-4 w-4" />
                              ) : (
                                <ArrowRight className="h-4 w-4" />
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </SelectiveHydration>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Diagonal Slanted Section 1 (Before Info Section) */}
      <NewsSlantedBannerTop />

      {/* 4. Information & Products Sharing Section (Seamless Dark Middle Section) */}
      <section className="process-diagonal-section !bg-[#111827] text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-soft mb-3 border border-white/10">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              {t("news.info.badge")}
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black mb-3 text-white">
              {t("news.info.title")}
            </h2>
            <p className="text-[13.5px] sm:text-[15px] text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
              {t("news.info.body")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => openContactModal()}
                className="rounded-full bg-brand px-6 sm:px-8 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] font-bold text-white shadow-lg transition hover:bg-brand-dark"
              >
                {t("news.contactCta")}
              </button>
              <Link
                to="/products"
                className="rounded-full bg-white/10 border border-white/20 px-6 sm:px-8 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] font-bold text-white transition hover:bg-white hover:text-gray-900"
              >
                {t("news.allProducts")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Diagonal Slanted Section 2 (After Info Section) */}
      <NewsSlantedBannerBottom />
    </div>
  );
}
