import { useState } from "react";
import { ShieldCheck, X, ZoomIn } from "lucide-react";

export interface MaterialCertificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
  category?: string;
}

// Material and quality certificates
export const MATERIAL_CERTIFICATES: MaterialCertificate[] = [
  {
    id: "mat-cert-1",
    title: "NSW Fair Trading - Wall Switch Approval",
    issuer: "NSW Government Fair Trading - Standard Electrical Certification",
    image: "/certificates/media_1790354178434.png",
    category: "کەرەستەی کارەبایی",
  },
  {
    id: "mat-cert-2",
    title: "RoHS Directives Compliance - Container & Materials",
    issuer: "UDEM International Certification - 2011/65/EU Safety Standard",
    image: "/certificates/media_1790354272934.png",
    category: "ستانداردی ژینگەیی و کەرەستە",
  },
  {
    id: "mat-cert-3",
    title: "Authorization to Mark (ETL Listed Intertek)",
    issuer: "Intertek Testing Services NA - High Standard Safety & Quality",
    image: "/certificates/media_1790354285336.png",
    category: "کوالێتی و سەلامەتی کەرەستە",
  },
  {
    id: "mat-cert-4",
    title: "WaterMark Certificate of Conformity",
    issuer: "SAI Global - AS/NZS 1260 Drainage & Plumbing Standards",
    image: "/certificates/media_1790354309721.png",
    category: "کەرەستەی ئاوەڕۆ و بۆری",
  },
  {
    id: "mat-cert-5",
    title: "Certificate of Approval - NSW Fair Trading",
    issuer: "NSW Government Electrical Safety Standard Approvals",
    image: "/certificates/media_1790354324032.png",
    category: "ستانداردی نێودەوڵەتی",
  },
];

// Double chunk per track for seamless infinite marquee loop
const CHUNK_CERTS = [...MATERIAL_CERTIFICATES, ...MATERIAL_CERTIFICATES];

function MaterialCertCard({
  cert,
  prefix,
  idx,
  onSelect,
  compact = false,
}: {
  cert: MaterialCertificate;
  prefix: string;
  idx: number;
  onSelect: (cert: MaterialCertificate) => void;
  compact?: boolean;
}) {
  return (
    <div
      key={`${prefix}-${idx}`}
      onClick={() => onSelect(cert)}
      className={`group relative mx-3 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-xl ${
        compact ? "p-3 shadow-sm sm:mx-4" : "p-3.5 shadow-md sm:mx-5 sm:p-4"
      }`}
      style={{ width: compact ? "210px" : "240px" }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
        <img
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
        />
        {/* Hover zoom overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-lg backdrop-blur">
            <ZoomIn className="h-3.5 w-3.5 text-brand" />
            بینینی بڕوانامە
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-right">
        {cert.category && (
          <span className="inline-block rounded-md bg-brand/10 px-2 py-0.5 text-[10.5px] font-bold text-brand mb-1">
            {cert.category}
          </span>
        )}
        <h4 className="line-clamp-1 text-[12.5px] sm:text-[13px] font-bold text-gray-900 group-hover:text-brand transition-colors">
          {cert.title}
        </h4>
        <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-gray-500">
          {cert.issuer}
        </p>
      </div>
    </div>
  );
}

interface MaterialCertificatesMarqueeProps {
  variant?: "home" | "products";
  showTitle?: boolean;
}

export function MaterialCertificatesMarquee({
  variant = "home",
  showTitle = true,
}: MaterialCertificatesMarqueeProps) {
  const [selectedCert, setSelectedCert] = useState<MaterialCertificate | null>(null);

  const isProductsPage = variant === "products";

  return (
    <section
      id="material-certificates"
      className={`relative overflow-hidden ${
        isProductsPage
          ? "py-4 sm:py-6"
          : "relative overflow-hidden bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80 py-14 sm:py-20 border-t border-b border-gray-200/60"
      }`}
    >
      {isProductsPage ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand/10 text-brand">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h4 className="text-[15px] sm:text-[16px] font-bold text-gray-900 font-display">
                بڕوانامەی کەرەستەکانمان
              </h4>
            </div>
            <span className="text-[12px] sm:text-[13px] text-gray-500 font-medium hidden sm:inline-block">
              کەرەستەی کوالێتی بەرز بە پێوانە و ستانداردی جیهانی
            </span>
          </div>
        </div>
      ) : showTitle ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-7 sm:mb-9">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-[12.5px] sm:text-[13px] font-bold text-emerald-700">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            ستاندارد و بڕوانامەی کەرەستەکانمان
          </span>
          <h3
            className="mx-auto mt-3 max-w-3xl font-display font-black leading-[1.3] text-gray-900"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}
          >
            کەرەستەی کوالێتی بەرز و بڕوانامەپێدراوی جیهانی
          </h3>
          <p className="mx-auto mt-2.5 max-w-2xl text-[13.5px] sm:text-[14.5px] text-gray-600 leading-relaxed font-light">
            سەرجەم ئەو ماددە سەرەتایی و کەرەستە ئەندازیارییانەی لە بەرهەمەکانماندا بەکاریان دەهێنین، خاوەنی بڕوانامە و ستانداردی متمانەپێکراوی جیهانین بۆ مسۆگەرکردنی بەرزترین ئاستی کوالێتی و سەلامەتی.
          </p>
        </div>
      ) : null}

      {/* Marquee Slider */}
      <div
        dir="ltr"
        className="relative w-full overflow-hidden select-none py-2"
      >
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-36 bg-gradient-to-r from-gray-50/90 via-gray-50/60 to-transparent" />
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-36 bg-gradient-to-l from-gray-50/90 via-gray-50/60 to-transparent" />

        {/* Animated strip */}
        <div className="animate-marquee-ltr flex w-max items-center">
          {/* Primary Chunk */}
          <div className="flex flex-shrink-0 items-center">
            {CHUNK_CERTS.map((cert, idx) => (
              <MaterialCertCard
                key={`mat-p-${idx}`}
                cert={cert}
                prefix="mat-p"
                idx={idx}
                onSelect={setSelectedCert}
                compact={isProductsPage}
              />
            ))}
          </div>
          {/* Secondary Chunk for infinite seamless loop */}
          <div className="flex flex-shrink-0 items-center" aria-hidden="true">
            {CHUNK_CERTS.map((cert, idx) => (
              <MaterialCertCard
                key={`mat-s-${idx}`}
                cert={cert}
                prefix="mat-s"
                idx={idx}
                onSelect={setSelectedCert}
                compact={isProductsPage}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for full certificate preview */}
      {selectedCert && (
        <div
          dir="rtl"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl w-full overflow-hidden rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div>
                {selectedCert.category && (
                  <span className="inline-block rounded-md bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand mb-1">
                    {selectedCert.category}
                  </span>
                )}
                <h3 className="text-lg font-bold text-gray-900 font-display">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{selectedCert.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="داخستن"
                className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto flex items-center justify-center rounded-xl bg-gray-50 p-2">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="h-auto max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
