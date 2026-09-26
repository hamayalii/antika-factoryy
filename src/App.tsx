import { useEffect, useRef, useState } from "react";
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
import { TrustMarquee } from "./components/TrustMarquee";
import { CertificatesMarquee } from "./components/CertificatesMarquee";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  X,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.5 8.8v11H3.2v-11h3.3ZM4.8 3.5a1.9 1.9 0 1 1 0 3.9 1.9 1.9 0 0 1 0-3.9ZM20.5 13.4v6.4h-3.3v-6c0-1.5-.6-2.4-2-2.4-1.1 0-1.7.7-2 1.4-.1.3-.1.6-.1 1v5.9H9.8v-11h3.3v1.5c.4-.7 1.2-1.7 3-1.7 2.2 0 4.4 1.5 4.4 5Z" />
  </svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.9C18.2 4.9 12 4.9 12 4.9s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27.3 27.3 0 0 0 2 12a27.3 27.3 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.9c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.9A27.3 27.3 0 0 0 22 12a27.3 27.3 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
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
function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2 group">
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
  { id: "about", label: "دەربارەی ئێمە", path: "/#about" },
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
          <Logo />

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
            <Link
              to="/#contact"
              className={`hidden items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold transition sm:inline-flex ${isOverlay
                ? "border border-white/70 bg-white/10 text-white hover:bg-white hover:text-gray-900"
                : "bg-brand text-white hover:bg-brand-dark"
                }`}
            >
              پەیوەندیمان پێوە بکە
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            </Link>
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
            <Link
              to="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-[13.5px] font-semibold text-white"
            >
              پەیوەندیمان پێوە بکە
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

/* ---------------------------------- Hero Slider ---------------------------------- */
const HERO_SLIDES = [
  {
    tag: "ئێمە هونەر و مۆدێرنمان بۆ ئێوە تێکەڵ کردووە",
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
    tag: "ئێمە هونەر و مۆدێرنمان بۆ ئێوە تێکەڵ کردووە",
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
            <span className="inline-flex items-center gap-2 border-b-2 border-brand px-1 pb-2 text-[12px] font-semibold text-white drop-shadow-md">
              {slide.tag}
            </span>
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
              href="#works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white shadow-lg transition hover:bg-brand-dark"
            >
              {slide.cta1}
              <ArrowLeft className="h-4 w-4" />
            </a>
            <a
              href="#about"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-black/20 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900"
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
            <span className="inline-flex items-center gap-2 border-b-2 border-brand px-1 pb-2 text-[13px] font-semibold text-white drop-shadow-md">
              {slide.tag}
            </span>
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
                href="#works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white shadow-lg transition hover:bg-brand-dark sm:w-auto"
              >
                {slide.cta1}
                <ArrowLeft className="h-4 w-4" />
              </a>
              <a
                href="#about"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-black/10 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900 sm:w-auto"
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
    img: "/images/ka-b.jpg",
    title: "کۆشکی خواردەمەنی",
    desc: "کۆشکی خواردەمەنی بەردەستە بە دیزاینێکی مۆدێرن و بۆشاییەکی پێویست بۆ کاری گەس و شاورمە",
  },
  {
    img: "/images/am-k.jpg",
    title: "شوێنی تایبەت بە کۆفی برەیک",
    desc: "کەپسولی AM • K بەردەستە بۆ شوێنێکی سەرنجڕاکێش بۆ حەوانەوە، خواردنەوەی قاوە و وەرگرتنی وزە لە کاتی ماندوێتی کاردا",
  },
  {
    img: "/images/am-t.jpg",
    title: "ژووری کۆڕ و کۆبوونەوەکان",
    desc: "کەپسولی AM • T بەردەستە بۆ ژینگەیەکی بێدەنگکراو (Acoustic) و تایبەت بۆ ئەنجامدانی کۆبوونەوە و گفتوگۆ گرنگەکانت بەبێ تێکچوونی تەرکیز",
  },
  {
    img: "/images/am-g.jpg",
    title: "ناوەندی خاڵی فرۆشتن",
    desc: "کەپسولی AM • G بە دیزاینێکی مۆدێرنی بازرگانی بەردەستە بۆ نمایشکردن و فرۆشتنی ڕاستەوخۆی بەرهەمەکانت بە شێوازێک کە سەرنجی موشتەری ڕابکێشێت",
  },
  {
    img: "/images/watch-cabin.jpg",
    title: "یەکەی چاودێری",
    desc: "کەپسولی چاودێری AS بەردەستە بە دیزاینێکی مۆدێرنی و گونجاو بۆ یەکەکانی چاودێری",
  },
  {
    img: "/images/al-8.jpg",
    title: "کەپسولی یەکەی نیشتەجێبوون",
    desc: "کەپسولی AL • 8 بە دیزاینێکی مۆدێرنی جوان بەردەستە بۆ بۆ بەسەربردنی کاتێکی ئارام و خەوێکی قووڵ",
  },
];

