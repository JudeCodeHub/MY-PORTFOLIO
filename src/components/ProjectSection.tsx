"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TerminalSquare,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Plus,
  X,
  Sparkles,
  Layers,
  Cloud,
  Code2,
  Palette,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaFigma } from "react-icons/fa";
import Shuffle from "./ui/Shuffle";
import { PROJECTS as projects, type Project } from "@/data/projects";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  },
});

interface RolodexCardProps {
  project: Project;
  isActive: boolean;
  onViewDetails: (project: Project) => void;
  isDetailsOpen: boolean;
  onCloseDetails: () => void;
}

function RolodexCard({
  project,
  isActive,
  onViewDetails,
  isDetailsOpen,
  onCloseDetails,
}: RolodexCardProps) {
  return (
    <div
      className={`w-full h-full rounded-2xl flex flex-col overflow-hidden bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-md border transition-all duration-700 ease-in-out ${
        isActive
          ? "border-slate-300 dark:border-white/20 shadow-[0_0_40px_rgba(249,115,22,0.15)]"
          : "border-slate-200 dark:border-white/5 scale-95"
      }`}
    >
      <div className="h-10 bg-slate-100 dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-white/5 flex items-center px-4 shrink-0 justify-between">
        <div className="w-14" />
        <div className="flex items-center justify-center pointer-events-none">
          <TerminalSquare
            size={14}
            className="text-slate-400 dark:text-white/30 mr-2"
          />
          <span className="text-slate-700 dark:text-white/90 text-xs font-mono">
            ~/{project.terminalName}.sh
          </span>
        </div>
        <div className="flex gap-2 w-14 justify-end">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-full h-full relative shrink-0 group">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover ${project.mobileImagePosition === "center" ? "object-center md:object-left-top" : "object-left-top"} transition-all duration-1000 ${isActive ? "opacity-100" : "opacity-30 grayscale"}`}
          />

          {isActive && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-nowrap justify-center items-center gap-2 md:gap-3 z-20 w-[95%] md:w-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Source"
                  className="flex items-center gap-0 sm:gap-2 px-3 py-2 sm:px-4 rounded-lg sm:rounded-full bg-black/90 backdrop-blur-xl border border-white/20 text-white hover:bg-orange-500 hover:border-orange-500 hover:scale-105 transition-all duration-300 shadow-[0_0_18px_rgba(255,255,255,0.2)]"
                >
                  <FaGithub size={14} />
                  <span className="hidden sm:inline text-xs font-medium tracking-wide">
                    Source
                  </span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Demo"
                  className="flex items-center gap-0 sm:gap-2 px-3 py-2 sm:px-4 rounded-lg sm:rounded-full bg-black/90 backdrop-blur-xl border border-white/20 text-white hover:bg-orange-500 hover:border-orange-500 hover:scale-105 transition-all duration-300 shadow-[0_0_18px_rgba(255,255,255,0.2)]"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline text-xs font-medium tracking-wide text-white">
                    Live Demo
                  </span>
                </a>
              )}

              {project.linkedinUrl && (
                <a
                  href={project.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Post"
                  className="flex items-center gap-0 sm:gap-2 px-3 py-2 sm:px-4 rounded-lg sm:rounded-full bg-black/90 backdrop-blur-xl border border-white/20 text-white hover:bg-orange-500 hover:border-orange-500 hover:scale-105 transition-all duration-300 shadow-[0_0_18px_rgba(255,255,255,0.2)]"
                >
                  <FaLinkedin size={14} />
                  <span className="hidden sm:inline text-xs font-medium tracking-wide text-white">
                    LinkedIn Post
                  </span>
                </a>
              )}

              <button
                onClick={() => onViewDetails(project)}
                aria-label="View project details"
                className="flex items-center gap-0 sm:gap-2 px-3 py-2 sm:px-4 rounded-lg sm:rounded-full bg-black/90 backdrop-blur-xl border border-white/20 text-white hover:bg-orange-500 hover:border-orange-500 hover:scale-105 transition-all duration-300 shadow-[0_0_18px_rgba(255,255,255,0.2)]"
              >
                <Plus size={14} />
                <span className="hidden sm:inline text-xs font-medium tracking-wide">
                  Details
                </span>
              </button>

              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Figma Design"
                  className="flex items-center gap-0 sm:gap-2 px-3 py-2 sm:px-4 rounded-lg sm:rounded-full bg-black/90 backdrop-blur-xl border border-white/20 text-white hover:bg-[#F24E1E] hover:border-[#F24E1E] hover:scale-105 transition-all duration-300 shadow-[0_0_18px_rgba(255,255,255,0.2)]"
                >
                  <FaFigma size={14} />
                  <span className="hidden sm:inline text-xs font-medium tracking-wide text-white">
                    Figma Design
                  </span>
                </a>
              )}
            </div>
          )}

          <ProjectDetailsPanel
            project={isDetailsOpen ? project : null}
            onClose={onCloseDetails}
          />
        </div>
      </div>
    </div>
  );
}

