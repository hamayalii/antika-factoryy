import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  X,
  Maximize2
} from "lucide-react";
import { galleryProjects, GalleryProject } from "../data/galleryData";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";
import { MaterialCertificatesMarquee } from "../components/MaterialCertificatesMarquee";

export function GalleryPage() {
  const [lang] = useState<"ku" | "ar">("ku");
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Inline gallery state for each project
  const [projectGalleries, setProjectGalleries] = useState<Record<string, number>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openLightbox = (project: GalleryProject, imageIndex: number) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const nextProjectImage = (projectId: string) => {
    const project = galleryProjects.find(p => p.id === projectId);
    if (project) {
      setProjectGalleries(prev => ({
        ...prev,
        [projectId]: ((prev[projectId] || 0) + 1) % project.images.length
      }));
    }
  };

  const prevProjectImage = (projectId: string) => {
    const project = galleryProjects.find(p => p.id === projectId);
    if (project) {
      setProjectGalleries(prev => {
        const current = prev[projectId] || 0;
        return {
          ...prev,
          [projectId]: current === 0 ? project.images.length - 1 : current - 1
        };
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedProject]);

  return (
    <div className="bg-white pt-24 min-h-screen text-right font-body">
      <SEO
        title="وێنەی کارەکانمان | کارگەی ئەنتیکا"
        description="وێنەی پڕۆژە تەواوبووەکانی کارگەی ئەنتیکا - کەپسولەکان، خانووەکان، کۆشکەکان، و کارە هونەریەکان."
        canonical="https://antika-factory.netlify.app/gallery"
        image="/images/logo.png"
      />

      {/* Simple Breadcrumb */}
      <nav aria-label="ڕێڕەوی پەڕەکان" className="border-b border-gray-100 bg-white py-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-[13px] text-gray-500">
            <li className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-1.5 transition hover:text-brand">
                <HomeIcon className="h-3.5 w-3.5" />
                <span>{lang === "ku" ? "سەرەکی" : "الرئيسية"}</span>
              </Link>
              <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
            </li>
            <li className="font-medium text-gray-900" aria-current="page">
              {lang === "ku" ? "وێنەی کارەکانمان" : "معرض أعمالنا"}
            </li>
          </ol>
        </div>
      </nav>

      {/* Clean Header */}
      <section className="py-16 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1
              className="font-display font-black leading-[1.2] text-gray-900 mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
            >
              {lang === "ku" ? "وێنەی کارەکانمان" : "معرض أعمالنا"}
            </h1>
            <p className="text-[16px] sm:text-[18px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {lang === "ku"
                ? "پڕۆژە تەواوبووەکانی ئەنتیکا فاکتۆری لە سەرتاسەری عێراق"
                : "المشاريع المكتملة لمصنع أنتيكا في جميع أنحاء العراق"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vertical Project Gallery */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {galleryProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 150}>
              <div className="mb-32 last:mb-0">
                {/* Project Container with Border */}
                <div className="border border-gray-200 rounded-2xl bg-white py-6 sm:py-8 lg:py-10 shadow-sm">
                  {/* Horizontal Two-Column Layout */}
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                  
                  {/* Image Gallery (visually left in RTL on desktop) */}
                  <div className="flex-1 lg:w-2/3 order-1 lg:order-2">
                    <div className="relative">
                      {/* Main Image */}
                      <div className="relative overflow-hidden bg-gray-100 rounded-lg">
                        <img
                          src={project.images[projectGalleries[project.id] || 0]}
                          alt={lang === "ku" ? project.titleKu : project.titleAr}
                          className="w-full h-auto object-cover"
                        />
                        
                        {/* Gallery Navigation */}
                        {project.images.length > 1 && (
                          <>
                            <button
                              onClick={() => prevProjectImage(project.id)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-lg transition z-10"
                            >
                              <ChevronRight className="h-5 w-5 text-gray-900" />
                            </button>
                            <button
                              onClick={() => nextProjectImage(project.id)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-lg transition z-10"
                            >
                              <ChevronLeft className="h-5 w-5 text-gray-900" />
                            </button>
                          </>
                        )}

                        {/* Image Counter */}
                        {project.images.length > 1 && (
                          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
                            {(projectGalleries[project.id] || 0) + 1} / {project.images.length}
                          </div>
                        )}

                        {/* Expand Button */}
                        <button
                          onClick={() => openLightbox(project, projectGalleries[project.id] || 0)}
                          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
                        >
                          <Maximize2 className="h-5 w-5 text-gray-900" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Project Information (appears on right in RTL) */}
                  <div className="flex-1 lg:w-1/3 order-2 lg:order-1 lg:sticky lg:top-28">
                    <div className="lg:pl-8">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-brand" />
                          {lang === "ku" ? project.locationKu : project.locationAr}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-brand" />
                          {project.date}
                        </span>
                      </div>
                      
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {lang === "ku" ? project.titleKu : project.titleAr}
                      </h2>
                      
                      <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                        {lang === "ku" ? project.descriptionKu : project.descriptionAr}
                      </p>

                      {/* Thumbnail Strip */}
                      {project.images.length > 1 && (
                        <div className="mt-6 grid grid-cols-2 gap-3">
                          {project.images.map((img, imgIdx) => (
                            <button
                              key={imgIdx}
                              onClick={() => setProjectGalleries(prev => ({ ...prev, [project.id]: imgIdx }))}
                              className={`relative rounded-lg overflow-hidden transition ${
                                (projectGalleries[project.id] || 0) === imgIdx
                                  ? 'ring-2 ring-brand ring-offset-2'
                                  : 'hover:opacity-80'
                              }`}
                            >
                              <img
                                src={img}
                                alt={`${lang === "ku" ? project.titleKu : project.titleAr} ${imgIdx + 1}`}
                                className="w-full h-24 object-contain bg-gray-100"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Buttons */}
          {selectedProject.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute left-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="max-w-6xl max-h-[85vh] w-full">
            <img
              src={selectedProject.images[currentImageIndex]}
              alt={`${lang === "ku" ? selectedProject.titleKu : selectedProject.titleAr} ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Image Counter */}
          {selectedProject.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium">
              {currentImageIndex + 1} / {selectedProject.images.length}
            </div>
          )}

          {/* Project Info */}
          <div className="absolute bottom-4 right-4 z-10 max-w-md bg-black/50 backdrop-blur-md rounded-xl p-4 text-white">
            <h4 className="font-display font-bold text-lg mb-1">
              {lang === "ku" ? selectedProject.titleKu : selectedProject.titleAr}
            </h4>
            <p className="text-sm text-gray-300">
              {lang === "ku" ? selectedProject.locationKu : selectedProject.locationAr}
            </p>
          </div>
        </div>
      )}

      {/* Material Certificates Marquee */}
      <MaterialCertificatesMarquee variant="home" />
    </div>
  );
}
