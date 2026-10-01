import { useEffect, useRef, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { SolutionPage } from "./pages/SolutionPage";
import { solutions } from "./data/solutions";
import { CapsulesPage } from "./pages/CapsulesPage";
import { HousesPage } from "./pages/HousesPage";
import { CategoryOverviewPage } from "./pages/CategoryOverviewPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { LightingPage } from "./pages/LightingPage";
import { ShelvesPage } from "./pages/ShelvesPage";
import { KoshkPage } from "./pages/KoshkPage";
import { AllProductsPage } from "./pages/AllProductsPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutPage } from "./pages/AboutPage";
import { TrustMarquee } from "./components/TrustMarquee";
import { SpecialFeatures } from "./components/SpecialFeatures";
import { FactoryInfoSection } from "./components/FactoryInfoSection";
import { ContactModal } from "./components/ContactModal";
import { ContactModalProvider, useContactModal } from "./contexts/ContactModalContext";
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
  Sparkles,
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
        />
      </span>

    </a>
  );
}

/* ---------------------------------- Header ---------------------------------- */
const NAV = [
  { id: "home", label: "سەرەکی", path: "/" },
  { id: "capsules", label: "کەپسولەکان", isDropdown: true },
  { id: "houses", label: "خانووەکان", isDropdown: true },
  { id: "cabins", label: "کابینەکان", isDropdown: true },
  { id: "koshk", label: "کۆشکەکان", isDropdown: true },
  { id: "artworks", label: "کارە هونەریەکان", isDropdown: true },
  { id: "workImages", label: "وێنەی کارەکانمان", path: "/gallery", isDropdown: false },
  { id: "news", label: "هەواڵەکان", path: "/news", isDropdown: false },
  { id: "about", label: "دەربارەی ئێمە", path: "/about" },
];

const CAPSULE_ITEMS = [
  { id: "al", label: "کەپسولەکانی نیشتەجێبوون", path: "/products/al", isComingSoon: false },
  { id: "am", label: "کەپسولەکانی ئیش و کار", path: "/products/am", isComingSoon: false },
  { id: "as", label: "کەپسولەکانی خزمەتگوزاری", path: "/products/as", isComingSoon: false },
];

const HOUSE_ITEMS = [
  { id: "container-house", label: "خانووی حاویە", path: "/products/cl", isComingSoon: false },
  { id: "cabin-house", label: "خانووی کوخ", path: "/products/kl", isComingSoon: true },
];

const CABIN_ITEMS = [
  { id: "standard-house", label: "کابینەیی ئاسایی", path: "/products/zl", isComingSoon: true },
  { id: "garden-house", label: "خانووی باخچە", path: "/products/pl", isComingSoon: true },
  { id: "concrete-house", label: "خانووی کۆنکریت", path: "/products/concrete-house-model", isComingSoon: true },
];

const KOSHK_ITEMS = [
  { id: "ka-b", label: "کۆشکی KA · B", path: "/products/ka-b", isComingSoon: false },
  { id: "ka-p", label: "کۆشکی KA · P", path: "/products/ka-p", isComingSoon: false },
  { id: "ka-g", label: "کۆشکی KA · G", path: "/products/ka-g", isComingSoon: false },
  { id: "ka-a", label: "کۆشکی KA · A", path: "/products/ka-a", isComingSoon: false },
];

const ARTWORK_ITEMS = [
  { id: "lighting", label: "عامودی لایت", path: "/products/lighting", isComingSoon: false },
  { id: "shelves", label: "ڕەفەکان", path: "/products/shelves", isComingSoon: false },
];

