import type { Language } from "../i18n/languages";

export type VerificationStatus =
    | "VERIFIED"
    | "DERIVED_SAFE"
    | "REQUIRES_BUSINESS_CONFIRMATION";

export interface ProductCategory {
    id: string;
    slug: string;
    titleKu: string;
    titleEn: string;
    titleAr?: string;
    shortDescriptionKu: string;
    shortDescriptionEn: string;
    shortDescriptionAr?: string;
    descriptionKu: string;
    descriptionEn: string;
    descriptionAr?: string;
    image?: string;
    modelCount: number;
}

export interface VerifiedProduct {
    id: string;
    slug: string;
    categoryId: string;
    categoryTitleKu: string;
    titleKu: string;
    titleEn: string;
    titleAr?: string;
    productFamilyKu?: string;
    productFamilyEn?: string;
    productFamilyAr?: string;
    modelCode?: string;
    modelCodeEn?: string;
    modelCodeAr?: string;
    shortDescriptionKu: string;
    shortDescriptionEn: string;
    shortDescriptionAr?: string;
    descriptionKu: string | null;
    descriptionEn?: string | null;
    descriptionAr?: string | null;
    dimensionsRaw: string | null;
    dimensionsEn?: string | null;
    dimensionUnitStatus?: VerificationStatus | null;
    dimensionOrder?: string | null;
    heightRaw?: string | null;
    widthRaw?: string | null;
    lengthRaw?: string | null;
    areaRaw?: string | null;
    levels?: string | null;
    levelsEn?: string | null;
    levelsAr?: string | null;
    materials?: string | null;
    materialsEn?: string | null;
    materialsAr?: string | null;
    applicationsKu: string[];
    applicationsEn?: string[];
    applicationsAr?: string[];
    featuresKu: { title: string; desc: string }[];
    featuresEn?: { title: string; desc: string }[];
    featuresAr?: { title: string; desc: string }[];
    images: string[];
    verificationStatus: VerificationStatus;
    technicalStatus?: VerificationStatus;
    internalNotes?: string;
    isComingSoon?: boolean;
    cta: {
        primaryKu: string;
        secondaryKu: string;
        primaryEn: string;
        secondaryEn: string;
        primaryAr?: string;
        secondaryAr?: string;
    };
}

/* ------------------------------------------------------------------ */
/* Product Color Swatches — palette + lead-gen inquiry builder         */
/* (Swatches trigger a pre-filled contact inquiry; images are NOT      */
/*  swapped — see ProductDetailPage)                                   */
/* ------------------------------------------------------------------ */

export interface ProductColorOption {
    key: string;
    /** Solid swatch color (CSS value). Omitted for the "custom" entry. */
    hex?: string;
    /** Kurdish label shown as tooltip / inquiry text. */
    labelKu: string;
    /** English label shown as tooltip / inquiry text. */
    labelEn: string;
    /** Arabic label shown as tooltip / inquiry text. */
    labelAr?: string;
    /** The 6th option: opens the ContactModal with a free-form color request. */
    isCustom?: boolean;
}

/** The 6 global swatch options: 5 solid colors + the "custom" gradient chip. */
export const productColorPalette: ProductColorOption[] = [
    { key: "white", hex: "#FFFFFF", labelKu: "سپی", labelEn: "White", labelAr: "أبيض" },
    { key: "black", hex: "#1A1A1A", labelKu: "ڕەش", labelEn: "Black", labelAr: "أسود" },
    { key: "gray", hex: "#808080", labelKu: "خۆڵەمێشی", labelEn: "Gray", labelAr: "رمادي" },
    { key: "wood", hex: "#A0522D", labelKu: "دار", labelEn: "Wood", labelAr: "خشبي" },
    { key: "blue", hex: "#2C3E50", labelKu: "شین", labelEn: "Blue", labelAr: "أزرق" },
    { key: "custom", labelKu: "یان ڕەنگی دڵخوازی خۆت؟", labelEn: "Or your own custom color?", labelAr: "أو لونك الخاص المفضل؟", isCustom: true },
];

/** Rainbow background for the "custom" swatch (stands out — no image needed). */
export const customColorGradient =
    "conic-gradient(from 180deg, #EF4444, #F59E0B, #22C55E, #06B6D4, #3B82F6, #8B5CF6, #EC4899, #EF4444)";

/**
 * Pre-written Kurdish inquiry text for a clicked color swatch (lead-gen).
 * Displayed in the ContactModal and attached to WhatsApp deep links.
 * Pass `colorLabelKu = null` for the custom-color ("ڕەنگی دڵخوازی خۆت؟") option.
 */
export function buildColorInquiry(
    productTitle: string,
    colorLabel: string | null,
    language: Language = "ku"
): string {
    if (language === "ku") {
        if (colorLabel === null) {
            return `سڵاو، مەبەستم کڕینی (${productTitle})ە، بەڵام دەمەوێت بە ڕەنگێکی تایبەت و دڵخوازی خۆم بۆم دروست بکەن...`;
        }
        return `سڵاو، مەبەستم کڕینی (${productTitle})ە بە ڕەنگی (${colorLabel}). تکایە زانیاریم پێ بدەن.`;
    }
    if (language === "ar") {
        if (colorLabel === null) {
            return `مرحباً، أرغب بشراء (${productTitle})، لكن أريد تصنيعه بلون خاص من اختياري...`;
        }
        return `مرحباً، أرغب بشراء (${productTitle}) بلون (${colorLabel}). يرجى تزويدي بالتفاصيل.`;
    }
    if (colorLabel === null) {
        return `Hello, I'm interested in buying (${productTitle}), but I would like it made in a custom color of my choice...`;
    }
    return `Hello, I'm interested in buying (${productTitle}) in (${colorLabel}). Please send me the details.`;
}

