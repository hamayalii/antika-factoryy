# SEO Infrastructure Implementation Guide

## Overview
This document explains the new SEO architecture components and how to integrate them into the Antika Factory codebase.

## 1. Installation

### Dependencies Installed
```bash
npm install react-helmet-async rollup-plugin-sitemap
```

### Environment Variables
Create a `.env` file in the project root (this file is git-ignored):

```env
VITE_SITE_URL=https://your-production-domain.com
```

## 2. New Components

### `<SeoHead />` Component
**Location**: `src/components/SeoHead.tsx`

**Purpose**: Centralized SEO meta tag and JSON-LD schema injection using react-helmet-async.

**Usage Example**:
```tsx
import { SeoHead } from "./components/SeoHead";
import { generateProductSchema } from "./utils/schemaGenerators";

function ProductDetailPage({ product }) {
  const schema = generateProductSchema(product);

  return (
    <>
      <SeoHead
        title={`${product.titleKu} | ئەنتیکا فاکتۆری`}
        description={product.shortDescriptionKu}
        canonical={`/products/${product.slug}`}
        image={product.images[0]}
        type="product"
        schema={schema}
      />
      {/* Page content */}
    </>
  );
}
```

### `<SemanticFaq />` Component
**Location**: `src/components/SemanticFaq.tsx`

**Purpose**: SEO-optimized FAQ component using native HTML5 `<details>`/`<summary>` with automatic FAQPage JSON-LD schema generation.

**Usage Example**:
```tsx
import { SemanticFaq } from "./components/SemanticFaq";

function AboutPage() {
  return (
    <div>
      {/* Page content */}
      <SemanticFaq className="my-8" />
    </div>
  );
}
```

**Custom FAQs**:
```tsx
const customFaqs = [
  {
    question: "Your custom question?",
    answer: "Your custom answer."
  }
];

<SemanticFaq faqs={customFaqs} />
```

### `<SemanticTopicCluster />` Component
**Location**: `src/components/SemanticTopicCluster.tsx`

**Purpose**: Semantic internal linking for related products with proper HTML structure for SEO.

**Usage Example**:
```tsx
import { SemanticTopicCluster } from "./components/SemanticTopicCluster";
import { getRelatedProducts } from "./data/productData";

function ProductDetailPage({ product }) {
  const relatedProducts = getRelatedProducts(product.slug, 3);

  return (
    <div>
      {/* Product content */}
      <SemanticTopicCluster
        relatedProducts={relatedProducts}
        currentProductSlug={product.slug}
        className="mt-12"
      />
    </div>
  );
}
```

### Modified `<SpecialFeatures />` Component
**Location**: `src/components/SpecialFeatures.tsx`

**Changes**: Added shareable link functionality for the technical specifications section.

**New Feature**: Users can now copy a direct link to the technical specs section (`#technical-specs`) for social sharing.

## 3. Schema Generators

**Location**: `src/utils/schemaGenerators.ts`

### Available Functions:

1. **`generateOrganizationSchema()`**
   - Returns Organization JSON-LD with @id and sameAs fields
   - Call this on the home page or globally

2. **`generateProductSchema(product)`**
   - Returns Product JSON-LD for individual product pages
   - Includes brand, offers, and additionalProperty

3. **`generateBreadcrumbSchema(paths)`**
   - Returns BreadcrumbList JSON-LD
   - Pass array of `{ name, url }` objects

4. **`generateArticleSchema({...})`**
   - Returns Article JSON-LD for news/blog content
   - Requires title, description, url, image, dates, author

## 4. Build Configuration

### Modified `vite.config.ts`
- Added environment variable support for `VITE_SITE_URL`
- Integrated `rollup-plugin-sitemap` for automatic sitemap generation
- Configured sitemap with all static routes and priorities

### Build Script
Updated `package.json`:
```json
"build": "vite build && node generateRobotsTxt.js"
```

This now:
1. Builds the Vite app
2. Generates sitemap.xml
3. Generates robots.txt

### robots.txt Generator
**Location**: `generateRobotsTxt.js`

