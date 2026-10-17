/**
 * Single source of truth for the languages the site ships.
 * Kept dependency-free so both the React context and the data layer
 * (productData.ts) can share the `Language` union without cycles.
 */

export type Language = "ku" | "en" | "ar";

export interface LanguageOption {
  code: Language;
  /** Short chip label shown in the switcher. */
  label: string;
  /** Endonym shown in tooltips. */
  nativeName: string;
  dir: "rtl" | "ltr";
  /** Value applied to <html lang>. */
  htmlLang: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "ku", label: "KU", nativeName: "کوردی", dir: "rtl", htmlLang: "ckb" },
  { code: "en", label: "EN", nativeName: "English", dir: "ltr", htmlLang: "en" },
  { code: "ar", label: "AR", nativeName: "العربية", dir: "rtl", htmlLang: "ar" },
];

export function getLanguageMeta(language: Language): LanguageOption {
  return LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
}
