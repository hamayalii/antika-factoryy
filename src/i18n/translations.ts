/**
 * UI translation dictionary (phase 1: Kurdish + English).
 *
 * Structure
 * ---------
 * - `ku` is the source dictionary — every key that exists in the UI must be
 *   declared here first. `TranslationKey` is derived from it, so forgetting a
 *   key is a compile error, never a runtime "undefined" in the UI.
 * - `en` is typed `Record<TranslationKey, string>` — TypeScript refuses to
 *   compile until every key is translated.
 * - `ar` stays a `Partial` on purpose: Arabic copy is intentionally deferred
 *   until a native-level review pass approves the wording. A missing key
 *   resolves through the fallback chain `ar → en → ku`, so selecting AR never
 *   renders empty text.
 *
 * Template values use `{name}` placeholders and are interpolated by `t()`.
 * Long-form content (product descriptions, news articles, about prose) does
 * NOT live here — it lives next to the data (`*En` fields in `productData.ts`).
 */

export const ku = {
  /* ---------------- Navbar ---------------- */
  "nav.home": "سەرەکی",
  "nav.capsules": "کەپسولەکان",
  "nav.houses": "خانووەکان",
  "nav.cabins": "کابینەکان",
  "nav.koshk": "کۆشکەکان",
  "nav.artworks": "کارە هونەریەکان",
  "nav.workImages": "وێنەی کارەکانمان",
  "nav.news": "هەواڵەکان",
  "nav.about": "دەربارەی ئێمە",

  /* ---------------- Navbar dropdown entries ---------------- */
  "menu.al": "کەپسولەکانی نیشتەجێبوون",
  "menu.am": "کەپسولەکانی ئیش و کار",
  "menu.as": "کەپسولەکانی خزمەتگوزاری",
  "menu.container-house": "خانووی حاویە",
  "menu.cabin-house": "خانووی کوخ",
  "menu.standard-house": "کابینەیی ئاسایی",
  "menu.garden-house": "خانووی باخچە",
  "menu.concrete-house": "خانووی کۆنکریت",
  "menu.koshk.ka-b": "کۆشکی KA · B",
  "menu.koshk.ka-p": "کۆشکی KA · P",
  "menu.koshk.ka-g": "کۆشکی KA · G",
  "menu.koshk.ka-a": "کۆشکی KA · A",
  "menu.koshk.am-a2": "کۆشکی AM • A2",
  "menu.koshk.am-m": "کۆشکی AM • M",
  "menu.koshk.am-h": "کۆشکی AM • H",
  "menu.koshk.am-s": "کۆشکی AM • S",
  "menu.koshk.am-k": "کۆشکی AM • K",
  "menu.koshk.am-r": "کۆشکی AM • R",
  "menu.lighting": "عامودی لایت",
  "menu.shelves": "ڕەفەکان",

  /* ---------------- Header / shared chrome ---------------- */
  "header.contactCta": "پەیوەندیمان پێوە بکە",
  "header.menuOpen": "کردنەوەی مێنیو",
  "header.menuClose": "داخستنی مێنیو",
  "header.mainMenu": "مێنیوی سەرەکی",
  "header.language": "زمان",
  "header.languageSoon": "وەرگێڕانی عەرەبی بەم زووانە دێت",
  "common.close": "داخستن",
  "common.comingSoon": "بەم زووانە بەردەست ئەبێت..!",
  "common.comingSoonShort": "بەم زووانە..!",

  /* ---------------- Home — use cases ---------------- */
  "home.useCases.kicker": "بەرهەمەکانمان لە کوێ بەکارئەهێنرێت؟",
  "home.useCases.title": "گونجاو بۆ هەر پڕۆژەیەک کە لە خەیاڵتایە!",
  "home.useCases.features": "تایبەتمەندییەکان:",
  "home.useCases.benefits": "سوودەکان:",
  "home.useCases.viewAll": "هەموو ببینە",

  /* ---------------- Home — process ---------------- */
  "home.process.kicker": "پرۆسەکەمان",
  "home.process.title": "٤ قۆناغی سادە",

  /* ---------------- Home — banner & contact band ---------------- */
  "home.banner.title": "کوالیتی بەرز و پێکهاتەی بەهێز",
  "home.banner.subtitle": "بەرهەمهێنانی زیرەکانە بە پێشکەوتووترین شێوازی ئەندازیاری",
  "home.banner.aria": "کەپسولی نیشتەجێبوون و مۆدێرنی کارگەی ئەنتیکا",
  "home.ctaBand.badge": "کارگەی ئەنتیکا",
  "home.ctaBand.title": "ئامادەیت پرۆژەکەت دەست پێ بکەین؟",
  "home.ctaBand.subtitle": "پەیوەندی بکە بە ئێمەوە بۆ ڕاوێژپێکردن و زانیاری نرخ",

  /* ---------------- Footer ---------------- */
  "footer.brand": "ئەنتیکا، تێکەڵەیەک لە هونەر و تەلارسازیی هاوچەرخ",
  "footer.social": "ئێمە لە سۆشیال میدیا",
  "footer.contact": "پەیوەندیمان پێوە بکە",
  "footer.location": "سلێمانی، عێراق",
  "footer.hours": "شەممە - پێنجشەممە، 9:00 - 6:00",
  "footer.links": "بەستەرەکان",
  "footer.sendTitle": "نامە بنێرە",
  "footer.form.name": "ناو",
  "footer.form.email": "ئیمەیڵ",
  "footer.form.message": "نامەکەت",
  "footer.form.send": "ناردن",
  "footer.success": "سوپاس بۆ پەیامەکەت، بە زووترین کات وەڵامت دەدەینەوە...",
  "footer.bar.design": "دیزاین",
  "footer.bar.art": "هونەر",
  "footer.bar.engineering": "ئەندازیاری",
  "footer.rights": "هەموو مافەکان پارێزراون.",
  "footer.machine.hint": "هەرچی بنووسیت لەسەر کاغەزەکە دەردەکەوێت",
  "footer.machine.placeholder": "تکایە پەیامەکەت بنووسە...",
  "footer.machine.aria": "ئامێری نووسین",

  /* ---------------- Contact modal ---------------- */
  "contactModal.title": "پەیوەندیمان پێوە بکە",
  "contactModal.subtitle": "یەکێک لە ژمارەکان هەڵبژێرە",
  "contactModal.customColor": "ڕەنگی دڵخوازی خۆت؟",
  "contactModal.whatsapp": "واتساپ",
  "contactModal.call": "پەیوەندی",
  "contactModal.whatsappAria": "واتساپ بۆ {phone}",
  "contactModal.callAria": "پەیوەندی بە {phone}",

  /* ---------------- Product card ---------------- */
  "productCard.dimensions": "پێوانە:",
  "productCard.area": "ڕووبەر:",
  "productCard.learnMore": "زیاتر بزانە",
  "productCard.learnMoreAbout": "{title} - زیاتر بزانە",

  /* ---------------- Product detail page ---------------- */
  "product.section.capsules": "کەپسولەکان",
  "product.section.houses": "خانوو",
  "product.section.koshk": "کۆشکەکان",
  "product.section.allCapsules": "بینینی سەرجەم کەپسولەکان",
  "product.section.allHouses": "بینینی سەرجەم جۆرەکانی خانوو",
  "product.section.allKoshk": "بینینی سەرجەم کۆشکەکان",
  "product.breadcrumbAria": "ڕێڕەوی پەڕەکان",
  "product.home": "سەرەکی",
  "product.notFound.title": "بەرهەم نەدۆزرایەوە",
  "product.notFound.desc": "ببورە، ئەو پەڕەیەی بەدوایدا دەگەڕێیت نەدۆزرایەوە. دەتوانیت سەرجەم بەرهەمەکان لە بەشی \"ئەو کارانەی کە دەیکەین\"دا ببینیت.",
  "product.notFound.back": "گەڕانەوە بۆ ئەو کارانەی کە دەیکەین",
  "product.type": "جۆری بەرهەم",
  "product.modelCode": "کۆدی مۆدێل",
  "product.family": "زنجیرە / خێزانی بەرهەم",
  "product.levels": "جۆر",
  "product.fullDimensions": "پێوانەی تەواوەتی",
  "product.height": "بەرزی",
  "product.width": "پانی",
  "product.length": "درێژی",
  "product.totalArea": "ڕووبەری تەواو",
  "product.specsKicker": "زانیاری و پێوانەی بەرهەمەکە",
  "product.specsTitle": "تایبەتمەندییە پشتڕاستکراوەکان",
  "product.status": "دۆخی بەرهەم",
  "product.comingSoonDesc": "ئەم بەرهەمە لە قۆناغی ئامادەکاری و دیزایندایە و بەم زووانە بەردەست دەبێت. بۆ داواکاری پێشوەختە پەیوەندیمان پێوە بکە.",
  "product.detailsTitle": "تایبەتمەندی بەرهەم",
  "product.detailsPlaceholder": "زانیاریی وردی ئەم بەرهەمە بە زوویی زیاد دەکرێت.",
  "product.colors": "ڕەنگە بەردەستەکان",
  "product.colorsHint": "کلیک لەسەر ڕەنگەکە بکە بۆ داواکاری نرخ",
  "product.colorAria": "{color} — داواکاری",
  "product.inquiryTitle": "داوای نرخ یان ڕاوێژ دەربارەی {product}",
  "product.inquiryDesc": "بۆ زانینی پێوانەی گونجاو و تێچوو و شێوازی جێبەجێکردن، پەیوەندیمان پێوە بکە.",
  "product.whatsapp": "واتسئاپ:",
  "product.phone": "تەلەفۆن:",
  "product.whatsappGreeting": "سڵاو دەربارەی {product}",
  "product.zoom": "گەورەکردن",
  "product.zoomAria": "گەورەکردنی وێنە",
  "product.thumbAria": "پیشاندانی وێنەی {n}",
  "product.imageAlt": "{title} - ئەنتیکا فاکتۆری",
  "product.imageAltN": "{title} وێنەی {n}",
  "product.galleryAria": "پێشانگای وێنە",
  "product.prevImage": "وێنەی پێشوو",
  "product.nextImage": "وێنەی دواتر",
  "product.seoTitle": "{title} | ئەنتیکا فاکتۆری",
  "product.seoDesc": "{title} لە پۆلێنی {category}ی کارگەی ئەنتیکا فاکتۆرییە. بۆ زانیاریی پێوانە و داوای نرخ، سەیری پەڕەی بەرهەم بکە.",
  "product.related": "بەرهەمە پەیوەندیدارەکان",
  "product.relatedAria": "بەرهەمی {title} لە پۆلێنی {category}",
} as const;