function UseCases() {
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 100}>
              <div className="group overflow-hidden rounded-xl bg-gray-50 shadow-sm transition hover:shadow-md">
                <div className="zoom-img relative h-48 overflow-hidden sm:h-56">
                  <img
                    src={uc.img}
                    alt={uc.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <div className="absolute inset-0 bg-brand/0 transition group-hover:bg-brand/20" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[18px] font-bold text-gray-900">{uc.title}</h3>
                  <p className="mt-2 text-[14px] text-gray-600">{uc.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-10 text-center">
          <a
            href="#contact"
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

/* ---------------------------------- Products Grid (بەرهەمەکانمان) ---------------------------------- */
type Work = {
  id: string;
  cat: string;
  img: string;
  title: string;
  desc: string;
  tag: string;
  link: string;
};

const WORKS: Work[] = [
  {
    id: "capsule",
    cat: "کەپسولە مۆدولارەکان",
    img: "/images/work-capsule.png",
    title: "کەپسولەکان",
    desc: "کەپسولە مۆدێرن و پێشکەوتووەکان بۆ نیشتەجێبوون، ئیش و کار، و خزمەتگوزاری لە زنجیرەکانی AL, AM, AS",
    tag: "٣ زنجیرە • ١٦+ مۆدێل",
    link: "/products/capsules",
  },
  {
    id: "houses",
    cat: "خانووە مۆدولارەکان",
    img: "/images/container-cabin-2.jpg",
    title: "خانوو",
    desc: "خانووی حاویە، کابینەی ئاسایی، خانووی باخچە، خانووی کوخ و خانووی کۆنکریت بە دیزاینی ئەندازیاری و کوالێتی بەرز",
    tag: "٥ جۆری سەرەکی",
    link: "/products/houses",
  },
  {
    id: "koshk",
    cat: "کۆشکی بازرگانی",
    img: "/images/am-k.jpg",
    title: "کۆشکەکان",
    desc: "کۆشکی بازرگانی KA بۆ فرۆشگا، پارک، نیشتەجێبوون و بەکارهێنانی بازرگانی بە مۆدێلی جیاواز",
    tag: "KA • ٤ مۆدێل",
    link: "/products/koshk",
  },
];

function Works() {
  return (
    <section id="products" className="relative bg-gray-50 py-16 sm:py-24" style={{ scrollMarginTop: '80px' }}>
      <span id="works" className="absolute -top-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            بەرهەمەکانمان
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            دروستکردنی ژینگەیەکی هونەری و مۆدێرن
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-gray-600">
            لە کەپسولە مۆدولارەکان، خانوو و کۆشکی بازرگانی، هەموو وردەکارییەک بەوپەڕی داهێنان و شارەزایی ئەندازیارییەوە جێبەجێ دەکەین
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((w, i) => (
            <Reveal key={w.id} delay={i * 100}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg flex flex-col h-full">
                <Link to={w.link} className="zoom-img relative h-60 overflow-hidden block">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-gray-900 backdrop-blur">
                    {w.tag}
                  </span>
                </Link>
                <div className="p-5 flex flex-col flex-1 justify-between text-right">
                  <div>
                    <h3 className="font-display text-[18px] font-bold text-gray-900">
                      <Link to={w.link} className="hover:text-brand transition">
                        {w.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[13.5px] text-gray-600 leading-relaxed">{w.desc}</p>
                  </div>
                  <Link
                    to={w.link}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-brand-dark"
                  >
                    زیاتر بزانە
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-[14px] font-bold text-gray-900 transition hover:border-brand hover:text-brand shadow-sm"
          >
            بینینی سەرجەم بەرهەمەکانمان
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 4000,
  digitHeight = 44,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  digitHeight?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setStarted(true));
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.75 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const numbers = Array.from({ length: target + 1 }, (_, i) => i);

  // gradient mask — سەر و خوار محو دەبن
  const maskStyle = {
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
    maskImage:
      "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
  };

  return (
    <span
      ref={ref}
      dir="ltr"
      className="inline-flex items-center tabular-nums select-none"
      style={{ verticalAlign: "middle" }}
    >
      {prefix && (
        <span style={{ lineHeight: `${digitHeight}px` }}>{prefix}</span>
      )}

      {/* پنجەرەی دیتن + gradient mask */}
      <span
        style={{
          display: "inline-block",
          height: `${digitHeight}px`,
          overflow: "hidden",
          position: "relative",
          ...maskStyle,
        }}
      >
        {/* ستوونی خلیسکان + motion blur */}
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            transform: started
              ? `translateY(-${target * digitHeight}px)`
              : "translateY(0px)",
            transition: started
              ? `transform ${duration}ms cubic-bezier(0.08, 0.92, 0.18, 1)`
              : "none",
            willChange: "transform",
          }}
        >
          {numbers.map((n) => (
            <span
              key={n}
              style={{
                height: `${digitHeight}px`,
                lineHeight: `${digitHeight}px`,
                display: "block",
              }}
            >
              {n}
            </span>
          ))}
        </span>
      </span>

      {suffix && (
        <span style={{ lineHeight: `${digitHeight}px` }}>{suffix}</span>
      )}
    </span>
  );
}

/* ---------------------------------- About ---------------------------------- */
function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24" style={{ scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Text RIGHT */}
          <div className="order-1 lg:order-2 w-full text-right">
            <div className="text-right inline-block w-full">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13px] font-bold text-brand">
                  <Sparkles className="h-4 w-4" />
                  دەربارەی ئێمە
                </span>
                <h2 className="mt-5 font-display text-[32px] font-black leading-[1.3] text-gray-900 sm:text-[42px] text-right">
                  کارگەیەک کە هونەر
                  <br />
                  دەکاتە <span className="text-brand">ژیان</span>
                </h2>
                <p className="mt-5 text-[24px] font-light leading-9 text-gray-600 text-right">
                  ئێمە لە کارگەی ئەنتیکا ژینگەیەک بونیاد دەنێین کە شایەنی متمانەی ئێوەبێت
                  تیمەکەمان لە کۆمەڵێک ئەندازیار و تەکنیککاری خاوەن ئەزموون پێکهاتووە کە ساڵانێکی درێژە لە بواری بیناسازی
                  و خانوی کەپسولیدا کار دەکەن...<br></br>
                  ئامانجی ئێمە دابینکردنی شوێنێکی مۆدێرن و ئارامە بۆ ئەوەی داهاتوویەکی گەش بۆ خۆت و خێزانەکەت مسۆگەر بکەیت
                </p>
              </Reveal>
              <Reveal delay={150}>
                <ul className="mt-6 space-y-3.5">
                  {[
                    "تیمی ئەندازیار و دیزاینەری نێودەوڵەتی",
                    "کارگەی تایبەتی خۆمان بۆ بەرهەمهێنان",
                    "مەوادی کوالێتی بەرز و ئۆرجیناڵ",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[14.5px] font-semibold text-gray-700">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={250}>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-7">
                  {[
                    { target: 300, suffix: "+", l: "پرۆژەی تەواو", d: 4000 },
                    { target: 20, suffix: "", l: "ساڵ ئەزموون", d: 2500 },
                    { target: 100, suffix: "%", l: "ڕەزامەندی", d: 3500 },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-display text-[26px] font-black text-gray-900 sm:text-[32px]">
                        <AnimatedCounter target={s.target} suffix={s.suffix} duration={s.d} digitHeight={34} />
                      </div>
                      <div className="mt-1 text-[12.5px] font-medium text-gray-500">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[14.5px] font-bold text-white transition hover:bg-brand-dark"
                  >
                    پەیوەندیمان پێوە بکە
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
          {/* Images LEFT */}
          <Reveal className="order-2 lg:order-2">
            <div className="relative">
              <div className="zoom-img overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/images/studio-about.jpg"
                  alt="ستۆدیۆی ANTIKA FACTORY"
                  className="h-[400px] w-full object-cover sm:h-[500px]"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-brand px-6 py-4 text-white shadow-xl sm:block">
                <div className="font-display text-[32px] font-black leading-none">
                  <AnimatedCounter target={300} suffix="+" duration={3200} />
                </div>
                <div className="text-[12px] font-medium text-white/80">
                  پرۆژەی سەرکەوتوو
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



/* ---------------------------------- Custom Parallax Hook ---------------------------------- */
function useParallax(speed = 0.16) {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!ref.current || !bgRef.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if visible on screen
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const offset = (rect.top - windowHeight / 2) * speed;
        bgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return { ref, bgRef };
}

/* ---------------------------------- Slanted Parallax Banner ---------------------------------- */
function SlantedBanner() {
  const { ref, bgRef } = useParallax(0.15);

  return (
    <section ref={ref} className="slanted-parallax-section relative isolate min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center overflow-hidden">
      {/* Background layer with parallax translateY */}
      <div
        ref={bgRef}
        className="slanted-parallax-inner"
        role="img"
        aria-label="کەپسولی نیشتەجێبوون و مۆدێرنی کارگەی ئەنتیکا"
      />

      {/* Subtle black overlay to give soft dark tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

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
  const { ref, bgRef } = useParallax(0.22);

  return (
    <section ref={ref} className="contact-cta-parallax relative isolate overflow-hidden">
      {/* Background layer with parallax image */}
      <div className="absolute inset-0 z-0">
        <div ref={bgRef} className="contact-parallax-inner" />
        {/* Very subtle orange tint + dark overlay for maximum image clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/40" />
        <div className="absolute inset-0 bg-brand/10 mix-blend-overlay pointer-events-none" />
      </div>

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
              <PhoneCall className="h-5 w-5" />
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

/* ---------------------------------- Footer ---------------------------------- */
function Footer({ onNav: _onNav }: { onNav?: (id: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <footer id="contact" className="bg-gray-900 pt-16 text-white">
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
            <Link to="/#about" className="px-4 py-4 transition hover:text-brand">هونەر</Link>
            <span className="h-1 w-1 rounded-full bg-gray-700" />
            <Link to="/#contact" className="px-4 py-4 transition hover:text-brand">ئەندازیاری</Link>
          </div>
          <p className="text-[12.5px] text-gray-500">© 2026 ANTIKA FACTORY. هەموو مافەکان پارێزراون.</p>
        </div>
      </div>

      {/* Floating Actions */}
      <FloatingActions />
      <BackToTop />
    </footer>
  );
}

/* ---------------------------------- Floating Actions ---------------------------------- */
function FloatingActions() {
  return (
    <div className="fixed bottom-24 left-6 z-40 flex flex-col gap-3 sm:bottom-24 sm:left-6" style={{
      left: 'max(24px, env(safe-area-inset-left))',
      bottom: 'max(100px, env(safe-area-inset-bottom))'
    }}>
      <a
        href="https://wa.me/9647501234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-green-500 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href="tel:+9647501234567"
        aria-label="Call"
        className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      >
        <PhoneCall className="h-5 w-5" />
      </a>
      <a
        href="mailto:info@antika-factory.com"
        aria-label="Email"
        className="grid h-12 w-12 place-items-center rounded-full bg-gray-700 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      >
        <Mail className="h-5 w-5" />
      </a>
    </div>
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
      className={`fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gray-700 text-white shadow-lg transition-all duration-300 hover:bg-gray-600 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      style={{
        bottom: 'max(24px, env(safe-area-inset-bottom))',
        left: 'max(24px, env(safe-area-inset-left))'
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
      <Works />
      <TrustMarquee />
      <About />
      <CertificatesMarquee />
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
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const ids = ["home", "products", "works", "about", "contact"];
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
    <div dir="rtl" className="min-h-screen bg-white font-body text-gray-900 flex flex-col">
      <Header active={active} onNav={setActive} />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions/:id" element={<SolutionPage />} />

          {/* News pages */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />

          {/* Gallery page */}
          <Route path="/gallery" element={<GalleryPage />} />

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
      <Footer onNav={setActive} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
