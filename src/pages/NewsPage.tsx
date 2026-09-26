import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  ChevronLeft,
  Calendar,
  Clock,
  ArrowLeft,
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
import { newsArticles } from "../data/newsData";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";
import { useParallax } from "../hooks/useParallax";

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
  const { ref, bgRef } = useParallax(0.15);

  return (
    <section ref={ref} className="slanted-parallax-section relative isolate min-h-[340px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="slanted-parallax-inner"
        role="img"
        aria-label="کەپسولی نیشتەجێبوون و مۆدێرنی کارگەی ئەنتیکا"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[12px] sm:text-[13.5px] font-bold text-white backdrop-blur-md mb-3 shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            داهێنان لە پیشەسازی و تەلارسازی مۆدیولار
          </div>
          <h3 className="font-display text-[24px] sm:text-[34px] md:text-[42px] font-black text-white drop-shadow-xl leading-[1.3]">
            بەرزترین ئاستی کوالێتی و متمانە
          </h3>
          <p className="mt-2 text-[13px] sm:text-[16px] text-gray-200/90 max-w-xl mx-auto drop-shadow font-medium">
            ئەنتیکا فاکتۆری، پێشەنگ لە بەرهەمهێنانی کەپسول و پێداویستییە ئەندازیارییەکان
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Slanted Parallax Banner 2 (After Info Section) ---------------- */
function NewsSlantedBannerBottom() {
  const { ref, bgRef } = useParallax(0.22);

  return (
    <section ref={ref} className="contact-cta-parallax relative isolate overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div ref={bgRef} className="contact-parallax-inner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40" />
        <div className="absolute inset-0 bg-brand/10 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/20 px-4 py-1.5 text-[13px] font-bold text-brand-light backdrop-blur-md mb-4">
            کارگەی ئەنتیکا
          </span>
          <h2 className="font-display text-[26px] sm:text-[34px] md:text-[44px] font-black leading-[1.3] text-white drop-shadow-lg">
            پەیوەندیمان پێوە بکە بۆ زانیاری زیاتر و ڕاوێژکاری
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] sm:text-[16px] font-medium text-white/90 drop-shadow-md">
            ئامادەین بۆ دابینکردنی باشترین چارەسەری نیشتەجێبوون و بازرگانی بۆ پڕۆژەکەت
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
  );
}

