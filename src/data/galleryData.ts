export interface GalleryProject {
  id: string;
  titleKu: string;
  titleAr: string;
  locationKu: string;
  locationAr: string;
  descriptionKu: string;
  descriptionAr: string;
  category: string;
  categoryKu: string;
  categoryAr: string;
  images: string[];
  date: string;
}

export const galleryProjects: GalleryProject[] = [
  {
    id: "capsule-project-1",
    titleKu: "کۆشکی مۆدێرن - کەربەلا",
    titleAr: "كشاك مودرن - كربلاء",
    locationKu: "کەربەلا، عێراق",
    locationAr: "كربلاء، العراق",
    descriptionKu: "دیزاین و دروستکردنی کۆمەڵێک کۆشکی مۆدێرن بۆ پڕۆژەی گەشتیاری ڕەیحانە لە شاری کەربەلا، لەلایەن کارگەی ئەنتیکەوە",
    descriptionAr: "مشروع ناجح لكشاك مودرن بتصميم عصري وجودة عالية لعائلة في كربلاء. تم إنجاز الكشاك خلال 4 أسابيع.",
    category: "koshk",
    categoryKu: "کۆشکەکان",
    categoryAr: "كشاك",
    images: [
      "/images/karbala-1.jpg",
      "/images/karbala-2.jpg"
    ],
    date: "2025-01-15"
  },
  {
    id: "house-project-1",
    titleKu: "کۆفی برەیک - سلێمانی",
    titleAr: "منزل الحاوية - السليمانية",
    locationKu: "سلێمانی، عێراق",
    locationAr: "السليمانية، العراق",
    descriptionKu: "جێبەجێکردنی 'کۆفی برێک' و ڕوکارێکی ڕیکلامی بۆ یەکێک لە کۆمپانیاکانی دەرمان کە لە شێوە ڕاستەقینەکەیەوە نزیک بێت، بە شێوەیەکی جووڵاو، فرەکارابەر، و ئاسان بۆ گواستنەوە، کە بپێورێت (دابمەزرێنرێت) لە هەر پێشانگایەک، شوێنی کارێک، یاخود لە ناوخۆی کۆمپانیادا",
    descriptionAr: "منزل حاوية كبير بطابقين ومرافق سكن كاملة، استخدم كمكتب وسكن.",
    category: "capsule",
    categoryKu: "کەپسولەکان",
    categoryAr: "كبسولات",
    images: [
      "/images/darman-1.jpg",
      "/images/darman-2.jpg",
      "/images/darman-3.jpg"
    ],
    date: "2025-02-20"
  }
];