Automatically generates robots.txt in the dist folder with:
- Disallow: /admin/
- Allow: /
- Sitemap reference

## 5. Server Configuration

### Apache (.htaccess)
**File**: `htaccess.example`

Copy to your server as `.htaccess` to enable:
- SPA routing (all requests → index.html)
- Security headers
- Cache control for static assets
- Gzip compression

### Nginx
**File**: `nginx.example.conf`

Configure your Nginx server block with:
- SPA fallback routing (`try_files $uri $uri/ /index.html`)
- Security headers
- Gzip compression
- Cache control
- robots.txt and sitemap.xml access

## 6. Integration Steps

### Step 1: Update ProductDetailPage
Replace the existing SEO component with the new system:

```tsx
// Before
import { SEO } from "../components/SEO";

// After
import { SeoHead } from "../components/SeoHead";
import { generateProductSchema, generateBreadcrumbSchema } from "../utils/schemaGenerators";
import { SemanticTopicCluster } from "../components/SemanticTopicCluster";
```

### Step 2: Add Breadcrumb Schema
Generate breadcrumb schema in ProductDetailPage:

```tsx
const breadcrumbPaths = [
  { name: "سەرەکی", url: "/" },
  { name: sectionTitle, url: sectionLink },
  { name: category?.titleKu, url: `/products/${category?.slug}` },
  { name: product.titleKu, url: `/products/${product.slug}` },
];

const schema = {
  ...generateProductSchema(product),
  ...generateBreadcrumbSchema(breadcrumbPaths),
};
```

### Step 3: Replace Related Products
Replace the existing related products section with SemanticTopicCluster:

```tsx
// Before
{relatedProducts.length > 0 && (
  <section>
    <h2>بەرهەمە پەیوەندیدارەکان</h2>
    <div className="grid...">
      {relatedProducts.map(...)}
    </div>
  </section>
)}

// After
<SemanticTopicCluster
  relatedProducts={relatedProducts}
  currentProductSlug={product.slug}
  className="mt-12"
/>
```

### Step 4: Add FAQ to Home/About Page
Add SemanticFaq component to home or about page:

```tsx
import { SemanticFaq } from "../components/SemanticFaq";

// In your component
<SemanticFaq className="py-12" />
```

### Step 5: Update index.html
Update the static Organization schema in index.html or remove it (now handled dynamically via SeoHead).

## 7. Testing

### Build Test
```bash
npm run build
```

Verify that:
- `dist/sitemap.xml` is generated
- `dist/robots.txt` is generated
- Both files contain the correct domain from VITE_SITE_URL

### Schema Validation
1. Build the project
2. Visit a product page
3. Open Chrome DevTools → Network tab
4. Reload page
5. Check for `application/ld+json` scripts in the head
6. Copy JSON to [Google Rich Results Test](https://search.google.com/test/rich-results)

### Sitemap Validation
1. Access `https://your-domain.com/sitemap.xml`
2. Verify all routes are included
3. Test with [Google Search Console](https://search.google.com/search-console)

## 8. Deployment Checklist

- [ ] Set `VITE_SITE_URL` in production environment
- [ ] Run `npm run build`
- [ ] Verify sitemap.xml and robots.txt in dist/
- [ ] Deploy dist/ folder to server
- [ ] Configure Apache (.htaccess) or Nginx
- [ ] Test SPA routing (direct page access)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible
- [ ] Test schema markup with Rich Results Test

## 9. Important Notes

### SPA Limitations
This is still a client-side SPA. For optimal SEO:
- Consider adding pre-rendering (e.g., Vite SSR plugin)
- Or migrate to SSG (Static Site Generation)
- Monitor crawl behavior in Google Search Console

### Dynamic Routes
The current sitemap includes static routes only. For dynamic product routes:
- Implement a build script to fetch all products from data
- Generate sitemap entries for each product slug
- Or use a server-side sitemap generator

### Performance
The new components are lightweight and use native HTML5 features. No performance impact expected.

## 10. Support

For issues or questions:
- Check component source code in `src/components/`
- Review schema generators in `src/utils/schemaGenerators.ts`
- Consult Vite and React Helmet documentation