interface ProjectDetailsPanelProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectDetailsPanel({ project, onClose }: ProjectDetailsPanelProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className="absolute inset-0 z-40 rounded-b-2xl bg-[#0a0a0a]/97 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-6 pt-5 pb-6 flex flex-col gap-5 [scrollbar-width:thin] [scrollbar-color:rgba(249,115,22,0.4)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-orange-500/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-orange-500/70">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-500">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white leading-snug mt-1">
                  {project.title}
                </h3>
              </div>

              <button
                onClick={onClose}
                aria-label="Close project details"
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-sm text-white/70 leading-relaxed">
              {project.summary}
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/90">
                <Sparkles size={14} className="text-orange-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  Highlights
                </span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm text-white/70 leading-relaxed"
                  >
                    <span className="shrink-0 text-orange-500 mt-0.5">›</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/90">
                <Layers size={14} className="text-orange-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  Tech Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-[11px] font-mono font-medium bg-white/5 border border-white/10 text-white/70 hover:text-orange-400 hover:border-orange-500/40 hover:bg-orange-500/5 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type ProjectCategoryFilter = "all" | "devops" | "fullstack" | "uiux";

interface CategoryTab {
  id: ProjectCategoryFilter;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "all", label: "All", icon: Layers },
  { id: "devops", label: "DevOps / Cloud", icon: Cloud },
  { id: "fullstack", label: "Full-Stack", icon: Code2 },
  { id: "uiux", label: "UI/UX Design", icon: Palette },
];

