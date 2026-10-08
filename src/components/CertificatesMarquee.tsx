import { useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { createPortal } from "react-dom";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    title: "Certificate of Approval - Wall Switch",
    issuer: "NSW Fair Trading Government",
    image: "/certificates/media_1790354178434.webp",
  },
  {
    id: "cert-2",
    title: "RoHS Compliance - Container House",
    issuer: "UDEM International Certification",
    image: "/certificates/media_1790354272934.webp",
  },
  {
    id: "cert-3",
    title: "Authorization to Mark (ETL Listed)",
    issuer: "Intertek Testing Services NA",
    image: "/certificates/media_1790354285336.webp",
  },
  {
    id: "cert-4",
    title: "Certificate of Conformity (WaterMark)",
    issuer: "SAI Global - AS/NZS 1260",
    image: "/certificates/media_1790354309721.webp",
  },
  {
    id: "cert-5",
    title: "NSW Fair Trading Approval",
    issuer: "NSW Government Fair Trading",
    image: "/certificates/media_1790354324032.webp",
  },
];

// Double chunk per track for seamless infinite marquee loop
const CHUNK_CERTS = [...CERTIFICATES, ...CERTIFICATES];

function CertificateCard({
  cert,
  prefix,
  idx,
  onSelect,
}: {
  cert: Certificate;
  prefix: string;
  idx: number;
  onSelect: (cert: Certificate) => void;
}) {
  return (
    <div
      key={`${prefix}-${idx}`}
      onClick={() => onSelect(cert)}
      className="group relative mx-4 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{ width: "clamp(120px, 30vw, 240px)", border: "1.5px solid #ff5a00" }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl flex items-center justify-center">
        <img
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
        />
        {/* Hover zoom overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-gray-900 shadow-lg backdrop-blur">
            <ZoomIn className="h-3.5 w-3.5 text-brand" />
            بینینی بڕوانامە
          </span>
        </div>
      </div>
      <div className="mt-2 px-2 pb-2 text-right">
        <h4 className="line-clamp-1 text-[13px] font-bold text-gray-900 group-hover:text-brand transition-colors">
          {cert.title}
        </h4>
        <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-gray-500">
          {cert.issuer}
        </p>
      </div>
    </div>
  );
}

export function CertificatesMarquee() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [selectedCert]);

  return (
    <section
      id="certificates"
      className="relative overflow-hidden py-8 sm:py-16 md:py-24 border-b border-gray-200/70"
    >
      

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-right mb-10">
        <h2
          className="mt-3 font-display font-black leading-[1.3] text-gray-900"
          style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
        >
          بڕوانامە و دەستخۆشییە بەدەستهاتووەکانمان
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
          ئەو بڕوانامە و دەستخۆشییانەی کە سەلمێنەری کواڵیتی بەرز و ستانداردی جیهانی کارەکانمانن
        </p>
      </div>

      {/* Marquee Slider */}
      <div
        dir="ltr"
        className="relative w-full overflow-hidden select-none py-4"
      >
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-transparent via-transparent/80 to-transparent" />
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-transparent via-transparent/80 to-transparent" />

        {/* Animated strip */}
        <div className="animate-marquee-ltr flex w-max items-center">
          {/* Primary Chunk */}
          <div className="flex flex-shrink-0 items-center">
            {CHUNK_CERTS.map((cert, idx) => (
              <CertificateCard
                key={`p-${idx}`}
                cert={cert}
                prefix="p"
                idx={idx}
                onSelect={setSelectedCert}
              />
            ))}
          </div>
          {/* Secondary Chunk for infinite seamless loop */}
          <div className="flex flex-shrink-0 items-center" aria-hidden="true">
            {CHUNK_CERTS.map((cert, idx) => (
              <CertificateCard
                key={`s-${idx}`}
                cert={cert}
                prefix="s"
                idx={idx}
                onSelect={setSelectedCert}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for full certificate preview */}
      {selectedCert &&
        createPortal(
          <div
            dir="rtl"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-2xl w-full overflow-hidden rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-display">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedCert.issuer}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  aria-label="داخستن"
                  className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
                >
                  <X className="h-6 w-6" />
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
          </div>,
          document.body
        )}
    </section>
  );
}
