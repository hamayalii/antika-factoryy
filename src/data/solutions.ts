import type { Language } from "../i18n/languages";

export interface SolutionFeature {
  title: string;
  desc: string;
}

export interface Solution {
  id: string;
  title: string;
  kurdishTitle: string;
  titleEn: string;
  titleAr: string;
  shortTitleEn: string;
  shortTitleAr: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  heroImage: string;
  images: string[];
  features: SolutionFeature[];
  featuresEn: SolutionFeature[];
  featuresAr: SolutionFeature[];
  suitableForKu: string[];
  suitableForEn: string[];
  suitableForAr: string[];
  benefitsKu: string[];
  benefitsEn: string[];
  benefitsAr: string[];
  recommendedCategorySlugs: string[];
  recommendedProductSlugs: string[];
}

export const solutions: Solution[] = [
  {
    id: "office",
    title: "کەپسولی ئۆفیس",
    kurdishTitle: "نوسینگە",
    titleEn: "Office capsule",
    titleAr: "كبسولة مكتبية",
    shortTitleEn: "Office",
    shortTitleAr: "مكتب",
    description: "ئۆفیسێکی سەربەخۆ و ئاسوودە بە تەواوی پێداویستییەکانەوە، بۆ زیادکردنی بەرهەمداری و تەرکیزی کارکردن. دیزاینێکی مۆدێرن کە گونجاوە بۆ کارکردن لە هەر شوێنێک.",
    descriptionEn: "A self-contained, comfortable office with every requirement, designed to boost productivity and focus. A modern design suitable for working anywhere.",
    descriptionAr: "مكتب مستقل ومريح بكامل التجهيزات، لزيادة الإنتاجية والتركيز في العمل. تصميم عصري يلائم العمل في أي مكان.",
    heroImage: "/images/capsule-4.jpg",
    images: ["/images/capsule-4.jpg", "/images/capsule-2.jpg"],
    features: [
      {
        title: "دیزاینی سەردەمیانە",
        desc: "ژینگەیەکی مۆدێرن کە ئیلهامبەخشە بۆ کارکردن و بەرهەمداری.",
      },
      {
        title: "بێدەنگی و ئارامی",
        desc: "دیوارەکان بە تەکنەلۆژیای دژە دەنگ دروستکراون بۆ ڕێگریکردن لە ژاوەژاو.",
      },
      {
        title: "ڕووناکی سروشتی",
        desc: "پەنجەرەی گەورە بۆ هێنانی ڕووناکی سروشتی بۆ ناوەوە.",
      },
      {
        title: "ئاسان لە گواستنەوە",
        desc: "دەتوانیت ئۆفیسەکەت بۆ هەر شوێنێک کە دەتەوێت بگوێزیتەوە.",
      }
    ],
    featuresEn: [
      {
        title: "Modern design",
        desc: "A modern environment that inspires work and productivity.",
      },
      {
        title: "Quiet and calm",
        desc: "The walls are built with soundproofing technology to block out noise.",
      },
      {
        title: "Natural light",
        desc: "Large windows bring natural light inside.",
      },
      {
        title: "Easy to relocate",
        desc: "You can move your office wherever you want.",
      }
    ],
    featuresAr: [
      {
        title: "تصميم عصري",
        desc: "بيئة عصرية ملهِمة للعمل والإنتاجية.",
      },
      {
        title: "الهدوء والسكينة",
        desc: "الجدران مبنية بتقنية عزل صوتي لمنع الضوضاء.",
      },
      {
        title: "إضاءة طبيعية",
        desc: "نوافذ كبيرة تجلب الإضاءة الطبيعية إلى الداخل.",
      },
      {
        title: "سهل النقل",
        desc: "يمكنك نقل مكتبك إلى أي مكان تريده.",
      }
    ],
    suitableForKu: [
      "کۆمپانیا و خاوەنکارەکان کە پێویستیان بە فەزای کاری سەربەخۆیە",
      "بەڕێوەبەران و ئەندازیارانی سەر پڕۆژە و کارگەکان",
      "ئەو کەسانەی لە ماڵەوە یان لە باخچەکەیاندا کار دەکەن (Work from Home)",
      "کلینیک و ژووری ڕاوێژکاری و پەیوەندییە تایبەتەکان"
    ],
    suitableForEn: [
      "Companies and business owners who need an independent workspace",
      "Managers and engineers on projects and at factories",
      "Those who work from home or in their garden (Work from Home)",
      "Clinics, consultation rooms and private meeting spaces"
    ],
    suitableForAr: [
      "الشركات وأصحاب الأعمال الذين يحتاجون إلى مساحة عمل مستقلة",
      "المديرون والمهندسون في المشاريع والمعامل",
      "من يعملون من المنزل أو في حديقتهم (Work from Home)",
      "العيادات وغرف الاستشارات ومساحات الاجتماعات الخاصة"
    ],
    benefitsKu: [
      "ژینگەیەکی تەواو بێدەنگ (Acoustic) بەبێ تێکچوونی تەرکیزی کارکردن",
      "جێبەجێکردنی خێرا لە چەند کاتژمێرێکدا بەبێ پێویستی بە بیناسازی قورس",
      "توانای گواستنەوە بۆ هەر شوێنێکی تر لە داهاتوودا",
      "دابینکردنی تەواوی ژێرخانی کارەبا، تەبرید و ڕووناکی مۆدێرن"
    ],
    benefitsEn: [
      "A fully quiet (acoustic) environment without disruption to focus",
      "Fast installation within hours, with no heavy construction needed",
      "Can be relocated to any other location in the future",
      "Complete infrastructure: electricity, cooling and modern lighting"
    ],
    benefitsAr: [
      "بيئة هادئة تماماً (عزل صوتي) دون تشتيت التركيز",
      "تركيب سريع خلال ساعات دون الحاجة إلى أعمال بناء ثقيلة",
      "إمكانية النقل إلى أي مكان آخر مستقبلاً",
      "بنية تحتية كاملة: كهرباء وتبريد وإضاءة عصرية"
    ],
    recommendedCategorySlugs: ["am", "as"],
    recommendedProductSlugs: ["am-base", "am-a", "as-service-capsule", "acoustic-capsule"]
  },
  {
    id: "granny-flat",
    title: "کەپسولی کۆفی برەیک",
    kurdishTitle: "ماڵی بچووک",
    titleEn: "Coffee Break capsule",
    titleAr: "كبسولة استراحة القهوة",
    shortTitleEn: "Small house",
    shortTitleAr: "منزل صغير",
    description: "شوێنی نیشتەجێبوونی سەربەخۆ و تەواو کە هەموو پێداویستییەکانی ژیانێکی ئاسوودە لەخۆدەگرێت. گونجاوە بۆ میوان، یان وەک ماڵێکی بچووک لە باخچەکەتدا.",
    descriptionEn: "A self-contained, fully equipped living space that covers every requirement of a comfortable life. Suitable for guests, or as a small house in your garden.",
    descriptionAr: "مساحة سكنية مستقلة وكاملة تضم جميع متطلبات الحياة المريحة. مناسبة للضيوف أو كمنزل صغير في حديقتك.",
    heroImage: "/images/capsule-1.jpg",
    images: ["/images/capsule-1.jpg", "/images/work-capsule.png"],
    features: [
      {
        title: "ژیانێکی ئاسوودە",
        desc: "هەموو پێداویستییە سەرەکییەکانی وەک چێشتخانە و گەرماوی تێدایە.",
      },
      {
        title: "کەرەستەی کوالێتی بەرز",
        desc: "بەکارهێنانی باشترین کەرەستە بۆ دڵنیابوون لە تەمەنی درێژ و مانەوەی.",
      },
      {
        title: "دیزاینی زیرەک",
        desc: "بەکارهێنانی تەواوی بۆشاییەکان بە شێوازێکی زیرەکانە.",
      },
      {
        title: "خێرا لە دروستکردن",
        desc: "لە ماوەیەکی کورتدا دروست دەکرێت و ئامادەیە بۆ ژیان.",
      }
    ],
    featuresEn: [
      {
        title: "Comfortable living",
        desc: "It includes all the main necessities such as a kitchen and a bathroom.",
      },
      {
        title: "High-quality materials",
        desc: "Using the finest materials to ensure a long lifespan and durability.",
      },
      {
        title: "Smart design",
        desc: "Making full use of the spaces in a clever way.",
      },
      {
        title: "Fast to build",
        desc: "It is built in a short time and ready to live in.",
      }
    ],
    featuresAr: [
      {
        title: "حياة مريحة",
        desc: "تضم جميع الاحتياجات الأساسية كالمطبخ والحمام.",
      },
      {
        title: "مواد عالية الجودة",
        desc: "استخدام أفضل المواد لضمان عمر طويل ومتانة.",
      },
      {
        title: "تصميم ذكي",
        desc: "استغلال كامل للمساحات بطريقة ذكية.",
      },
      {
        title: "سريع التنفيذ",
        desc: "يُبنى في وقت قصير ويكون جاهزاً للسكن.",
      }
    ],
    suitableForKu: [
      "خاوەن ڤێلا و باخچەکان بۆ شوێنی حەوانەوە و پێشوازی لە میوان",
      "پڕۆژە گەشتیارییەکان، هاوینەهەوار و ڕێزۆرتە شاخاوییەکان",
      "کارمەندانی نیشتەجێی سەر کێڵگە و پڕۆژە تایبەتەکان",
      "خێزانەکان بۆ ژوور یان ماڵێکی مۆدێرنی سەربەخۆ"
    ],
    suitableForEn: [
      "Villa and garden owners, as a rest area and guest reception space",
      "Tourism projects, summer resorts and mountain resorts",
      "Staff residents on farms and private projects",
      "Families, as an independent modern room or house"
    ],
    suitableForAr: [
      "أصحاب الفيلات والحدائق، كمساحة استراحة واستقبال للضيوف",
      "المشاريع السياحية والمصايف والمنتجعات الجبلية",
      "العاملون المقيمون في المزارع والمشاريع الخاصة",
      "العائلات، كغرفة أو منزل عصري مستقل"
    ],
    benefitsKu: [
      "دابینکردنی تەواوی پێداویستییەکانی ژیان (چێشتخانە، گەرماو، ژووری خەوتن)",
      "عازلی تەواوی گەرمی و ساردی بۆ بەرگەگرتنی کەشوهەوای چوار وەرزەی کوردستان",
      "تێچووی زۆر گونجاوتر بەراورد بە دروستکردنی باڵەخانەی ئاسایی",
      "کەرەستەی ئەندازیاریی کوالێتی بەرز بە تەمەنی درێژ و دژە ژەنگ"
    ],
    benefitsEn: [
      "All life necessities provided (kitchen, bathroom, bedroom)",
      "Full heat and cold insulation to withstand Kurdistan's four-season climate",
      "Much more affordable compared with building an ordinary structure",
      "High-quality engineering materials with a long lifespan, resistant to rust"
    ],
    benefitsAr: [
      "توفير جميع مستلزمات الحياة (مطبخ، حمام، غرفة نوم)",
      "عزل كامل للحرارة والبرودة لتحمّل مناخ كردستان في الفصول الأربعة",
      "تكلفة أنسب بكثير مقارنة ببناء مبنى تقليدي",
      "مواد هندسية عالية الجودة بعمر طويل ومقاومة للصدأ"
    ],
    recommendedCategorySlugs: ["al", "cabin-house", "garden-house"],
    recommendedProductSlugs: ["al-2", "al-4", "al-6", "al-8", "al-d", "kl", "pl"]
  },
  {
    id: "pos-office",
    title: "کەپسولی خاڵی فرۆشتن",
    kurdishTitle: "خاڵی فرۆشتن",
    titleEn: "Point-of-sale capsule",
    titleAr: "كبسولة نقطة البيع",
    shortTitleEn: "Point of sale",
    shortTitleAr: "نقطة بيع",
    description: "کەپسولێکی تایبەت بۆ خاڵی فرۆشتن، سەرتاشخانە و شوێنی بازرگانی بە دیزاینێکی سەرنجڕاکێش و مۆدێرن. ژینگەیەکی پێشکەوتوو بۆ پێشکەشکردنی باشترین خزمەتگوزاری بە کڕیارەکانت.",
    descriptionEn: "A dedicated capsule for points of sale, barbershops and commercial spaces, with an attractive, modern design. An advanced environment for offering the best service to your customers.",
    descriptionAr: "كبسولة مخصصة لنقاط البيع وصالونات الحلاقة والمساحات التجارية، بتصميم عصري وجذاب. بيئة متطورة لتقديم أفضل خدمة لعملائك.",
    heroImage: "/images/capsule-3.jpg",
    images: ["/images/capsule-3.jpg", "/images/capsule-5.jpg"],
    features: [
      {
        title: "ڕاکێشانی سەرنج",
        desc: "دیزاینە جیاوازەکەی وا دەکات کڕیاری زیاتر سەرنجیان ڕابکێشرێت.",
      },
      {
        title: "پێداویستی تەواو",
        desc: "گونجاوە بۆ دانانی هەموو کەلوپەلێکی سەرتاشخانە و جوانکاری.",
      },
      {
        title: "سیستەمی هەواگۆڕکێ",
        desc: "سیستەمێکی پێشکەوتووی هەواگۆڕکێ بۆ پاراستنی هەوایەکی پاک.",
      },
      {
        title: "ئامادە بۆ کارکردن",
        desc: "بە تەواوی ئامادەکراوە بە کارەبا و ئاو بۆ دەستپێکردنی ڕاستەوخۆ.",
      }
    ],
    featuresEn: [
      {
        title: "Eye-catching",
        desc: "Its distinctive design draws the attention of more customers.",
      },
      {
        title: "Fully equipped",
        desc: "Suitable for fitting all barbershop and beauty equipment.",
      },
      {
        title: "Ventilation system",
        desc: "An advanced ventilation system to keep the air clean.",
      },
      {
        title: "Ready to operate",
        desc: "Fully prepared with electricity and water for immediate use.",
      }
    ],
    featuresAr: [
      {
        title: "جذب الانتباه",
        desc: "تصميمه المميز يجذب انتباه المزيد من العملاء.",
      },
      {
        title: "تجهيز كامل",
        desc: "مناسبة لتركيب جميع معدات صالونات الحلاقة والتجميل.",
      },
      {
        title: "نظام تهوية",
        desc: "نظام تهوية متطور للحفاظ على هواء نقي.",
      },
      {
        title: "جاهزة للتشغيل",
        desc: "مجهزة بالكامل بالكهرباء والماء للبدء فوراً.",
      }
    ],
    suitableForKu: [
      "خاوەن براند و بازرگانان بۆ خاڵی فرۆشتنی ڕاستەوخۆ (POS / Kiosk)",
      "سەرتاشخانە، ساڵۆن، یان ناوەندەکانی خزمەتگوزاریی جوانکاری",
      "دەروازەی پاسەوانی، ئاسایش و پێشوازی لە ناوەندە گەورەکاندا",
      "خاڵی بلیتفرۆشتن و دابەشکردنی زانیاری لە شوێنە گشتییەکان"
    ],
    suitableForEn: [
      "Brand owners and traders for direct points of sale (POS / Kiosk)",
      "Barbershops, salons, or beauty service centres",
      "Guard gates, security and reception points in large centres",
      "Ticket sales and information points in public places"
    ],
    suitableForAr: [
      "أصحاب العلامات التجارية والتجار لنقاط البيع المباشر (POS / Kiosk)",
      "صالونات الحلاقة أو مراكز خدمات التجميل",
      "بوابات الحراسة والأمن والاستقبال في المراكز الكبيرة",
      "نقاط بيع التذاكر وتوزيع المعلومات في الأماكن العامة"
    ],
    benefitsKu: [
      "سەرنجڕاکێشانی کڕیاران بەهۆی دیمەنی داهێنەرانەی کەپسول",
      "توانای دانان لە هەموو شوێنێکی گشتی، شەقام و پێش باڵەخانەکان",
      "ئامادەبوونی خێرا بە سیستەمی پێشکەوتووی کارەبا و ئاو و هەواگۆڕکێ",
      "سەلامەت و پارێزراو لە بەرامبەر کەشوهەوا و دزی"
    ],
    benefitsEn: [
      "Attracting customers with the capsule's innovative look",
      "Can be placed in any public space, street or in front of buildings",
      "Fast readiness with advanced electricity, water and ventilation systems",
      "Safe and protected against weather and theft"
    ],
    benefitsAr: [
      "جذب العملاء بفضل المظهر الابتكاري للكبسولة",
      "إمكانية وضعها في أي مكان عام أو شارع أو أمام المباني",
      "تجهيز سريع بأنظمة كهرباء وماء وتهوية متطورة",
      "آمنة ومحمية من الأحوال الجوية والسرقة"
    ],
    recommendedCategorySlugs: ["am", "container-house", "as"],
    recommendedProductSlugs: ["am-base", "am-p", "cl", "as-service-capsule"]
  },
  {
    id: "restaurants-cafes",
    title: "کەپسولی کافێ",
    kurdishTitle: "ڕێستورانت و کافێ",
    titleEn: "Café capsule",
    titleAr: "كبسولة مقهى",
    shortTitleEn: "Restaurant & café",
    shortTitleAr: "مطعم ومقهى",
    description: "گۆشەیەکی سەرنجڕاکێش و مۆدێرن بۆ کافێ و چێشتخانەکان. شوێنێکی تایبەت کە ئەزموونێکی لەبیرنەکراو بۆ میوانەکانت دروست دەکات.",
    descriptionEn: "An attractive, modern corner for cafés and restaurants. A distinctive space that creates an unforgettable experience for your guests.",
    descriptionAr: "زاوية جذابة وعصرية للمقاهي والمطاعم. مساحة مميزة تصنع تجربة لا تُنسى لضيوفك.",
    heroImage: "/images/capsule-5.jpg",
    images: ["/images/capsule-5.jpg", "/images/capsule-2.jpg"],
    features: [
      {
        title: "دیزاینی بازرگانی",
        desc: "گونجاوە بۆ نمایشی بەرهەم و ڕاکێشانی سەرنجی کڕیار.",
      },
      {
        title: "کۆمەڵایەتی",
        desc: "ژینگەیەکی کراوە و سەرنجڕاکێش بۆ کۆبوونەوە و گفتوگۆ.",
      },
      {
        title: "فرە مەبەست",
        desc: "دەتوانرێت وەک کافێ، چێشتخانە، یان خاڵی فرۆشتن بەکاربهێنرێت.",
      },
      {
        title: "تایبەتمەندکردن",
        desc: "دەتوانین بەپێی داواکاری و براندەکەت گۆڕانکاری تێدا بکەین.",
      }
    ],
    featuresEn: [
      {
        title: "Commercial design",
        desc: "Suitable for product display and drawing customer attention.",
      },
      {
        title: "Social",
        desc: "An open, inviting environment for gatherings and conversation.",
      },
      {
        title: "Multi-purpose",
        desc: "It can be used as a café, a restaurant, or a point of sale.",
      },
      {
        title: "Customisation",
        desc: "We can tailor it to your request and your brand.",
      }
    ],
    featuresAr: [
      {
        title: "تصميم تجاري",
        desc: "مناسب لعرض المنتجات وجذب انتباه العملاء.",
      },
      {
        title: "اجتماعي",
        desc: "بيئة مفتوحة وجاذبة للالتقاء والحديث.",
      },
      {
        title: "متعدد الاستخدامات",
        desc: "يمكن استخدامها كمقهى أو مطعم أو نقطة بيع.",
      },
      {
        title: "تخصيص",
        desc: "يمكننا تعديلها حسب طلبك وعلامتك التجارية.",
      }
    ],
    suitableForKu: [
      "خاوەن کافێ، کیۆسکی قاوە و شەربەت و شیرینی",
      "ڕێستۆرانت و فاست فوود لە شوێنە گەشتیاری و سەیرانگاکان",
      "هۆتێل و یانە وەرزشییەکان بۆ گۆشەی خواردنەوەی سەر کراوە",
      "بۆنە، فێستیڤاڵە کاتییەکان یان پارک و باخچە گشتییەکان"
    ],
    suitableForEn: [
      "Café owners, coffee, juice and dessert kiosks",
      "Restaurants and fast food in tourist and leisure areas",
      "Hotels and sports clubs for open-air refreshment corners",
      "Events, seasonal festivals, or public parks and gardens"
    ],
    suitableForAr: [
      "أصحاب المقاهي وأكشاك القهوة والعصائر والحلويات",
      "المطاعم والوجبات السريعة في المناطق السياحية والترفيهية",
      "الفنادق والأندية الرياضية لزوايا المشروبات في الهواء الطلق",
      "المناسبات والمهرجانات الموسمية أو الحدائق العامة"
    ],
    benefitsKu: [
      "دروستکردنی پێگەیەکی جیاواز و ناسراو بۆ براندەکەت لە هەر شوێنێکدا",
      "فەزای تەندروست و ستاندارد بۆ ئامادەکردنی خۆراک و پێشکەشکردنی خواردنەوە",
      "گواستنەوەی ئاسان بەپێی وەرز و پڕفرۆشترین شوێنەکان",
      "کەمکردنەوەی بەرچاوی تێچووی سەرەتایی بەراورد بە کرێ و نۆژەنکردنەوەی دووکان"
    ],
    benefitsEn: [
      "Builds a distinctive, recognisable presence for your brand anywhere",
      "A healthy, standard space for preparing food and serving drinks",
      "Easy to relocate depending on the season and the busiest locations",
      "A notable reduction in upfront cost compared with renting and renovating a shop"
    ],
    benefitsAr: [
      "إنشاء حضور مميز وواضح لعلامتك التجارية في أي مكان",
      "مساحة صحية ومعيارية لإعداد الطعام وتقديم المشروبات",
      "سهولة النقل حسب الموسم والمواقع الأكثر ازدحاماً",
      "خفض واضح في التكلفة الأولية مقارنة بإيجار المتجر وتجديده"
    ],
    recommendedCategorySlugs: ["am", "container-house"],
    recommendedProductSlugs: ["am-base", "am-k", "cl"]
  }
];