export type TranslationKey = keyof typeof ku;

/**
 * English dictionary — compile-time complete (`Record<TranslationKey, …>`).
 * Brand names and model codes (KA · B, AL 2, AM • A2 …) keep their Latin
 * form; marketing prose is translated for tone, not word-for-word.
 */
export const en: Record<TranslationKey, string> = {
  /* ---------------- Navbar ---------------- */
  "nav.home": "Home",
  "nav.capsules": "Capsules",
  "nav.houses": "Houses",
  "nav.cabins": "Cabins",
  "nav.koshk": "Kiosks",
  "nav.artworks": "Artworks",
  "nav.workImages": "Our Work",
  "nav.news": "News",
  "nav.about": "About Us",

  /* ---------------- Navbar dropdown entries ---------------- */
  "menu.al": "Residential Capsules",
  "menu.am": "Work & Office Capsules",
  "menu.as": "Service Capsules",
  "menu.container-house": "Container House",
  "menu.cabin-house": "Cabin House",
  "menu.standard-house": "Standard Cabin",
  "menu.garden-house": "Garden House",
  "menu.concrete-house": "Concrete House",
  "menu.koshk.ka-b": "KA · B Kiosk",
  "menu.koshk.ka-p": "KA · P Kiosk",
  "menu.koshk.ka-g": "KA · G Kiosk",
  "menu.koshk.ka-a": "KA · A Kiosk",
  "menu.koshk.am-a2": "AM • A2 Kiosk",
  "menu.koshk.am-m": "AM • M Kiosk",
  "menu.koshk.am-h": "AM • H Kiosk",
  "menu.koshk.am-s": "AM • S Kiosk",
  "menu.koshk.am-k": "AM • K Kiosk",
  "menu.koshk.am-r": "AM • R Kiosk",
  "menu.lighting": "Lighting",
  "menu.shelves": "Shelves",

  /* ---------------- Header / shared chrome ---------------- */
  "header.contactCta": "Contact Us",
  "header.menuOpen": "Open menu",
  "header.menuClose": "Close menu",
  "header.mainMenu": "Main menu",
  "header.language": "Language",
  "header.languageSoon": "Arabic translation is coming soon",
  "common.close": "Close",
  "common.comingSoon": "Available soon!",
  "common.comingSoonShort": "Coming soon!",

  /* ---------------- Home — use cases ---------------- */
  "home.useCases.kicker": "Where can our products be used?",
  "home.useCases.title": "Perfect for any project you can imagine!",
  "home.useCases.features": "Features:",
  "home.useCases.benefits": "Benefits:",
  "home.useCases.viewAll": "View all",

  /* ---------------- Home — process ---------------- */
  "home.process.kicker": "Our process",
  "home.process.title": "Four simple steps",

  /* ---------------- Home — banner & contact band ---------------- */
  "home.banner.title": "High quality and a robust structure",
  "home.banner.subtitle": "Smart manufacturing with the most advanced engineering methods",
  "home.banner.aria": "The modern residential capsule by Antika Factory",
  "home.ctaBand.badge": "Antika Factory",
  "home.ctaBand.title": "Ready to start your project?",
  "home.ctaBand.subtitle": "Get in touch with us for consultation and pricing",

  /* ---------------- Footer ---------------- */
  "footer.brand": "Antika — a blend of art and contemporary architecture",
  "footer.social": "We are on social media",
  "footer.contact": "Contact Us",
  "footer.location": "Sulaymaniyah, Iraq",
  "footer.hours": "Saturday – Thursday, 9:00 – 6:00",
  "footer.links": "Links",
  "footer.sendTitle": "Send a message",
  "footer.form.name": "Name",
  "footer.form.email": "Email",
  "footer.form.message": "Your message",
  "footer.form.send": "Send",
  "footer.success": "Thanks for your message — we'll get back to you as soon as possible…",
  "footer.bar.design": "Design",
  "footer.bar.art": "Art",
  "footer.bar.engineering": "Engineering",
  "footer.rights": "All rights reserved.",
  "footer.machine.hint": "Whatever you type appears on the paper",
  "footer.machine.placeholder": "Please type your message...",
  "footer.machine.aria": "Typewriter",

  /* ---------------- Contact modal ---------------- */
  "contactModal.title": "Contact Us",
  "contactModal.subtitle": "Choose one of the numbers",
  "contactModal.customColor": "Or your own custom color?",
  "contactModal.whatsapp": "WhatsApp",
  "contactModal.call": "Call",
  "contactModal.whatsappAria": "WhatsApp {phone}",
  "contactModal.callAria": "Call {phone}",

  /* ---------------- Product card ---------------- */
  "productCard.dimensions": "Size:",
  "productCard.area": "Area:",
  "productCard.learnMore": "Learn more",
  "productCard.learnMoreAbout": "Learn more about {title}",

  /* ---------------- Product detail page ---------------- */
  "product.section.capsules": "Capsules",
  "product.section.houses": "Houses",
  "product.section.koshk": "Kiosks",
  "product.section.allCapsules": "View all capsules",
  "product.section.allHouses": "View all house types",
  "product.section.allKoshk": "View all kiosks",
  "product.breadcrumbAria": "Breadcrumbs",
  "product.home": "Home",
  "product.notFound.title": "Product not found",
  "product.notFound.desc": "Sorry, we couldn't find the page you were looking for. You can browse all products in the \"What We Do\" section.",
  "product.notFound.back": "Back to what we do",
  "product.type": "Product type",
  "product.modelCode": "Model code",
  "product.family": "Series / product family",
  "product.levels": "Levels",
  "product.fullDimensions": "Full dimensions",
  "product.height": "Height",
  "product.width": "Width",
  "product.length": "Length",
  "product.totalArea": "Total area",
  "product.specsKicker": "Product information & dimensions",
  "product.specsTitle": "Verified specifications",
  "product.status": "Product status",
  "product.comingSoonDesc": "This product is currently in preparation and design and will be available soon. Contact us to order in advance.",
  "product.detailsTitle": "Product details",
  "product.detailsPlaceholder": "Detailed information about this product will be added soon.",
  "product.colors": "Available colors",
  "product.colorsHint": "Click a color to request a price",
  "product.colorAria": "{color} — request a quote",
  "product.inquiryTitle": "Request a price or consultation for {product}",
  "product.inquiryDesc": "Contact us for the right dimensions, cost and delivery details.",
  "product.whatsapp": "WhatsApp:",
  "product.phone": "Phone:",
  "product.whatsappGreeting": "Hello, regarding {product}",
  "product.zoom": "Zoom",
  "product.zoomAria": "Enlarge image",
  "product.thumbAria": "Show image {n}",
  "product.imageAlt": "{title} - Antika Factory",
  "product.imageAltN": "{title} image {n}",
  "product.galleryAria": "Image gallery",
  "product.prevImage": "Previous image",
  "product.nextImage": "Next image",
  "product.seoTitle": "{title} | Antika Factory",
  "product.seoDesc": "{title} belongs to the {category} category at Antika Factory. Visit the product page for dimensions and price inquiries.",
  "product.related": "Related products",
  "product.relatedAria": "View {title} from the {category} category",
};

/**
 * Arabic dictionary — intentionally EMPTY for now.
 * Add reviewed, native-quality strings here (partial is fine); anything
 * missing resolves through `ar → en → ku` at lookup time.
 */
export const ar: Partial<Record<TranslationKey, string>> = {};

export const dictionaries = { ku, en, ar } as const;
