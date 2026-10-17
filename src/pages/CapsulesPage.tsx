import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Layers, MessageCircle, PhoneCall, Mail, ArrowLeft, ArrowRight, Home as HomeIcon } from "lucide-react";
import { capsuleCategories, capsuleProducts, localizeCategory } from "../data/productData";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";

export function CapsulesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { language, t, dir } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? capsuleProducts
      : capsuleProducts.filter((p) => p.categoryId === selectedCategory);

  return (
    <div className="pt-24 min-h-screen text-start">
      <SEO
        title={t("capsulesPage.seoTitle")}
        description={t("capsulesPage.seoDescription")}
        canonical="https://antika-factory.netlify.app/products/capsules"
      />

      {/* Breadcrumb */}
      <nav aria-label={t("product.breadcrumbAria")} className="border-b border-gray-200 py-3.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <ol className="flex items-center gap-2 text-[13px] text-gray-500 flex-wrap">
            <li className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-1.5 transition hover:text-brand">
                <Home className="h-3.5 w-3.5" />
                <span>{t("nav.home")}</span>
              </Link>
              {dir === "rtl" ? (
                <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              )}
            </li>
            <li className="flex items-center gap-2">
              <Link to="/#products" className="transition hover:text-brand">
                {t("listing.productsCrumb")}
              </Link>
              {dir === "rtl" ? (
                <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              )}
            </li>
            <li className="font-bold text-gray-900" aria-current="page">
              {t("nav.capsules")}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-bold text-brand mb-4">
              <Layers className="h-4 w-4" />
              {t("capsulesPage.badge", { n: capsuleProducts.length })}
            </span>
            <h1
              className="font-display font-black leading-[1.25] text-gray-900"
              style={{ fontSize: "clamp(28px, 4.5vw, 46px)" }}
            >
              {t("capsulesPage.title")}
            </h1>
            <p className="mt-4 text-[15.5px] sm:text-[16.5px] text-gray-600 leading-relaxed font-light">
              {t("capsulesPage.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filterable Capsules List */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all ${selectedCategory === "all"
                ? "bg-brand text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {t("capsulesPage.all", { n: capsuleProducts.length })}
            </button>

            {capsuleCategories.map((cat) => {
              const count = capsuleProducts.filter((p) => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-2.5 text-[13.5px] font-bold transition-all ${selectedCategory === cat.id
                    ? "bg-brand text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {localizeCategory(cat, language).title} ({count})
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((prod, i) => (
              <Reveal key={prod.id} delay={i * 40}>
                <ProductCard product={prod} />
              </Reveal>
            ))}
          </div>

          {/* Notice / Switch to Houses banner */}
          <Reveal delay={100} className="mt-14">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4 text-start">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <HomeIcon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-bold text-gray-900">
                    {t("capsulesPage.housesBanner.title")}
                  </h3>
                  <p className="text-[13.5px] text-gray-600 mt-1">
                    {t("capsulesPage.housesBanner.body")}
                  </p>
                </div>
              </div>
              <Link
                to="/products/houses"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-[13.5px] font-bold text-white hover:bg-gray-800 transition"
              >
                {t("capsulesPage.housesBanner.cta")}
                {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black">
              {t("capsulesPage.ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-white/90 font-light">
              {t("capsulesPage.ctaBody")}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/9647501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-bold text-brand shadow hover:bg-gray-100 transition w-full sm:w-auto justify-center"
              >
                <MessageCircle className="h-4 w-4" />
                {t("solutions.whatsappLabel")} <span dir="ltr">+964 750 123 4567</span>
              </a>

              <a
                href="tel:+9647501234567"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-[14.5px] font-bold text-white hover:bg-white/10 transition w-full sm:w-auto justify-center"
              >
                <PhoneCall className="h-4 w-4" />
                {t("solutions.phoneCta")}
              </a>

              <a
                href="mailto:info@antika-factory.com"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-[14.5px] font-bold text-white hover:bg-white/10 transition w-full sm:w-auto justify-center"
              >
                <Mail className="h-4 w-4" />
                info@antika-factory.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
