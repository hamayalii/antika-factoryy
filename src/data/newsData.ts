import type { Language } from "../i18n/languages";

export interface NewsArticle {
  id: string;
  slug: string;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  excerptKu: string;
  excerptEn: string;
  excerptAr: string;
  contentKu: string[];
  contentEn: string[];
  contentAr: string[];
  highlightItemsKu: { icon: string; title: string; desc: string }[];
  highlightItemsEn: { icon: string; title: string; desc: string }[];
  highlightItemsAr: { icon: string; title: string; desc: string }[];
  conclusionKu: string;
  conclusionEn: string;
  conclusionAr: string;
  date: string;
  readTime: string;
  readMinutes: number;
  category: string;
  categoryKu: string;
  categoryEn: string;
  categoryAr: string;
  image: string;
  videoUrl?: string;
  tagsKu: string[];
  tagsEn: string[];
  tagsAr: string[];
  overlayCaptionKu?: string;
  overlayCaptionEn?: string;
  overlayCaptionAr?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "coffee-break-unit-2026",
    slug: "coffee-break-unit-pharmaceutical",
    titleKu: "یەکەیەکی کۆفی برەیک بۆ کۆمپانیای دەرمان",
    titleEn: "A Coffee Break unit for a pharmaceutical company",
    titleAr: "مشروع وتنفيذ",
    excerptKu: "لە بیرۆکەیەکەوە بۆ جێبەجێکردن: دروستکردنی یەکەیەکی 'کۆفی برێک' و ڕووکاری ڕیکلامیی گەڕۆک(گواستراوە) بۆ کۆمپانیایەکی دەرمان",
    excerptEn: "From idea to execution: building a 'Coffee Break' unit and a mobile advertising facade for a pharmaceutical company",
    excerptAr: "من الفكرة إلى التنفيذ: إنشاء وحدة 'استراحة قهوة' وواجهة إعلانية متنقلة لشركة أدوية",
    contentKu: [
      "لە کارگەی ئەنتیکە بۆ کارە ئەندازیاری و هونەرییەکان، ئێمە باوەڕمان وایە کە هەر پڕۆژەیەک لە دروستبوونی بیرۆکەیەکەوە دەست پێدەکات، دواتر دەبێتە دیزاینێکی ئەندازیاریی ورد، و لە کۆتاییدا دەبێتە واقیعێکی بەرجەستە. لەم ڕوانگەیەوە توانیمان پڕۆژەیەکی تایبەت و دەگمەن بۆ یەکێک لە کۆمپانیا پێشەنگەکانی دەرمان بە سەرکەوتوویی جێبەجێ بکەین.",
      "ئەم پڕۆژەیە پێکهاتووە لە جێبەجێکردنی یەکەیەکی 'کۆفی برێک' (Coffee Break) لەگەڵ ڕووکارێکی ڕیکلامیی سەرنجڕاکێش کە بە شێوازێک دیزاین کراوە تا زۆرترین نزیکی لە شێوە ڕاستەقینەکەی هەبێت، لە هەمان کاتدا خاوەنی تایبەتمەندیی جووڵان و ئاسانیی گواستنەوە بێت."
    ],
    contentEn: [
      "At Antika Factory for engineering and artistic works, we believe that every project starts with an idea, then becomes a precise engineering design, and finally turns into a tangible reality. From this perspective, we successfully delivered a special and unique project for one of the leading pharmaceutical companies.",
      "This project consisted of building a 'Coffee Break' unit together with an eye-catching advertising facade designed to resemble its real-life form as closely as possible, while also being mobile and easy to relocate."
    ],
    contentAr: [
      "في مصنع أنتيكا للأعمال الهندسية والفنية، نؤمن بأن كل مشروع يبدأ من فكرة، ثم يصبح تصميماً هندسياً دقيقاً، وأخيراً يتحول إلى واقع ملموس. من هذه المنظور، تمكنا من تنفيذ مشروع خاص وفريد لإحدى الشركات الرائدة في مجال الأدوية بنجاح.",
      "يتكون هذا المشروع من تنفيذ وحدة 'استراحة قهوة' (Coffee Break) مع واجهة إعلانية جذابة صممت بشكل يحاكي الشكل الحقيقي قدر الإمكان، مع إمكانية الحركة والنقل بسهولة."
    ],
    highlightItemsKu: [
      {
        icon: "home",
        title: "دیزاینی زۆر واقعی و ناوازە",
        desc: "بە بەکارهێنانی کەرەستەی کوالێتی بەرز و وردەکاریی ئەندازیاری، ڕووکارێک دروست کراوە کە بە تەواوەتی گوزارشت لە براند و ناسنامەی کۆمپانیاکە دەکات و سەرنجی ئامادەبووان ڕادەکێشێت"
      },
      {
        icon: "lamp",
        title: "ئاسانی لە گواستنەوە و دەستکاریکردن (Mobile & Flexible)",
        desc: "یەکەکە بە جۆرێک دیزاین کراوە کە لەسەر شێوازی گەڕۆک(گواستراوە) بێت، تاوەکو کۆمپانیاکە بتوانێت بە بێ هیچ کێشەیەک لە شوێنێکەوە بۆ شوێنێکی تری بگوازێتەوە"
      },
      {
        icon: "shield",
        title: "دامەزراندنی خێرا لە هەر شوێنێک (Multi-Location Setup)",
        desc: "ئەم تایبەتمەندیە (Multi-functional) ڕێگە دەدات کە بە خێرایی لە ناو هەر پێشانگایەک، شوێنی کارکردنی مەیدانی، یان لە حەوشە و ناوخۆی سەرەکیی کۆمپانیاکەدا بپێورێت (دابمەزرێنرێت) و ئامادەی بەکارهێنان بێت"
      }
    ],
    highlightItemsEn: [
      {
        icon: "home",
        title: "A highly realistic, unique design",
        desc: "Using high-quality materials and precise engineering, a facade was created that fully expresses the company's brand and identity and draws the attention of visitors"
      },
      {
        icon: "lamp",
        title: "Easy to move and modify (Mobile & Flexible)",
        desc: "The unit is designed to be mobile, so the company can move it from place to place without any difficulty"
      },
      {
        icon: "shield",
        title: "Fast setup anywhere (Multi-Location Setup)",
        desc: "This multi-functional feature allows it to be installed quickly in any exhibition, field workspace, or within the company's main premises, ready for use"
      }
    ],
    highlightItemsAr: [
      {
        icon: "home",
        title: "تصميم واقعي وفريد",
        desc: "باستخدام مواد عالية الجودة وتفاصيل هندسية دقيقة، تم إنشاء واجهة تعبر تماماً عن هوية الشركة وتجذب انتباه الحضور"
      },
      {
        icon: "lamp",
        title: "سهولة النقل والتعديل (Mobile & Flexible)",
        desc: "صممت الوحدة لتكون متنقلة، بحيث يمكن للشركة نقلها من مكان لآخر دون أي مشاكل"
      },
      {
        icon: "shield",
        title: "التركيب السريع في أي مكان (Multi-Location Setup)",
        desc: "تتيح هذه الميزة التركيب السريع في أي معرض أو مكان عمل ميداني أو داخل مقر الشركة الأساسي لتكون جاهزة للاستخدام"
      }
    ],
    conclusionKu: "ئەم کارە نموونەیەکی بێپێشینەی توانای تیمی ئەنتیکەیە لە گۆڕینی بیرۆکە ئاڵۆزەکان بۆ دیزاین و ڕادەستکردنی بە بەرزترین کوالێتی. ئێمە شانازی دەکەین کە دەستبارین لە بەهێزکردنی براند و ڕوکاری بازرگانیی هاوبەشەکانمان",
    conclusionEn: "This work is an outstanding example of the Antika team's ability to turn complex ideas into design and delivery at the highest quality. We are proud to support our partners in strengthening their brand and commercial facades.",
    conclusionAr: "هذا العمل هو نموذج فريد لقدرة فريق أنتيكا على تحويل الأفكار المعقدة إلى تصميمات وتنفيذ بأعلى جودة. نفتخر بدعم شركائنا في تعزيز علامتهم التجارية والواجهات التجارية",
    date: "2026",
    readTime: "2 خولەک خوێندنەوە",
    readMinutes: 2,
    category: "پڕۆژە و جێبەجێکردن",
    categoryKu: "پڕۆژە و جێبەجێکردن",
    categoryEn: "Projects & execution",
    categoryAr: "مشروع وتنفيذ",
    image: "/images/darman-1.webp",
    videoUrl: "https://www.facebook.com/share/r/1DkKF1ao9S/",
    tagsKu: ["ئەنتیکە_فاکتۆری", "کارە_ئەندازیارییەکان", "کۆفی_برێک", "دیزاین_و_جێبەجێکردن", "ڕووکاری_ڕیکلامی"],
    tagsEn: ["Antika_Factory", "Engineering_works", "Coffee_Break", "Design_and_execution", "Advertising_facade"],
    tagsAr: ["أنتيكا_فاكتوري", "أعمال_هندسية", "استراحة_قهوة", "تصميم_وتنفيذ", "واجهة_إعلانية"],
    overlayCaptionKu: "جێبەجێکردنی یەکەی کۆفی برێک بۆ کۆمپانیای دەرمان",
    overlayCaptionEn: "Delivering a Coffee Break unit for a pharmaceutical company",
    overlayCaptionAr: "تنفيذ وحدة استراحة قهوة لشركة أدوية"
  },
  {
    id: "invest-expo-2025",
    slug: "invest-expo-2025-erbil",
    titleKu: "بەشدارییەکی سەرکەوتووانەمان لە پێشانگای نێودەوڵەتی هەولێر (Invest Expo 2025)",
    titleEn: "Our successful participation in the Erbil International Fair (Invest Expo 2025)",
    titleAr: "مشاركة ناجحة ومتميزة في معرض أربيل الدولي للاستثمار (Invest Expo 2025)",
    excerptKu: "خۆشحاڵین کە بە سەرکەوتوویی بەشداریمان کرد لە پێشانگای نێودەوڵەتی وەبەرهێنان لە هەولێر (Invest Expo 2025)، کە یەکێکە لە گرنگترین ئیڤێنتە ئابووری و بازرگانییەکانی ناوچەکە.",
    excerptEn: "We are pleased to have successfully taken part in the International Investment Expo in Erbil (Invest Expo 2025), one of the most important economic and commercial events in the region.",
    excerptAr: "يسعدنا أن نعلن عن مشاركتنا الفعالة والناجحة في معرض أربيل الدولي للاستثمار (Invest Expo 2025)، والذي يعد من أهم الفعاليات الاقتصادية والتجارية في المنطقة.",
    contentKu: [
      "خۆشحاڵین کە بە سەرکەوتوویی بەشداریمان کرد لە پێشانگای نێودەوڵەتی وەبەرهێنان لە هەولێر (Invest Expo 2025)، کە یەکێکە لە گرنگترین ئیڤێنتە ئابووری و بازرگانییەکانی ناوچەکە. ئەم پێشانگایە دەرفەتێکی گرنگ بوو بۆ خستنەڕووی دوایین داهێنان و تواناکانمان بە ڕووی وەبەرهێنەران و سەردانیکەراندا.",
      "لە کۆشکەکەماندا، بە شانازییەوە بەشێک لە پێشکەوتووترین کارەکانمان نمایش کرد، کە پێکهاتبوون لە بەرهەمە مۆدێرن و ئەندازیارییەکانمان."
    ],
    contentEn: [
      "We are pleased to have successfully taken part in the International Investment Expo in Erbil (Invest Expo 2025), one of the most important economic and commercial events in the region. The fair was an important opportunity to present our latest innovations and capabilities to investors and visitors.",
      "In our pavilion, we proudly showcased a selection of our most advanced works, which included our modern, engineered products."
    ],
    contentAr: [
      "يسعدنا أن نعلن عن مشاركتنا الفعالة والناجحة في معرض أربيل الدولي للاستثمار (Invest Expo 2025)، والذي يعد من أهم الفعاليات الاقتصادية والتجارية في المنطقة. كانت هذه المشاركة فرصة استثنائية لعرض أحدث ابتكاراتنا وإمكاناتنا أمام المستثمرين والزوار الكرام.",
      "لقد تشرفنا في جناحنا بعرض مجموعة من أبرز أعمالنا المتميزة، والتي شملت:"
    ],
    highlightItemsKu: [
      {
        icon: "home",
        title: "خانووی ئامادەکراو",
        desc: "بە دیزاینی سەردەمیانە و بەکارهێنانی باشترین کەرەستە کە گونجاون بۆ هەموو پێداویستییەک و مسۆگەری خێرایی و کوالێتی دەکەن لە جێبەجێکردندا."
      },
      {
        icon: "lamp",
        title: "ستوونی ڕووناکی",
        desc: "بە کوالێتییەکی بەرز و شێوازێکی ئەندازەیی ناوازە کە خزمەت بە پرۆژە ستراتیژییەکانی ڕووناککردنەوە و جوانکاری ڕێگاوبانەکان دەکەن."
      },
      {
        icon: "shield",
        title: "دەرگای پۆڵاین",
        desc: "کە باشترین پێوەرەکانی سەلامەتی و پتەوی لەخۆدەگرێت بۆ مسۆگەرکردنی پارێزراوی و جوانی لە یەک کاتدا."
      }
    ],
    highlightItemsEn: [
      {
        icon: "home",
        title: "Ready-made houses",
        desc: "Designed with the latest modern styles and made from the finest materials to suit every need and guarantee speed and quality in execution."
      },
      {
        icon: "lamp",
        title: "Lighting poles",
        desc: "Of high quality and distinguished engineering design, serving strategic lighting projects and streetscape beautification."
      },
      {
        icon: "shield",
        title: "Steel doors",
        desc: "Combining the highest standards of safety and strength to guarantee both protection and beauty at once."
      }
    ],
    highlightItemsAr: [
      {
        icon: "home",
        title: "البيوت الجاهزة",
        desc: "المصممة بأحدث الطرازات العصرية والمصنعة من أفضل المواد لتلائم كافة الاحتياجات وتضمن السرعة والجودة في التنفيذ."
      },
      {
        icon: "lamp",
        title: "أعمدة الإنارة",
        desc: "المتميزة بالمتانة والتصميم الهندسي الدقيق لخدمة مشاريع الإنارة الاستراتيجية وتزيين الطرق."
      },
      {
        icon: "shield",
        title: "الأبواب الفولاذية",
        desc: "التي تجمع بين أعلى معايير الأمان، القوة، والتصميم الأنيق لضمان الحماية المطلقة."
      }
    ],
    conclusionKu: "پێشوازییەکی گەرممان لێکرا لەلایەن ئامادەبووانەوە، کە ئەمەش پاڵنەرێکی بەهێزە بۆمان. ئێمە هەمیشە لە هەوڵی بەردەوامداین بۆ هێنانەدی نوێگەری و دابینکردنی باشترین و بەرزترین کوالێتی، تاوەکو خزمەتی زیاتری وڵاتەکەمان بکەین و بەشدارێکی کارا بین لە ئاوەدانکردنەوەیدا.",
    conclusionEn: "We received a warm welcome from the visitors, which is a strong motivation for us. We are always striving to innovate and deliver the best and highest quality, so we can serve our country even more and be an active contributor in its reconstruction.",
    conclusionAr: "لقد أسعدنا الإقبال الكبير والتفاعل الإيجابي من قبل الحضور. ونؤكد مجدداً أننا في سعي دائم ومستمر لتقديم الأفضل، وتوفير أعلى معايير الجودة للمساهمة بشكل فعال في بناء وتطوير البنية التحتية لبلدنا.",
    date: "2025",
    readTime: "3 خولەک خوێندنەوە",
    readMinutes: 3,
    category: "پێشانگا و چالاکییەکان",
    categoryKu: "پێشانگا و ئیڤێنت",
    categoryEn: "Exhibitions & events",
    categoryAr: "معارض وفعاليات",
    image: "/images/invest-expo-2025.webp",
    videoUrl: "https://www.facebook.com/share/r/1DkKF1ao9S/",
    tagsKu: ["پێشانگای نێودەوڵەتی هەولێر", "Invest Expo 2025", "خانووی ئامادەکراو", "ستوونی ڕووناکی", "دەرگای پۆڵاین"],
    tagsEn: ["Erbil_International_Fair", "Invest Expo 2025", "Ready-made_houses", "Lighting_poles", "Steel_doors"],
    tagsAr: ["معرض أربيل الدولي", "Invest Expo 2025", "بيوت جاهزة", "أعمدة إنارة", "أبواب فولاذية"],
    overlayCaptionKu: "بەشداری تیمی کارگەی ئەنتیکا لە پێشانگای Invest Expo 2025",
    overlayCaptionEn: "The Antika Factory team at Invest Expo 2025",
    overlayCaptionAr: "مشاركة فريق مصنع أنتيكا في معرض Invest Expo 2025"
  }
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((n) => n.slug === slug || n.id === slug);
}

