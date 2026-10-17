import type { Language } from "../i18n/languages";

export interface GalleryProject {
  id: string;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  locationKu: string;
  locationEn: string;
  locationAr: string;
  descriptionKu: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  categoryKu: string;
  categoryEn: string;
  categoryAr: string;
  images: string[];
  date: string;
}

export const galleryProjects: GalleryProject[] = [
  {
    id: "capsule-project-1",
    titleKu: "کۆشکی مۆدێرن - کەربەلا",
    titleEn: "Modern kiosks - Karbala",
    titleAr: "كشاك مودرن - كربلاء",
    locationKu: "کەربەلا، عێراق",
    locationEn: "Karbala, Iraq",
    locationAr: "كربلاء، العراق",
    descriptionKu: "دیزاین و دروستکردنی کۆمەڵێک کۆشکی مۆدێرن بۆ پڕۆژەی گەشتیاری ڕەیحانە لە شاری کەربەلا، لەلایەن کارگەی ئەنتیکەوە",
    descriptionEn: "Design and construction of a set of modern kiosks for the Raihana tourism project in the city of Karbala, by Antika Factory",
    descriptionAr: "مشروع ناجح لكشاك مودرن بتصميم عصري وجودة عالية لعائلة في كربلاء. تم إنجاز الكشاك خلال 4 أسابيع.",
    category: "koshk",
    categoryKu: "کۆشکەکان",
    categoryEn: "Kiosks",
    categoryAr: "كشاك",
    images: [
      "/images/karbala-5.webp",
      "/images/karbala-4.webp",
      "/images/karbala-6.webp",
      "/images/karbala-7.webp",
      "/images/karbala-1.webp",
      "/images/karbala-2.webp",
    ],
    date: "2025-01-15"
  },
  {
    id: "house-project-1",
    titleKu: "کۆفی برەیک - سلێمانی",
    titleEn: "Coffee Break - Sulaymaniyah",
    titleAr: "منزل الحاوية - السليمانية",
    locationKu: "سلێمانی، عێراق",
    locationEn: "Sulaymaniyah, Iraq",
    locationAr: "السليمانية، العراق",
    descriptionKu: "جێبەجێکردنی 'کۆفی برێک' و ڕوکارێکی ڕیکلامی بۆ یەکێک لە کۆمپانیاکانی دەرمان کە لە شێوە ڕاستەقینەکەیەوە نزیک بێت، بە شێوەیەکی جووڵاو، فرەکارابەر، و ئاسان بۆ گواستنەوە، کە بپێورێت (دابمەزرێنرێت) لە هەر پێشانگایەک، شوێنی کارێک، یاخود لە ناوخۆی کۆمپانیادا",
    descriptionEn: "Executing a 'Coffee Break' unit and an advertising facade for one of the pharmaceutical companies, closely resembling its real-life form — mobile, multi-functional and easy to relocate, so it can be set up in any exhibition, workplace, or within the company's own premises",
    descriptionAr: "منزل حاوية كبير بطابقين ومرافق سكن كاملة، استخدم كمكتب وسكن.",
    category: "capsule",
    categoryKu: "کەپسولەکان",
    categoryEn: "Capsules",
    categoryAr: "كبسولات",
    images: [
      "/images/darman-1.webp",
      "/images/darman-2.webp",
      "/images/darman-3.webp"
    ],
    date: "2025-02-20"
  }
];

/** Project fields resolved for the active UI language. */
export interface LocalizedGalleryProject {
  title: string;
  location: string;
  description: string;
  category: string;
  images: string[];
  date: string;
}

export function localizeGalleryProject(
  project: GalleryProject,
  language: Language
): LocalizedGalleryProject {
  if (language === "en") {
    return {
      title: project.titleEn,
      location: project.locationEn,
      description: project.descriptionEn,
      category: project.categoryEn,
      images: project.images,
      date: project.date,
    };
  }

  if (language === "ar") {
    return {
      title: project.titleAr || project.titleEn,
      location: project.locationAr || project.locationEn,
      description: project.descriptionAr || project.descriptionEn,
      category: project.categoryAr || project.categoryEn,
      images: project.images,
      date: project.date,
    };
  }

  return {
    title: project.titleKu,
    location: project.locationKu,
    description: project.descriptionKu,
    category: project.categoryKu,
    images: project.images,
    date: project.date,
  };
}