export const productCategories: ProductCategory[] = [
    {
        id: "as",
        slug: "as",
        titleKu: "کەپسولەکانی خزمەتگوزاری AS",
        titleEn: "AS Service Capsules",
        titleAr: "كبسولات الخدمات AS",
        shortDescriptionKu: "کەپسولی خزمەتگوزاریی پڕۆژەیی بۆ پێداویستییە تایبەتەکان.",
        shortDescriptionEn: "Project service capsules for specialized requirements.",
        shortDescriptionAr: "كبسولات خدمية للمشاريع حسب الاحتياجات الخاصة.",
        descriptionKu: "کۆمەڵە کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
        descriptionEn: "A dedicated capsule range for project service use, designed to adapt to the requirements of the site and the type of operation.",
        descriptionAr: "مجموعة كبسولات مخصصة للاستخدام الخدمي في المشاريع، بتصميم يمكن تعديله حسب متطلبات الموقع ونوع الاستخدام.",
        image: "/images/watch-cabin.webp",
        modelCount: 6,
    },
    {
        id: "am",
        slug: "am",
        titleKu: "کەپسولەکانی ئیش و کاری AM",
        titleEn: "AM Capsule Series",
        titleAr: "كبسولات العمل AM",
        shortDescriptionKu: "زنجیرەی کەپسولە مۆدولارەکانی مۆدێلی AM بە کۆدە تایبەتەکانەوە.",
        shortDescriptionEn: "The AM modular capsule series with its dedicated model codes.",
        shortDescriptionAr: "سلسلة الكبسولات المعيارية AM بأكواد الموديلات الخاصة بها.",
        descriptionKu: "زنجیرەی کەپسولەکانی AM لە کارگەی ئەنتیکا، دیزاین کراوە بۆ پڕۆژە و شوێنە جیاوازەکان بەپێی کۆدی مۆدێلەکان.",
        descriptionEn: "The AM capsule series from Antika Factory is designed for a variety of projects and sites according to its model codes.",
        descriptionAr: "سلسلة كبسولات AM من مصنع أنتيكا، مصممة لمختلف المشاريع والمواقع حسب أكواد الموديلات.",
        image: "/images/am-36.webp",
        modelCount: 11,
    },
    {
        id: "al",
        slug: "al",
        titleKu: "کەپسولەکانی نیشتەجێبوونی AL",
        titleEn: "AL Residential Capsule Series",
        titleAr: "كبسولات السكن AL",
        shortDescriptionKu: "کەپسولەکانی نیشتەجێبوون لە زنجیرەی ئەپڵ بە قەبارە و دیزاینی جیاواز.",
        shortDescriptionEn: "Residential capsules from the Apple series in a range of sizes and designs.",
        shortDescriptionAr: "كبسولات سكنية من سلسلة أبل بأحجام وتصاميم متنوعة.",
        descriptionKu: "زنجیرەی کەپسولەکانی نیشتەجێبوونی AL (کەپسولی ئەپڵ)، بەرهەمهێنراو لە کارگەی ئەنتیکا بۆ شوێنی نیشتەجێبوون، باخچە و پڕۆژەی تایبەت بەپێی پێوانەی ڕاگەیەنراو.",
        descriptionEn: "The AL residential capsule series (Apple Capsule), manufactured at Antika Factory for residential sites, gardens and private projects to its published dimensions.",
        descriptionAr: "سلسلة كبسولات السكن AL (كبسولة أبل)، مصنّعة في مصنع أنتيكا لمواقع السكن والحدائق والمشاريع الخاصة وفق المقاسات المعلنة.",
        image: "/images/al-4.webp",
        modelCount: 6,
    },
    {
        id: "container-house",
        slug: "container-house",
        titleKu: "خانووی حاویە",
        titleEn: "Container House",
        titleAr: "منزل الحاوية",
        shortDescriptionKu: "یەکەی خانووی مۆدولاری حاویە بە دیزاینی ئەندازیاری.",
        shortDescriptionEn: "A modular container-house unit with an engineered design.",
        shortDescriptionAr: "وحدة منزل معياري (حاوية) بتصميم هندسي.",
        descriptionKu: "یەکەی خانووی حاویە بە مۆدێلی CL لە کارگەی ئەنتیکا بەرهەم دەهێنرێت بەپێی پێوانەی ڕاگەیەنراوی ئەندازیاری.",
        descriptionEn: "The CL container-house unit is produced at Antika Factory to its published engineering dimensions.",
        descriptionAr: "وحدة منزل الحاوية بموديل CL تُنتج في مصنع أنتيكا وفق المقاسات الهندسية المعلنة.",
        image: "/images/container-cabin-2.webp",
        modelCount: 1,
    },
    {
        id: "standard-house",
        slug: "standard-house",
        titleKu: "کابینەی ئاسایی",
        titleEn: "Standard Modular Cabin",
        titleAr: "الكابينة القياسية",
        shortDescriptionKu: "کابینەی مۆدولاری ستاندارد بۆ پڕۆژە و شوێنی جیاواز.",
        shortDescriptionEn: "A standard modular cabin for various projects and locations.",
        shortDescriptionAr: "كابينة معيارية قياسية لمختلف المشاريع والمواقع.",
        descriptionKu: "کابینەی ئاسایی مۆدێلی ZL بە دیزاینی پێکهاتەیی لە کارگەی ئەنتیکا فاکتۆری بەرهەم دەهێنرێت.",
        descriptionEn: "The ZL standard cabin is produced at Antika Factory with a structural panel design.",
        descriptionAr: "الكابينة القياسية موديل ZL تُنتج في مصنع أنتيكا بتصميم ألواح إنشائية.",
        image: "/images/work-capsule.webp",
        modelCount: 1,
    },
    {
        id: "garden-house",
        slug: "garden-house",
        titleKu: "خانووی باخچە",
        titleEn: "Garden House",
        titleAr: "منزل الحديقة",
        shortDescriptionKu: "خانوویەکی مۆدولار بۆ بەکارهێنانی تایبەت و باخچەیی بەپێی خواستی کڕیار.",
        shortDescriptionEn: "A modular house for private and garden use, tailored to the client.",
        shortDescriptionAr: "منزل معياري للاستخدام الخاص والحدائقي حسب رغبة العميل.",
        descriptionKu: "خانوویەکی مۆدولار بۆ بەکارهێنانی تایبەت و پڕۆژەیی، بە پێی دیزاین و پێداویستیی کڕیار.",
        descriptionEn: "A modular house for private and project use, designed around the client's layout and requirements.",
        descriptionAr: "منزل معياري للاستخدام الخاص والمشاريع، وفق تصميم العميل ومتطلباته.",
        image: "/images/capsule-3.jpg",
        modelCount: 1,
    },
    {
        id: "cabin-house",
        slug: "cabin-house",
        titleKu: "خانووی کوخ",
        titleEn: "Cabin House",
        titleAr: "منزل الكوخ",
        shortDescriptionKu: "خانووی کوخی دوو قات بە دیزاینی مۆدێرن و ڕووبەری ڕاگەیەنراو.",
        shortDescriptionEn: "A two-level cabin house with a modern design and published floor area.",
        shortDescriptionAr: "منزل كوخ بطابقين بتصميم عصري ومساحة معلنة.",
        descriptionKu: "خانووی کوخی دوو قات مۆدێلی KL لە کارگەی ئەنتیکا، پێکهاتوو لە دوو نهۆم بەپێی پێوانە و ڕووبەری ڕاگەیەنراو.",
        descriptionEn: "The KL two-level cabin house from Antika Factory is built from two floors to its published dimensions and floor area.",
        descriptionAr: "منزل الكوخ بطابقين موديل KL من مصنع أنتيكا، مكوّن من طابقين وفق المقاسات والمساحة المعلنة.",
        image: "/images/capsule-5.jpg",
        modelCount: 1,
    },
    {
        id: "concrete-house",
        slug: "concrete-house",
        titleKu: "خانووی کۆنکریت",
        titleEn: "Concrete House",
        titleAr: "المنزل الخرساني",
        shortDescriptionKu: "خانووی کۆنکریتی مۆدولاری نوێ بە دیزاینی ئەندازیاری و بنیادی بەهێز.",
        shortDescriptionEn: "A modern modular concrete house with an engineered design and a solid foundation.",
        shortDescriptionAr: "منزل خرساني معياري حديث بتصميم هندسي وأساس متين.",
        descriptionKu: "خانووی کۆنکریت لە کارگەی ئەنتیکا فاکتۆری، بەرهەمهێنراوە بە ستانداردی ئەندازیاری بەرز بۆ نیشتەجێبوونی بەردەوام و پڕۆژەی تایبەت.",
        descriptionEn: "The Concrete House at Antika Factory is produced to a high engineering standard for permanent living and private projects.",
        descriptionAr: "المنزل الخرساني في مصنع أنتيكا، مُنتج بمعايير هندسية عالية للسكن الدائم والمشاريع الخاصة.",
        image: "/images/concreate-house.webp",
        modelCount: 1,
    },
    {
        id: "koshk",
        slug: "koshk",
        titleKu: "کۆشکەکان",
        titleEn: "KA Commercial Kiosks",
        titleAr: "أكشاك KA التجارية",
        shortDescriptionKu: "کۆشکی بازرگانی KA بە مۆدێلی جیاواز بۆ فرۆشگا، پارک، نیشتەجێبوون و کار.",
        shortDescriptionEn: "KA commercial kiosks in several models for shops, parks, living and work.",
        shortDescriptionAr: "أكشاك تجارية KA بموديلات مختلفة للمتاجر والحدائق والسكن والعمل.",
        descriptionKu: "زنجیرەی کۆشکی بازرگانی KA لە کارگەی ئەنتیکا، دیزاینکراوە بۆ شوێنی بازرگانی و کۆمەڵایەتی بەپێی پێوانەی ڕاگەیەنراو.",
        descriptionEn: "The KA commercial kiosk series from Antika Factory is designed for commercial and community locations to its published dimensions.",
        descriptionAr: "سلسلة أكشاك KA التجارية من مصنع أنتيكا، مصممة للمواقع التجارية والمجتمعية وفق المقاسات المعلنة.",
        image: "/images/ka-b.webp",
        modelCount: 4,
    },
];

