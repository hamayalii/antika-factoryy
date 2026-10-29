/**
 * Shared single source of truth for "کارە هونەرییەکان" (Artworks / Projects).
 *
 * Items with dedicated detail pages:
 * 1. ستوونەکانی ڕووناکی -> /products/lighting
 * 2. ڕەفەکان -> /products/shelves
 *
 * Plus the 16 project/craft disciplines:
 * - Each item preserves exact Kurdish Sorani name.
 * - Image properties explicitly set to null/empty values where applicable.
 */

export interface ArtworkItem {
  id: string;
  title: string;
  imageUrl: null;
  thumbnail: "";
  cover_image: false;
  image: null;
  images: string[];
  path: string;
  hasPage?: boolean;
}

export const ARTWORKS_DATA: ArtworkItem[] = [
  {
    id: "lighting",
    title: "ستوونەکانی ڕووناکی",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/products/lighting",
    hasPage: true,
  },
  {
    id: "shelves",
    title: "ڕەفەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/products/shelves",
    hasPage: true,
  },
  {
    id: "cooling-systems",
    title: "سیستەمەکانی ساردکردنەوە",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=cooling-systems#artworks",
  },
  {
    id: "wood-works",
    title: "کارە دارینەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=wood-works#artworks",
  },
  {
    id: "metal-works",
    title: "کارە ئاسنینەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=metal-works#artworks",
  },
  {
    id: "conference-hall-equipment",
    title: "ئامێرەکانی هۆڵی کۆبوونەوە",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=conference-hall-equipment#artworks",
  },
  {
    id: "outdoor-seating",
    title: "شوێنی دانیشتنی دەرەوە",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=outdoor-seating#artworks",
  },
  {
    id: "exhaust-ventilation",
    title: "ئامێرەکانی بەتاڵکردنەوە / هەواکێش",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=exhaust-ventilation#artworks",
  },
  {
    id: "kitchen-decor",
    title: "دیکۆری چێشتخانەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=kitchen-decor#artworks",
  },
  {
    id: "contracting-and-decor",
    title: "بەڵێندەرایەتی و دیکۆر",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=contracting-and-decor#artworks",
  },
  {
    id: "auxiliary-medical-devices",
    title: "ئامێرە پزیشکییە یارمەتیدەرەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=auxiliary-medical-devices#artworks",
  },
  {
    id: "ramadan-and-annual-events-seating",
    title: "دانیشتنەکانی تایبەت بە ڕەمەزان و بۆنە ساڵانەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=ramadan-and-annual-events-seating#artworks",
  },
  {
    id: "logistics-trolleys-and-scaffolding",
    title: "عەرەبانە لۆجستییەکان و ئەسکەلەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=logistics-trolleys-and-scaffolding#artworks",
  },
  {
    id: "hotel-and-restaurant-supplies",
    title: "پێداویستییەکانی هۆتێل و چێشتخانە",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=hotel-and-restaurant-supplies#artworks",
  },
  {
    id: "doors",
    title: "دەرگاکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=doors#artworks",
  },
  {
    id: "renovation-and-maintenance-works",
    title: "کارەکانی چاککردنەوە",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=renovation-and-maintenance-works#artworks",
  },
  {
    id: "canopies-and-ceilings",
    title: "سابات و سەقفەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=canopies-and-ceilings#artworks",
  },
  {
    id: "gardens",
    title: "باخچەکان",
    imageUrl: null,
    thumbnail: "",
    cover_image: false,
    image: null,
    images: [],
    path: "/?artwork=gardens#artworks",
  },
];
