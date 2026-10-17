import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import type { Language } from "../i18n/languages";

interface FaqItem {
  question: string;
  answer: string;
}

interface SemanticFaqProps {
  faqs?: FaqItem[];
  className?: string;
}

const DEFAULT_FAQS: Record<Language, FaqItem[]> = {
  ku: [
    {
      question: "ئایا ئەم کەپسول و کۆنتەینەرانە بەرگەی کەشوهەوای سەختی عێراق و گەرمای هاوین دەگرن؟",
      answer: "بەڵێ، بە دڵنیاییەوە. هەموو بەرهەمەکانمان بە سیستەمێکی عەزلی گەرمی و سەرمای ١٠ سانتیمەتری (10cm Thermal Insulation) و جامی دەبڵی پانۆراما پۆشراون. ئەمە وادەکات بە تەواوی بەرگەی پلەی گەرمای لە -١٠ پلەی ژێر سفرەوە تا +٥٠ پلەی سەدی بگرن، و تێچووی کارەبای فێنککەرەوەکانت زۆر کەم دەکەنەوە.",
    },
    {
      question: "لە ڕووی ئەندازیاری و سەلامەتییەوە، بەرگەگرتنیان بۆ ڕەشەبا و بومەلەرزە چۆنە؟",
      answer: "پێکهاتەی سەرەکی کۆشکەکان لە ئاسنی قورسی جۆری (ST-37) دروستکراوە. لە ڕووی ئەندازیارییەوە تاقیکراونەتەوە کە بەرگەی بومەلەرزە تا ئاستی ٧.٠ ڕێختەر، و ڕەشەبای زۆر بەهێز (ئاستی ١١) دەگرن. هەروەها دیوارەکان بڕوانامەی A2ی دژە ئاگریان هەیە بۆ بەرزترین ئاستی سەلامەتی.",
    },
    {
      question: "کاتی خەمڵێندراو بۆ دروستکردن و گەیاندنی کۆشک یان خانوویەک چەندە؟",
      answer: "بەپێی جۆر و قەبارەی پڕۆژەکە، پرۆسەی دروستکردن و گەیاندن لە نێوان ١٥ بۆ ٤٥ ڕۆژ دەخایەنێت. ئەم ماوەیە تەواوی قۆناغەکانی ڕێککەوتن، دروستکردن لە کارگە، پشکنینی جۆرایەتی، و گواستنەوە بۆ شوێنی مەبەست لەخۆ دەگرێت.",
    },
    {
      question: "ئەگەر بمهەوێت شوێنی پڕۆژەکەم یان ماڵەکەم بگۆڕم، ئایا دەتوانرێت خانووەکە بگوێزرێتەوە؟",
      answer: "بەڵێ، یەکێک لە گەورەترین سوودەکانی بەرهەمە پیشەسازیەکانمان (Prefab) ئەوەیە کە بە ئاسانی دەتوانرێت لە ڕێگەی کرێن یان فۆڕکلیفتەوە هەڵبگیرێن و بگوێزرێنەوە بۆ هەر شوێنێکی نوێ بەبێ ئەوەی هیچ زیانێک بە پێکهاتە و دیزاینەکەیان بگات.",
    },
    {
      question: "ئایا دەتوانرێت دیزاین و ڕەهەندەکانی کۆشکەکە بەپێی ویستی خۆم بگۆڕدرێت؟",
      answer: "بەڵێ، کارگەی ئەنتیکا خزمەتگوزاری دیزاینی تایبەت (Custom Design) پێشکەش دەکات. کڕیار دەتوانێت ڕەهەندەکان، ڕەنگی دەرەوە و ناوەوە، جۆری کەرەستەکان، و تەنانەت زیادکردنی قفڵی زیرەک (Smart Lock) بەپێی پێداویستییەکانی خۆی یان بازرگانییەکەی هەڵبژێرێت.",
    },
  ],
  en: [
    {
      question: "Can these capsules and containers withstand Iraq's harsh climate and summer heat?",
      answer: "Yes, absolutely. All our products are covered with a 10-centimetre thermal insulation system (10cm Thermal Insulation) and double-glazed panoramic glass. This allows them to fully withstand temperatures from -10 below zero up to +50 degrees Celsius, and greatly reduces the running cost of your cooling systems.",
    },
    {
      question: "From an engineering and safety standpoint, how do they withstand storms and earthquakes?",
      answer: "The main structure of the kiosks is built from heavy-duty ST-37 steel. Engineering tests have shown they withstand earthquakes up to magnitude 7.0 on the Richter scale and very strong storms (level 11). The walls also carry an A2 fire-resistance certificate for the highest level of safety.",
    },
    {
      question: "What is the estimated time to build and deliver a kiosk or a house?",
      answer: "Depending on the type and size of the project, the building and delivery process takes between 15 and 45 days. This period covers all stages: the agreement, production in the factory, quality inspection, and transport to the destination.",
    },
    {
      question: "If I want to change the location of my project or home, can the house be relocated?",
      answer: "Yes — one of the greatest advantages of our prefabricated products (Prefab) is that they can easily be lifted with a crane or a forklift and moved to any new location, without any damage to their structure or design.",
    },
    {
      question: "Can the design and dimensions of the kiosk be changed to my wishes?",
      answer: "Yes, Antika Factory offers a custom design service (Custom Design). The customer can choose the dimensions, exterior and interior colours, the type of materials, and even add a smart lock (Smart Lock) according to their personal or business requirements.",
    },
  ],
  ar: [
    {
      question: "هل تتحمّل هذه الكبسولات والحاويات مناخ العراق القاسي وحرارة الصيف؟",
      answer: "نعم، وبكل تأكيد. جميع منتجاتنا مغطاة بنظام عزل حراري بسمك ١٠ سنتيمترات (10cm Thermal Insulation) وزجاج بانورامي مزدوج. وهذا يجعلها تتحمّل تماماً درجات حرارة من -١٠ تحت الصفر حتى +٥٠ درجة مئوية، ويقلل كثيراً من فاتورة الكهرباء لأجهزة التبريد.",
    },
    {
      question: "من الناحية الهندسية والأمنية، كيف تتحمّل العواصف والزلازل؟",
      answer: "الهيكل الرئيسي للأكشاك مصنوع من الحديد القوي نوع (ST-37). وقد اختُبرت هندسياً لتتحمّل الزلازل حتى درجة ٧.٠ على مقياس ريختر، والعواصف شديدة القوة (المستوى ١١). كما تمتلك الجدران شهادة مقاومة حريق A2 لأعلى مستويات السلامة.",
    },
    {
      question: "ما المدة المتوقعة لتصنيع وتسليم كشك أو منزل؟",
      answer: "حسب نوع المشروع وحجمه، تستغرق عملية التصنيع والتسليم ما بين ١٥ و٤٥ يوماً. وتشمل هذه المدة جميع المراحل: الاتفاق، والتصنيع في المصنع، وفحص الجودة، والنقل إلى الموقع المطلوب.",
    },
    {
      question: "إذا أردت تغيير موقع مشروعي أو منزلي، هل يمكن نقل المنزل؟",
      answer: "نعم، من أكبر مزايا منتجاتنا الجاهزة (Prefab) أنه يمكن رفعها بسهولة بواسطة الرافعة (كرين) أو الرافعة الشوكية ونقلها إلى أي موقع جديد دون أن يلحق أي ضرر بهيكلها أو تصميمها.",
    },
    {
      question: "هل يمكن تغيير تصميم الكشك وأبعاده حسب رغبتي؟",
      answer: "نعم، يقدّم مصنع أنتيكا خدمة التصميم الخاص (Custom Design). يمكن للعميل اختيار الأبعاد والألوان الخارجية والداخلية وأنواع المواد، وحتى إضافة قفل ذكي (Smart Lock) بحسب احتياجاته الشخصية أو التجارية.",
    },
  ],
};