/** Article fields resolved for the active UI language (ku → en → ar fallback for AR copy). */
export interface LocalizedNewsArticle {
  title: string;
  excerpt: string;
  content: string[];
  highlightItems: { icon: string; title: string; desc: string }[];
  conclusion: string;
  category: string;
  date: string;
  readMinutes: number;
  tags: string[];
  overlayCaption?: string;
}

export function localizeNewsArticle(
  article: NewsArticle,
  language: Language
): LocalizedNewsArticle {
  const base = {
    date: article.date,
    readMinutes: article.readMinutes,
  };

  if (language === "en") {
    return {
      ...base,
      title: article.titleEn,
      excerpt: article.excerptEn,
      content: article.contentEn,
      highlightItems: article.highlightItemsEn,
      conclusion: article.conclusionEn,
      category: article.categoryEn,
      tags: article.tagsEn,
      overlayCaption: article.overlayCaptionEn,
    };
  }

  if (language === "ar") {
    return {
      ...base,
      title: article.titleAr || article.titleEn,
      excerpt: article.excerptAr || article.excerptEn,
      content: article.contentAr.length ? article.contentAr : article.contentEn,
      highlightItems: article.highlightItemsAr.length
        ? article.highlightItemsAr
        : article.highlightItemsEn,
      conclusion: article.conclusionAr || article.conclusionEn,
      category: article.categoryAr || article.categoryEn,
      tags: article.tagsAr.length ? article.tagsAr : article.tagsEn,
      overlayCaption: article.overlayCaptionAr || article.overlayCaptionEn,
    };
  }

  return {
    ...base,
    title: article.titleKu,
    excerpt: article.excerptKu,
    content: article.contentKu,
    highlightItems: article.highlightItemsKu,
    conclusion: article.conclusionKu,
    category: article.categoryKu,
    tags: article.tagsKu,
    overlayCaption: article.overlayCaptionKu,
  };
}
