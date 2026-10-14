import type { VerifiedProduct } from "../data/productData";

const siteUrl = import.meta.env.VITE_SITE_URL || "https://antika-factory.netlify.app";

/**
 * Generate Organization Schema with Knowledge Graph identifiers
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "ANTIKA FACTORY",
    alternateName: "کارگەی ئەنتیکا",
    description: "تێکەڵەیەک لە هونەر، دیزاین و ئەندازیاری. دیزاینی کەپسولە، ڕەفە، لایت و سیستەمی نوێی بۆ ماڵ و بازرگانی.",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    email: "info@antika-factory.com",
    telephone: "+9647501234567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sulaymaniyah",
      addressCountry: "Iraq",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "", // Facebook - add URL when available
      "", // Instagram - add URL when available
      "", // LinkedIn - add URL when available
    ],
  };
}

/**
 * Generate Product Schema for individual product pages
 */
export function generateProductSchema(product: VerifiedProduct) {
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const primaryImage = product.images[0]
    ? `${siteUrl}${product.images[0]}`
    : `${siteUrl}/images/logo.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.titleKu,
    alternateName: product.titleEn,
    description: product.shortDescriptionKu,
    url: productUrl,
    image: product.images.map((img) => `${siteUrl}${img}`),
    brand: {
      "@type": "Organization",
      name: "ANTIKA FACTORY",
      "@id": `${siteUrl}/#organization`,
    },
    category: product.categoryTitleKu,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IQD",
      price: "0", // Business to confirm pricing
      url: productUrl,
      seller: {
        "@type": "Organization",
        name: "ANTIKA FACTORY",
      },
    },
    additionalProperty: product.featuresKu.map((feature) => ({
      "@type": "PropertyValue",
      name: feature.title,
      value: feature.desc,
    })),
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(paths: Array<{ name: string; url: string }>) {
  const breadcrumbItems = paths.map((path, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: path.name,
    item: path.url.startsWith("http") ? path.url : `${siteUrl}${path.url}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };
}

/**
 * Generate Article Schema for news/blog content
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    url: url.startsWith("http") ? url : `${siteUrl}${url}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "ANTIKA FACTORY",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${siteUrl}${url}`,
    },
  };
}
