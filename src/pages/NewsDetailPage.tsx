import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Home as HomeIcon, 
  ChevronLeft, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Video, 
  Tag, 
  Sparkles,
  Building2,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Mail,
  ExternalLink,
  Home,
  Lamp,
  ShieldCheck,
} from "lucide-react";
import { getNewsBySlug, newsArticles } from "../data/newsData";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";

function getHighlightIcon(iconName: string) {
  switch (iconName) {
    case "home":
      return <Home className="h-6 w-6 text-brand" />;
    case "lamp":
      return <Lamp className="h-6 w-6 text-brand" />;
    case "shield":
      return <ShieldCheck className="h-6 w-6 text-brand" />;
    default:
      return <Building2 className="h-6 w-6 text-brand" />;
  }
}

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
  </svg>
);

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lang, setLang] = useState<"ku" | "ar">("ku");
  const [copied, setCopied] = useState(false);

  const article = slug ? getNewsBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-24 text-center text-right">
        <SEO
          title="هەواڵ نەدۆزرایەوە | کارگەی ئەنتیکا"
          description="ئەو بابەتەی بەدوایدا دەگەڕێیت نەدۆزرایەوە."
        />
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            هەواڵ نەدۆزرایەوە
          </h1>
          <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
            ببورە، ئەو هەواڵەی بەدوایدا دەگەڕێیت لەوانەیە سڕدرابێتەوە یان بەستەرەکەی هەڵە بێت.
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[14px] font-bold text-white transition hover:bg-brand-dark shadow-md"
          >
            گەڕانەوە بۆ پەڕەی هەواڵەکان
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === "ku" ? article.titleKu : article.titleAr;
  const excerpt = lang === "ku" ? article.excerptKu : article.excerptAr;
  const content = lang === "ku" ? article.contentKu : article.contentAr;
  const highlights = lang === "ku" ? article.highlightItemsKu : article.highlightItemsAr;
  const conclusion = lang === "ku" ? article.conclusionKu : article.conclusionAr;
  const category = lang === "ku" ? article.categoryKu : article.categoryAr;
  const tags = lang === "ku" ? article.tagsKu : article.tagsAr;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-[#f8f9fb] pt-24 min-h-screen text-right font-body">
      <SEO
        title={`${title} | کارگەی ئەنتیکا`}
        description={excerpt}
        canonical={`https://antika-factory.netlify.app/news/${article.slug}`}
        image={article.image}
      />

      {/* 1. Breadcrumb Bar */}
      <nav aria-label="ڕێڕەوی پەڕەکان" className="border-b border-gray-200/80 bg-white/80 backdrop-blur-md py-3.5 sticky top-20 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <ol className="flex items-center gap-2 text-[13px] text-gray-500 overflow-hidden">
              <li className="flex items-center gap-2 shrink-0">
                <Link to="/" className="flex items-center gap-1.5 transition hover:text-brand">
                  <HomeIcon className="h-3.5 w-3.5" />
                  <span>{lang === "ku" ? "سەرەکی" : "الرئيسية"}</span>
                </Link>
                <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
              </li>
              <li className="flex items-center gap-2 shrink-0">
                <Link to="/news" className="transition hover:text-brand">
                  {lang === "ku" ? "هەواڵەکان" : "الأخبار"}
                </Link>
                <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
              </li>
              <li className="font-bold text-gray-900 truncate max-w-[200px] sm:max-w-md" aria-current="page">
                {title}
              </li>
            </ol>

            {/* Language Switcher Button */}
            <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200 shrink-0">
              <button
                onClick={() => setLang("ku")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === "ku"
                    ? "bg-brand text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                کوردی
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === "ar"
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

      {/* 2. Article Header & Hero */}
      <article className="py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="rounded-full bg-brand-soft px-3.5 py-1 text-xs font-bold text-brand">
                {category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                {article.date}
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display font-black leading-[1.3] text-gray-900"
              style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
            >
              {title}
            </h1>

            {/* Excerpt Lead */}
            <p className="mt-5 text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal border-r-4 border-brand pr-4 bg-white/50 py-2 rounded-l-xl">
              {excerpt}
            </p>
          </Reveal>

          {/* Featured Image */}
          <Reveal delay={100} className="mt-8">
            <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-xl bg-gray-900 relative">
              <img
                src={article.image}
                alt={title}
                className="w-full h-auto max-h-[550px] object-cover object-center"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md rounded-xl px-4 py-2 text-xs text-white">
                {lang === "ku" ? "بەشداری تیمی کارگەی ئەنتیکا لە پێشانگای Invest Expo 2025" : "مشاركة فريق مصنع أنتيكا في معرض Invest Expo 2025"}
              </div>
            </div>
          </Reveal>

          {/* 3. Article Body Content */}
          <div className="mt-10 sm:mt-14 space-y-8 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-200/80 shadow-sm">
            {/* Paragraphs */}
            <div className="space-y-5 text-[16px] text-gray-700 leading-loose">
              {content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Highlight Showcase Cards (Prefabhaus styled feature blocks) */}
            <div className="my-8">
              <h3 className="font-display text-lg sm:text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand" />
                {lang === "ku" ? "بەشە نمایشکراوەکانی کۆشکەکەمان:" : "أبرز المعروضات في جناحنا:"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-200/90 bg-gradient-to-b from-gray-50/70 to-white p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-brand/40"
                  >
                    <div className="mb-4 inline-flex p-3 rounded-2xl bg-brand/10 text-brand">
                      {getHighlightIcon(item.icon)}
                    </div>
                    <h4 className="font-display text-[16px] font-bold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-[13.5px] text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion Statement */}
            <div className="rounded-2xl bg-brand/5 border border-brand/20 p-6 sm:p-8">
              <p className="text-[15.5px] sm:text-[16.5px] text-gray-800 leading-relaxed font-medium">
                {conclusion}
              </p>
            </div>

            {/* Video Integration Link */}
            {article.videoUrl && (
              <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div className="flex items-center gap-4 text-right">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    <Video className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold">
                      {lang === "ku" ? "ڤیدیۆی ڕاستەوخۆ و ڕاپۆرتی پێشانگاکە" : "فيديو التغطية الخاصة بالمعرض"}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1">
                      {lang === "ku" ? "سەیری ڤیدیۆی بەشداری و کۆشکی ئەنتیکا فاکتۆری بکە لە فەیسبووک" : "شاهد فيديو تغطية مشاركتنا وجناح مصنع أنتيكا على فيسبوك"}
                    </p>
                  </div>
                </div>

                <a
                  href={article.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2.5 rounded-full bg-white text-gray-900 px-6 py-3 text-[13.5px] font-bold shadow-lg transition hover:bg-brand hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4 text-[#1877F2]" />
                  <span>{lang === "ku" ? "بینینی ڤیدیۆ لە فەیسبووک" : "مشاهدة الفيديو"}</span>
                </a>
              </div>
            )}

            {/* Tags and Share Section */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300"
                >
                  <Share2 className="h-3.5 w-3.5 text-brand" />
                  {copied ? (lang === "ku" ? "بەستەرەکە کۆپیکرا!" : "تم نسخ الرابط!") : (lang === "ku" ? "هاوبەشکردن" : "مشاركة")}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Back */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-gray-700 hover:text-brand transition"
            >
              <ArrowRight className="h-4 w-4" />
              <span>{lang === "ku" ? "گەڕانەوە بۆ هەموو هەواڵەکان" : "العودة لجميع الأخبار"}</span>
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-brand hover:text-brand-dark transition"
            >
              <span>{lang === "ku" ? "بینینی بەرهەمەکانمان" : "استعراض منتجاتنا"}</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
