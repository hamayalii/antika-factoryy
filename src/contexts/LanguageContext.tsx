import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LANGUAGES,
  getLanguageMeta,
  type Language,
  type LanguageOption,
} from "../i18n/languages";
import { dictionaries, type TranslationKey } from "../i18n/translations";

const STORAGE_KEY = "antika-language";

export { LANGUAGES, type Language, type LanguageOption };

function isLanguage(value: string | null): value is Language {
  return value === "ku" || value === "en" || value === "ar";
}

function resolveInitialLanguage(): Language {
  if (typeof window === "undefined") return "ku";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(saved) ? saved : "ku";
  } catch {
    // Storage can throw in hardened/private browsing modes — Kurdish default.
    return "ku";
  }
}

interface LanguageContextValue {
  /** Active language code. */
  language: Language;
  /** Writing direction of the active language ("rtl" for ku/ar, "ltr" for en). */
  dir: "rtl" | "ltr";
  isRtl: boolean;
  /** Metadata (label, nativeName, dir, htmlLang) for the active language. */
  meta: LanguageOption;
  setLanguage: (language: Language) => void;
  /**
   * Dictionary lookup with `active → en → ku` fallback and `{var}`
   * interpolation, e.g. `t("product.imageAlt", { title })`.
   */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(resolveInitialLanguage);

  const meta = useMemo(() => getLanguageMeta(language), [language]);
  const dir = meta.dir;
  const isRtl = dir === "rtl";

  // Reflect the active language on <html> so the whole document (including
  // scrollbars, form controls and assistive tech) switches direction.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = meta.htmlLang;
    root.dir = meta.dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Persisting is a nice-to-have; never let it break the render.
    }
  }, [language, meta]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const activeDict = dictionaries[language] as
        | Partial<Record<TranslationKey, string>>
        | undefined;
      let text = activeDict?.[key] ?? dictionaries.en[key] ?? dictionaries.ku[key] ?? key;

      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.split(`{${name}}`).join(String(value));
        }
      }
      return text;
    },
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, dir, isRtl, meta, setLanguage, t }),
    [language, dir, isRtl, meta, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>.");
  }
  return context;
}