export function NewsPage() {
  const [lang, setLang] = useState<"ku" | "ar">("ku");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = Array.from(
    new Set(newsArticles.map((a) => (lang === "ku" ? a.categoryKu : a.categoryAr)))
  );

  const filteredArticles = newsArticles.filter((article) => {
    const title = lang === "ku" ? article.titleKu : article.titleAr;
    const excerpt = lang === "ku" ? article.excerptKu : article.excerptAr;
    const cat = lang === "ku" ? article.categoryKu : article.categoryAr;

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || cat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredArticle = newsArticles[0];

  return (
    <div className="bg-[#f8f9fb] pt-24 min-h-screen text-right font-body">
      <SEO
        title="هەواڵ و چالاکییەکان | کارگەی ئەنتیکا"
        description="دوایین هەواڵ، پێشانگا نێودەوڵەتییەکان، داهێنان و چالاکییەکانی کارگەی ئەنتیکا بۆ کەرەستەی ئەندازیاری و خانووی مۆدیولار."
        canonical="https://antika-factory.netlify.app/news"
        image={featuredArticle?.image || "/images/logo.png"}
      />

      {/* 1. Breadcrumb Bar */}
      <nav aria-label="ڕێڕەوی پەڕەکان" className="border-b border-gray-200/80 bg-white/80 backdrop-blur-md py-3.5 sticky top-20 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <ol className="flex items-center gap-2 text-[13px] text-gray-500">
              <li className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-1.5 transition hover:text-brand">
                  <HomeIcon className="h-3.5 w-3.5" />
                  <span>{lang === "ku" ? "سەرەکی" : "الرئيسية"}</span>
                </Link>
                <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
              </li>
              <li className="font-bold text-gray-900" aria-current="page">
                {lang === "ku" ? "هەواڵ و چالاکییەکان" : "الأخبار والفعاليات"}
              </li>
            </ol>

            {/* Language Switcher Button */}
            <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
              <button
                onClick={() => setLang("ku")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === "ku"
                  ? "bg-brand text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                کوردی
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === "ar"
                  ? "bg-brand text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-gray-50 py-12 sm:py-16 border-b border-gray-200/70">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-bold text-brand mb-4 shadow-sm">
              <Newspaper className="h-4 w-4" />
              {lang === "ku" ? "ئیڤێنت و دوایین ڕووداوەکان" : "المدونة وآخر التحديثات"}
            </span>
            <h1
              className="font-display font-black leading-[1.25] text-gray-900"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              {lang === "ku" ? "هەواڵ و چالاکییەکانی کارگەی ئەنتیکا" : "أخبار وفعاليات مصنع أنتيكا"}
            </h1>
            <p className="mt-4 text-[15px] sm:text-[16.5px] text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
              {lang === "ku"
                ? "ئاگاداری دوایین پێشهات، بەشداریکردن لە پێشانگا نێودەوڵەتییەکان، و پڕۆژە نوێیەکانی ئەنتیکا فاکتۆری بە."
                : "تابع آخر المستجدات، المشاركات في المعارض الدولية، وأحدث مشاريع وابتكارات مصنع أنتيكا."}
            </p>
          </Reveal>

          {/* Search and Filter Row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-4 py-2 text-[13px] font-bold transition-all ${selectedCategory === "all"
                  ? "bg-brand text-white shadow-md shadow-brand/20"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {lang === "ku" ? "هەموو بابەتەکان" : "جميع المقالات"} ({newsArticles.length})
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
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder={lang === "ku" ? "گەڕان لە هەواڵەکان..." : "بحث في الأخبار..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white py-2.5 pr-10 pl-4 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 transition shadow-sm"
              />
              <Search className="absolute right-3.5 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-sm max-w-lg mx-auto">
              <p className="text-gray-500 text-[15px]">
                {lang === "ku" ? "هیچ بابەتێک بەپێی گەڕانەکەت نەدۆزرایەوە." : "لم يتم العثور على أية مقالات تطابق بحثك."}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredArticles.map((article, idx) => {
                const title = lang === "ku" ? article.titleKu : article.titleAr;
                const excerpt = lang === "ku" ? article.excerptKu : article.excerptAr;
                const category = lang === "ku" ? article.categoryKu : article.categoryAr;
                const tags = lang === "ku" ? article.tagsKu : article.tagsAr;
                const highlights = lang === "ku" ? article.highlightItemsKu : article.highlightItemsAr;

                return (
                  <Reveal key={article.id} delay={idx * 100}>
                    <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand/30">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        {/* Image Column */}
                        <div className="relative lg:col-span-6 overflow-hidden bg-gray-900 group min-h-[340px] sm:min-h-[420px] flex items-center justify-center">
                          <img
                            src={article.image}
                            alt={title}
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:hidden" />

                          {/* Top Badge */}
                          <div className="absolute top-5 right-5 flex items-center gap-2">
                            <span className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-white shadow-md">
                              {category}
                            </span>
                            <span className="rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white shadow-md flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-brand" />
                              {article.readTime}
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
                              {lang === "ku" ? "سەیرکردنی ڤیدیۆ لە فەیسبووک" : "مشاهدة الفيديو على فيسبوك"}
                            </a>
                          )}
                        </div>

                        {/* Content Column */}
                        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:col-span-6 text-right">
                          <div>
                            {/* Metadata date */}
                            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-brand" />
                                {article.date}
                              </span>
                              <span>•</span>
                              <span>{category}</span>
                            </div>

                            {/* Title */}
                            <Link to={`/news/${article.slug}`}>
                              <h2 className="font-display text-xl sm:text-2xl lg:text-[26px] font-black leading-[1.4] text-gray-900 hover:text-brand transition-colors">
                                {title}
                              </h2>
                            </Link>

                            {/* Excerpt */}
                            <p className="mt-4 text-[14.5px] sm:text-[15.5px] text-gray-600 leading-relaxed font-normal">
                              {excerpt}
                            </p>

                            {/* Highlight Product Bullets with clean Lucide icons */}
                            <div className="mt-6 space-y-3 bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-100">
                              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                {lang === "ku" ? "بەشە سەرەکییە نمایشکراوەکان:" : "أبرز المعروضات في الجناح:"}
                              </p>
                              {highlights.map((item, hIdx) => (
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
                              {tags.slice(0, 3).map((tag, tIdx) => (
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
                              <span>{lang === "ku" ? "درێژەی هەواڵ" : "قراءة المزيد"}</span>
                              <ArrowLeft className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
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
              {lang === "ku" ? "هاوبەشیکردنی زانیاری و بەرهەمەکان" : "مشاركة المعلومات والمنتجات"}
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black mb-3 text-white">
              {lang === "ku" ? "پێویستت بە زانیاری زیاترە لەسەر بەرهەمەکانمان؟" : "هل تحتاج لمعلومات أكثر حول منتجاتنا؟"}
            </h2>
            <p className="text-[13.5px] sm:text-[15px] text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
              {lang === "ku"
                ? "تیمی ئەنتیکا فاکتۆری ئامادەیە بۆ ڕاوێژکاری ئەندازیاری، دیزاینی کەپسول و خانوو، و دابینکردنی هەموو جۆرە پێداویستییەکی پڕۆژەکەت."
                : "فريق مصنع أنتیکا مستعد لتقديم الاستشارات الهندسية، تصميم الكبسولات والبيوت، وتلبية كافة متطلبات مشروعك."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/#contact"
                className="rounded-full bg-brand px-6 sm:px-8 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] font-bold text-white shadow-lg transition hover:bg-brand-dark"
              >
                {lang === "ku" ? "پەیوەندیمان پێوە بکە" : "تواصل معنا"}
              </Link>
              <Link
                to="/products"
                className="rounded-full bg-white/10 border border-white/20 px-6 sm:px-8 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] font-bold text-white transition hover:bg-white hover:text-gray-900"
              >
                {lang === "ku" ? "سەرجەم بەرهەمەکان" : "جميع المنتجات"}
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