/**
 * Generate FAQPage JSON-LD Schema
 */
function generateFaqSchema(faqs: FaqItem[]) {
  const mainEntity = faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function SemanticFaq({ faqs, className = "" }: SemanticFaqProps) {
  const { language, t } = useLanguage();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const activeFaqs = faqs ?? DEFAULT_FAQS[language];
  const faqSchema = generateFaqSchema(activeFaqs);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className={`semantic-faq-section ${className}`} aria-label={t("faq.aria")}>
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-4 sm:mb-6">
          {t("faq.title")}
        </h2>

        <div className="space-y-2 sm:space-y-3">
          {activeFaqs.map((faq, index) => {
            const isOpen = openItems.has(index);

            return (
              <details
                key={index}
                open={isOpen}
                onToggle={(e) => {
                  // Sync React state with native details element
                  const details = e.currentTarget;
                  if (details.open) {
                    setOpenItems((prev) => new Set(prev).add(index));
                  } else {
                    setOpenItems((prev) => {
                      const next = new Set(prev);
                      next.delete(index);
                      return next;
                    });
                  }
                }}
                className="group border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <summary className="flex items-center justify-between cursor-pointer px-3 sm:px-4 md:px-5 py-3 sm:py-4 select-none">
                  <h3 className="font-body text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-semibold text-gray-900 pe-2 sm:pe-3 md:pe-4">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 text-brand transition-transform duration-200 group-open:rotate-180">
                    {isOpen ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </span>
                </summary>

                <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 pt-0">
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </>
  );
}