export const verifiedProducts: VerifiedProduct[] = [
    /* ---------------- AS SERVICE CAPSULES (6 models) ---------------- */
    {
        id: "monitoring-capsule",
        slug: "monitoring-capsule",
        categoryId: "as",
        categoryTitleKu: "کەپسولەکانی AS",
        titleKu: "کەپسولی چاودێری",
        titleEn: "Monitoring Capsule",
        titleAr: "كبسولة المراقبة",
        modelCode: "AS",
        shortDescriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی چاودێری پڕۆژە بەپێی دیزاین و شوێنی دیاریکراو.",
        shortDescriptionEn: "A dedicated capsule for project monitoring services, matched to the designed layout and site.",
        shortDescriptionAr: "كبسولة مخصصة لاستخدام خدمات مراقبة المشاريع وفق التصميم والموقع المحدد.",
        descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
        descriptionEn: "A dedicated capsule for project service use, designed to adapt to the requirements of the site and the type of operation.",
        descriptionAr: "كبسولة مخصصة للاستخدام الخدمي في المشاريع، بتصميم يمكن تعديله حسب متطلبات الموقع ونوع الاستخدام.",
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/watch-cabin.webp"],
        verificationStatus: "VERIFIED",
        technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        internalNotes: "Monitoring equipment and specifications require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "shower-capsule",
        slug: "shower-capsule",
        categoryId: "as",
        categoryTitleKu: "کەپسولەکانی AS",
        titleKu: "کەپسولی شاوەر(خۆ شووشتن)",
        titleEn: "Shower Capsule",
        titleAr: "كبسولة الاستحمام",
        modelCode: "AS",
        shortDescriptionKu: "کەپسولێکی خزمەتگوزاری بۆ بەشی شاور، بە دیزاینێک کە بەپێی داواکاری پڕۆژە ئامادە دەکرێت.",
        shortDescriptionEn: "A service capsule for shower facilities, prepared to the requirements of each project.",
        shortDescriptionAr: "كبسولة خدمية لقسم الاستحمام، تُجهّز حسب متطلبات كل مشروع.",
        descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
        descriptionEn: "A dedicated capsule for project service use, designed to adapt to the requirements of the site and the type of operation.",
        descriptionAr: "كبسولة مخصصة للاستخدام الخدمي في المشاريع، بتصميم يمكن تعديله حسب متطلبات الموقع ونوع الاستخدام.",
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/shower-cabin.webp"],
        verificationStatus: "VERIFIED",
        technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        internalNotes: "Plumbing, drainage and sanitary fittings require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "acoustic-capsule",
        slug: "acoustic-capsule",
        categoryId: "as",
        categoryTitleKu: "کەپسولەکانی AS",
        titleKu: "کەپسولی بێدەنگ (کاتم الصوت )",
        titleEn: "Acoustic Capsule",
        titleAr: "كبسولة عازلة للصوت (كاتم الصوت)",
        modelCode: "AS",
        shortDescriptionKu: "کەپسولێکی تایبەتی خزمەتگوزاری بە دیزاینی ئارام و کەمکردنەوەی دەنگ بۆ شوێنی کار و پڕۆژە.",
        shortDescriptionEn: "A specialized service capsule with a quiet design and noise reduction for workplaces and projects.",
        shortDescriptionAr: "كبسولة خدمية متخصصة بتصميم هادئ يقلل الضوضاء لأماكن العمل والمشاريع.",
        descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
        descriptionEn: "A dedicated capsule for project service use, designed to adapt to the requirements of the site and the type of operation.",
        descriptionAr: "كبسولة مخصصة للاستخدام الخدمي في المشاريع، بتصميم يمكن تعديله حسب متطلبات الموقع ونوع الاستخدام.",
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/silent-cabin.webp"],
        verificationStatus: "VERIFIED",
        technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        internalNotes: "Acoustic rating and STC values require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "air-smoke-exchange-capsule",
        slug: "air-smoke-exchange-capsule",
        categoryId: "as",
        categoryTitleKu: "کەپسولەکانی AS",
        titleKu: "کەپسولی ئاڵوگۆڕی هەوا و دووکەڵ",
        titleEn: "Air & Smoke Exchange Capsule",
        titleAr: "كبسولة تبادل الهواء والدخان",
        modelCode: "AS",
        shortDescriptionKu: "کەپسولێکی خزمەتگوزاری بۆ بەڕێوەبردنی هەواگۆڕکێ بەپێی دیزاینی شوێن و پڕۆژەکە.",
        shortDescriptionEn: "A service capsule for managed air exchange, matched to the design of the site and the project.",
        shortDescriptionAr: "كبسولة خدمية لإدارة تبادل الهواء وفق تصميم الموقع والمشروع.",
        descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
        descriptionEn: "A dedicated capsule for project service use, designed to adapt to the requirements of the site and the type of operation.",
        descriptionAr: "كبسولة مخصصة للاستخدام الخدمي في المشاريع، بتصميم يمكن تعديله حسب متطلبات الموقع ونوع الاستخدام.",
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/air-cabin.webp"],
        verificationStatus: "VERIFIED",
        technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        internalNotes: "Airflow metrics and smoke ventilation details require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "sterilization-room-capsule",
        slug: "sterilization-room-capsule",
        categoryId: "as",
        categoryTitleKu: "کەپسولەکانی AS",
        titleKu: "کەپسولی ژووری تەعقیم",
        titleEn: "Sterilization Room Capsule",
        titleAr: "كبسولة غرفة التعقيم",
        modelCode: "AS",
        shortDescriptionKu: "کەپسولێکی خزمەتگوزاری بۆ فەزای تەعقیم، بە دیزاینێک کە دەتوانێت بەپێی پێداویستی ڕێکبخرێت.",
        shortDescriptionEn: "A service capsule for sterilization spaces, adjustable to the project's requirements.",
        shortDescriptionAr: "كبسولة خدمية لمساحات التعقيم، قابلة للتعديل حسب متطلبات المشروع.",
        descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
        descriptionEn: "A dedicated capsule for project service use, designed to adapt to the requirements of the site and the type of operation.",
        descriptionAr: "كبسولة مخصصة للاستخدام الخدمي في المشاريع، بتصميم يمكن تعديله حسب متطلبات الموقع ونوع الاستخدام.",
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/med-cabin.webp"],
        verificationStatus: "VERIFIED",
        technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        internalNotes: "Medical-grade sterilization capabilities require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },    
    /* ---------------- AM NUMBERED CAPSULES (5 models) ---------------- */
    {
        id: "am-32",
        slug: "am-32",
        categoryId: "am",
        categoryTitleKu: "کەپسولەکانی AM",
        titleKu: "کەپسولی AM 32",
        titleEn: "AM 32 Capsule",
        titleAr: "كبسولة AM 32",
        modelCode: "AM 32",
        shortDescriptionKu: "مۆدێلی AM 32 لە زنجیرەی کەپسولەکانی AM بە پێوانەی 2 × 1.5 م.",
        shortDescriptionEn: "The AM 32 model from the AM capsule series, with 2 × 1.5 m dimensions.",
        shortDescriptionAr: "موديل AM 32 من سلسلة كبسولات AM بأبعاد 2 × 1.5 م.",
        descriptionKu: null,
        dimensionsRaw: "2 × 1.5",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-32.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "AM 32 capsule. Dimensions: 2 × 1.5. Unit m assumed, confirm.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-34",
        slug: "am-34",
        categoryId: "am",
        categoryTitleKu: "کەپسولەکانی AM",
        titleKu: "کەپسولی AM 34",
        titleEn: "AM 34 Capsule",
        titleAr: "كبسولة AM 34",
        modelCode: "AM 34",
        shortDescriptionKu: "مۆدێلی AM 34 لە زنجیرەی کەپسولەکانی AM بە پێوانەی 2 × 2 م.",
        shortDescriptionEn: "The AM 34 model from the AM capsule series, with 2 × 2 m dimensions.",
        shortDescriptionAr: "موديل AM 34 من سلسلة كبسولات AM بأبعاد 2 × 2 م.",
        descriptionKu: null,
        dimensionsRaw: "2 × 2",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-34-2.webp", "/images/am-34-3.webp", "/images/am-34.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "AM 34 capsule. Dimensions: 2 × 2. Unit m assumed, confirm.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-36",
        slug: "am-36",
        categoryId: "am",
        categoryTitleKu: "کەپسولەکانی AM",
        titleKu: "کەپسولی AM 36",
        titleEn: "AM 36 Capsule",
        titleAr: "كبسولة AM 36",
        modelCode: "AM 36",
        shortDescriptionKu: "مۆدێلی AM 36 لە زنجیرەی کەپسولەکانی AM بە پێوانەی 3 × 2 م.",
        shortDescriptionEn: "The AM 36 model from the AM capsule series, with 3 × 2 m dimensions.",
        shortDescriptionAr: "موديل AM 36 من سلسلة كبسولات AM بأبعاد 3 × 2 م.",
        descriptionKu: null,
        dimensionsRaw: "3 × 2",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-36.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "AM 36 capsule. Dimensions: 3 × 2. Unit m assumed, confirm.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-38",
        slug: "am-38",
        categoryId: "am",
        categoryTitleKu: "کەپسولەکانی AM",
        titleKu: "کەپسولی AM 38",
        titleEn: "AM 38 Capsule",
        titleAr: "كبسولة AM 38",
        modelCode: "AM 38",
        shortDescriptionKu: "مۆدێلی AM 38 لە زنجیرەی کەپسولەکانی AM بە پێوانەی 2.5 × 2.5 م.",
        shortDescriptionEn: "The AM 38 model from the AM capsule series, with 2.5 × 2.5 m dimensions.",
        shortDescriptionAr: "موديل AM 38 من سلسلة كبسولات AM بأبعاد 2.5 × 2.5 م.",
        descriptionKu: null,
        dimensionsRaw: "2.5 × 2.5",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-38.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "AM 38 capsule. Dimensions: 2.5 × 2.5. Unit m assumed, confirm.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-40",
        slug: "am-40",
        categoryId: "am",
        categoryTitleKu: "کەپسولەکانی AM",
        titleKu: "کەپسولی AM 40",
        titleEn: "AM 40 Capsule",
        titleAr: "كبسولة AM 40",
        modelCode: "AM 40",
        shortDescriptionKu: "مۆدێلی AM 40 لە زنجیرەی کەپسولەکانی AM بە پێوانەی 3 × 3 م.",
        shortDescriptionEn: "The AM 40 model from the AM capsule series, with 3 × 3 m dimensions.",
        shortDescriptionAr: "موديل AM 40 من سلسلة كبسولات AM بأبعاد 3 × 3 م.",
        descriptionKu: null,
        dimensionsRaw: "3 × 3",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-40-2.webp", "/images/am-40-3.webp", "/images/am-40-4.webp", "/images/am-40.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "AM 40 capsule. Dimensions: 3 × 3. Unit m assumed, confirm.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },

    /* ---------------- AL RESIDENTIAL CAPSULES (6 models) ---------------- */
    {
        id: "al-2",
        slug: "al-2",
        categoryId: "al",
        categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
        titleKu: "AL • 2 - Casule",
        titleEn: "AL 2 Apple Capsule",
        titleAr: "كبسولة أبل AL 2",
        productFamilyKu: "کەپسولی ئەپڵ",
        productFamilyEn: "Apple Capsule",
        productFamilyAr: "كبسولة أبل",
        modelCode: "AL 2",
        shortDescriptionKu: "AL 2 لە زنجیرەی کەپسولەکانی نیشتەجێبوونی ئەپڵ لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "AL 2 from the Apple residential capsule series at Antika Factory.",
        shortDescriptionAr: "AL 2 من سلسلة كبسولات السكن أبل في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: "6 × 3",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/al-2.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Raw dimensions 6 × 3. Unit not explicitly confirmed.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "al-4",
        slug: "al-4",
        categoryId: "al",
        categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
        titleKu: "AL • 4 - Casule",
        titleEn: "AL 4 Apple Capsule",
        titleAr: "كبسولة أبل AL 4",
        productFamilyKu: "کەپسولی ئەپڵ",
        productFamilyEn: "Apple Capsule",
        productFamilyAr: "كبسولة أبل",
        modelCode: "AL 4",
        shortDescriptionKu: "AL 4 لە زنجیرەی کەپسولەکانی نیشتەجێبوونی ئەپڵ لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "AL 4 from the Apple residential capsule series at Antika Factory.",
        shortDescriptionAr: "AL 4 من سلسلة كبسولات السكن أبل في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: "8.5 × 3.2",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/al-4.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Raw dimensions 8.5 × 3.2. Unit not explicitly confirmed.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "al-6",
        slug: "al-6",
        categoryId: "al",
        categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
        titleKu: "AL • 6 - Casule",
        titleEn: "AL 6 Apple Capsule",
        titleAr: "كبسولة أبل AL 6",
        productFamilyKu: "کەپسولی ئەپڵ",
        productFamilyEn: "Apple Capsule",
        productFamilyAr: "كبسولة أبل",
        modelCode: "AL 6",
        shortDescriptionKu: "AL 6 لە زنجیرەی کەپسولەکانی نیشتەجێبوونی ئەپڵ لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "AL 6 from the Apple residential capsule series at Antika Factory.",
        shortDescriptionAr: "AL 6 من سلسلة كبسولات السكن أبل في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: "9.5 × 3.5",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/al-6.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Raw dimensions 9.5 × 3.5. Unit not explicitly confirmed.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "al-8",
        slug: "al-8",
        categoryId: "al",
        categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
        titleKu: "AL • 8 - Casule",
        titleEn: "AL 8 Apple Capsule",
        titleAr: "كبسولة أبل AL 8",
        productFamilyKu: "کەپسولی ئەپڵ",
        productFamilyEn: "Apple Capsule",
        productFamilyAr: "كبسولة أبل",
        modelCode: "AL 8",
        shortDescriptionKu: "AL 8 لە زنجیرەی کەپسولەکانی نیشتەجێبوونی ئەپڵ لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "AL 8 from the Apple residential capsule series at Antika Factory.",
        shortDescriptionAr: "AL 8 من سلسلة كبسولات السكن أبل في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: "11.5 × 3",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/al-8.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Raw dimensions 11.5 × 3. Unit not explicitly confirmed.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "al-d",
        slug: "al-d",
        categoryId: "al",
        categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
        titleKu: "کەپسولی ئەپڵی دوو پارچە AL · D",
        titleEn: "AL · D Two-Piece Apple Capsule",
        titleAr: "كبسولة أبل من قطعتين AL · D",
        productFamilyKu: "کەپسولی ئەپڵ",
        productFamilyEn: "Apple Capsule",
        productFamilyAr: "كبسولة أبل",
        modelCode: "AL · D",
        shortDescriptionKu: "کەپسولی ئەپڵی دوو پارچە مۆدێلی AL جۆری D بە ڕووبەری گشتی 52m² لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The AL·D two-piece Apple capsule with a total area of 52 m², at Antika Factory.",
        shortDescriptionAr: "كبسولة أبل من قطعتين موديل AL نوع D بمساحة إجمالية 52m² في مصنع أنتيكا.",
        descriptionKu: "کەپسولی نیشتەجێبوونی ئەپڵی دوو پارچە (مۆدێلی AL جۆری D)، دروستکراو بە پێوانەی 11.5 × 4.40 × 2.45 مەتر و ڕووبەری گشتی 52m² بۆ شوێنی نیشتەجێبوون، باخچە، ڤێلا و پڕۆژەی تایبەت بە بەرزترین ستانداردی کارگەی ئەنتیکا.",
        descriptionEn: "The two-piece Apple residential capsule (model AL, type D), built at 11.5 × 4.40 × 2.45 m with a total area of 52 m² for residential sites, gardens, villas and private projects, to Antika Factory's highest standard.",
        descriptionAr: "كبسولة السكن أبل من قطعتين (موديل AL نوع D)، مصنوعة بأبعاد 11.5 × 4.40 × 2.45 متر وبمساحة إجمالية 52m² لمواقع السكن والحدائق والفلل والمشاريع الخاصة، وفق أعلى معايير مصنع أنتيكا.",
        dimensionsRaw: "11.5 × 4.40 × 2.45",
        heightRaw: "2.45",
        widthRaw: "4.40",
        lengthRaw: "11.5",
        areaRaw: "52m²",
        dimensionUnitStatus: "VERIFIED",
        materials: "ئەلەمینیۆم و پۆڵا و شووشەی دۆبڵ",
        materialsEn: "Aluminium, steel and double glazing.",
        materialsAr: "ألمنيوم وفولاذ وزجاج مزدوج.",
        applicationsKu: ["نیشتەجێبوون", "باخچە و ڤێلا", "شوێنی کار و پڕۆژەی تایبەت"],
        applicationsEn: ["Residential", "Garden & villa", "Workplace & private project"],
        applicationsAr: ["سكن", "حديقة وفيلا", "مكان عمل ومشروع خاص"],
        featuresKu: [
            { title: "دیزاینی دوو پارچە", desc: "دیزاینی تایبەت و سەردەمیانەی ئەپڵ بە دوو پارچەی پێشکەوتوو" },
            { title: "ڕووبەری فراوان", desc: "ڕووبەری گشتی 52m² بە دابەشکاری نموونەیی بۆ ژیانێکی مۆدێرن" },
        ],
        featuresEn: [
            { title: "Two-piece design", desc: "A distinctive, contemporary Apple design built from two engineered sections." },
            { title: "Generous floor area", desc: "52 m² total area with an exemplary layout for modern living." },
        ],
        featuresAr: [
            { title: "تصميم من قطعتين", desc: "تصميم أبل المميز والعصري بقطعتين متطورتين" },
            { title: "مساحة واسعة", desc: "مساحة إجمالية 52m² بتوزيع نموذجي لحياة عصرية" },
        ],
        images: ["/images/al-d.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Apple two-piece capsule AL · D. Dimensions: 11.5 × 4.40 × 2.45, Area: 52m².",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "al-f",
        slug: "al-f",
        categoryId: "al",
        categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
        titleKu: "ئەپڵی دووقات AL · F",
        titleEn: "Apple Two-Level Model (AL.F)",
        titleAr: "أبل بطابقين",
        productFamilyKu: "کەپسولی ئەپڵ",
        productFamilyEn: "Apple Capsule",
        productFamilyAr: "كبسولة أبل",
        modelCode: "AL.F",
        shortDescriptionKu: "ئەپڵی طابق مۆدێلی AL.F بە ڕووبەری ڕاگەیەنراوی 52m² لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The two-level Apple AL.F model with a published area of 52 m², at Antika Factory.",
        shortDescriptionAr: "موديل أبل بطابقين AL.F بمساحة معلنة 52m² في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: "11.5 × 2.20 × 2.45",
        heightRaw: "2.45",
        widthRaw: "2.20",
        lengthRaw: "11.5",
        areaRaw: "52m²",
        levels: "دوو قات",
        levelsEn: "Two levels",
        levelsAr: "طابقان",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/apple-cabin-2qat.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Confirm whether 52m² is the combined area of both levels.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },

    /* ---------------- CONTAINER HOUSE (1 model) ---------------- */
    {
        id: "cl",
        slug: "cl",
        categoryId: "container-house",
        categoryTitleKu: "خانووی حاویە",
        titleKu: "خانووی حاویە",
        titleEn: "Container House",
        titleAr: "منزل الحاوية",
        modelCode: "دیاری نەکراوە",
        modelCodeEn: "Not specified",
        modelCodeAr: "غير محدد",
        shortDescriptionKu: "خانووی حاویە مۆدێلی  بە پێوانەی ڕاگەیەنراوی 590 × 3 × 280.",
        shortDescriptionEn: "The Container House model at its published dimensions of 590 × 3 × 280.",
        shortDescriptionAr: "منزل الحاوية بمقاساته المعلنة 590 × 3 × 280.",
        descriptionKu: null,
        dimensionsRaw: "590 × 3 × 280",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        dimensionOrder: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/container-cabin-2.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "DimensionsRaw: 590 × 3 × 280. Unit and order requires business confirmation. Do not claim standard shipping container.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },

    /* ---------------- STANDARD MODULAR HOUSE (1 model) ---------------- */
    {
        id: "zl",
        slug: "zl",
        categoryId: "standard-house",
        categoryTitleKu: "کابینەی ئاسایی",
        titleKu: "کابینەی ئاسایی",
        titleEn: "Standard Modular Cabin",
        titleAr: "الكابينة القياسية",
        modelCode: "دیاری نەکراوە",
        modelCodeEn: "Not specified",
        modelCodeAr: "غير محدد",
        shortDescriptionKu: "کابینەی ئاسایی بە پێوانەی ڕاگەیەنراوی 5800 × 2480 × 2530.",
        shortDescriptionEn: "The Standard Cabin at its published dimensions of 5800 × 2480 × 2530.",
        shortDescriptionAr: "الكابينة القياسية بمقاساتها المعلنة 5800 × 2480 × 2530.",
        descriptionKu: null,
        dimensionsRaw: "5800 × 2480 × 2530",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        dimensionOrder: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/house-cabin.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Raw dimensions 5800 × 2480 × 2530 (appears mm-style). Do not silently convert to meters.",
        isComingSoon: true,
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },

    /* ---------------- GARDEN HOUSE (1 model) ---------------- */
    {
        id: "pl",
        slug: "pl",
        categoryId: "garden-house",
        categoryTitleKu: "خانووی باخچە",
        titleKu: "خانووی باخچە",
        titleEn: "Garden House",
        titleAr: "منزل الحديقة",
        modelCode: "دیاری نەکراوە",
        modelCodeEn: "Not specified",
        modelCodeAr: "غير محدد",
        shortDescriptionKu: "خانوویەکی مۆدولار بۆ بەکارهێنانی تایبەت و پڕۆژەیی، بە پێی دیزاین و پێداویستیی کڕیار.",
        shortDescriptionEn: "A modular house for private and project use, built to the client's design and requirements.",
        shortDescriptionAr: "منزل معياري للاستخدام الخاص والمشاريع، وفق تصميم العميل ومتطلباته.",
        descriptionKu: "خانوویەکی مۆدولار بۆ بەکارهێنانی تایبەت و پڕۆژەیی، بە پێی دیزاین و پێداویستیی کڕیار.",
        descriptionEn: "A modular house for private and project use, designed around the client's layout and requirements.",
        descriptionAr: "منزل معياري للاستخدام الخاص والمشاريع، وفق تصميم العميل ومتطلباته.",
        dimensionsRaw: "6000 × 3000 × 2500",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        dimensionOrder: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/baxcha-cabin.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Raw dimensions 6000 × 3000 × 2500. Do not assume guest house/studio unless confirmed.",
        isComingSoon: true,
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },

    /* ---------------- CABIN HOUSE (1 model) ---------------- */
    {
        id: "kl",
        slug: "kl",
        categoryId: "cabin-house",
        categoryTitleKu: "خانووی کوخ",
        titleKu: "خانووی کوخ(دوو قات)",
        titleEn: "Cabin House(Two-Level)",
        titleAr: "منزل الكوخ (طابقان)",
        modelCode: "دیاری نەکراوە",
        modelCodeEn: "Not specified",
        modelCodeAr: "غير محدد",
        shortDescriptionKu: "خانووی کوخی دوو قات مۆدێلی  بە ڕووبەری ڕاگەیەنراوی 29.4m².",
        shortDescriptionEn: "The two-level Cabin House model with a published area of 29.4 m².",
        shortDescriptionAr: "منزل الكوخ بطابقين بمساحة معلنة 29.4m².",
        descriptionKu: null,
        dimensionsRaw: "7500 × 3000 × 4600",
        areaRaw: "29.4m²",
        levels: "خانووی کوخی دوو قات",
        levelsAr: "منزل الكوخ بطابقين",
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/kux-cabin.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Confirm units and whether 29.4m² refers to one floor or total building.",
        isComingSoon: true,
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },

    /* ---------------- CONCRETE HOUSE (1 model) ---------------- */
    {
        id: "concrete-house-model",
        slug: "concrete-house-model",
        categoryId: "concrete-house",
        categoryTitleKu: "خانووی کۆنکریت",
        titleKu: "خانووی کۆنکریت",
        titleEn: "Concrete House",
        titleAr: "المنزل الخرساني",
        modelCode: "دیاری نەکراوە",
        modelCodeEn: "Not specified",
        modelCodeAr: "غير محدد",
        shortDescriptionKu: "خانووی کۆنکریتی مۆدولاری نوێ بە دیزاینی ئەندازیاری و بنیادی بەهێز لە کارگەی ئەنتیکا.",
        shortDescriptionEn: "A modern modular concrete house with an engineered design and a solid foundation at Antika Factory.",
        shortDescriptionAr: "منزل خرساني معياري حديث بتصميم هندسي وأساس متين من مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: "کۆنکریت، ئاسن، مۆدولی پێشساز",
        materialsEn: "Concrete, steel and pre-fabricated modules.",
        materialsAr: "خرسانة وحديد ووحدات مسبقة الصنع.",
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/concreate-house.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Concrete house. Dimensions require business confirmation.",
        isComingSoon: true,
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },

    /* ---------------- KOSHK - KA COMMERCIAL KIOSKS (4 models) ---------------- */
    {
        id: "ka-b",
        slug: "ka-b",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی KA · B",
        titleEn: "KA·B Kiosk",
        titleAr: "كشك KA · B",
        modelCode: "KA·B",
        shortDescriptionKu: "کۆشکی بازرگانی KA · B لە زنجیرەی کۆشکەکانی KA لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The KA · B commercial kiosk from the KA kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري KA · B من سلسلة أكشاك KA في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/ka-b.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "KA·B kiosk. Dimensions require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "ka-p",
        slug: "ka-p",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی KA · P",
        titleEn: "KA·P Kiosk",
        titleAr: "كشك KA · P",
        modelCode: "KA·P",
        shortDescriptionKu: "کۆشکی بازرگانی KA · P لە زنجیرەی کۆشکەکانی KA لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The KA · P commercial kiosk from the KA kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري KA · P من سلسلة أكشاك KA في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/ka-p.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "KA·P kiosk. Dimensions require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "ka-g",
        slug: "ka-g",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی KA · G",
        titleEn: "KA·G Kiosk",
        titleAr: "كشك KA · G",
        modelCode: "KA·G",
        shortDescriptionKu: "کۆشکی بازرگانی KA · G لە زنجیرەی کۆشکەکانی KA لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The KA · G commercial kiosk from the KA kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري KA · G من سلسلة أكشاك KA في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/ka-g.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "KA·G kiosk. Dimensions require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "ka-a",
        slug: "ka-a",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی KA · A",
        titleEn: "KA·A Kiosk",
        titleAr: "كشك KA · A",
        modelCode: "KA·A",
        shortDescriptionKu: "کۆشکی بازرگانی KA · A لە زنجیرەی کۆشکەکانی KA لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The KA · A commercial kiosk from the KA kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري KA · A من سلسلة أكشاك KA في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-a.webp","/images/ka-a.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "KA·A kiosk. Dimensions require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-a2",
        slug: "am-a2",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی AM • A2",
        titleEn: "AM.A2 Kiosk",
        titleAr: "كشك AM • A2",
        modelCode: "AM.A2",
        shortDescriptionKu: "کۆشکی بازرگانی AM • A2 لە زنجیرەی کۆشکەکانی AM لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The AM • A2 commercial kiosk from the AM kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري AM • A2 من سلسلة أكشاك AM في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-a2.webp", "/images/am-a2-2.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Meaning of suffix 'A2' and specifications require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-m",
        slug: "am-m",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی AM • M",
        titleEn: "AM.M Kiosk",
        titleAr: "كشك AM • M",
        modelCode: "AM.M",
        shortDescriptionKu: "کۆشکی بازرگانی AM • M لە زنجیرەی کۆشکەکانی AM لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The AM • M commercial kiosk from the AM kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري AM • M من سلسلة أكشاك AM في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-m.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Meaning of suffix 'M' and specifications require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-h",
        slug: "am-h",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی AM • H",
        titleEn: "AM.H Kiosk",
        titleAr: "كشك AM • H",
        modelCode: "AM.H",
        shortDescriptionKu: "کۆشکی بازرگانی AM • H لە زنجیرەی کۆشکەکانی AM لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The AM • H commercial kiosk from the AM kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري AM • H من سلسلة أكشاك AM في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-h.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Meaning of suffix 'H' and specifications require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-s",
        slug: "am-s",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی AM • S",
        titleEn: "AM.S Kiosk",
        titleAr: "كشك AM • S",
        modelCode: "AM.S",
        shortDescriptionKu: "کۆشکی بازرگانی AM • S لە زنجیرەی کۆشکەکانی AM لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The AM • S commercial kiosk from the AM kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري AM • S من سلسلة أكشاك AM في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-s.webp", "/images/am-s-2.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Meaning of suffix 'S' and specifications require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
        
    },
    {
        id: "am-k",
        slug: "am-k",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی AM • K",
        titleEn: "AM.K Kiosk",
        titleAr: "كشك AM • K",
        modelCode: "AM.K",
        shortDescriptionKu: "کۆشکی بازرگانی AM • K لە زنجیرەی کۆشکەکانی AM لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The AM • K commercial kiosk from the AM kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري AM • K من سلسلة أكشاك AM في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-k.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Meaning of suffix 'K' and specifications require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
    {
        id: "am-r",
        slug: "am-r",
        categoryId: "koshk",
        categoryTitleKu: "کۆشکەکان",
        titleKu: "کۆشکی AM • R",
        titleEn: "AM.R Kiosk",
        titleAr: "كشك AM • R",
        modelCode: "AM.R",
        shortDescriptionKu: "کۆشکی بازرگانی AM • R لە زنجیرەی کۆشکەکانی AM لە ئەنتیکا فاکتۆری.",
        shortDescriptionEn: "The AM • R commercial kiosk from the AM kiosk series at Antika Factory.",
        shortDescriptionAr: "كشك تجاري AM • R من سلسلة أكشاك AM في مصنع أنتيكا.",
        descriptionKu: null,
        dimensionsRaw: null,
        dimensionUnitStatus: null,
        materials: null,
        applicationsKu: [],
        featuresKu: [],
        images: ["/images/am-r.webp"],
        verificationStatus: "VERIFIED",
        internalNotes: "Meaning of suffix 'R' and specifications require business confirmation.",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
];

/* Capsule and House Groupings */
export const capsuleCategories = productCategories.filter((c) =>
    ["as", "am", "al"].includes(c.id)
);

export const houseCategories = productCategories.filter((c) =>
    ["container-house", "standard-house", "garden-house", "cabin-house", "concrete-house"].includes(c.id)
);

export const koshkCategories = productCategories.filter((c) =>
    ["koshk"].includes(c.id)
);

export const capsuleProducts = verifiedProducts.filter((p) =>
    ["as", "am", "al"].includes(p.categoryId)
);

export const houseProducts = verifiedProducts.filter((p) =>
    ["container-house", "standard-house", "garden-house", "cabin-house", "concrete-house"].includes(p.categoryId)
);

export const koshkProducts = verifiedProducts.filter((p) =>
    p.categoryId === "koshk"
);

export const lightingProducts: VerifiedProduct[] = [
    {
        id: "lighting-ambient",
        slug: "lighting",
        categoryId: "lighting",
        categoryTitleKu: "لایتی ڕووناکی",
        titleKu: "لایتی ڕووناکی هونەری",
        titleEn: "Artistic Ambient Lighting",
        titleAr: "إضاءة فنية",
        shortDescriptionKu: "تێکەڵەیەک لە جوانیی سروشت و دیزاینی مۆدێرن بە شێوەیەکی بێهاوتا لە دار و کانزا.",
        shortDescriptionEn: "A unique blend of natural beauty and modern design in wood and metal.",
        shortDescriptionAr: "مزيج فريد من جمال الطبيعة والتصميم العصري في الخشب والمعدن.",
        descriptionKu: "دیزاین و دروستکردنی لایتی ڕووناکی مۆدێرن و هونەری لە کارگەی ئەنتیکا بە ستانداردی بەرز بۆ ناوماڵ، کافێ، ئۆفیس و شوێنە تایبەتەکان.",
        descriptionEn: "Design and production of modern, artistic ambient lighting at Antika Factory to a high standard for homes, cafés, offices and dedicated spaces.",
        descriptionAr: "تصميم وتصنيع إضاءة عصرية وفنية في مصنع أنتيكا بمعايير عالية للمنازل والمقاهي والمكاتب والأماكن الخاصة.",
        dimensionsRaw: "بەپێی داواکاری کڕیار",
        dimensionsEn: "Made to the client's request",
        materials: "دار و کانزا و LED",
        materialsEn: "Wood, metal and LED.",
        materialsAr: "خشب ومعدن و LED",
        applicationsKu: ["ناوماڵ", "کافێ و ڕێستۆرانت", "ئۆفیس و شوێنی کار"],
        applicationsEn: ["Home", "Café & restaurant", "Office & workplace"],
        applicationsAr: ["المنزل", "مقهى ومطعم", "مكتب ومكان عمل"],
        featuresKu: [
            { title: "دیزاینی دەستکرد", desc: "دیزاینی تایبەت و بێهاوتا بە کەرەستەی سروشتی" },
            { title: "ڕووناکی کەم‌مەسرەف", desc: "سیستەمی پێشکەوتووی LED بە بەکارهێنانی کەمترین وزە" },
        ],
        featuresEn: [
            { title: "Handcrafted design", desc: "A distinctive, one-of-a-kind design in natural materials." },
            { title: "Low-consumption lighting", desc: "An advanced LED system that uses the least possible energy." },
        ],
        featuresAr: [
            { title: "تصميم يدوي", desc: "تصميم خاص وفريد بمواد طبيعية" },
            { title: "إضاءة موفّرة للطاقة", desc: "نظام LED متطور بأقل استهلاك ممكن للطاقة" },
        ],
        images: ["/images/work-lighting.webp"],
        verificationStatus: "VERIFIED",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
];

export const shelvesProducts: VerifiedProduct[] = [
    {
        id: "shelves-modular",
        slug: "shelves",
        categoryId: "shelves",
        categoryTitleKu: "ڕەفەکان",
        titleKu: "ڕەفەی ئەندازیاری و مۆدێرن",
        titleEn: "Modern Engineering Shelves",
        titleAr: "رفوف هندسية عصرية",
        shortDescriptionKu: "ڕێکخستنێکی نموونەیی و پێدانی جوانییەکی تایبەت لە پۆڵا و ئاسن و دار.",
        shortDescriptionEn: "Exemplary organization with a distinct character in steel, iron and wood.",
        shortDescriptionAr: "تنظيم مثالي وطابع مميز من الفولاذ والحديد والخشب.",
        descriptionKu: "دیزاین و دروستکردنی ڕەفەی ئەندازیاری و مۆدێرن بە کوالێتی باڵا بۆ ناوماڵ، کارگە، مارکێت و ئۆفیس.",
        descriptionEn: "Design and production of modern engineering shelves to a high quality standard for homes, factories, markets and offices.",
        descriptionAr: "تصميم وتصنيع رفوف هندسية عصرية بجودة عالية للمنازل والمعامل والأسواق والمكاتب.",
        dimensionsRaw: "بەپێی پێوانەی شوێنەکەت",
        dimensionsEn: "Made to the measurements of your space",
        materials: "پۆڵا، ئاسن، داری سروشتی",
        materialsEn: "Steel, iron and natural wood.",
        materialsAr: "فولاذ وحديد وخشب طبيعي",
        applicationsKu: ["ناوماڵ", "ئۆفیس", "کافێ و مارکێت", "کارگە و کۆگا"],
        applicationsEn: ["Home", "Office", "Café & market", "Factory & warehouse"],
        applicationsAr: ["المنزل", "المكتب", "مقهى وسوق", "معمل ومخزن"],
        featuresKu: [
            { title: "پتەو و سەلامەت", desc: "بەرگەی کێشی بەرز دەگرێت بە سەلامەتی تەواو" },
            { title: "دیزاینی پیشەسازی مۆدێرن", desc: "گونجاو لەگەڵ دیزاینی ناوەوەی هاوچەرخ" },
        ],
        featuresEn: [
            { title: "Solid and safe", desc: "Carries heavy loads with complete safety." },
            { title: "Modern industrial design", desc: "Fits seamlessly with contemporary interiors." },
        ],
        featuresAr: [
            { title: "متينة وآمنة", desc: "تتحمل الأحمال الثقيلة بأمان تام" },
            { title: "تصميم صناعي عصري", desc: "يتناسب مع التصميمات الداخلية المعاصرة" },
        ],
        images: ["/images/work-shelves.webp"],
        verificationStatus: "VERIFIED",
        cta: {
            primaryKu: "داوای نرخ بکە",
            secondaryKu: "پەیوەندیمان پێوە بکە",
            primaryEn: "Request a Price",
            secondaryEn: "Contact Us",
            primaryAr: "اطلب عرض سعر",
            secondaryAr: "تواصل معنا",
        },
    },
];

export const allProducts: VerifiedProduct[] = [
    ...capsuleProducts,
    ...houseProducts,
    ...koshkProducts,
    ...lightingProducts,
    ...shelvesProducts,
];

export function isHouseCategory(categoryIdOrSlug: string): boolean {
    return ["container-house", "standard-house", "garden-house", "cabin-house", "concrete-house"].includes(
        categoryIdOrSlug
    );
}

export function isKoshkCategory(categoryIdOrSlug: string): boolean {
    return categoryIdOrSlug === "koshk";
}

export function isHouseProduct(product: VerifiedProduct): boolean {
    return isHouseCategory(product.categoryId);
}

export function isKoshkProduct(product: VerifiedProduct): boolean {
    return isKoshkCategory(product.categoryId);
}

/* Helper query functions */
export function getProductBySlug(slug: string): VerifiedProduct | undefined {
    return verifiedProducts.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(categoryIdOrSlug: string): VerifiedProduct[] {
    return verifiedProducts.filter(
        (p) => p.categoryId === categoryIdOrSlug || p.categoryTitleKu === categoryIdOrSlug
    );
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
    return productCategories.find((c) => c.slug === slug || c.id === slug);
}

export function getRelatedProducts(currentSlug: string, count: number = 3): VerifiedProduct[] {
    const current = getProductBySlug(currentSlug);
    return verifiedProducts
        .filter((p) => p.slug !== currentSlug && p.id !== currentSlug)
        .sort((a, b) => {
            if (current && a.categoryId === current.categoryId && b.categoryId !== current.categoryId) {
                return -1;
            }
            if (current && b.categoryId === current.categoryId && a.categoryId !== current.categoryId) {
                return 1;
            }
            return 0;
        })
        .slice(0, count);
}

/* ------------------------------------------------------------------ */
/* Language-aware selectors                                            */
/* Pages read through these instead of touching *Ku / *En / *Ar fields */
/* directly. Arabic resolves to its own copy, falling back to English  */
/* for any field still awaiting translation.                           */
/* ------------------------------------------------------------------ */

export interface LocalizedCategory {
    title: string;
    shortDescription: string;
    description: string;
}

export function localizeCategory(category: ProductCategory, language: Language): LocalizedCategory {
    if (language === "ar") {
        return {
            title: category.titleAr ?? category.titleEn,
            shortDescription: category.shortDescriptionAr ?? category.shortDescriptionEn,
            description: category.descriptionAr ?? category.descriptionEn,
        };
    }
    const isKu = language === "ku";
    return {
        title: isKu ? category.titleKu : category.titleEn,
        shortDescription: isKu ? category.shortDescriptionKu : category.shortDescriptionEn,
        description: isKu ? category.descriptionKu : category.descriptionEn,
    };
}

export interface LocalizedProduct {
    title: string;
    categoryTitle: string;
    productFamily: string | null;
    modelCode: string | null;
    shortDescription: string;
    description: string | null;
    dimensions: string | null;
    levels: string | null;
    materials: string | null;
    applications: string[];
    features: { title: string; desc: string }[];
    ctaPrimary: string;
    ctaSecondary: string;
}

export function localizeProduct(product: VerifiedProduct, language: Language): LocalizedProduct {
    if (language === "ar") {
        const category = getCategoryBySlug(product.categoryId);
        return {
            title: product.titleAr ?? product.titleEn,
            categoryTitle: category?.titleAr ?? category?.titleEn ?? product.categoryTitleKu,
            productFamily: product.productFamilyAr ?? product.productFamilyEn ?? null,
            modelCode: product.modelCodeAr ?? product.modelCodeEn ?? product.modelCode ?? null,
            shortDescription: product.shortDescriptionAr ?? product.shortDescriptionEn,
            description: product.descriptionAr ?? product.descriptionEn ?? null,
            dimensions: product.dimensionsEn ?? product.dimensionsRaw,
            levels: product.levelsAr ?? product.levelsEn ?? product.levels ?? null,
            materials: product.materialsAr ?? product.materialsEn ?? null,
            applications: product.applicationsAr ?? product.applicationsEn ?? [],
            features: product.featuresAr ?? product.featuresEn ?? [],
            ctaPrimary: product.cta.primaryAr ?? product.cta.primaryEn,
            ctaSecondary: product.cta.secondaryAr ?? product.cta.secondaryEn,
        };
    }
    const isKu = language === "ku";
    const category = getCategoryBySlug(product.categoryId);
    return {
        title: isKu ? product.titleKu : product.titleEn,
        categoryTitle: isKu
            ? product.categoryTitleKu
            : category?.titleEn ?? product.categoryTitleKu,
        productFamily: isKu
            ? product.productFamilyKu ?? null
            : product.productFamilyEn ?? null,
        modelCode: isKu
            ? product.modelCode ?? null
            : product.modelCodeEn ?? product.modelCode ?? null,
        shortDescription: isKu ? product.shortDescriptionKu : product.shortDescriptionEn,
        description: isKu ? product.descriptionKu : product.descriptionEn ?? null,
        dimensions: isKu
            ? product.dimensionsRaw
            : product.dimensionsEn ?? product.dimensionsRaw,
        levels: isKu
            ? product.levels ?? null
            : product.levelsEn ?? product.levels ?? null,
        materials: isKu
            ? product.materials ?? null
            : product.materialsEn ?? null,
        applications: isKu ? product.applicationsKu : product.applicationsEn ?? [],
        features: isKu ? product.featuresKu : product.featuresEn ?? [],
        ctaPrimary: isKu ? product.cta.primaryKu : product.cta.primaryEn,
        ctaSecondary: isKu ? product.cta.secondaryKu : product.cta.secondaryEn,
    };
}

export function localizeColorLabel(color: ProductColorOption, language: Language): string {
    if (language === "ar") {
        return color.labelAr ?? color.labelEn;
    }
    return language === "ku" ? color.labelKu : color.labelEn;
}
