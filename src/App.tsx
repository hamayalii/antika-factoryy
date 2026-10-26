import { useEffect, useRef, useState, useCallback, useTransition, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { BrowserRouter, Routes, Route, Link, useLocation, useSearchParams } from "react-router-dom";

// Route-level code splitting: O(1) initial load through lazy imports
const CapsulesPage = lazy(() => import("./pages/CapsulesPage").then(m => ({ default: m.CapsulesPage })));
const HousesPage = lazy(() => import("./pages/HousesPage").then(m => ({ default: m.HousesPage })));
const CategoryOverviewPage = lazy(() => import("./pages/CategoryOverviewPage").then(m => ({ default: m.CategoryOverviewPage })));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage").then(m => ({ default: m.ProductDetailPage })));
const LightingPage = lazy(() => import("./pages/LightingPage").then(m => ({ default: m.LightingPage })));
const ShelvesPage = lazy(() => import("./pages/ShelvesPage").then(m => ({ default: m.ShelvesPage })));
const KoshkPage = lazy(() => import("./pages/KoshkPage").then(m => ({ default: m.KoshkPage })));
const AllProductsPage = lazy(() => import("./pages/AllProductsPage").then(m => ({ default: m.AllProductsPage })));
const NewsPage = lazy(() => import("./pages/NewsPage").then(m => ({ default: m.NewsPage })));
const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage").then(m => ({ default: m.NewsDetailPage })));
const GalleryPage = lazy(() => import("./pages/GalleryPage").then(m => ({ default: m.GalleryPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
// The 23rd.dev interactive typewriter machine (~68KB single file). Its chunk
// is requested ONLY when the footer's message modal opens — never on initial
// page load — and the SVG engine itself is then built lazily on top of that.
const TypewriterMachine = lazy(() => import("./components/ui/typewriter-machine").then(m => ({ default: m.Typewriter })));
// EasyUI intro loader (pulls in framer-motion). Deliberately lazy: the chunk
// is fetched ONLY when the hero image misses the 600ms grace window, so fast
// connections never download it and never see the overlay.
const IntroLoader = lazy(() => import("./components/ui/intro-loader").then(m => ({ default: m.IntroLoader })));
import { TrustMarquee } from "./components/TrustMarquee";
import { SpecialFeatures } from "./components/SpecialFeatures";
import { FactoryInfoSection } from "./components/FactoryInfoSection";
import { ContactModal } from "./components/ContactModal";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ContactModalProvider, useContactModal } from "./contexts/ContactModalContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import type { TranslationKey } from "./i18n/translations";
import { SPECIAL_WORKS_ITEMS, type SpecialWorkItem } from "./data/specialWorksData";
import { SelectiveHydration } from "./components/SelectiveHydration";
import { Typewriter } from "./components/ui/Typewriter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  X,
} from "lucide-react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.5 8.8v11H3.2v-11h3.3ZM4.8 3.5a1.9 1.9 0 1 1 0 3.9 1.9 1.9 0 0 1 0-3.9ZM20.5 13.4v6.4h-3.3v-6c0-1.5-.6-2.4-2-2.4-1.1 0-1.7.7-2 1.4-.1.3-.1.6-.1 1v5.9H9.8v-11h3.3v1.5c.4-.7 1.2-1.7 3-1.7 2.2 0 4.4 1.5 4.4 5Z" />
  </svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ---------------------------------- LoadingSpinner ---------------------------------- */
// CSS-only minimal spinner to prevent layout shifts during chunk loading
function LoadingSpinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-brand"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

/* ---------------------------------- Reveal ---------------------------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- Logo ---------------------------------- */
function Logo({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  location,
}: {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
  location?: ReturnType<typeof useLocation>;
}) {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobileMenuOpen && setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    if (location && location.pathname === "/") {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <a
      href="/"
      onClick={handleLogoClick}
      className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
    >
      <span className="relative grid h-12 w-12 shrink-0 place-items-center sm:h-16 sm:w-16">
        <img
          src="/images/logo.png"
          alt="ANTIKA FACTORY"
          className="h-10 w-10 object-contain sm:h-14 sm:w-14"
          style={{ mixBlendMode: 'multiply' }}
          width="56"
          height="56"
          fetchPriority="high"
          loading="eager"
          sizes="(max-width: 640px) 40px, 56px"
        />
      </span>

    </a>
  );
}

/* ---------------------------------- Header ---------------------------------- */
const NAV: { id: string; labelKey: TranslationKey; path?: string; isDropdown?: boolean }[] = [
  { id: "home", labelKey: "nav.home", path: "/" },
  { id: "capsules", labelKey: "nav.capsules", isDropdown: true },
  { id: "houses", labelKey: "nav.houses", isDropdown: true },
  { id: "cabins", labelKey: "nav.cabins", isDropdown: true },
  { id: "specialWorks", labelKey: "nav.specialWorks", isDropdown: true },
  { id: "koshk", labelKey: "nav.koshk", isDropdown: true },
  { id: "artworks", labelKey: "nav.artworks", isDropdown: true },
  { id: "workImages", labelKey: "nav.workImages", path: "/gallery", isDropdown: false },
  { id: "news", labelKey: "nav.news", path: "/news", isDropdown: false },
  { id: "about", labelKey: "nav.about", path: "/about" },
];

// Navbar gradient color mapping (RTL order: right to left)
const NAV_GRADIENT_COLORS = [
  { id: 'home', color: '#FFFFFF' },
  { id: 'capsules', color: '#FEEFE5' },
  { id: 'houses', color: '#FEEFE5' },
  { id: 'cabins', color: '#DBE9F6' },
  { id: 'specialWorks', color: '#F6EFF4' },
  { id: 'koshk', color: '#FBF2DE' },
  { id: 'artworks', color: '#F0F3FD' },
  { id: 'workImages', color: '#FFFDFE' },
  { id: 'news', color: '#F9F0EE' },
  { id: 'about', color: '#EDE6F2' },
];

// Generate gradient stops for horizontal navbar (to left for RTL)
const generateNavbarGradient = () => {
  const colors = NAV_GRADIENT_COLORS;
  const stops: string[] = [];
  const step = 100 / (colors.length - 1);

  colors.forEach((item, index) => {
    const position = index * step;
    stops.push(`${item.color} ${position}%`);
  });

  return `linear-gradient(to left, ${stops.join(', ')})`;
};

const CAPSULE_ITEMS = [
  { id: "al", labelKey: "menu.al", path: "/products/al", isComingSoon: false },
  { id: "am", labelKey: "menu.am", path: "/products/am", isComingSoon: false },
  { id: "as", labelKey: "menu.as", path: "/products/as", isComingSoon: false },
] as const;

const HOUSE_ITEMS = [
  { id: "container-house", labelKey: "menu.container-house", path: "/products/cl", isComingSoon: false },
  { id: "cabin-house", labelKey: "menu.cabin-house", path: "/products/kl", isComingSoon: true },
] as const;

const CABIN_ITEMS = [
  { id: "standard-house", labelKey: "menu.standard-house", path: "/products/zl", isComingSoon: true },
  { id: "garden-house", labelKey: "menu.garden-house", path: "/products/pl", isComingSoon: true },
  { id: "concrete-house", labelKey: "menu.concrete-house", path: "/products/concrete-house-model", isComingSoon: true },
] as const;

const KOSHK_ITEMS = [
  { id: "ka-b", labelKey: "menu.koshk.ka-b", path: "/products/ka-b", isComingSoon: false },
  { id: "ka-p", labelKey: "menu.koshk.ka-p", path: "/products/ka-p", isComingSoon: false },
  { id: "ka-g", labelKey: "menu.koshk.ka-g", path: "/products/ka-g", isComingSoon: false },
  { id: "ka-a", labelKey: "menu.koshk.ka-a", path: "/products/ka-a", isComingSoon: false },
  { id: "am-a2", labelKey: "menu.koshk.am-a2", path: "/products/am-a2", isComingSoon: false },
  { id: "am-m", labelKey: "menu.koshk.am-m", path: "/products/am-m", isComingSoon: false },
  { id: "am-h", labelKey: "menu.koshk.am-h", path: "/products/am-h", isComingSoon: false },
  { id: "am-s", labelKey: "menu.koshk.am-s", path: "/products/am-s", isComingSoon: false },
  { id: "am-k", labelKey: "menu.koshk.am-k", path: "/products/am-k", isComingSoon: false },
  { id: "am-r", labelKey: "menu.koshk.am-r", path: "/products/am-r", isComingSoon: false },
] as const;

const ARTWORK_ITEMS = [
  { id: "lighting", labelKey: "menu.lighting", path: "/products/lighting", isComingSoon: false },
  { id: "shelves", labelKey: "menu.shelves", path: "/products/shelves", isComingSoon: false },
] as const;

function Header({
  active,
  onNav,
}: {
  active: string;
  onNav: (id: string) => void;
}) {
  const { openContactModal } = useContactModal();
  const { t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const scrollPosition = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isOverlay = isHome && !scrolled && !open;

  const [isSpecialWorksInView, setIsSpecialWorksInView] = useState(false);

  // Dedicated scroll-spy observer: active ONLY while special-works is in the viewport/active zone
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsSpecialWorksInView(false);
      return;
    }

    let obs: IntersectionObserver | null = null;
    const observeElement = () => {
      const el = document.getElementById("special-works");
      if (!el) return;

      obs = new IntersectionObserver(
        ([entry]) => {
          setIsSpecialWorksInView(entry.isIntersecting);
        },
        {
          rootMargin: "-20% 0px -35% 0px",
          threshold: 0.1,
        }
      );
      obs.observe(el);
    };

    const timer = setTimeout(observeElement, 50);

    return () => {
      clearTimeout(timer);
      if (obs) obs.disconnect();
    };
  }, [location.pathname]);

  const isSpecialWorksRouteActive = SPECIAL_WORKS_ITEMS.some((item) =>
    location.pathname === `/solutions/${item.id}` ||
    location.pathname === `/products/${item.id}` ||
    (location.pathname === "/" && location.hash === `#${item.id}`)
  );

  const isSpecialWorksActive = (
    (location.pathname === "/" && isSpecialWorksInView) ||
    isSpecialWorksRouteActive
  );

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      scrollPosition.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, scrollPosition.current);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!open || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    setTimeout(() => firstElement?.focus(), 100);

    document.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!open && !openDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current && !menuButtonRef.current.contains(e.target as Node)) {
        setOpen(false);
        setMobileDropdowns({});
      }
      if (openDropdown) {
        const dropdownEl = dropdownRefs.current[openDropdown];
        if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, openDropdown]);

  // Handle cross-page hash scroll
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          onNav(id);
        }
      }, 100);
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onNav("home");
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ${isOverlay
          ? "bg-black/25 text-white backdrop-blur-[2px]"
          : "text-gray-900"
          }`}
        style={{
          paddingTop: 'max(5px, env(safe-area-inset-top))',
          background: isOverlay ? undefined : generateNavbarGradient()
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo RIGHT (first in RTL) */}
          <Logo
            isMobileMenuOpen={open}
            setIsMobileMenuOpen={setOpen}
            location={location}
          />

          {/* Nav center */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              n.isDropdown ? (
                <div
                  key={n.id}
                  className="relative group/nav"
                  ref={(el) => { dropdownRefs.current[n.id] = el; }}
                  onMouseEnter={() => setOpenDropdown(n.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(openDropdown === n.id ? null : n.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpenDropdown(n.id);
                        setTimeout(() => {
                          const dropdownEl = dropdownRefs.current[n.id];
                          const firstLink = dropdownEl?.querySelector('a') as HTMLElement | null;
                          firstLink?.focus();
                        }, 50);
                      } else if (e.key === 'Escape') {
                        setOpenDropdown(null);
                      }
                    }}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === n.id}
                    aria-controls={`dropdown-${n.id}`}
                    className={`nav-link flex items-center gap-1 text-[14px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-lg ${(n.id === 'capsules' && (location.pathname.includes('/products/al') || location.pathname.includes('/products/am') || location.pathname.includes('/products/as'))) ||
                      (n.id === 'houses' && (location.pathname.includes('/products/cl') || location.pathname.includes('/products/kl') || location.pathname.includes('/products/container-house'))) ||
                      (n.id === 'cabins' && (location.pathname.includes('/products/zl') || location.pathname.includes('/products/pl') || location.pathname.includes('/products/concrete-house-model') || location.pathname.includes('/products/standard-house') || location.pathname.includes('/products/garden-house') || location.pathname.includes('/products/cabin-house') || location.pathname.includes('/products/concrete-house'))) ||
                      (n.id === 'koshk' && (location.pathname.includes('/products/koshk') || location.pathname.includes('/products/ka-') || location.pathname.includes('/products/am-'))) ||
                      (n.id === 'specialWorks' && isSpecialWorksActive) ||
                      (n.id === 'artworks' && (location.pathname.includes('/products/lighting') || location.pathname.includes('/products/shelves')))
                      ? "active"
                      : isOverlay ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {t(n.labelKey)}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === n.id ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    id={`dropdown-${n.id}`}
                    role="region"
                    aria-label={t(n.labelKey)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        e.preventDefault();
                        setOpenDropdown(null);
                        const btn = dropdownRefs.current[n.id]?.querySelector('button') as HTMLElement | null;
                        btn?.focus();
                      }
                    }}
                    className={`absolute top-full start-0 rtl:right-0 rtl:left-auto ltr:left-0 ltr:right-auto pt-2 w-56 transition-all duration-200 ${openDropdown === n.id ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}
                  >
                    <div className="rounded-xl shadow-xl ring-1 ring-black/5 py-2" style={{ backgroundColor: NAV_GRADIENT_COLORS.find(c => c.id === n.id)?.color || '#FFFFFF' }}>
                      {n.id === 'capsules' && CAPSULE_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors focus-visible:bg-gray-50 focus-visible:text-brand focus:outline-none"
                        >
                          {t(item.labelKey)}
                          {item.isComingSoon && <span className="ms-2 text-[11px] text-gray-500">- {t("common.comingSoonShort")}</span>}
                        </Link>
                      ))}
                      {n.id === 'houses' && HOUSE_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors focus-visible:bg-gray-50 focus-visible:text-brand focus:outline-none"
                        >
                          {t(item.labelKey)}
                          {item.isComingSoon && <span className="ms-2 text-[11px] text-gray-500">- {t("common.comingSoonShort")}</span>}
                        </Link>
                      ))}
                      {n.id === 'artworks' && ARTWORK_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors focus-visible:bg-gray-50 focus-visible:text-brand focus:outline-none"
                        >
                          {t(item.labelKey)}
                          {item.isComingSoon && <span className="ms-2 text-[11px] text-gray-500">- {t("common.comingSoonShort")}</span>}
                        </Link>
                      ))}
                      {n.id === 'cabins' && CABIN_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors focus-visible:bg-gray-50 focus-visible:text-brand focus:outline-none"
                        >
                          {t(item.labelKey)}
                          {item.isComingSoon && <span className="ms-2 text-[11px] text-gray-500">- {t("common.comingSoonShort")}</span>}
                        </Link>
                      ))}
                      {n.id === 'specialWorks' && SPECIAL_WORKS_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={`/?work=${item.id}#special-works`}
                          onClick={() => {
                            setOpenDropdown(null);
                            const element = document.getElementById('special-works');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors focus-visible:bg-gray-50 focus-visible:text-brand focus:outline-none"
                        >
                          {t(item.menuKey)}
                        </Link>
                      ))}
                      {n.id === 'koshk' && KOSHK_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors focus-visible:bg-gray-50 focus-visible:text-brand focus:outline-none"
                        >
                          {t(item.labelKey)}
                          {item.isComingSoon && <span className="ms-2 text-[11px] text-gray-500">- {t("common.comingSoonShort")}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={n.id}
                  to={n.path || "/"}
                  className={`nav-link text-[13px] font-medium transition-colors ${(
                    n.id === "home"
                      ? location.pathname === "/" && !isSpecialWorksActive && (active === "home" || !active)
                      : location.pathname === "/"
                        ? active === n.id
                        : location.pathname === n.path
                  )
                    ? "active"
                    : isOverlay ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {t(n.labelKey)}
                </Link>
              )
            ))}
          </nav>

          {/* CTA LEFT */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => openContactModal()}
              className={`hidden items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold transition sm:inline-flex ${isOverlay
                ? "border border-white/70 bg-white/10 text-white hover:bg-white hover:text-gray-900"
                : "bg-brand text-white hover:bg-brand-dark"
                }`}
            >
              {t("header.contactCta")}
              {dir === "rtl" ? <ArrowLeft className="h-4 w-4" strokeWidth={2.5} /> : <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
            </button>
            <button
              ref={menuButtonRef}
              onClick={() => setOpen(!open)}
              aria-label={open ? t("header.menuClose") : t("header.menuOpen")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid h-11 w-11 place-items-center rounded-full border transition hover:border-brand hover:text-brand lg:hidden sm:h-12 sm:w-12 ${isOverlay
                ? "border-white/70 bg-white/10 text-white"
                : "border-gray-200 bg-white text-gray-700"
                }`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("header.mainMenu")}
          className={`mx-auto max-w-7xl overflow-hidden shadow-lg transition-all duration-300 lg:hidden ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <nav className="flex flex-col p-4">
            {NAV.map((n, i) => (
              n.isDropdown ? (
                <div key={n.id} className="flex flex-col border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => setMobileDropdowns({ ...mobileDropdowns, [n.id]: !mobileDropdowns[n.id] })}
                    aria-expanded={!!mobileDropdowns[n.id]}
                    aria-controls={`mobile-dropdown-${n.id}`}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[13.5px] font-semibold w-full text-start transition-colors ${
                      (n.id === 'specialWorks' && isSpecialWorksActive)
                        ? 'text-brand'
                        : 'text-gray-700'
                    }`}
                  >
                    {t(n.labelKey)}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns[n.id] ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    id={`mobile-dropdown-${n.id}`}
                    className={`flex flex-col ps-4 pe-8 pb-3 space-y-1 overflow-hidden transition-all duration-300 ${mobileDropdowns[n.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {n.id === 'capsules' && CAPSULE_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {t(item.labelKey)}
                        {item.isComingSoon && <span className="ms-2 text-[10.5px] text-gray-500">- {t("common.comingSoon")}</span>}
                      </Link>
                    ))}
                    {n.id === 'houses' && HOUSE_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {t(item.labelKey)}
                        {item.isComingSoon && <span className="ms-2 text-[10.5px] text-gray-500">- {t("common.comingSoon")}</span>}
                      </Link>
                    ))}
                    {n.id === 'artworks' && ARTWORK_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {t(item.labelKey)}
                        {item.isComingSoon && <span className="ms-2 text-[10.5px] text-gray-500">- {t("common.comingSoon")}</span>}
                      </Link>
                    ))}
                    {n.id === 'cabins' && CABIN_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {t(item.labelKey)}
                        {item.isComingSoon && <span className="ms-2 text-[10.5px] text-gray-500">- {t("common.comingSoon")}</span>}
                      </Link>
                    ))}
                    {n.id === 'specialWorks' && SPECIAL_WORKS_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={`/?work=${item.id}#special-works`}
                        onClick={() => {
                          setOpen(false);
                          setMobileDropdowns({});
                          const element = document.getElementById('special-works');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5 focus-visible:text-brand focus:outline-none"
                      >
                        {t(item.menuKey)}
                      </Link>
                    ))}
                    {n.id === 'koshk' && KOSHK_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {t(item.labelKey)}
                        {item.isComingSoon && <span className="ms-2 text-[10.5px] text-gray-500">- {t("common.comingSoon")}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={n.id}
                  to={n.path || "/"}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[13.5px] font-semibold transition border-b border-gray-100 last:border-0 ${(
                    n.id === 'home'
                      ? location.pathname === "/" && !isSpecialWorksActive && active === "home"
                      : active === n.id && location.pathname === "/"
                  )
                    ? "bg-brand-soft text-brand"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {t(n.labelKey)}
                  <span className="text-xs text-gray-400">0{i + 1}</span>
                </Link>
              )
            ))}
            <button
              onClick={() => {
                setOpen(false);
                openContactModal();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-[13.5px] font-semibold text-white"
            >
              {t("header.contactCta")}
              {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}

/* ---------------------------------- Hero Slider ---------------------------------- */
const HERO_SLIDES = [
  {
    img: "/images/hero-antika.webp",
    mobileImg: "/images/hero-mobile-1.webp",
    ku: {
      tag: "سلێمانی - کوردستان، عێراق",
      title: "داهێنان لە دیزاین، وردی لە دروستکردن",
      desc: (
        <>
          پێشکەشکردنی یەکە نیشتەجێبوونە مۆدێرنەکانمان بە ستانداری
          <br />
          جیهانی، تێکەڵەیەک لە دیمەنی پانۆرامایی ٢٧٠ پلە و ژیانێکی زیرەک
          <br />
          لەگەڵ سیستەمێکی بەهێز و بەردەوامی بیناسازی
        </>
      ),
      cta1: "بینینی کارەکانمان",
      cta2: "دەربارەی ئێمە",
    },
    en: {
      tag: "Sulaymaniyah - Kurdistan, Iraq",
      title: "Innovation in design, precision in manufacturing",
      desc: (
        <>
          Presenting our modern residential units to a global
          <br />
          standard — a blend of a 270° panoramic view and smart living
          <br />
          with a robust, durable construction system
        </>
      ),
      cta1: "View our work",
      cta2: "About us",
    },
    ar: {
      tag: "السليمانية - كردستان، العراق",
      title: "ابتكار في التصميم، دقة في التصنيع",
      desc: (
        <>
          نقدّم وحداتنا السكنية العصرية وفق معيار
          <br />
          عالمي — مزيج من إطلالة بانورامية ٢٧٠ درجة وحياة ذكية
          <br />
          مع نظام بناء قوي ومتين
        </>
      ),
      cta1: "شاهد أعمالنا",
      cta2: "من نحن",
    },
  },
  {
    img: "/images/hero-2.webp",
    mobileImg: "/images/hero-mobile-2.webp",
    ku: {
      tag: "سلێمانی - کوردستان، عێراق",
      title: "دیزاینێکی نوێ بۆ شێوازی ژیانێکی نوێ",
      desc: (
        <>
          تێکەڵەیەک لە دیزاینی مۆدێرن و بەکارهێنانی جۆراوجۆر،
          <br />
          لە ئۆفیسی سەربەخۆ و ژووری کۆبوونەوەوە تا کافێ و
          <br />
          یەکەی گواستراوەی بازرگانی بە بەرزترین کوالێتی و نرخ
        </>
      ),
      cta1: "خزمەتگوزارییەکان",
      cta2: "پەیوەندی",
    },
    en: {
      tag: "Sulaymaniyah - Kurdistan, Iraq",
      title: "A new design for a new way of living",
      desc: (
        <>
          A blend of modern design and versatile use,
          <br />
          from private offices and meeting rooms to cafés
          <br />
          and mobile commercial units at the highest quality and price
        </>
      ),
      cta1: "Our Services",
      cta2: "Contact",
    },
    ar: {
      tag: "السليمانية - كردستان، العراق",
      title: "تصميم جديد لأسلوب حياة جديد",
      desc: (
        <>
          مزيج من التصميم العصري والاستخدام المتنوع،
          <br />
          من المكاتب الخاصة وقاعات الاجتماعات إلى المقاهي
          <br />
          والوحدات التجارية المتنقلة بأعلى جودة وأفضل سعر
        </>
      ),
      cta1: "خدماتنا",
      cta2: "اتصل بنا",
    },
  },
];

function Hero({ onMediaLoaded }: { onMediaLoaded?: () => void }) {
  const { language, dir } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // textPhase: 'visible' | 'exiting' | 'entering'
  const [textPhase, setTextPhase] = useState<'visible' | 'exiting' | 'entering'>('visible');
  const [displayedSlide, setDisplayedSlide] = useState(0);

  // LCP media probe for the delayed-fallback intro loader. A ref callback (not
  // only onLoad) is required because a cache hit can complete before React
  // attaches the event handler — `complete` + naturalWidth covers that race.
  const handlePrimaryImageRef = useCallback(
    (img: HTMLImageElement | null) => {
      if (img && img.complete && img.naturalWidth > 0) {
        onMediaLoaded?.();
      }
    },
    [onMediaLoaded]
  );

  const goTo = (nextIndex: number) => {
    if (nextIndex === current) return;
    // 1. Start text exit
    setTextPhase('exiting');
    // 2. After text fades out, swap image + start text enter
    setTimeout(() => {
      setPrevious(current);
      setCurrent(nextIndex);
      setDisplayedSlide(nextIndex);
      setIsAnimating(true);
      setTextPhase('entering');
      // 3. After enter animation settles, mark as visible
      setTimeout(() => {
        setTextPhase('visible');
        setIsAnimating(false);
      }, 900);
    }, 350);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  const next = () => goTo((current + 1) % HERO_SLIDES.length);
  const prev = () => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[displayedSlide];
  const copy = language === "ku" ? slide.ku : language === "ar" ? slide.ar : slide.en;

  return (
    <section
      id="home"
      className="hero-section relative isolate overflow-hidden bg-gray-950"
      style={{ scrollMarginTop: '80px' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((s, index) => {
          const isActive = index === current;
          const isPrev = index === previous;

          if (!isActive && !isPrev) return null;

          return (
            <div
              key={`${s.img}-${isActive ? 'active' : 'prev'}`}
              className="absolute inset-0 h-full w-full overflow-hidden"
              style={{
                zIndex: isActive ? 2 : 1,
                animation: isActive && isAnimating ? 'hero-wipe-ltr 1.1s cubic-bezier(0.25, 1, 0.5, 1) forwards' : undefined,
              }}
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={s.mobileImg}
                />
                <img
                  src={s.img}
                  alt=""
                  aria-hidden="true"
                  className="hero-background absolute inset-0 h-full w-full object-cover scale-105"
                  width="1920"
                  height="960"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding={index === 0 ? "sync" : "async"}
                  ref={index === 0 ? handlePrimaryImageRef : undefined}
                  onLoad={index === 0 ? onMediaLoaded : undefined}
                  // A broken bitmap must not trap users behind an intro splash:
                  // settle on error so the grace timer disarms either way.
                  onError={index === 0 ? onMediaLoaded : undefined}
                />
              </picture>
            </div>
          );
        })}
      </div>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 lg:bg-gradient-to-l lg:from-black/75 lg:via-black/35 lg:to-black/15" />
      <div className="absolute inset-0 bg-black/10" />


      {/* ── Mobile layout: text top, buttons bottom ── */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-4 pb-24 pt-28 lg:hidden">
        {/* key remounts container → triggers hero-text-item CSS animation on each slide change */}
        <div
          key={`mob-${displayedSlide}`}
          className="w-full text-center"
          style={{
            opacity: textPhase === 'exiting' ? 0 : undefined,
            transform: textPhase === 'exiting' ? 'translateY(16px)' : undefined,
            transition: textPhase === 'exiting'
              ? 'opacity 0.28s ease-in, transform 0.28s ease-in'
              : undefined,
          }}
        >
          <div className="hero-text-item">
            <a
              href="https://maps.app.goo.gl/naP6mrMRYWPuMmrw7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open factory location in Google Maps"
              className="inline-flex items-center gap-2 border-b-2 border-brand px-1 pb-2 text-[12px] font-semibold text-white drop-shadow-md transition-opacity duration-200 hover:opacity-80 no-underline"
            >
              <MapPin className="h-3.5 w-3.5 text-brand shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">{copy.tag}</span>
            </a>
          </div>
          <div className="hero-text-item">
            <h1 className="mt-4 font-display font-black leading-[1.2] text-white drop-shadow-lg" style={{ fontSize: 'clamp(28px, 7vw, 42px)' }}>
              {copy.title}
            </h1>
          </div>
          <div className="hero-text-item">
            <p className="mt-4 text-[15px] font-light leading-relaxed text-white/85 drop-shadow-md">
              {copy.desc}
            </p>
          </div>
        </div>

        {/* Buttons — bottom */}
        <div
          key={`mob-btn-${displayedSlide}`}
          className="hero-text-item"
          style={{
            opacity: textPhase === 'exiting' ? 0 : undefined,
            transform: textPhase === 'exiting' ? 'translateY(14px)' : undefined,
            transition: textPhase === 'exiting'
              ? 'opacity 0.22s ease-in 80ms, transform 0.22s ease-in 80ms'
              : undefined,
            animationDelay: '280ms',
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <a
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white shadow-lg transition hover:bg-brand-dark"
            >
              {copy.cta1}
              {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </a>
            <a
              href="/about"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-black/20 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-sm transition hover:bg-brand/12 hover:backdrop-blur-md hover:border-brand/30 hover:shadow-[0_4px_16px_rgba(255,90,0,0.15)]"
            >
              {copy.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* ── Desktop layout: centered ── */}
      <div className="relative z-10 mx-auto hidden min-h-[100svh] max-w-7xl items-center px-4 pb-20 pt-32 sm:px-6 lg:flex lg:px-8">
        <div
          key={`desk-${displayedSlide}`}
          className="w-full max-w-2xl text-center lg:me-0 lg:text-start"
          style={{
            opacity: textPhase === 'exiting' ? 0 : undefined,
            transform: textPhase === 'exiting' ? 'translateY(18px)' : undefined,
            transition: textPhase === 'exiting'
              ? 'opacity 0.28s ease-in, transform 0.28s ease-in'
              : undefined,
          }}
        >
          <div className="hero-text-item">
            <a
              href="https://maps.app.goo.gl/naP6mrMRYWPuMmrw7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open factory location in Google Maps"
              className="inline-flex items-center gap-2 border-b-2 border-brand px-1 pb-2 text-[13px] font-semibold text-white drop-shadow-md transition-opacity duration-200 hover:opacity-80 no-underline"
            >
              <MapPin className="h-4 w-4 text-brand shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">{copy.tag}</span>
            </a>
          </div>
          <div className="hero-text-item">
            <h1 className="mt-6 font-display font-black leading-[1.2] text-white drop-shadow-lg" style={{ fontSize: 'clamp(36px, 6vw, 68px)' }}>
              {copy.title}
            </h1>
          </div>
          <div className="hero-text-item">
            <p className="mt-6 text-[17px] font-light leading-relaxed text-white/90 drop-shadow-md lg:text-[19px]">
              {copy.desc}
            </p>
          </div>
          <div className="hero-text-item" style={{ animationDelay: '280ms' }}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/products"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white shadow-lg transition hover:bg-brand-dark sm:w-auto"
              >
                {copy.cta1}
                {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </a>
              <a
                href="/about"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-black/10 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-sm transition hover:bg-brand/12 hover:backdrop-blur-md hover:border-brand/30 hover:shadow-[0_4px_16px_rgba(255,90,0,0.15)] sm:w-auto"
              >
                {copy.cta2}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-brand" : "bg-white/50 hover:bg-white"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute bottom-6 left-4 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900 sm:left-8"
        aria-label="Previous slide"
      >
        {dir === "rtl" ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
      </button>
      <button
        onClick={next}
        className="absolute bottom-6 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900 sm:right-8"
        aria-label="Next slide"
      >
        {dir === "rtl" ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
      </button>
    </section>
  );
}

/* ---------------------------------- Use Cases Grid ---------------------------------- */
function UseCases() {
  const { t, language, dir } = useLanguage();
  const isKu = language === "ku";
  const isAr = language === "ar";
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const workParam = searchParams.get('work');

  const [activeCase, setActiveCase] = useState<SpecialWorkItem>(() => {
    if (workParam) {
      const match = SPECIAL_WORKS_ITEMS.find((c) => c.id === workParam);
      if (match) return match;
    }
    return SPECIAL_WORKS_ITEMS[0];
  });

  // Sync tab with URL search parameter or hash
  useEffect(() => {
    if (workParam) {
      const match = SPECIAL_WORKS_ITEMS.find((c) => c.id === workParam);
      if (match && match.id !== activeCase.id) {
        setActiveCase(match);
      }
    } else if (location.hash) {
      const hashId = location.hash.replace('#', '');
      const match = SPECIAL_WORKS_ITEMS.find((c) => c.id === hashId);
      if (match && match.id !== activeCase.id) {
        setActiveCase(match);
      }
    }
  }, [workParam, location.hash, activeCase.id]);

  const handleSelectCase = (useCase: SpecialWorkItem) => {
    setActiveCase(useCase);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("work", useCase.id);
        return next;
      },
      { replace: true }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, useCase: SpecialWorkItem) => {
    const currentIndex = SPECIAL_WORKS_ITEMS.findIndex((c) => c.id === useCase.id);

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const rtlMultiplier = dir === "rtl" ? -1 : 1;
      const direction = (e.key === "ArrowRight" ? 1 : -1) * rtlMultiplier;
      const newIndex = (currentIndex + direction + SPECIAL_WORKS_ITEMS.length) % SPECIAL_WORKS_ITEMS.length;
      const nextItem = SPECIAL_WORKS_ITEMS[newIndex];
      handleSelectCase(nextItem);
      const nextButton = document.getElementById(`tab-${nextItem.id}`);
      nextButton?.focus();
    }
  };

  return (
    <section id="special-works" className="bg-white py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="text-[14px] font-bold text-brand">
            {t("home.useCases.kicker")}
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {t("home.useCases.title")}
          </h2>
        </Reveal>

        {/* Category Filter - Horizontal Scrollable on Mobile, Wrapped on Desktop */}
        <div className="my-8">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 pb-4 md:flex-wrap md:justify-center md:overflow-visible md:pb-0"
            role="tablist"
            aria-label={t("nav.specialWorks")}
          >
            {SPECIAL_WORKS_ITEMS.map((useCase) => (
              <button
                key={useCase.id}
                id={`tab-${useCase.id}`}
                onClick={() => handleSelectCase(useCase)}
                onMouseEnter={() => handleSelectCase(useCase)}
                onKeyDown={(e) => handleKeyDown(e, useCase)}
                role="tab"
                aria-controls={`panel-${useCase.id}`}
                aria-selected={activeCase.id === useCase.id}
                tabIndex={activeCase.id === useCase.id ? 0 : -1}
                className={`
                  snap-center whitespace-nowrap py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none
                  ${activeCase.id === useCase.id
                    ? 'bg-brand-soft border-2 border-brand text-brand'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-brand/50 hover:bg-gray-50'
                  }
                `}
              >
                {t(useCase.menuKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Image Display - Grid stacking for constant height */}
        <div className="mb-12 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 grid-rows-1" dir="ltr">
            {SPECIAL_WORKS_ITEMS.map((useCase) => (
              <div
                key={useCase.id}
                id={`panel-${useCase.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${useCase.id}`}
                className={`
                  col-start-1 row-start-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-300 ease-in-out
                  ${activeCase.id === useCase.id
                    ? 'opacity-100 visible pointer-events-auto'
                    : 'opacity-0 invisible pointer-events-none'
                  }
                `}
                aria-hidden={activeCase.id !== useCase.id}
              >
                {/* Image - Left side */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={useCase.img}
                    alt={isAr ? useCase.titleAr : isKu ? useCase.title : useCase.titleEn}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  />
                </div>

                {/* Text - Right side, black color */}
                <div className="text-start" dir={dir}>
                  <h3 className="font-display text-2xl font-bold sm:text-3xl text-gray-900">
                    {isAr ? useCase.titleAr : isKu ? useCase.title : useCase.titleEn}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {isAr ? useCase.descAr : isKu ? useCase.desc : useCase.descEn}
                  </p>
                  {useCase.features && (
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 mb-2">{t("home.useCases.features")}</h4>
                      <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1">
                        {(isAr ? useCase.featuresAr : isKu ? useCase.features : useCase.featuresEn ?? []).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {useCase.benefits && (
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 mb-2">{t("home.useCases.benefits")}</h4>
                      <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1">
                        {(isAr ? useCase.benefitsAr : isKu ? useCase.benefits : useCase.benefitsEn ?? []).map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={300} className="text-center">
          <a
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-8 py-3.5 text-[14px] font-bold text-gray-900 transition hover:border-brand hover:text-brand"
          >
            {t("home.useCases.viewAll")}
            {dir === "rtl" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </a>
        </Reveal>
      </div>
    </section>
  );
}



/* ---------------------------------- Slanted Parallax Banner ---------------------------------- */
function SlantedBanner() {
  const { t } = useLanguage();
  return (
    <section className="slanted-parallax-section relative isolate min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center" aria-label={t("home.banner.aria")}>
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <h3 className="font-display text-[24px] sm:text-[36px] md:text-[44px] font-black text-white drop-shadow-xl leading-[1.3]">
            {t("home.banner.title")}
          </h3>
          <p className="mt-2 text-[13px] sm:text-[16px] text-gray-200/90 max-w-xl mx-auto drop-shadow font-medium">
            {t("home.banner.subtitle")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Process ---------------------------------- */
const PROCESS_STEPS = [
  {
    n: "01",
    title: "ڕاوێژکردن",
    titleEn: "Consultation",
    desc: "پەیوەندی بکە و داواکاریەکەت بڵێ بۆ دیزاین",
    descEn: "Get in touch and tell us your design brief",
    titleAr: "الاستشارة",
    descAr: "تواصل معنا وأخبرنا بمتطلباتك للتصميم",
  },
  {
    n: "02",
    title: "دیزاین",
    titleEn: "Design",
    desc: "دیزاینی تایبەت و پلانێکی وردبینی بۆ پرۆژەکەت",
    descEn: "A custom design and a detailed plan for your project",
    titleAr: "التصميم",
    descAr: "تصميم مخصص ومخطط دقيق لمشروعك",
  },
  {
    n: "03",
    title: "بەرهەمهێنان",
    titleEn: "Manufacturing",
    desc: "دروستکردن لە کارگەی خۆمان بە کوالێتی بەرز",
    descEn: "Built in our own factory to high quality",
    titleAr: "التصنيع",
    descAr: "التصنيع في مصنعنا الخاص بجودة عالية",
  },
  {
    n: "04",
    title: "دابەشکردن",
    titleEn: "Delivery",
    desc: "گەیاندن و دابەشکردن لە کاتی دیاریکراودا",
    descEn: "Delivered and installed on the agreed schedule",
    titleAr: "التسليم",
    descAr: "التوصيل والتسليم في الوقت المحدد",
  },
];

function Process() {
  const { t, language } = useLanguage();
  const isKu = language === "ku";
  const isAr = language === "ar";
  return (
    <section className="process-diagonal-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="text-[14px] font-bold text-brand">

            {t("home.process.kicker")}

          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {t("home.process.title")}
          </h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand text-white font-display text-2xl font-black">
                  {step.n}
                </div>
                <h3 className="font-display text-[18px] font-bold text-gray-900">{isAr ? step.titleAr : isKu ? step.title : step.titleEn}</h3>
                <p className="mt-2 text-[14px] text-gray-600">{isAr ? step.descAr : isKu ? step.desc : step.descEn}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Why Choose Us ---------------------------------- */
function WhyChooseUs() {
  return null;
}

function Capabilities() {
  return null;
}

/* ---------------------------------- Contact CTA Band ---------------------------------- */
function ContactCTA() {
  const { t } = useLanguage();
  return (
    <section className="contact-cta-parallax relative isolate">
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 py-20 sm:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/20 px-4 py-1.5 text-[13px] font-bold text-white backdrop-blur-md mb-4">
            {t("home.ctaBand.badge")}
          </span>
          <h2 className="font-display text-[28px] sm:text-[36px] md:text-[46px] font-black leading-[1.3] text-white drop-shadow-lg">
            {t("home.ctaBand.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] sm:text-[16.5px] font-medium text-white/90 drop-shadow-md">
            {t("home.ctaBand.subtitle")}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+9647501234567"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white shadow-xl transition hover:bg-brand-dark hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              <span dir="ltr">+964 750 123 4567</span>
            </a>
            <a
              href="mailto:info@antika-factory.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-gray-900"
            >
              <Mail className="h-5 w-5" />
              info@antika-factory.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Footer Reveal ---------------------------------- */
function FooterReveal({ children, footerContent }: { children: React.ReactNode; footerContent: React.ReactNode }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const [useStaticFooter, setUseStaticFooter] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useRef<boolean>(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const measureFooterHeight = useCallback(() => {
    if (!footerRef.current) return;
    const height = footerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Fall back to static footer only if footer is taller than viewport OR on very small mobile screens
    const shouldUseStatic = height >= viewportHeight || viewportWidth < 768 || prefersReducedMotion.current;
    setUseStaticFooter(shouldUseStatic);

    if (!shouldUseStatic) {
      setFooterHeight(height);
    } else {
      setFooterHeight(0);
    }
  }, []);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    // Watch the footer's own box, not just the viewport: the footer is wrapped
    // in SelectiveHydration, so it mounts AFTER the first paint. A one-shot
    // measurement can catch the 1px placeholder and permanently lock in a
    // ~0px reserved margin, leaving the fixed footer hidden behind the page
    // content. The ResizeObserver re-measures when the real footer mounts
    // (1px -> full height) and whenever the footer's content height changes,
    // e.g. when the contact form swaps to the success message.
    const observer = new ResizeObserver(() => {
      measureFooterHeight();
    });
    observer.observe(el);

    window.addEventListener('resize', measureFooterHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureFooterHeight);
    };
  }, [measureFooterHeight]);

  return (
    <>
      <div
        ref={contentRef}
        style={{
          marginBottom: useStaticFooter ? 0 : footerHeight,
          position: 'relative',
          zIndex: 1,
          background: 'var(--page-bg, #FFFFFF)'
        }}
      >
        {children}
      </div>
      <div
        ref={footerRef}
        style={{
          position: useStaticFooter ? 'relative' : 'fixed',
          bottom: useStaticFooter ? 'auto' : 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 0,
          height: 'auto'
        }}
      >
        {footerContent}
      </div>
    </>
  );
}

/* ---------------------------------- Footer ---------------------------------- */

/**
 * Simulated contact-message transport — there is no backend on this static
 * deployment yet. Swap the body for the real endpoint, e.g.:
 *   await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) });
 * The footer success state keeps working unchanged: the Typewriter only
 * mounts after this promise resolves.
 */
async function submitContactMessage(payload: {
  name: string;
  email: string;
  msg: string;
}): Promise<void> {
  void payload;
}

function FooterContent({ onNav: _onNav }: { onNav?: (id: string) => void }) {
  const { t, dir } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Immersive typewriter-machine modal — opened ONLY by focusing the message
  // textarea (not the name/email fields).
  const [showMachineModal, setShowMachineModal] = useState(false);
  // The invisible textarea layered over the machine: keeps the native mobile
  // keyboard up while the SVG machine mirrors form.msg live.
  const machineInputRef = useRef<HTMLTextAreaElement | null>(null);

  // While the modal is open: focus the invisible input (60ms lets the portal
  // paint first on mobile), let Escape close, and lock the page behind the
  // overlay. Everything is torn down when it closes or unmounts.
  useEffect(() => {
    if (!showMachineModal) return;
    const focusTimer = window.setTimeout(() => machineInputRef.current?.focus(), 60);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMachineModal(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [showMachineModal]);

  const handleContactSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting) return;

      setIsSubmitting(true);
      try {
        await submitContactMessage(form);
        // Success only after the promise resolves — the Typewriter is mounted
        // at this exact moment and never exists during initial page load.
        setIsSubmitted(true);
      } catch {
        // Transport failed: keep the form mounted so the user can retry.
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, isSubmitting]
  );

  return (
    <div className="bg-gray-900 pt-12 sm:pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 pb-8 sm:pb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* 1 BRAND */}
          <Reveal>
            <div className="text-start">
              <Logo />
              <p className="mt-4 sm:mt-5 max-w-[260px] text-[12.5px] sm:text-[13.5px] font-light leading-6 sm:leading-7 text-gray-400">
                {t("footer.brand")}
              </p>
              <div className="mt-4 sm:mt-6">
                <p className="text-[12px] sm:text-[13px] font-bold text-gray-300">{t("footer.social")}</p>
                <div className="mt-2 sm:mt-3 flex gap-2 sm:gap-3">
                  {[
                    { icon: FacebookIcon, l: "Facebook" },
                    { icon: InstagramIcon, l: "Instagram" },
                    { icon: LinkedinIcon, l: "LinkedIn" },
                    { icon: YoutubeIcon, l: "YouTube" },
                  ].map((s) => (
                    <a
                      key={s.l}
                      href="#home"
                      aria-label={s.l}
                      className="grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-full border border-gray-700 text-gray-400 transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <s.icon className="h-[14px] w-[14px] sm:h-[17px] sm:w-[17px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2 CONTACT */}
          <Reveal delay={100}>
            <div className="text-start">
              <h4 className="font-display text-[15px] sm:text-[17px] font-extrabold">{t("footer.contact")}</h4>
              <ul className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 text-[12px] sm:text-[13.5px]">
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                  <span className="text-gray-400" dir="ltr">+964 750 123 4567</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                  <span className="text-gray-400" dir="ltr">info@antika-factory.com</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                  <span className="text-gray-400">{t("footer.location")}</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                  <span className="text-gray-400">{t("footer.hours")}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* 3 NAVIGATION */}
          <Reveal delay={180}>
            <div className="text-start">
              <h4 className="font-display text-[15px] sm:text-[16px] font-extrabold">{t("footer.links")}</h4>
              <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-3 text-[12px] sm:text-[13.5px]">
                {NAV.filter(n => !n.isDropdown).map((n) => (
                  <li key={n.id}>
                    <Link
                      to={n.path || "/"}
                      className="text-gray-400 transition hover:text-brand"
                    >
                      {t(n.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 4 CONTACT FORM */}
          <Reveal delay={220}>
            <div className="text-start">
              <h4 className="font-display text-[15px] sm:text-[16px] font-extrabold">{t("footer.sendTitle")}</h4>
              {/* Always-mounted polite live region: assistive tech announces the
                  complete message the moment submission succeeds, while the
                  animated visual layer stays purely decorative. */}
              <div role="status" aria-live="polite" dir={dir} className="sr-only">
                {isSubmitted ? t("footer.success") : ""}
              </div>
              {isSubmitted ? (
                <div
                  dir={dir}
                  aria-hidden="true"
                  className="mt-4 sm:mt-5 text-brand font-semibold text-[15px] sm:text-lg leading-7 sm:leading-8"
                >
                  <Typewriter speed={50} text={t("footer.success")} />
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="mt-4 sm:mt-5 space-y-2 sm:space-y-3"
                >
                  <input
                    type="text"
                    placeholder={t("footer.form.name")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder={t("footer.form.email")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none"
                    required
                  />
                  <textarea
                    placeholder={t("footer.form.message")}
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    onFocus={() => setShowMachineModal(true)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 text-[12px] sm:text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none resize-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 sm:px-5 py-3 sm:py-3.5 text-[13px] sm:text-[14.5px] font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {t("footer.form.send")}
                    <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 -scale-x-100" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 border-t border-gray-800 py-4 sm:py-6 sm:flex-row">
          <div className="flex items-center gap-2 text-[11px] sm:text-[12.5px] font-medium text-gray-500">
            <Link to="/#works" className="px-3 py-2 sm:px-4 sm:py-4 transition hover:text-brand">{t("footer.bar.design")}</Link>
            <span className="h-1 w-1 rounded-full bg-gray-700" />
            <Link to="/about" className="px-3 py-2 sm:px-4 sm:py-4 transition hover:text-brand">{t("footer.bar.art")}</Link>
            <span className="h-1 w-1 rounded-full bg-gray-700" />
            <Link to="/#contact" className="px-3 py-2 sm:px-4 sm:py-4 transition hover:text-brand">{t("footer.bar.engineering")}</Link>
          </div>
          <p className="text-[11px] sm:text-[12.5px] text-gray-500">© 2026 ANTIKA FACTORY. {t("footer.rights")}</p>
        </div>
      </div>

      {/* Immersive typewriter-machine modal. Portaled to <body> so it escapes
          the footer's stacking context, conditionally mounted so neither the
          lazy chunk nor the SVG engine exists before first use. */}
      {showMachineModal &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("footer.machine.aria")}
            dir={dir}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={(e) => {
              // Close only when the dark backdrop itself is clicked.
              if (e.target === e.currentTarget) setShowMachineModal(false);
            }}
          >
            <button
              type="button"
              onClick={() => setShowMachineModal(false)}
              aria-label={t("common.close")}
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="mb-3 px-6 text-center text-[12px] sm:text-[13px] text-white/50">
              {t("footer.machine.hint")}
            </p>

            <div className="relative aspect-[932/492] w-[min(92vw,880px)] max-h-[min(64vh,560px)]">
              <Suspense fallback={null}>
                <TypewriterMachine
                  text={form.msg || t("footer.machine.placeholder")}
                  color="#ff5a00"
                  interactive={false}
                  rtl={dir === "rtl"}
                  loop={false}
                  columns={32}
                  speed={16}
                  sound={true}
                  startDelay={250}
                  label="ANTIKA"
                  className="bg-transparent"
                />
              </Suspense>
              {/* Invisible real textarea over the machine: captures every
                  keystroke (and keeps the mobile keyboard up) while the SVG
                  mirrors form.msg live, without re-rendering the machine. */}
              <textarea
                ref={machineInputRef}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                dir={dir}
                aria-label={t("footer.form.message")}
                spellCheck={false}
                autoComplete="off"
                className="absolute inset-0 z-10 h-full w-full cursor-text resize-none border-0 bg-transparent p-0 opacity-0 outline-none"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

function Footer({ onNav }: { onNav?: (id: string) => void }) {
  return (
    <FooterContent onNav={onNav} />
  );
}

/* ---------------------------------- Social Sidebar ---------------------------------- */
function SocialSidebar() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(() => {
    // Check localStorage for saved state
    const saved = localStorage.getItem('socialSidebarVisible');
    // Default to hidden on mobile screens (< 768px), visible on desktop
    const isMobile = window.innerWidth < 768;
    if (saved === null) {
      return !isMobile; // Default based on screen size
    }
    return saved !== 'false';
  });

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('socialSidebarVisible', String(isVisible));
  }, [isVisible]);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const closeSidebar = () => {
    setIsVisible(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchCurrent(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart !== null) {
      setTouchCurrent(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStart !== null && touchCurrent !== null) {
      const deltaX = touchCurrent - touchStart;
      const threshold = 50;
      if (deltaX > threshold) {
        closeSidebar();
      }
    }
    setTouchStart(null);
    setTouchCurrent(null);
  };

  return (
    <>
      {/* Toggle Tab (visible when sidebar is hidden) */}
      <button
        onClick={toggleSidebar}
        aria-label={t("social.show")}
        className={`fixed left-0 z-[9999] grid h-12 w-8 place-items-center rounded-r-full bg-gray-800 text-white shadow-lg transition-all duration-300 hover:bg-gray-700 ${isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          left: 'max(0px, env(safe-area-inset-left))'
        }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Backdrop Overlay */}
      {isVisible && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-[9998] bg-black/40 transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed left-0 z-[9999] flex flex-col items-center rounded-[14px] bg-white transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          top: 'calc(50% + 6px)',
          transform: `translateY(-50%) ${isVisible ? 'translateX(0)' : 'translateX(calc(-100% - 12px))'}`,
          opacity: isVisible ? '1' : '0',
          left: 'max(14px, calc(14px + env(safe-area-inset-left)))',
          padding: 'clamp(12px, 2vh, 24px)',
          gap: 'clamp(8px, 1.5vh, 16px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          maxHeight: 'calc(100vh - 114px)',
          overflow: 'hidden'
        }}
        data-social-sidebar
      >
        {/* Facebook */}
        <a
          href="https://facebook.com/share/1JNDKJeTu4/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="group flex flex-col items-center transition-transform hover:scale-110"
          style={{ gap: 'clamp(4px, 0.8vh, 8px)' }}
        >
          <div className="grid place-items-center rounded-lg bg-[#1877F2] text-white transition-transform group-hover:-translate-y-0.5" style={{
            height: 'clamp(48px, 7vh, 64px)',
            width: 'clamp(48px, 7vh, 64px)'
          }}>
            <FacebookIcon style={{ height: 'clamp(24px, 3.5vh, 32px)', width: 'clamp(24px, 3.5vh, 32px)' }} />
          </div>
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>{t("social.facebook")}</span>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="group flex flex-col items-center transition-transform hover:scale-110"
          style={{ gap: 'clamp(4px, 0.8vh, 8px)' }}
        >
          <div className="grid place-items-center rounded-lg bg-[#FF0000] text-white transition-transform group-hover:-translate-y-0.5" style={{
            height: 'clamp(48px, 7vh, 64px)',
            width: 'clamp(48px, 7vh, 64px)'
          }}>
            <YoutubeIcon style={{ height: 'clamp(24px, 3.5vh, 32px)', width: 'clamp(24px, 3.5vh, 32px)' }} />
          </div>
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>{t("social.youtube")}</span>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/antika.factory"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="group flex flex-col items-center transition-transform hover:scale-110"
          style={{ gap: 'clamp(4px, 0.8vh, 8px)' }}
        >
          <div className="grid place-items-center rounded-lg text-white transition-transform group-hover:-translate-y-0.5" style={{
            height: 'clamp(48px, 7vh, 64px)',
            width: 'clamp(48px, 7vh, 64px)',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
          }}>
            <InstagramIcon style={{ height: 'clamp(24px, 3.5vh, 32px)', width: 'clamp(24px, 3.5vh, 32px)' }} />
          </div>
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>{t("social.instagram")}</span>
        </a>

        {/* TikTok */}
        <a
          href="https://tiktok.com/@antika.factory"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="group flex flex-col items-center transition-transform hover:scale-110"
          style={{ gap: 'clamp(4px, 0.8vh, 8px)' }}
        >
          <div className="grid place-items-center rounded-lg bg-black text-white transition-transform group-hover:-translate-y-0.5" style={{
            height: 'clamp(48px, 7vh, 64px)',
            width: 'clamp(48px, 7vh, 64px)'
          }}>
            <TikTokIcon style={{ height: 'clamp(24px, 3.5vh, 32px)', width: 'clamp(24px, 3.5vh, 32px)' }} />
          </div>
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>{t("social.tiktok")}</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/7701242724"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="group flex flex-col items-center transition-transform hover:scale-110"
          style={{ gap: 'clamp(4px, 0.8vh, 8px)' }}
        >
          <div className="grid place-items-center rounded-lg bg-[#25D366] text-white transition-transform group-hover:-translate-y-0.5" style={{
            height: 'clamp(48px, 7vh, 64px)',
            width: 'clamp(48px, 7vh, 64px)'
          }}>
            <WhatsAppIcon style={{ height: 'clamp(24px, 3.5vh, 32px)', width: 'clamp(24px, 3.5vh, 32px)' }} />
          </div>
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>{t("social.whatsapp")}</span>
        </a>

        {/* Toggle Button (inside sidebar) */}
        <button
          onClick={toggleSidebar}
          aria-label={t("social.hide")}
          className="grid place-items-center rounded-full bg-gray-200 text-gray-700 transition-all hover:bg-gray-300"
          style={{
            height: 'clamp(40px, 6vh, 48px)',
            width: 'clamp(40px, 6vh, 48px)',
            marginTop: 'clamp(8px, 1.2vh, 12px)'
          }}
        >
          <ChevronLeft style={{ height: 'clamp(20px, 3vh, 24px)', width: 'clamp(20px, 3vh, 24px)' }} />
        </button>
      </div>
    </>
  );
}



function BackToTop() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("common.backToTop")}
      className={`fixed bottom-6 right-6 z-30 grid h-12 w-12 place-items-center rounded-full bg-gray-700 text-white shadow-lg transition-all duration-300 hover:bg-gray-600 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      style={{
        bottom: 'max(24px, env(safe-area-inset-bottom))',
        right: 'max(24px, env(safe-area-inset-right))'
      }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ----------------------------------- HomePage ----------------------------------- */
function HomePage({ onMediaLoaded }: { onMediaLoaded?: () => void }) {
  return (
    <>
      <Hero onMediaLoaded={onMediaLoaded} />
      <UseCases />
      {/* Big O: Hydration O(k) where k = below-viewport components only (deferred to viewport entry) */}
      {/* Thread blocking: 0ms during initial load (hydrates on scroll) */}
      {/* Space complexity: O(k) where k = viewport-proximal components vs O(n) total page components */}
      <SelectiveHydration threshold={0.1} rootMargin="0px 0px 400px 0px">
        <FactoryInfoSection />
      </SelectiveHydration>
      <SelectiveHydration threshold={0.1} rootMargin="0px 0px 400px 0px">
        <TrustMarquee />
      </SelectiveHydration>
      <SelectiveHydration threshold={0.1} rootMargin="0px 0px 400px 0px">
        <SpecialFeatures />
      </SelectiveHydration>
      <SlantedBanner />
      <SelectiveHydration threshold={0.1} rootMargin="0px 0px 400px 0px">
        <Process />
      </SelectiveHydration>
      <SelectiveHydration threshold={0.1} rootMargin="0px 0px 400px 0px">
        <WhyChooseUs />
      </SelectiveHydration>
      <SelectiveHydration threshold={0.1} rootMargin="0px 0px 400px 0px">
        <Capabilities />
      </SelectiveHydration>
      <SelectiveHydration threshold={0.1} rootMargin="0px 0px 400px 0px">
        <ContactCTA />
      </SelectiveHydration>
    </>
  );
}

/* ----------------------------------- App ----------------------------------- */
function AppContent() {
  const [active, setActive] = useState("home");
  const { isContactModalOpen, closeContactModal, prefillMessage } = useContactModal();
  const { t, dir } = useLanguage();
  const location = useLocation();
  const [, startTransition] = useTransition();

  /* ---------- Delayed-fallback intro loader (LCP-gated) ---------- */
  // Fast connections: the hero bitmap resolves while the 600ms grace timer is
  // still pending, the effect cleanup disarms it, and <IntroLoader> NEVER
  // mounts — no extra DOM, no overlay, no LCP/TBT cost. Slow connections: the
  // timer wins, the overlay fades in and runs its greeting sequence.
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const introHasRunRef = useRef(false);
  const introExitTimerRef = useRef<number | null>(null);
  const isHomeRoute = location.pathname === "/";

  const handleMediaLoaded = useCallback(() => setIsMediaLoaded(true), []);

  useEffect(() => {
    // Only the home route owns the tracked hero bitmap. Arming the timer on
    // other routes would flash the splash on every direct visit because no
    // image could ever resolve the guard.
    if (!isHomeRoute || isMediaLoaded || showLoader || introHasRunRef.current) return;

    const timer = window.setTimeout(() => {
      introHasRunRef.current = true; // one intro per session, never re-armed
      setShowLoader(true);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [isHomeRoute, isMediaLoaded, showLoader]);

  const handleIntroComplete = useCallback(() => {
    // onComplete fires the moment the sequence ends; the loader still plays
    // its own 650ms blur/scale exit. Keep it mounted ~700ms so that graceful
    // fade finishes instead of a hard unmount cut.
    introExitTimerRef.current = window.setTimeout(() => {
      introExitTimerRef.current = null;
      setShowLoader(false);
    }, 700);
  }, []);

  useEffect(() => () => {
    if (introExitTimerRef.current !== null) {
      window.clearTimeout(introExitTimerRef.current);
    }
  }, []);

  // Big O: Thread blocking reduction - navigation marked as interruptible (Concurrent React)
  // INP impact: Route changes don't block main thread, UI remains responsive
  // Space complexity: O(1) - only state transition, no additional DOM nodes
  const handleNavTransition = useCallback((navId: string) => {
    startTransition(() => {
      setActive(navId);
    });
  }, []);

  // Big O: Thread blocking reduction - scroll marked as interruptible (Concurrent React)
  // INP impact: Scroll-to-top doesn't block main thread during route changes
  // Space complexity: O(1) - only browser API call, no additional DOM nodes
  useEffect(() => {
    startTransition(() => {
      window.scrollTo(0, 0);
    });
  }, [location.pathname, startTransition]);

  // Set body class based on current route for page theming
  useEffect(() => {
    const pathname = location.pathname;
    const body = document.body;

    // Remove all page classes
    body.classList.remove(
      'page-home',
      'page-about',
      'page-gallery',
      'page-news',
      'page-news-detail',
      'page-capsules',
      'page-cabins',
      'page-koshk',
      'page-lighting',
      'page-shelves',
      'page-all-products',
      'page-category-overview',
      'page-product-detail'
    );

    // Add appropriate class based on route
    if (pathname === '/') {
      body.classList.add('page-home');
    } else if (pathname === '/about') {
      body.classList.add('page-about');
    } else if (pathname === '/gallery') {
      body.classList.add('page-gallery');
    } else if (pathname === '/news') {
      body.classList.add('page-news');
    } else if (pathname.startsWith('/news/')) {
      body.classList.add('page-news-detail');
    } else if (
      pathname === '/products/capsules' ||
      pathname === '/products/houses' ||
      pathname.startsWith('/products/al') ||
      pathname.startsWith('/products/am') ||
      pathname.startsWith('/products/as') ||
      pathname.startsWith('/products/cl') ||
      pathname.startsWith('/products/kl') ||
      pathname === '/products/container-house'
    ) {
      // Shared color group: Capsules and Houses
      body.classList.add('page-capsules');
    } else if (
      pathname.startsWith('/products/zl') ||
      pathname.startsWith('/products/pl') ||
      pathname.startsWith('/products/concrete-house-model') ||
      pathname === '/products/standard-house' ||
      pathname === '/products/garden-house' ||
      pathname === '/products/cabin-house' ||
      pathname === '/products/concrete-house'
    ) {
      // Cabins group
      body.classList.add('page-cabins');
    } else if (pathname === '/products/koshk') {
      body.classList.add('page-koshk');
    } else if (pathname === '/products/lighting') {
      body.classList.add('page-lighting');
    } else if (pathname === '/products/shelves') {
      body.classList.add('page-shelves');
    } else if (pathname === '/what-we-do' || pathname === '/products') {
      body.classList.add('page-all-products');
    } else if (pathname.startsWith('/products/category/')) {
      body.classList.add('page-category-overview');
    } else if (pathname.startsWith('/products/ka-')) {
      body.classList.add('page-koshk');
    } else if (pathname.startsWith('/products/') && pathname !== '/products') {
      body.classList.add('page-product-detail');
    } else {
      body.classList.add('page-all-products');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const ids = ["home", "special-works", "products", "works", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id === "works" ? "products" : e.target.id === "special-works" ? "specialWorks" : e.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  return (
    <div dir={dir} className="min-h-screen font-body text-gray-900">
      {/* First tab stop: keyboard users can jump straight to the content */}
      <a href="#main-content" className="skip-to-content">
        {t("a11y.skipToContent")}
      </a>
      <Header
        active={active}
        onNav={handleNavTransition}
      />
      {/* Big O: Hydration O(k) where k = footer components only (deferred to viewport entry) */}
      {/* Thread blocking: 0ms during initial load (hydrates on scroll) */}
      {/* Space complexity: O(k) where k = footer (1 component) vs O(n) total page components */}
      <FooterReveal
        footerContent={
          <SelectiveHydration threshold={0.1} rootMargin="0px 0px 200px 0px">
            <Footer onNav={handleNavTransition} />
          </SelectiveHydration>
        }
      >
        <main id="main-content" className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage onMediaLoaded={handleMediaLoaded} />} />

              {/* News pages */}
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />

              {/* Gallery page */}
              <Route path="/gallery" element={<GalleryPage />} />

              {/* About page */}
              <Route path="/about" element={<AboutPage />} />

              {/* Product and Category pages */}
              <Route path="/products/capsules" element={<CapsulesPage />} />
              <Route path="/products/houses" element={<HousesPage />} />
              <Route path="/products/koshk" element={<KoshkPage />} />
              <Route path="/what-we-do" element={<AllProductsPage />} />
              <Route path="/products" element={<AllProductsPage />} />
              <Route path="/products/lighting" element={<LightingPage />} />
              <Route path="/products/shelves" element={<ShelvesPage />} />
              <Route path="/products/category/:categorySlug" element={<CategoryOverviewPage />} />
              <Route path="/products/am" element={<CategoryOverviewPage />} />
              <Route path="/products/as" element={<CategoryOverviewPage />} />
              <Route path="/products/al" element={<CategoryOverviewPage />} />
              <Route path="/products/container-house" element={<CategoryOverviewPage />} />
              <Route path="/products/standard-house" element={<CategoryOverviewPage />} />
              <Route path="/products/garden-house" element={<CategoryOverviewPage />} />
              <Route path="/products/cabin-house" element={<CategoryOverviewPage />} />
              <Route path="/products/concrete-house" element={<CategoryOverviewPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
            </Routes>
          </Suspense>
        </main>
      </FooterReveal>
      <SocialSidebar />
      <BackToTop />
      {/* Delayed-fallback splash: this subtree is created ONLY after the hero
          image missed the 600ms grace window. The lazy chunk (framer-motion)
          is fetched at that exact moment, off the critical path. */}
      {showLoader && (
        <Suspense fallback={null}>
          <IntroLoader
            greetings={['Hello!', 'سڵاو!', 'Hola!', 'مَرْحَباً!', 'Bonjour!']}
            fullScreen={true}
            intervalMs={250}
            showProgress={true}
            allowSkip={true}
            className="z-[10001]"
            onComplete={handleIntroComplete}
          />
        </Suspense>
      )}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        prefillMessage={prefillMessage}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ContactModalProvider>
          <AppContent />
        </ContactModalProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}
