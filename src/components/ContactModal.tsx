import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Phone } from "lucide-react";

const PHONE_NUMBERS = [
  {
    display: "0770 124 2724",
    international: "+964 770 124 2724",
    waDigits: "9647701242724",
  },
  {
    display: "0750 155 9445",
    international: "+964 750 155 9445",
    waDigits: "9647501559445",
  },
  {
    display: "0780 410 8381",
    international: "+964 780 410 8381",
    waDigits: "9647804108381",
  },
];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

export function ContactModal({ isOpen, onClose, triggerRef }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Lock body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = ""; // No scrollbar width compensation needed for this design
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Move focus to first focusable element
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Return focus to trigger when modal closes
      if (triggerRef?.current) {
        triggerRef.current.focus();
      } else if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[440px] animate-modal-in rounded-3xl bg-white p-6 shadow-xl"
        style={{
          animation: "modalFadeIn 200ms ease-out",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          aria-label="داخستن"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
            <Phone className="h-6 w-6 text-brand" />
          </div>
          <h2
            id="contact-modal-title"
            className="font-display text-xl font-bold text-gray-900"
          >
            پەیوەندیمان پێوە بکە
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            یەکێک لە ژمارەکان هەڵبژێرە
          </p>
        </div>

        {/* Phone Numbers */}
        <div className="space-y-3">
          {PHONE_NUMBERS.map((phone) => (
            <div
              key={phone.display}
              className="rounded-2xl bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="mb-3 text-center">
                <span
                  dir="ltr"
                  className="font-display text-lg font-semibold text-gray-900 tabular-nums"
                >
                  {phone.display}
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${phone.waDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 min-h-[44px]"
                  aria-label={`واتساپ بۆ ${phone.display}`}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>واتساپ</span>
                </a>
                <a
                  href={`tel:${phone.international}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 min-h-[44px]"
                  aria-label={`پەیوەندی بە ${phone.display}`}
                >
                  <Phone className="h-4 w-4" />
                  <span>پەیوەندی</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
