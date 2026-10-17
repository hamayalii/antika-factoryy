import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight, Sparkles, MessageCircle, PhoneCall, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";

export function LightingPage() {
  const { t, dir } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="pt-24 min-h-screen text-start">
      <SEO
        title={t("lightingPage.seoTitle")}
        description={t("lightingPage.seoDescription")}
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
              {t("lightingPage.title")}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 grid-cols-1">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13px] font-bold text-brand">
                  <Sparkles className="h-4 w-4" />
                  {t("lightingPage.badge")}
                </span>
                <h1
                  className="mt-5 font-display font-black leading-[1.25] text-gray-900"
                  style={{ fontSize: "clamp(30px, 5vw, 50px)" }}
                >
                  {t("lightingPage.title")}
                </h1>
                <p className="mt-5 text-[16px] sm:text-[17px] font-light leading-relaxed text-gray-600">
                  {t("lightingPage.heroLead")}
                </p>
                <div className="mt-8 flex flex-col sm:flex-wrap gap-4">
                  <a
                    href="https://wa.me/9647501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[14.5px] font-bold text-white shadow hover:bg-brand-dark transition w-full sm:w-auto"
                  >
                    {t("lightingPage.whatsappCta")}
                    {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </a>
                  <Link
                    to="/products/capsules"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 px-7 py-3.5 text-[14.5px] font-bold text-gray-800 hover:border-brand hover:text-brand transition w-full sm:w-auto"
                  >
                    {t("lightingPage.viewCapsules")}
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/images/work-lighting.webp"
                  alt={t("lightingPage.imgAlt")}
                  className="w-full h-auto min-h-[300px] sm:min-h-[400px] object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Specifications & Features */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900">
              {t("lightingPage.featuresTitle")}
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t("lightingPage.features.craft.title"),
                desc: t("lightingPage.features.craft.desc"),
              },
              {
                title: t("lightingPage.features.materials.title"),
                desc: t("lightingPage.features.materials.desc"),
              },
              {
                title: t("lightingPage.features.led.title"),
                desc: t("lightingPage.features.led.desc"),
              },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="rounded-2xl bg-white p-7 shadow-sm border border-gray-100 h-full">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed font-light">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black">
              {t("lightingPage.ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-white/90 font-light">
              {t("lightingPage.ctaBody")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/9647501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-bold text-brand shadow hover:bg-gray-100 transition w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                {t("solutions.whatsappLabel")} <span dir="ltr">+964 750 123 4567</span>
              </a>
              <a
                href="tel:+9647501234567"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-[14.5px] font-bold text-white hover:bg-white/10 transition w-full sm:w-auto"
              >
                <PhoneCall className="h-4 w-4" />
                {t("solutions.phoneCta")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