const CATEGORY_MAP: Record<Exclude<ProjectCategoryFilter, "all">, string[]> = {
  devops: ["DevSecOps / Cloud", "DevOps", "Cloud Architecture"],
  fullstack: ["Full-Stack", "Full-Stack / AI"],
  uiux: ["UI/UX Design"],
};

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategoryFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    const allowed = CATEGORY_MAP[activeCategory];
    return projects.filter((p) => allowed.includes(p.category));
  }, [activeCategory]);

  const handleCategoryChange = (cat: ProjectCategoryFilter) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    setActiveIndex(0);
    setSelectedProject(null);
  };

  const getCategoryCount = (catId: ProjectCategoryFilter) => {
    if (catId === "all") return projects.length;
    const allowed = CATEGORY_MAP[catId];
    return projects.filter((p) => allowed.includes(p.category)).length;
  };

  const handleNext = () => {
    if (filteredProjects.length <= 1) return;
    setActiveIndex((prev) =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    if (filteredProjects.length <= 1) return;
    setActiveIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1,
    );
  };

  const [radius, setRadius] = useState(550);
  const anglePerItem = 60;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1280) {
          setRadius(550);
        } else if (window.innerWidth >= 768) {
          setRadius(400);
        } else {
          setRadius(550);
        }
      }
    };
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <section
      id="projects"
      className="w-full md:min-h-screen lg:min-h-[85vh] py-12 md:py-12 lg:py-6 xl:py-10 relative overflow-hidden flex flex-col items-center scroll-mt-10 lg:scroll-mt-0"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "0px" }}
        variants={fadeUp(0.1)}
        className="w-full max-w-6xl mb-1 z-20 text-center flex justify-center -translate-y-0.75"
      >
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-slate-800 dark:text-white tracking-tight flex justify-center items-center whitespace-nowrap">
          <span className="text-orange-500 shrink-0 mr-3">~$</span>
          <span className="shrink-0 inline-block">
            <Shuffle text="projects" loop={true} loopDelay={3} />
          </span>
        </h2>
      </motion.div>

      {/* 
        ========================================================================
        APPROACH 1: Glassmorphic Floating Pill Bar (Saved & Commented out)
        ========================================================================
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "0px" }}
          variants={fadeUp(0.15)}
          className="z-20 mt-1 mb-2 sm:mb-3"
        >
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1 rounded-full bg-slate-200/60 dark:bg-[#121212]/80 backdrop-blur-xl border border-slate-300/80 dark:border-white/10 shadow-md">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = activeCategory === tab.id;
              const count = getCategoryCount(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                    isSelected
                      ? "text-white font-bold"
                      : "text-slate-600 dark:text-white/60 hover:text-orange-500 dark:hover:text-orange-400"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.5)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                      isSelected
                        ? "bg-black/25 text-white"
                        : "bg-slate-300/60 dark:bg-white/10 text-slate-600 dark:text-white/60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      */}

      {/* 
        ========================================================================
        APPROACH 2: Terminal CLI Prompt Filter (Saved & Commented out)
        ========================================================================
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "0px" }}
          variants={fadeUp(0.15)}
          className="z-20 mt-0.5 mb-2 w-full max-w-3xl lg:max-w-4xl px-4"
        >
          <div className="rounded-lg bg-slate-900/90 dark:bg-[#0c0c0c]/95 border border-slate-700/60 dark:border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1 border-b border-white/5 bg-black/40">
              <div className="flex items-center gap-1.5">
                <span className="text-orange-500 font-bold">~$</span>
                <span className="text-slate-400 dark:text-white/70">filter</span>
                <span className="text-orange-400/90">--category=</span>
                <span className="text-white font-semibold underline decoration-orange-500 decoration-2 underline-offset-2">
                  {activeCategory}
                </span>
                <span className="inline-block w-1.5 h-3 bg-orange-500 animate-pulse -ml-0.5" />
              </div>
              <div className="text-[10px] text-slate-400 dark:text-white/40 hidden sm:block">
                [ {filteredProjects.length} matches ]
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2 px-3 py-1 bg-slate-950/60 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest hidden md:inline mr-1">
                Select:
              </span>
              {CATEGORY_TABS.map((tab) => {
                const isSelected = activeCategory === tab.id;
                const count = getCategoryCount(tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleCategoryChange(tab.id)}
                    className={`shrink-0 px-2.5 py-0.5 rounded transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/60 shadow-[0_0_12px_rgba(249,115,22,0.3)] font-semibold"
                        : "text-slate-400 dark:text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className={isSelected ? "text-orange-500" : "text-slate-600"}>
                      {isSelected ? ">" : "#"}
                    </span>
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1 rounded ${
                        isSelected
                          ? "bg-orange-500 text-black font-bold"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      */}

      {/* 
        ========================================================================
        APPROACH 3: Icon-Badged Segmented Controls (Active)
        ========================================================================
      */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "0px" }}
        variants={fadeUp(0.15)}
        className="z-20 mt-1 mb-2 sm:mb-3 w-fit max-w-full px-4"
      >
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-slate-900/85 dark:bg-[#0d0d0d]/90 backdrop-blur-2xl border border-slate-700/60 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = activeCategory === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`group relative shrink-0 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none ${
                  isSelected
                    ? "text-white font-semibold"
                    : "text-slate-400 dark:text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSegmentedPill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 shadow-[0_0_16px_rgba(249,115,22,0.45)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={14}
                  className={`relative z-10 transition-colors ${
                    isSelected
                      ? "text-white"
                      : "text-orange-500/80 group-hover:text-orange-400"
                  }`}
                />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-[104px] flex flex-col items-start md:items-center lg:items-center xl:items-start z-10">
        <div
          className="relative w-full max-w-5xl h-[min(65vh,700px)] md:max-w-2xl md:h-[min(62vh,520px)] lg:max-w-2xl lg:h-[min(62vh,520px)] xl:max-w-5xl xl:h-[min(65vh,700px)] min-h-[360px] hidden md:flex items-center justify-center md:translate-x-3 md:ml-6 lg:translate-x-0 lg:ml-0 xl:translate-x-3 xl:ml-6 mt-2 lg:mt-1 xl:mt-2 -translate-y-0.75"
          style={{ perspective: "2000px" }}
        >
          {filteredProjects.length > 1 && (
            <div className="absolute right-[-48px] top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-7 h-7 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-[#111] text-slate-700 dark:text-white flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all shadow-lg active:scale-90 cursor-pointer"
              >
                <ChevronUp size={14} />
              </button>

              <div className="flex flex-col items-center gap-2 py-2">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`w-2 transition-all duration-300 rounded-full cursor-pointer hover:bg-orange-400 ${
                      i === activeIndex
                        ? "h-6 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                        : "h-2 bg-slate-300 dark:bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next project"
                className="w-7 h-7 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-[#111] text-slate-700 dark:text-white flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all shadow-lg active:scale-90 cursor-pointer"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          )}

          <div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {filteredProjects.map((project, i) => {
              const offset = i - activeIndex;
              const rotateX = offset * -anglePerItem;
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              const isVisible = absOffset <= 2;

              return (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={false}
                  animate={{
                    rotateX: rotateX,
                    z: -absOffset * 50,
                    opacity: isActive ? 1 : isVisible ? 1 : 0,
                    filter: isActive ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.8,
                  }}
                  style={{
                    transformOrigin: `50% 50% -${radius}px`,
                    backfaceVisibility: "hidden",
                    pointerEvents: isVisible ? "auto" : "none",
                    zIndex: filteredProjects.length - absOffset,
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <RolodexCard
                    project={project}
                    isActive={isActive}
                    onViewDetails={setSelectedProject}
                    isDetailsOpen={selectedProject?.id === project.id}
                    onCloseDetails={() => setSelectedProject(null)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col md:hidden items-center mt-4">
          <div className="w-[90vw] h-[350px] relative">
            <AnimatePresence mode="wait">
              {filteredProjects[activeIndex] && (
                <motion.div
                  key={filteredProjects[activeIndex].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <RolodexCard
                    project={filteredProjects[activeIndex]}
                    isActive={true}
                    onViewDetails={setSelectedProject}
                    isDetailsOpen={
                      selectedProject?.id === filteredProjects[activeIndex].id
                    }
                    onCloseDetails={() => setSelectedProject(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {filteredProjects.length > 1 && (
            <div className="flex items-center gap-6 mt-8 z-30">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-10 h-10 bg-white dark:bg-[#111] rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center active:scale-90 shadow-lg text-slate-700 dark:text-white cursor-pointer"
              >
                <ChevronUp className="-rotate-90" size={20} />
              </button>
              <div className="flex items-center gap-2">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:bg-orange-400 ${
                      i === activeIndex
                        ? "bg-orange-500 scale-125 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                        : "bg-slate-300 dark:bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                aria-label="Next project"
                className="w-10 h-10 bg-white dark:bg-[#111] rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center active:scale-90 shadow-lg text-slate-700 dark:text-white cursor-pointer"
              >
                <ChevronDown className="-rotate-90" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
