import { useLocation, useNavigate } from "react-router-dom";
import { ARTWORKS_DATA, ArtworkItem } from "../data/artworksData";
import { Reveal } from "./Reveal";
import { useContactModal } from "../contexts/ContactModalContext";

export function ArtworksSection() {
  const { openContactModal } = useContactModal();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeArtworkId = searchParams.get("artwork");

  const handleItemClick = (item: ArtworkItem) => {
    if (item.hasPage && item.path.startsWith("/products/")) {
      navigate(item.path);
      return;
    }
    openContactModal(`سڵاو، دەمەوێت زانیاری وەربگرم دەربارەی پڕۆژەی (${item.title}) لە کارگەی ئەنتیکا.`);
  };

  return (
    <section id="artworks" className="bg-gray-50/60 py-16 sm:py-24 scroll-mt-24 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="text-[14px] font-bold text-brand">
            پڕۆژە و بەرهەمەکان
          </span>
          <h2
            className="mx-auto mt-3 max-w-2xl font-display font-black leading-[1.3] text-gray-900"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            کارە هونەرییەکان
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand/80" />
        </Reveal>

        {/* Independent entries rendered without any images, placeholders, or icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ARTWORKS_DATA.map((item, index) => {
            const isSelected = activeArtworkId === item.id;
            return (
              <Reveal key={item.id} delay={Math.min(index * 30, 400)}>
                <div
                  id={`artwork-card-${item.id}`}
                  onClick={() => handleItemClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleItemClick(item);
                    }
                  }}
                  className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 text-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    isSelected
                      ? "bg-brand/5 border-brand ring-2 ring-brand shadow-md"
                      : "bg-white border-gray-200/90 hover:border-brand/60 hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold text-gray-400 group-hover:text-brand transition-colors">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      {item.hasPage && (
                        <span className="text-[11px] font-medium bg-brand/10 text-brand px-2 py-0.5 rounded-full">
                          پەڕەی تایبەت
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-[16px] sm:text-[17px] font-bold text-gray-900 group-hover:text-brand transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-gray-500 group-hover:text-brand transition-colors">
                      {item.hasPage ? "بینینی پەڕە" : "داواکردنی زانیاری"}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium font-mono">
                      Antika
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
