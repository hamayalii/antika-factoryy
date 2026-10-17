import { Info } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface VerificationPlaceholderProps {
  message?: string;
  className?: string;
}

export function VerificationPlaceholder({
  message,
  className = "",
}: VerificationPlaceholderProps) {
  const { t } = useLanguage();
  return (
    <div
      className={`rounded-2xl border border-gray-200/80 bg-gray-50/90 p-6 sm:p-8 text-center ${className}`}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3.5 text-gray-600 justify-center">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
          <Info className="h-5 w-5" />
        </span>
        <p className="text-[14.5px] font-medium leading-relaxed">
          {message ?? t("product.verificationPlaceholder")}
        </p>
      </div>
    </div>
  );
}
