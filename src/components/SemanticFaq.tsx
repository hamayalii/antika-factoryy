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
    question: "ئایا خانووە کەپسول و کۆنتەینەرەکان بەرگەی سەرمای زستان و گەرمای هاوین دەگرن؟",
    answer: "بەڵێ، کارگەی ئەنتیکا بەرزترین ئاستی عەزلی گەرمی و سەرمی (Thermal Insulation) بەکاردەهێنێت کە گونجاوە بۆ کەشوهەوای عێراق و کوردستان.",
  },
  {
    question: "کاتی خەمڵێندراو بۆ دروستکردن و گەیاندنی کۆشک یان خانوویەک چەندە؟",
    answer: "بەپێی جۆر و قەبارەی پڕۆژەکە دەگۆڕێت، بەڵام بەگشتی لە نێوان ١٥ بۆ ٤٥ ڕۆژدا ئامادە دەکرێت و دەگەیەنرێتە شوێنی مەبەست.",
  },
  {
    question: "ئایا دەتوانرێت دیزاینی کۆشک و خانووەکان بەپێی خواست گۆڕانکارییان تێدا بکرێت؟",
    answer: "بەڵێ، ئێمە خزمەتگوزاری دیزاینی تایبەت پێشکەش دەکەین کە تێیدا کڕیار دەتوانێت نەخشە، ڕەنگ، و کەرەستەی بەکارهاتوو هەڵبژێرێت.",
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
        <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mb-6">
          پرسیارە باوەکان
        </h2>

        <div className="space-y-3">
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
                className="group border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 select-none">
                  <h3 className="font-body text-[15px] sm:text-[16px] font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 text-brand transition-transform duration-200 group-open:rotate-180">
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </span>
                </summary>

                <div className="px-5 pb-4 pt-0">
                  <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
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
