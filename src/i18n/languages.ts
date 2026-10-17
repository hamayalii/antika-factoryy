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
  /**
   * false → no dedicated copy exists yet; all lookups fall back to English
   * (UI strings) and to `*En` product fields. Flip to true when the
   * Arabic translation batch lands.
   */
  ready: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "ku", label: "KU", nativeName: "کوردی", dir: "rtl", htmlLang: "ckb", ready: true },
  { code: "en", label: "EN", nativeName: "English", dir: "ltr", htmlLang: "en", ready: true },
  { code: "ar", label: "AR", nativeName: "العربية", dir: "rtl", htmlLang: "ar", ready: false },
];

export function getLanguageMeta(language: Language): LanguageOption {
  return LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
}