function Header({
  active,
  onNav,
}: {
  active: string;
  onNav: (id: string) => void;
}) {
  const { openContactModal } = useContactModal();
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isOverlay
          ? "bg-black/25 text-white backdrop-blur-[2px]"
          : "bg-white text-gray-900 shadow-md"
          }`}
        style={{ paddingTop: 'max(5px, env(safe-area-inset-top))' }}
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
                    className={`nav-link flex items-center gap-1 text-[14px] font-medium transition-colors ${(n.id === 'solutions' && location.pathname.includes('/solutions')) ||
                      (n.id === 'capsules' && (location.pathname.includes('/products/al') || location.pathname.includes('/products/am') || location.pathname.includes('/products/as'))) ||
                      (n.id === 'houses' && (location.pathname.includes('/products/standard-house') || location.pathname.includes('/products/concrete-house') || location.pathname.includes('/products/container-house') || location.pathname.includes('/products/garden-house') || location.pathname.includes('/products/cabin-house'))) ||
                      (n.id === 'artworks' && (location.pathname.includes('/products/lighting') || location.pathname.includes('/products/shelves')))
                      ? "active"
                      : isOverlay ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {n.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === n.id ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full right-0 pt-2 w-52 transition-all duration-200 ${openDropdown === n.id ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}>
                    <div className="rounded-xl bg-white shadow-xl ring-1 ring-black/5 py-2">
                      {n.id === 'solutions' && solutions.map((s) => (
                        <Link
                          key={s.id}
                          to={`/solutions/${s.id}`}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                        >
                          {s.title}
                        </Link>
                      ))}
                      {n.id === 'capsules' && CAPSULE_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                        >
                          {item.label}
                          {item.isComingSoon && <span className="mr-2 text-[11px] text-gray-500">- بەم زووانە..!</span>}
                        </Link>
                      ))}
                      {n.id === 'houses' && HOUSE_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                        >
                          {item.label}
                          {item.isComingSoon && <span className="mr-2 text-[11px] text-gray-500">- بەم زووانە..!</span>}
                        </Link>
                      ))}
                      {n.id === 'artworks' && ARTWORK_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                        >
                          {item.label}
                          {item.isComingSoon && <span className="mr-2 text-[11px] text-gray-500">- بەم زووانە..!</span>}
                        </Link>
                      ))}
                      {n.id === 'cabins' && CABIN_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                        >
                          {item.label}
                          {item.isComingSoon && <span className="mr-2 text-[11px] text-gray-500">- بەم زووانە..!</span>}
                        </Link>
                      ))}
                      {n.id === 'koshk' && KOSHK_ITEMS.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                        >
                          {item.label}
                          {item.isComingSoon && <span className="mr-2 text-[11px] text-gray-500">- بەم زووانە..!</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={n.id}
                  to={n.path || "/"}
                  className={`nav-link text-[13px] font-medium transition-colors ${(location.pathname === "/" ? active === n.id : location.pathname === n.path)
                    ? "active"
                    : isOverlay ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {n.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA LEFT */}
          <div className="flex items-center gap-2">
            <button
              onClick={openContactModal}
              className={`hidden items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold transition sm:inline-flex ${isOverlay
                ? "border border-white/70 bg-white/10 text-white hover:bg-white hover:text-gray-900"
                : "bg-brand text-white hover:bg-brand-dark"
                }`}
            >
              پەیوەندیمان پێوە بکە
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <button
              ref={menuButtonRef}
              onClick={() => setOpen(!open)}
              aria-label={open ? "داخستنی مێنیو" : "کردنەوەی مێنیو"}
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
          aria-label="مێنیوی سەرەکی"
          className={`mx-auto max-w-7xl overflow-hidden bg-white shadow-lg transition-all duration-300 lg:hidden ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="flex flex-col p-4">
            {NAV.map((n, i) => (
              n.isDropdown ? (
                <div key={n.id} className="flex flex-col border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => setMobileDropdowns({ ...mobileDropdowns, [n.id]: !mobileDropdowns[n.id] })}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-[13.5px] font-semibold text-gray-700 w-full text-right"
                  >
                    {n.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns[n.id] ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`flex flex-col pl-4 pr-8 pb-3 space-y-1 overflow-hidden transition-all duration-300 ${mobileDropdowns[n.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {n.id === 'solutions' && solutions.map((s) => (
                      <Link
                        key={s.id}
                        to={`/solutions/${s.id}`}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {s.title}
                      </Link>
                    ))}
                    {n.id === 'capsules' && CAPSULE_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {item.label}
                        {item.isComingSoon && <span className="mr-2 text-[10.5px] text-gray-500">- بەم زوانە بەردەست ئەبێت..!</span>}
                      </Link>
                    ))}
                    {n.id === 'houses' && HOUSE_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {item.label}
                        {item.isComingSoon && <span className="mr-2 text-[10.5px] text-gray-500">- بەم زوانە بەردەست ئەبێت..!</span>}
                      </Link>
                    ))}
                    {n.id === 'artworks' && ARTWORK_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {item.label}
                        {item.isComingSoon && <span className="mr-2 text-[10.5px] text-gray-500">- بەم زوانە بەردەست ئەبێت..!</span>}
                      </Link>
                    ))}
                    {n.id === 'cabins' && CABIN_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {item.label}
                        {item.isComingSoon && <span className="mr-2 text-[10.5px] text-gray-500">- بەم زوانە بەردەست ئەبێت..!</span>}
                      </Link>
                    ))}
                    {n.id === 'koshk' && KOSHK_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => { setOpen(false); setMobileDropdowns({}); }}
                        className="text-[12.5px] text-gray-600 hover:text-brand transition-colors py-1.5"
                      >
                        {item.label}
                        {item.isComingSoon && <span className="mr-2 text-[10.5px] text-gray-500">- بەم زوانە بەردەست ئەبێت..!</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={n.id}
                  to={n.path || "/"}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[13.5px] font-semibold transition border-b border-gray-100 last:border-0 ${active === n.id && location.pathname === "/"
                    ? "bg-brand-soft text-brand"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {n.label}
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
              پەیوەندیمان پێوە بکە
              <ArrowLeft className="h-4 w-4" />
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
    img: "/images/hero-antika.png",
    mobileImg: "/images/hero-mobile-1.png",
    cta1: "بینینی کارەکانمان",
    cta2: "دەربارەی ئێمە",
  },
  {
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
    img: "/images/hero-2.jpg",
    mobileImg: "/images/hero-mobile-2.png",
    cta1: "خزمەتگوزارییەکان",
    cta2: "پەیوەندی",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // textPhase: 'visible' | 'exiting' | 'entering'
  const [textPhase, setTextPhase] = useState<'visible' | 'exiting' | 'entering'>('visible');
  const [displayedSlide, setDisplayedSlide] = useState(0);

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
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const next = () => goTo((current + 1) % HERO_SLIDES.length);
  const prev = () => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[displayedSlide];

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
              <span className="whitespace-nowrap">{slide.tag}</span>
            </a>
          </div>
          <div className="hero-text-item">
            <h1 className="mt-4 font-display font-black leading-[1.2] text-white drop-shadow-lg" style={{ fontSize: 'clamp(28px, 7vw, 42px)' }}>
              {slide.title}
            </h1>
          </div>
          <div className="hero-text-item">
            <p className="mt-4 text-[15px] font-light leading-relaxed text-white/85 drop-shadow-md">
              {slide.desc}
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
              {slide.cta1}
              <ArrowLeft className="h-4 w-4" />
            </a>
            <a
              href="/about"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-black/20 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-sm transition hover:bg-brand/12 hover:backdrop-blur-md hover:border-brand/30 hover:shadow-[0_4px_16px_rgba(255,90,0,0.15)]"
            >
              {slide.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* ── Desktop layout: centered ── */}
      <div className="relative z-10 mx-auto hidden min-h-[100svh] max-w-7xl items-center px-4 pb-20 pt-32 sm:px-6 lg:flex lg:px-8">
        <div
          key={`desk-${displayedSlide}`}
          className="w-full max-w-2xl text-center lg:mr-0 lg:text-right"
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
              <span className="whitespace-nowrap">{slide.tag}</span>
            </a>
          </div>
          <div className="hero-text-item">
            <h1 className="mt-6 font-display font-black leading-[1.2] text-white drop-shadow-lg" style={{ fontSize: 'clamp(36px, 6vw, 68px)' }}>
              {slide.title}
            </h1>
          </div>
          <div className="hero-text-item">
            <p className="mt-6 text-[17px] font-light leading-relaxed text-white/90 drop-shadow-md lg:text-[19px]">
              {slide.desc}
            </p>
          </div>
          <div className="hero-text-item" style={{ animationDelay: '280ms' }}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/products"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white shadow-lg transition hover:bg-brand-dark sm:w-auto"
              >
                {slide.cta1}
                <ArrowLeft className="h-4 w-4" />
              </a>
              <a
                href="/about"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-black/10 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-sm transition hover:bg-brand/12 hover:backdrop-blur-md hover:border-brand/30 hover:shadow-[0_4px_16px_rgba(255,90,0,0.15)] sm:w-auto"
              >
                {slide.cta2}
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
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute bottom-6 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900 sm:right-8"
        aria-label="Next slide"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </section>
  );
}

/* ---------------------------------- Use Cases Grid ---------------------------------- */
const USE_CASES = [
  {
    img: "/images/Commercial-Kiosks.jpg",
    title: "کۆشکی بازرگانی",
    desc: "کۆشکی مۆدێرن بۆ خاڵەکانی فرۆشتن، شوێنی بلیت بڕین، دوکانی بچووک، یان دوکانی گەڕۆک(گواستراوە) دیزاین کراوە تا بزنسەکەت لە بازاڕدا دەستبەجێ دیار و جیاواز بێت",
    features: [
      "دیزاینێکی کراوە بە ڕووی کڕیاردا لەگەڵ شووشەی بەهێز و پارێزراو",
      "شوێنی تایبەت بۆ دانانی لۆگۆ، تابلۆی ڕووناکی، و بڕاندینگی کۆمپانیا",
      "سیستەمی قوفڵ و پاراستنی بەهێز بۆ کەلوپەلەکانی ناوەوە"
    ],
    benefits: [
      "ڕاکێشانی سەرنجی خێرا لە شوێنە گشتییەکان و مۆڵەکاندا",
      "ئاسانی لە گواستنەوەی کۆشکەکە بۆ جێگەیەکی نوێ بەپێی جووڵەی بازاڕ"
    ]
  },
  {
    img: "/images/Office-seating.jpg",
    title: "ئۆفیس و شوێنی دانیشتنی تایبەت",
    desc: "کەپسولی فرە-مەبەست بۆ دروستکردنی شوێنێکی کاری سەربەخۆ لە حەوشەی ماڵەکەت، یان وەک ژوورێکی کۆڕ و کۆبوونەوەی مۆدێرن بۆ کۆمپانیا و شوێنە بازرگانییەکان",
    features: [
      "عەزلی دەنگی بەهێز (Acoustic Insulation) بۆ دەستەبەرکردنی بێدەنگی و تەرکیزی بەرز",
      "دیکۆر و ڕووناکی مۆدێرن لەگەڵ شوێنی پێویست بۆ مێز و کەلوپەلی ئۆفیس",
      "مۆدێلی گۆڕاو بەپێی حەز و پێداویستییەکانی موشتەری"
    ],
    benefits: [
      "جیاکردنەوەی ژینگەی کار لە ژیانی تایبەتی لە ماڵەوە (Remote Work)",
      "بەخشینی سیمایەکی ناوازە و پڕۆفیشناڵ بە کۆمپانیاکەت لە کاتی کۆبوونەوەکاندا"
    ]
  },
  {
    img: "/images/Resort Housing.jpg",
    title: "خانوو و شوێنی مانەوەی گەشتیاری",
    desc: "چارەسەرێکی تەلارسازیی هاوچەرخ بۆ گوندە گەشتیارییەکان، هاوینە هەوارەکان، و ناوچە شاخاوییەکان. ئەم کەپسولانە بە تایبەت دیزاین کراون بۆ ئەوەی ببنە شوێنێکی ئاسوودەی مانەوەی گەشتیاران لەسەختترین دۆخەکانی کەش و هەوادا",
    features: [
      "عەزلی گەرمی و سەرمای بەهێز بۆ بەرگەگرتنی بەفر، بارانی بەخوڕ و پلەی گەرمیی بەرز",
      "پەنجەرەی شووشەیی دەبڵ (Double Glazed)ی پانۆڕامی بۆ بینینی دیمەنە سروشتییەکان",
      "پێکهاتەی دژە ڕزین و دژە ژەنگ بۆ بەکارهێنانی درێژخایەن لە سروشتدا"
    ],
    benefits: [
      "ڕاکێشانی گەشتیاران بەهۆی دیزاینە ناوازە و قەبارە گونجاوەکەی",
      "دامەزراندنی زۆر خێرا لە ناوچە دوورەدەستەکان بێ پێویستبوون بە ئامێری بیناسازیی قورس"
    ]
  },
  {
    img: "/images/Site-Accommodation.jpg",
    title: "کەمپی کار و پڕۆژەکان",
    desc: "یەکەی کاری خێرا و ئامادەکراو بۆ کۆمپانیاکانی بیناسازی، نەوت، و بەڵێندەرایەتی. چارەسەرێکی خێرا دەبەخشێت بۆ نیشتەجێکردنی کارمەند و ئەندازیاران لە شوێنی کارکردندا",
    features: [
      "پێکهاتەی ئاسنی بەهێز بۆ بەرگەگرتنی کارکردنی سەختی مەیدانی",
      "توانای هەڵگرتن و گوواستنەوەی ئاسان بە فۆڕکلیفت یان کرێن بۆ پڕۆژەی تر",
    ],
    benefits: [
      "دەستبەجێ بەکارهێنان بێ بەفیڕۆدانی کاتی بیناسازی لە شوێنی پڕۆژەکەدا",
      "دابینکردنی ژینگەیەکی ئاسوودە و بەرزکردنەوەی ئاستی بەرهەمهێنانی کارمەندان"
    ]
  },
  {
    img: "/images/Food-Trucks.jpg",
    title: "عارەبانە و کۆشکی خواردەمەنی",
    desc: "عەرەبانە و کۆشکی ئامادەکردنی خواردن و خواردنەوە بە قەبارەی جیاواز، دیزاینکراوە بۆ دەستپێکردنی پڕۆژەی خواردەمەنی بە شێوازێکی زۆر سەرنجڕاکێش و مۆدێرن",
    features: [
      "دروستکردنی ڕووی ناوەوە بە ئینۆکس (Stainless Steel)ی دژە ژەنگ و ئاسان بۆ پاککردنەوە",
      "داڕشتنی شوێنی تایبەت بۆ ئامێرەکان (ساردکەرەوە، بارێستا، گریڵ) و تۆڕی ئاوی پاک و ئاوەڕۆ",
      "پەنجەرەی گونجاو (Serving Window) بۆ پێشکەشکردنی بەرهەمەکان بە کڕیاران"
    ],
    benefits: [
      "دەستپێکردنی پڕۆژە بە تێچووی زۆر کەمتر لە بەکرێگرتنی دوکان و چێشتخانە",
      "توانای گواستنەوەی ئاسان بۆ بەشداریکردن لە فێستیڤاڵ و شوێنە قەرەباڵغەکاندا"
    ]
  },
  {
    img: "/images/Tiny-House.jpg",
    title: "یەکەی نیشتەجێبوونی بچووک",
    desc: "یەکەیەکی نیشتەجێبوونی تەواو گونجاو بە قەبارەیەکی بچووک بۆ ئەوانەی دەیانەوێت ماڵێکی بچووک و سەربەخۆ لەسەر زەوی خۆیان یان لەناو سروشت، باخ، مەزرەعە بەپێی بەرزترین ستانداردەکانی ژیان دروست بکەن",
    features: [
      "دیزاینی مۆدێرنی ناوەوە (ژووری نووستن، چێشتخانە، و حەمام/توالێت)",
      "بەکارهێنانی مەواددی دۆستی ژینگە و نەهێشتنی بەفیڕۆچوونی وزە (ساردکەرەوە و گەرمکەرەوە)",
      "تێکهەڵکێشکردنی سیستەمی ڕووناکی سروشتی لە ڕێگەی شووشەی ژیرەوە"
    ],
    benefits: [
      "کەمکردنەوەی بەرچاوی تێچووی مانگانەی کارەبا و سووتەمەنی",
      "دابینکردنی ژینگەیەکی ئارام و تەندروست بۆ بەسەربردنی چەن مانگێک یان پشوودانی کۆتایی هەفتە"
    ]
  },
];

function UseCases() {
  const [activeCase, setActiveCase] = useState(USE_CASES[0]);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            بەرهەمەکانمان لە کوێ بەکارئەهێنرێت؟
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            گونجاو بۆ هەر پڕۆژەیەک کە لە خەیاڵتایە!
          </h2>
        </Reveal>

        {/* Main Image Display - Significantly smaller and further back */}
        <div className="relative mb-12 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" dir="ltr">
            {/* Image - Left side */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                key={activeCase.img}
                src={activeCase.img}
                alt={activeCase.title}
                className="h-full w-full object-contain transition-all duration-700 ease-in-out"
                loading="eager"
              />
            </div>

            {/* Text - Right side, black color */}
            <div className="text-right" dir="rtl">
              <h3 className="font-display text-2xl font-bold sm:text-3xl text-gray-900">
                {activeCase.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                {activeCase.desc}
              </p>
              {activeCase.features && (
                <div className="mt-4">
                  <h4 className="font-bold text-gray-900 mb-2">تایبەتمەندییەکان:</h4>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1">
                    {activeCase.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {activeCase.benefits && (
                <div className="mt-4">
                  <h4 className="font-bold text-gray-900 mb-2">سوودەکان:</h4>
                  <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1">
                    {activeCase.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Glassmorphism Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {USE_CASES.map((useCase) => (
            <button
              key={useCase.title}
              onMouseEnter={() => setActiveCase(useCase)}
              className={`
                relative overflow-hidden rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300
                backdrop-blur-md border
                ${activeCase.img === useCase.img
                  ? 'bg-brand/15 border-brand/40 scale-105'
                  : 'bg-white/60 border-gray-200/50 hover:bg-brand/12 hover:backdrop-blur-md hover:border-brand/30 hover:scale-102'
                }
              `}
            >
              <span className="relative z-10 text-gray-900">
                {useCase.title}
              </span>
              {activeCase.img === useCase.img && (
                <div className="absolute inset-0 bg-brand/10" />
              )}
            </button>
          ))}
        </div>

        <Reveal delay={300} className="text-center">
          <a
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-8 py-3.5 text-[14px] font-bold text-gray-900 transition hover:border-brand hover:text-brand"
          >
            هەموو ببینە
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}



/* ---------------------------------- Slanted Parallax Banner ---------------------------------- */
function SlantedBanner() {
  return (
    <section className="slanted-parallax-section relative isolate min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center" role="img" aria-label="کەپسولی نیشتەجێبوون و مۆدێرنی کارگەی ئەنتیکا">
      {/* Decorative center badge / text that makes it lively on both mobile & desktop */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[12px] sm:text-[13.5px] font-bold text-white backdrop-blur-md mb-3 shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            تەلارسازی و دیزاینی سەردەمیانە
          </div>
          <h3 className="font-display text-[24px] sm:text-[36px] md:text-[44px] font-black text-white drop-shadow-xl leading-[1.3]">
            کوالیتی بەرز و پێکهاتەی بەهێز
          </h3>
          <p className="mt-2 text-[13px] sm:text-[16px] text-gray-200/90 max-w-xl mx-auto drop-shadow font-medium">
            بەرهەمهێنانی زیرەکانە بە پێشکەوتووترین شێوازی ئەندازیاری
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
    desc: "پەیوەندی بکە و داواکاریەکەت بڵێ بۆ دیزاین",
  },
  {
    n: "02",
    title: "دیزاین",
    desc: "دیزاینی تایبەت و پلانێکی وردبینی بۆ پرۆژەکەت",
  },
  {
    n: "03",
    title: "بەرهەمهێنان",
    desc: "دروستکردن لە کارگەی خۆمان بە کوالێتی بەرز",
  },
  {
    n: "04",
    title: "دابەشکردن",
    desc: "گەیاندن و دابەشکردن لە کاتی دیاریکراودا",
  },
];

function Process() {
  return (
    <section className="process-diagonal-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            پرۆسەکەمان
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            ٤ قۆناغی سادە
          </h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand text-white font-display text-2xl font-black">
                  {step.n}
                </div>
                <h3 className="font-display text-[18px] font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-[14px] text-gray-600">{step.desc}</p>
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
  return (
    <section className="contact-cta-parallax relative isolate">
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 py-20 sm:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/20 px-4 py-1.5 text-[13px] font-bold text-brand-light backdrop-blur-md mb-4">
            کارگەی ئەنتیکا
          </span>
          <h2 className="font-display text-[28px] sm:text-[36px] md:text-[46px] font-black leading-[1.3] text-white drop-shadow-lg">
            ئامادەیت پرۆژەکەت دەست پێ بکەین؟
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] sm:text-[16.5px] font-medium text-white/90 drop-shadow-md">
            پەیوەندی بکە بە ئێمەوە بۆ ڕاوێژپێکردن و زانیاری نرخ
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
    // Wait for footer to render before measuring
    const timer = setTimeout(() => {
      measureFooterHeight();
    }, 100);

    window.addEventListener('resize', measureFooterHeight);
    return () => {
      clearTimeout(timer);
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
          background: '#fff'
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
function FooterContent({ onNav: _onNav }: { onNav?: (id: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-gray-900 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-12 lg:grid-cols-4 lg:gap-8">
          {/* 1 BRAND */}
          <Reveal>
            <div className="text-right">
              <Logo />
              <p className="mt-5 max-w-[260px] text-[13.5px] font-light leading-7 text-gray-400">
                ئەنتیکا، تێکەڵەیەک لە هونەر و تەلارسازیی هاوچەرخ
              </p>
              <div className="mt-6">
                <p className="text-[13px] font-bold text-gray-300">ئێمە لە سۆشیال میدیا</p>
                <div className="mt-3 flex gap-3">
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
                      className="grid h-11 w-11 place-items-center rounded-full border border-gray-700 text-gray-400 transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <s.icon className="h-[17px] w-[17px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2 CONTACT */}
          <Reveal delay={100}>
            <div className="text-right">
              <h4 className="font-display text-[17px] font-extrabold">پەیوەندیمان پێوە بکە</h4>
              <ul className="mt-5 space-y-4 text-[13.5px]">
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-gray-400" dir="ltr">+964 750 123 4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-gray-400" dir="ltr">info@antika-factory.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-gray-400">سلێمانی، عێراق</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="text-gray-400">شەممە - پێنجشەممە، 9:00 - 6:00</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* 3 NAVIGATION */}
          <Reveal delay={180}>
            <div className="text-right">
              <h4 className="font-display text-[16px] font-extrabold">بەستەرەکان</h4>
              <ul className="mt-5 space-y-3 text-[13.5px]">
                {NAV.filter(n => !n.isDropdown).map((n) => (
                  <li key={n.id}>
                    <Link
                      to={n.path || "/"}
                      className="text-gray-400 transition hover:text-brand"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 4 CONTACT FORM */}
          <Reveal delay={220}>
            <div className="text-right">
              <h4 className="font-display text-[16px] font-extrabold">نامە بنێرە</h4>
              {sent ? (
                <div className="mt-5 rounded-xl bg-brand/20 p-6 text-center">
                  <p className="text-[14px] font-bold text-brand">سوپاس! نامەکەت گەیشت.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                    setTimeout(() => setSent(false), 3000);
                  }}
                  className="mt-5 space-y-3"
                >
                  <input
                    type="text"
                    placeholder="ناو"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="ئیمەیڵ"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none"
                    required
                  />
                  <textarea
                    placeholder="نامەکەت"
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-[14.5px] font-bold text-white transition hover:bg-brand-dark"
                  >
                    ناردن
                    <Send className="h-4 w-4 -scale-x-100" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 py-6 sm:flex-row">
          <div className="flex items-center gap-2 text-[12.5px] font-medium text-gray-500">
            <Link to="/#works" className="px-4 py-4 transition hover:text-brand">دیزاین</Link>
            <span className="h-1 w-1 rounded-full bg-gray-700" />
            <Link to="/about" className="px-4 py-4 transition hover:text-brand">هونەر</Link>
            <span className="h-1 w-1 rounded-full bg-gray-700" />
            <Link to="/#contact" className="px-4 py-4 transition hover:text-brand">ئەندازیاری</Link>
          </div>
          <p className="text-[12.5px] text-gray-500">© 2026 ANTIKA FACTORY. هەموو مافەکان پارێزراون.</p>
        </div>
      </div>
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

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('socialSidebarVisible', String(isVisible));
  }, [isVisible]);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Toggle Tab (visible when sidebar is hidden) */}
      <button
        onClick={toggleSidebar}
        aria-label="Show sidebar"
        className={`fixed left-0 z-50 grid h-12 w-8 place-items-center rounded-r-full bg-gray-800 text-white shadow-lg transition-all duration-300 hover:bg-gray-700 ${isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          left: 'max(0px, env(safe-area-inset-left))'
        }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <div
        className="fixed left-0 z-50 flex flex-col items-center rounded-[14px] bg-white transition-all duration-300"
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
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>فەیسبووک</span>
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
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>یوتیوب</span>
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
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>ئینستاگرام</span>
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
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>تیکتۆک</span>
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
          <span className="font-semibold text-[#ff4500]" style={{ fontSize: 'clamp(13px, 2vh, 16px)' }}>واتسئاپ</span>
        </a>

        {/* Toggle Button (inside sidebar) */}
        <button
          onClick={toggleSidebar}
          aria-label="Hide sidebar"
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
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="بگەڕێوە سەرەوە"
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
function HomePage() {
  return (
    <>
      <Hero />
      <UseCases />
      <FactoryInfoSection />
      <TrustMarquee />
      <SpecialFeatures />
      <SlantedBanner />
      <Process />
      <WhyChooseUs />
      <Capabilities />
      <ContactCTA />
    </>
  );
}

/* ----------------------------------- App ----------------------------------- */
function AppContent() {
  const [active, setActive] = useState("home");
  const { isContactModalOpen, closeContactModal } = useContactModal();
  const location = useLocation();

  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const ids = ["home", "products", "works", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id === "works" ? "products" : e.target.id);
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
    <div dir="rtl" className="min-h-screen bg-white font-body text-gray-900">
      <Header
        active={active}
        onNav={setActive}
      />
      <FooterReveal
        footerContent={<Footer onNav={setActive} />}
      >
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions/:id" element={<SolutionPage />} />

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
        </main>
      </FooterReveal>
      <SocialSidebar />
      <BackToTop />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ContactModalProvider>
        <AppContent />
      </ContactModalProvider>
    </BrowserRouter>
  );
}
