import { Link } from "react-router-dom";
import type { VerifiedProduct } from "../data/productData";

interface SemanticTopicClusterProps {
  relatedProducts: VerifiedProduct[];
  currentProductSlug: string;
  className?: string;
}

export function SemanticTopicCluster({
  relatedProducts,
  currentProductSlug,
  className = "",
}: SemanticTopicClusterProps) {
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <aside
      className={`semantic-topic-cluster ${className}`}
      aria-label="بەرهەمە پەیوەندیدارەکان"
    >
      <nav aria-label="بەرهەمە پەیوەندیدارەکان">
        <h2 className="font-display text-xl sm:text-2xl font-black text-gray-900 mb-6">
          بەرهەمە پەیوەندیدارەکان
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedProducts.map((product) => {
            const productUrl = `/products/${product.slug}`;
            const primaryImage = product.images[0] || "/images/logo.png";

            return (
              <li key={product.slug}>
                <Link
                  to={productUrl}
                  className="group block border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-brand hover:shadow-lg transition-all duration-200"
                  aria-label={`بەرهەمی ${product.titleKu} لە پۆلێنی ${product.categoryTitleKu}`}
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={primaryImage}
                      alt={product.titleKu}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <span className="inline-block text-[11px] font-semibold text-brand bg-brand-soft px-2 py-1 rounded-full mb-2">
                      {product.categoryTitleKu}
                    </span>

                    <h3 className="font-display text-[15px] font-bold text-gray-900 leading-tight group-hover:text-brand transition-colors line-clamp-2">
                      {product.titleKu}
                    </h3>

                    {product.titleEn && (
                      <p className="text-[12px] text-gray-500 mt-1 font-medium">
                        {product.titleEn}
                      </p>
                    )}

                    <p className="text-[13px] text-gray-600 mt-2 line-clamp-2">
                      {product.shortDescriptionKu}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