/** Solution fields resolved for the active UI language. */
export interface LocalizedSolution {
  title: string;
  shortTitle: string;
  description: string;
  features: SolutionFeature[];
  suitableFor: string[];
  benefits: string[];
}

export function localizeSolution(solution: Solution, language: Language): LocalizedSolution {
  if (language === "en") {
    return {
      title: solution.titleEn,
      shortTitle: solution.shortTitleEn,
      description: solution.descriptionEn,
      features: solution.featuresEn,
      suitableFor: solution.suitableForEn,
      benefits: solution.benefitsEn,
    };
  }

  if (language === "ar") {
    return {
      title: solution.titleAr || solution.titleEn,
      shortTitle: solution.shortTitleAr || solution.shortTitleEn,
      description: solution.descriptionAr || solution.descriptionEn,
      features: solution.featuresAr.length ? solution.featuresAr : solution.featuresEn,
      suitableFor: solution.suitableForAr.length ? solution.suitableForAr : solution.suitableForEn,
      benefits: solution.benefitsAr.length ? solution.benefitsAr : solution.benefitsEn,
    };
  }

  return {
    title: solution.title,
    shortTitle: solution.kurdishTitle,
    description: solution.description,
    features: solution.features,
    suitableFor: solution.suitableForKu,
    benefits: solution.benefitsKu,
  };
}
