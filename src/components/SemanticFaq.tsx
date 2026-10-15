import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface SemanticFaqProps {
  faqs?: FaqItem[];
  className?: string;
}

const DEFAULT_FAQS: FaqItem[] = [
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
];

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

export function SemanticFaq({ faqs = DEFAULT_FAQS, className = "" }: SemanticFaqProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqSchema = generateFaqSchema(faqs);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className={`semantic-faq-section ${className}`} aria-label="پرسیارەکانی زۆر باو">
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-4 sm:mb-6">
          پرسیارە باوەکان
        </h2>

        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => {
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
                  <h3 className="font-body text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-semibold text-gray-900 pr-2 sm:pr-3 md:pr-4">
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
