import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { localizeProduct, type VerifiedProduct } from "../data/productData";
import { useLanguage } from "../contexts/LanguageContext";

interface SemanticTopicClusterProps {
  relatedProducts: VerifiedProduct[];
  currentProductSlug: string;
  /** Optional "view all" CTA under the grid (e.g. all capsules / kiosks). */
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

export function SemanticTopicCluster({
  relatedProducts,
  currentProductSlug,
  viewAllHref,
  viewAllLabel,
  className = "",
}: SemanticTopicClusterProps) {
  const { t, language, dir } = useLanguage();

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <aside
      className={`semantic-topic-cluster ${className}`}
      aria-label={t("product.related")}
    >
      <nav aria-label={t("product.related")}>
        <h2 className="font-display text-xl sm:text-2xl font-black text-gray-900 mb-6">
          {t("product.related")}
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedProducts.map((product) => {
            const lp = localizeProduct(product, language);
            const productUrl = `/products/${product.slug}`;
            const primaryImage = product.images[0] || "/images/logo.png";

            return (
              <li key={product.slug}>
                <Link
                  to={productUrl}
                  className="group block border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-brand hover:shadow-lg transition-all duration-200"
                  aria-label={t("product.relatedAria", { title: lp.title, category: lp.categoryTitle })}
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={primaryImage}
                      alt={lp.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <span className="inline-block text-[11px] font-semibold text-brand bg-brand-soft px-2 py-1 rounded-full mb-2">
                      {lp.categoryTitle}
                    </span>

                    <h3 className="font-display text-[15px] font-bold text-gray-900 leading-tight group-hover:text-brand transition-colors line-clamp-2">
                      {lp.title}
                    </h3>

                    <p className="text-[12px] text-gray-500 mt-1 font-medium">
                      {language === "en" ? product.titleKu : product.titleEn}
                    </p>

                    <p className="text-[13px] text-gray-600 mt-2 line-clamp-2">
                      {lp.shortDescription}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {viewAllHref && viewAllLabel && (
          <div className="mt-8 text-center">
            <Link
              to={viewAllHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-7 py-3 text-[13.5px] font-bold text-gray-900 transition hover:border-brand hover:text-brand"
            >
              {viewAllLabel}
              {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
}
