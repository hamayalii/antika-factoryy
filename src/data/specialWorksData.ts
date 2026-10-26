import type { TranslationKey } from "../i18n/translations";

export interface SpecialWorkItem {
  id: string;
  menuKey: TranslationKey;
  img: string;
  title: string;
  desc: string;
  features: string[];
  benefits: string[];
  titleEn: string;
  descEn: string;
  featuresEn: string[];
  benefitsEn: string[];
  titleAr: string;
  descAr: string;
  featuresAr: string[];
  benefitsAr: string[];
}

/**
 * Shared single source of truth for the 6 special works / custom projects:
 * Used simultaneously by:
 * 1. Navbar dropdown "کارە تایبەتەکانمان" (desktop & mobile menu)
 * 2. "Where are our products used?" / "گونجاو بۆ هەر پڕۆژەیەک کە لە خەیاڵتایە!" category tabs & cards
 */
export const SPECIAL_WORKS_ITEMS: SpecialWorkItem[] = [
  {
    id: "commercial-kiosks",
    menuKey: "menu.special.kiosk",
    img: "/images/Commercial-Kiosks.webp",
    title: "کۆشکی بازرگانی",
    desc: "کۆشکی مۆدێرن بۆ خاڵەکانی فرۆشتن، شوێنی بلیت بڕین، دوکانی بچووک، یان دوکانی گەڕۆک(گواستراوە) دیزاین کراوە تا بزنسەکەت لە بازاڕدا دەستبەجێ دیار و جیاواز بێت",
    features: [
      "دیزاینێکی کراوە بە ڕووی کڕیاردا لەگەڵ شووشەی بەهێز و پارێزراو",
      "شوێنی تایبەت بۆ دانانی لۆگۆ، تابلۆی ڕووناکی، و بڕاندینگی کۆمپانیا",
      "سیستەمی قوفڵ و پاراستنی بەهێز بۆ کەلوپەلەکانی ناوەوە"
    ],
    benefits: [
      "ڕاکێشانی سەرنجی خێرا لە شوێنە گشتییەکان و مۆڵەکاندا",
      "ئاسانی لە گواستنەوەی کۆشکەکە بۆ جێگەیەکی نوێ بەپێی جووڵەی بازاڕ"
    ],
    titleEn: "Commercial Kiosk",
    descEn: "A modern kiosk designed for points of sale, ticket counters, small shops or mobile (transportable) retail — so your business stands out instantly in the market.",
    featuresEn: [
      "An open design facing customers with strong, protected glazing",
      "Dedicated space for your logo, light box and company branding",
      "A robust lock and security system for the equipment inside"
    ],
    benefitsEn: [
      "Instant attention in public spaces and malls",
      "Easy relocation of the kiosk to a new spot as your market moves"
    ],
    titleAr: "الكشك التجاري",
    descAr: "كشك عصري مصمَّم لنقاط البيع، وشبابيك بيع التذاكر، والمتاجر الصغيرة، أو المتاجر المتنقلة (القابلة للنقل) — ليبرز نشاطك التجاري فوراً وبشكل مميز في السوق.",
    featuresAr: [
      "تصميم مفتوح يواجه الزبائن مع زجاج قوي ومحمي",
      "مساحة مخصصة لوضع الشعار ولوحة إضاءة وهوية الشركة",
      "نظام قفل وحماية قوي للمعدات الداخلية"
    ],
    benefitsAr: [
      "جذب الانتباه بسرعة في الأماكن العامة والمولات",
      "سهولة نقل الكشك إلى موقع جديد بحسب حركة السوق"
    ]
  },
  {
    id: "office-seating",
    menuKey: "menu.special.office",
    img: "/images/Office-seating.webp",
    title: "ئۆفیس و شوێنی دانیشتنی تایبەت",
    desc: "کەپسولی فرە-مەبەست بۆ دروستکردنی شوێنێکی کاری سەربەخۆ لە حەوشەی ماڵەکەت، یان وەک ژوورێکی کۆڕ و کۆبوونەوەی مۆدێرن بۆ کۆمپانیا و شوێنە بازرگانییەکان",
    features: [
      "عەزلی دەنگی بەهێز (Acoustic Insulation) بۆ دەستەبەرکردنی بێدەنگی و تەرکیزی بەرز",
      "دیکۆر و ڕووناکی مۆدێرن لەگەڵ شوێنی پێویست بۆ مێز و کەلوپەلی ئۆفیس",
      "مۆدێلی گۆڕاو بەپێی حەز و پێداویستییەکانی موشتەری"
    ],
    benefits: [
      "جیاکردنەوەی ژینگەی کار لە ژیانی تایبەتی لە ماڵەوە (Remote Work)",
      "بەخشینی سیمایەکی ناوازە و پڕۆفیشناڵ بە کۆمپانیاکەت لە کاتی کۆبوونەوەکاندا"
    ],
    titleEn: "Office & Private Seating Space",
    descEn: "A multi-purpose capsule for creating an independent workspace in your yard, or a modern meeting room for companies and commercial spaces.",
    featuresEn: [
      "Strong acoustic insulation for silence and deep focus",
      "Modern decor and lighting with space for desks and office equipment",
      "A layout customizable to the client's taste and needs"
    ],
    benefitsEn: [
      "Separates your work environment from private home life (remote work)",
      "Gives your company a distinctive, professional image during meetings"
    ],
    titleAr: "مكتب ومساحة جلوس خاصة",
    descAr: "كبسولة متعددة الاستخدامات لإنشاء مساحة عمل مستقلة في حديقة منزلك، أو كقاعة اجتماعات عصرية للشركات والأماكن التجارية.",
    featuresAr: [
      "عزل صوتي قوي (Acoustic Insulation) لتوفير الهدوء والتركيز العالي",
      "ديكور وإضاءة عصرية مع مساحة كافية للمكتب ومعدات العمل",
      "نموذج قابل للتغيير بحسب رغبة العميل واحتياجاته"
    ],
    benefitsAr: [
      "فصل بيئة العمل عن الحياة الخاصة في المنزل (Remote Work)",
      "إعطاء شركتك صورة مميزة واحترافية أثناء الاجتماعات"
    ]
  },
  {
    id: "resort-housing",
    menuKey: "menu.special.resortHousing",
    img: "/images/Resort Housing.webp",
    title: "خانوو و شوێنی مانەوەی گەشتیاری",
    desc: "چارەسەرێکی تەلارسازیی هاوچەرخ بۆ گوندە گەشتیارییەکان، هاوینە هەوارەکان، و ناوچە شاخاوییەکان. ئەم کەپسولانە بە تایبەت دیزاین کراون بۆ ئەوەی ببنە شوێنێکی ئاسوودەی مانەوەی گەشتیاران لەسەختترین دۆخەکانی کەش و هەوادا",
    features: [
      "عەزلی گەرمی و سەرمای بەهێز بۆ بەرگەگرتنی بەفر، بارانی بەخوڕ و پلەی گەرمیی بەرز",
      "پەنجەرەی شووشەیی دەبڵ (Double Glazed)ی پانۆڕامی بۆ بینینی دیمەنە سروشتییەکان",
      "پێکهاتەی دژە ڕزین و دژە ژەنگ بۆ بەکارهێنانی درێژخایەن لە سروشتدا"
    ],
    benefits: [
      "ڕاکێشانی گەشتیاران بەهۆی دیزاینە ناوازە و قەبارە گونجاوەکەی",
      "دامەزراندنی زۆر خێرا لە ناوچە دوورەدەستەکان بێ پێویستبوون بە ئامێری بیناسازیی قورس"
    ],
    titleEn: "Resort Housing & Tourist Stays",
    descEn: "A contemporary architectural solution for tourist villages, summer resorts and mountain areas. These capsules are designed to give guests a comfortable stay in the harshest weather conditions.",
    featuresEn: [
      "Strong thermal insulation against snow, heavy rain and high temperatures",
      "Panoramic double-glazed windows for viewing natural scenery",
      "Anti-corrosion, rust-proof structure for long-term outdoor use"
    ],
    benefitsEn: [
      "Attracts tourists with its distinctive design and suitable size",
      "Very fast installation in remote areas without heavy construction machinery"
    ],
    titleAr: "إسكان المنتجعات والإقامات السياحية",
    descAr: "حل معماري معاصر للقرى السياحية والمصايف والمناطق الجبلية. صُممت هذه الكبسولات خصيصاً لتكون مكاناً مريحاً لإقامة السياح في أقسى الظروف الجوية.",
    featuresAr: [
      "عزل حراري وبردي قوي لتحمّل الثلوج والأمطار الغزيرة ودرجات الحرارة المرتفعة",
      "نوافذ زجاجية مزدوجة (Double Glazed) بانورامية لمشاهدة المناظر الطبيعية",
      "هيكل مقاوم للتآكل والصدأ للاستخدام الطويل في الطبيعة"
    ],
    benefitsAr: [
      "جذب السياح بفضل تصميمه الفريد وحجمه المناسب",
      "تركيب سريع جداً في المناطق النائية دون الحاجة إلى معدات بناء ثقيلة"
    ]
  },
  {
    id: "work-camps",
    menuKey: "menu.special.camps",
    img: "/images/Site-Accommodation.webp",
    title: "کەمپی کار و پڕۆژەکان",
    desc: "یەکەی کاری خێرا و ئامادەکراو بۆ کۆمپانیاکانی بیناسازی، نەوت، و بەڵێندەرایەتی. چارەسەرێکی خێرا دەبەخشێت بۆ نیشتەجێکردنی کارمەند و ئەندازیاران لە شوێنی کارکردندا",
    features: [
      "پێکهاتەی ئاسنی بەهێز بۆ بەرگەگرتنی کارکردنی سەختی مەیدانی",
      "توانای هەڵگرتن و گوواستنەوەی ئاسان بە فۆڕکلیفت یان کرێن بۆ پڕۆژەی تر",
    ],
    benefits: [
      "دەستبەجێ بەکارهێنان بێ بەفیڕۆدانی کاتی بیناسازی لە شوێنی پڕۆژەکەدا",
      "دابینکردنی ژینگەیەکی ئاسوودە و بەرزکردنەوەی ئاستی بەرهەمهێنانی کارمەندان"
    ],
    titleEn: "Work Camps & Project Sites",
    descEn: "A fast, ready-to-use work unit for construction, oil and contracting companies. It provides a quick solution for housing employees and engineers on site.",
    featuresEn: [
      "A strong steel structure for tough on-site conditions",
      "Easy lifting and transport by forklift or crane to another project"
    ],
    benefitsEn: [
      "Immediate use with no construction time lost at the project site",
      "A comfortable environment that raises employee productivity"
    ],
    titleAr: "مخيمات العمل ومواقع المشاريع",
    descAr: "وحدة عمل سريعة وجاهزة للاستخدام لشركات البناء والنفط والمقاولات. توفّر حلاً سريعاً لإسكان الموظفين والمهندسين في موقع العمل.",
    featuresAr: [
      "هيكل فولاذي قوي لتحمّل ظروف العمل الميداني القاسية",
      "إمكانية الرفع والنقل بسهولة بواسطة الرافعة الشوكية أو الرافعة إلى مشروع آخر"
    ],
    benefitsAr: [
      "استخدام فوري دون إهدار وقت البناء في موقع المشروع",
      "توفير بيئة مريحة ورفع إنتاجية الموظفين"
    ]
  },
  {
    id: "food-trucks",
    menuKey: "menu.special.foodTrucks",
    img: "/images/Food-Trucks.webp",
    title: "عارەبانە و کۆشکی خواردەمەنی",
    desc: "عەرەبانە و کۆشکی ئامادەکردنی خواردن و خواردنەوە بە قەبارەی جیاواز، دیزاینکراوە بۆ دەستپێکردنی پڕۆژەی خواردەمەنی بە شێوازێکی زۆر سەرنجڕاکێش و مۆدێرن",
    features: [
      "دروستکردنی ڕووی ناوەوە بە ئینۆکس (Stainless Steel)ی دژە ژەنگ و ئاسان بۆ پاککردنەوە",
      "داڕشتنی شوێنی تایبەت بۆ ئامێرەکان (ساردکەرەوە، بارێستا، گریڵ) و تۆڕی ئاوی پاک و ئاوەڕۆ",
      "پەنجەرەی گونجاو (Serving Window) بۆ پێشکەشکردنی بەرهەمەکان بە کڕیاران"
    ],
    benefits: [
      "دەستپێکردنی پڕۆژە بە تێچووی زۆر کەمتر لە بەکرێگرتنی دوکان و چێشتخانە",
      "توانای گواستنەوەی ئاسان بۆ بەشداریکردن لە فێستیڤاڵ و شوێنە قەرەباڵغەکاندا"
    ],
    titleEn: "Food Trucks & Kiosks",
    descEn: "Food and beverage preparation trucks and kiosks in various sizes, designed to launch your food project in a highly attractive, modern way.",
    featuresEn: [
      "Stainless-steel interior, rust-proof and easy to clean",
      "Dedicated fittings for equipment (fridge, barista, grill) plus clean water and drainage",
      "A serving window suited to handing products to customers"
    ],
    benefitsEn: [
      "Start your project at a far lower cost than renting a shop and kitchen",
      "Easy transport to festivals and busy locations"
    ],
    titleAr: "عربات وأكشاك الطعام",
    descAr: "عربات وأكشاك لتحضير الطعام والمشروبات بأحجام مختلفة، صُممت لبدء مشروعك الغذائي بأسلوب جذاب وعصري للغاية.",
    featuresAr: [
      "تصميم داخلي من الستانلس ستيل (Stainless Steel) المقاوم للصدأ وسهل التنظيف",
      "تجهيز مساحات مخصصة للمعدات (ثلاجة، ماكينة قهوة، شواية) مع شبكة مياه نظيفة وصرف",
      "نافذة تقديم مناسبة (Serving Window) لتقديم المنتجات للزبائن"
    ],
    benefitsAr: [
      "بدء المشروع بتكلفة أقل بكثير من استئجار متجر ومطبخ",
      "إمكانية النقل بسهولة للمشاركة في المهرجانات والأماكن المزدحمة"
    ]
  },
  {
    id: "tiny-house",
    menuKey: "menu.special.tinyHouse",
    img: "/images/Tiny-House.webp",
    title: "یەکەی نیشتەجێبوونی بچووک",
    desc: "یەکەیەکی نیشتەجێبوونی تەواو گونجاو بە قەبارەیەکی بچووک بۆ ئەوانەی دەیانەوێت ماڵێکی بچووک و سەربەخۆ لەسەر زەوی خۆیان یان لەناو سروشت، باخ، مەزرەعە بەپێی بەرزترین ستانداردەکانی ژیان دروست بکەن",
    features: [
      "دیزاینی مۆدێرنی ناوەوە (ژووری نووستن، چێشتخانە، و حەمام/توالێت)",
      "بەکارهێنانی مەواددی دۆستی ژینگە و نەهێشتنی بەفیڕۆچوونی وزە (ساردکەرەوە و گەرمکەرەوە)",
      "تێکهەڵکێشکردنی سیستەمی ڕووناکی سروشتی لە ڕێگەی شووشەی ژیرەوە"
    ],
    benefits: [
      "کەمکردنەوەی بەرچاوی تێچووی مانگانەی کارەبا و سووتەمەنی",
      "دابینکردنی ژینگەیەکی ئارام و تەندروست بۆ بەسەربردنی چەن مانگێک یان پشوودانی کۆتایی هەفتە"
    ],
    titleEn: "Small Residential Unit",
    descEn: "A complete residential unit suited to a compact size — for those who want a small, independent home on their own land or in nature, a garden or a farm, built to the highest living standards.",
    featuresEn: [
      "Modern interior design (bedroom, kitchen, and bathroom/WC)",
      "Eco-friendly materials that prevent energy waste (cooling and heating)",
      "Natural lighting integrated through smart glazing"
    ],
    benefitsEn: [
      "A significant reduction in monthly electricity and fuel costs",
      "A calm, healthy environment for spending a few months or weekend getaways"
    ],
    titleAr: "وحدة سكنية صغيرة",
    descAr: "وحدة سكنية كاملة بحجم صغير تناسب من يريد منزلاً صغيراً ومستقلاً على أرضه أو وسط الطبيعة، أو حديقة، أو مزرعة، وفق أعلى معايير المعيشة.",
    featuresAr: [
      "تصميم داخلي عصري (غرفة نوم، مطبخ، وحمام/دورة مياه)",
      "استخدام مواد صديقة للبيئة ومنع هدر الطاقة (تبريد وتدفئة)",
      "دمج الإضاءة الطبيعية من خلال الزجاج الذكي"
    ],
    benefitsAr: [
      "خفض ملحوظ في التكاليف الشهرية للكهرباء والوقود",
      "توفير بيئة هادئة وصحية لقضاء عدة أشهر أو عطلات نهاية الأسبوع"
    ]
  }
];
