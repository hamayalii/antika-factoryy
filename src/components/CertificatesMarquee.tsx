import { useState } from "react";
import { Award, X, ZoomIn } from "lucide-react";

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
    image: "/certificates/media_1790354178434.png",
  },
  {
    id: "cert-2",
    title: "RoHS Compliance - Container House",
    issuer: "UDEM International Certification",
    image: "/certificates/media_1790354272934.png",
  },
  {
    id: "cert-3",
    title: "Authorization to Mark (ETL Listed)",
    issuer: "Intertek Testing Services NA",
    image: "/certificates/media_1790354285336.png",
  },
  {
    id: "cert-4",
    title: "Certificate of Conformity (WaterMark)",
    issuer: "SAI Global - AS/NZS 1260",
    image: "/certificates/media_1790354309721.png",
  },
  {
    id: "cert-5",
    title: "NSW Fair Trading Approval",
    issuer: "NSW Government Fair Trading",
    image: "/certificates/media_1790354324032.png",
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
      className="group relative mx-4 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl sm:mx-6 sm:p-4"
      style={{ width: "240px" }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
        <img
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
        />
        {/* Hover zoom overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-gray-900 shadow-lg backdrop-blur">
            <ZoomIn className="h-3.5 w-3.5 text-brand" />
            بینینی بڕوانامە
          </span>
        </div>
      </div>
      <div className="mt-3 text-right">
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

  return (
    <section
      id="certificates"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-24 border-b border-gray-200/70"
    >
      

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-right mb-10">
        <h2
          className="mt-3 font-display font-black leading-[1.3] text-gray-900"
          style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
        >
          بڕوانامە و ستانداردە بەدەستهاتووەکانمان
        </h2>
        <p className="mt-3 text-[14.5px] text-gray-600 leading-relaxed">
          ئەو بڕوانامە و مۆڵەتە نێودەوڵەتییانەی کە سەلمێنەری کواڵیتی بەرز و ستانداردی جیهانی بەرهەمەکانمانن
        </p>
      </div>

      {/* Marquee Slider */}
      <div
        dir="ltr"
        className="relative w-full overflow-hidden select-none py-4"
      >
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent" />
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent" />

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
