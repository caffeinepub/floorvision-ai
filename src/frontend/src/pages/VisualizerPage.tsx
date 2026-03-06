import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileImage,
  FileText,
  Info,
  Play,
  RotateCcw,
  Share2,
  Video,
  Wand2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

/* ── Section header ────────────────────────────────────────── */
function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="text-[10px] text-muted-foreground/40 tracking-[0.18em] uppercase mb-3 font-medium">
        {label}
      </p>
      <h2
        className="font-display font-black text-foreground"
        style={{
          fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
          letterSpacing: "-0.03em",
          lineHeight: "1.1",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Comparison Slider ────────────────────────────────────── */
function ComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = (x / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, pct)));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const handleMouseMove = (ev: MouseEvent) => {
      if (isDragging.current) updatePosition(ev.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: "16/9" }}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* Right image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/floorplan-3d-render.dim_800x600.jpg"
          alt="AI 3D Render"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Left image — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src="/assets/generated/floorplan-2d.dim_800x600.jpg"
          alt="Original 2D Plan"
          className="h-full object-cover"
          style={{
            width: `${(100 / sliderPos) * 100}%`,
            maxWidth: "none",
          }}
          draggable={false}
        />
      </div>

      {/* Absolute overlay labels */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest font-medium px-2 py-1 bg-white/80 text-foreground/70">
          Original 2D
        </span>
      </div>
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest font-medium px-2 py-1 bg-foreground/80 text-white">
          AI Generated
        </span>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{
          left: `calc(${sliderPos}% - 1px)`,
          width: "2px",
          backgroundColor: "white",
        }}
      >
        {/* Drag handle — flat square */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white flex items-center justify-center pointer-events-none shadow-card">
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4.5 7L2 4.5L4.5 2"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 4.5H12"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M9.5 2L12 4.5L9.5 7"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Angle view card ────────────────────────────────────────── */
function AngleCard({
  src,
  label,
  index,
  isActive,
  onSelect,
}: {
  src: string;
  label: string;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-ocid={`angles.item.${index}`}
      className={`group overflow-hidden cursor-pointer transition-all duration-200 text-left w-full relative ${
        isActive
          ? "border-2 border-foreground"
          : "border border-border/50 hover:border-border"
      }`}
      onClick={onSelect}
      aria-pressed={isActive}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        {/* Label overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-2.5 py-2"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        >
          <p
            className={`text-[10px] font-semibold uppercase tracking-wide ${
              isActive ? "text-white" : "text-white/80"
            }`}
          >
            {label}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function VisualizerPage() {
  const [activeAngle, setActiveAngle] = useState(0);
  const [activeStyle, setActiveStyle] = useState("Modern");
  const [editText, setEditText] = useState("");

  const ANGLE_VIEWS = [
    {
      src: "/assets/generated/angle-view-1.dim_600x450.jpg",
      label: "Bird's Eye View",
    },
    {
      src: "/assets/generated/angle-view-2.dim_600x450.jpg",
      label: "Side Perspective",
    },
    {
      src: "/assets/generated/angle-view-3.dim_600x450.jpg",
      label: "Cross Section",
    },
    {
      src: "/assets/generated/angle-view-4.dim_600x450.jpg",
      label: "Exploded View",
    },
  ];

  const VIDEO_STYLES = ["Modern", "Classic", "Minimalist", "Industrial"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section
        data-ocid="visualizer.section"
        className="pt-24 pb-5 border-b border-border/30"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-0">
            {/* Left: back + status */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Link
                to="/"
                data-ocid="visualizer.link"
                className="flex items-center gap-1.5 hover:text-foreground transition-smooth"
              >
                <ArrowLeft size={12} />
                Back
              </Link>
              <span className="text-muted-foreground/30">·</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "oklch(0.55 0.16 150)" }}
                />
                <span className="text-muted-foreground/70">
                  Visualization Ready
                </span>
              </div>
            </div>

            {/* Right: export text links */}
            <div
              data-ocid="export.section"
              className="hidden sm:flex items-center gap-4"
            >
              <button
                type="button"
                data-ocid="export.primary_button"
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth"
              >
                <FileImage size={11} />
                PNG
              </button>
              <span className="text-muted-foreground/30">·</span>
              <button
                type="button"
                data-ocid="export.secondary_button"
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth"
              >
                <FileText size={11} />
                PDF
              </button>
              <span className="text-muted-foreground/30">·</span>
              <button
                type="button"
                data-ocid="export.button"
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Share2 size={11} />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: SIDE-BY-SIDE + SLIDER ───────────────────── */}
      <section data-ocid="comparison.section" className="py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            label="01 — Comparison"
            title="Original vs. AI render"
          />

          {/* Side-by-side — no card wrappers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="overflow-hidden border border-border/50 relative">
              {/* Absolute label */}
              <div className="absolute top-0 left-0 z-10 px-2.5 py-1.5 bg-white/90 pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest font-medium text-foreground/70">
                  Original 2D Plan
                </span>
              </div>
              <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src="/assets/generated/floorplan-2d.dim_800x600.jpg"
                  alt="Original 2D floor plan"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="overflow-hidden border border-border/50 relative">
              {/* Absolute label */}
              <div className="absolute top-0 left-0 z-10 px-2.5 py-1.5 bg-foreground/80 pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest font-medium text-white">
                  AI 3D Render
                </span>
              </div>
              <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src="/assets/generated/floorplan-3d-render.dim_800x600.jpg"
                  alt="AI 3D render"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Comparison slider — no card wrapper */}
          <div className="border border-border/50">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30">
              <RotateCcw size={11} className="text-muted-foreground/40" />
              <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground/60">
                Interactive Comparison
              </p>
              <span className="text-[10px] text-muted-foreground/40 ml-auto hidden sm:block">
                Drag to compare
              </span>
            </div>
            <ComparisonSlider />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: EDIT WITH AI ─────────────────────────────── */}
      <section
        data-ocid="edit.section"
        className="py-16 border-t border-border/40 bg-section-alt"
      >
        <div className="container max-w-3xl mx-auto px-6">
          <SectionHeader
            label="02 — Refine"
            title="Describe the changes you want"
          />

          {/* No card wrapper — flat on page */}
          <div>
            <Textarea
              data-ocid="edit.textarea"
              placeholder="e.g. Make the living room walls warm terracotta, add a skylight in the kitchen, replace carpet with oak hardwood floors..."
              rows={4}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full resize-none text-sm leading-relaxed placeholder:text-muted-foreground/35 bg-transparent border-0 border-b border-border focus:border-foreground/40 focus:ring-0 px-0 py-3"
            />

            {/* Suggestion chips — text links with hover underline */}
            <div className="flex flex-wrap gap-4 mt-4">
              {[
                "Add more natural light",
                "Modern furniture style",
                "Open-plan kitchen",
                "Warmer color palette",
              ].map((chip) => (
                <button
                  type="button"
                  key={chip}
                  className="suggestion-chip text-xs px-0 py-0.5 text-muted-foreground font-medium bg-transparent border-0"
                  onClick={() =>
                    setEditText((prev) =>
                      prev ? `${prev}, ${chip.toLowerCase()}` : chip,
                    )
                  }
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
              <Button
                data-ocid="edit.submit_button"
                type="button"
                className="btn-primary w-full sm:w-auto h-10 px-7 font-semibold text-sm"
                style={{ borderRadius: 0 }}
              >
                <Wand2 size={13} className="mr-2" />
                Apply Changes
              </Button>
              <p className="flex items-start gap-1.5 text-xs text-muted-foreground/50 max-w-xs">
                <Info size={11} className="flex-shrink-0 mt-0.5" />
                Results may vary based on complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MULTI-ANGLE VIEWS ───────────────────────── */}
      <section
        data-ocid="angles.section"
        className="py-16 border-t border-border/40 bg-background"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            label="03 — Explore"
            title={<>Every angle. Every room.</>}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ANGLE_VIEWS.map((view, i) => (
              <AngleCard
                key={view.label}
                src={view.src}
                label={view.label}
                index={i + 1}
                isActive={activeAngle === i}
                onSelect={() => setActiveAngle(i)}
              />
            ))}
          </div>

          {/* Active view indicator — flat, no card */}
          <div className="mt-5 flex items-center gap-2.5 border-t border-border/30 pt-4">
            <p className="text-xs text-muted-foreground">
              Active view:{" "}
              <span className="font-semibold text-foreground">
                {ANGLE_VIEWS[activeAngle].label}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: AI VIDEO ─────────────────────────────────── */}
      <section
        data-ocid="video.section"
        className="py-16 border-t border-border/40 bg-section-alt"
      >
        <div className="container max-w-3xl mx-auto px-6">
          <SectionHeader
            label="04 — Walkthrough"
            title="Generate a cinematic walkthrough"
          />

          {/* Video preview */}
          <div
            data-ocid="video.canvas_target"
            className="relative overflow-hidden mb-6 cursor-pointer group border border-border/50"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src="/assets/generated/video-preview.dim_800x450.jpg"
              alt="Interior walkthrough preview"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              loading="lazy"
            />
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.28) 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors duration-200">
                <Play
                  size={15}
                  className="ml-0.5"
                  fill="oklch(0.12 0.008 260)"
                  style={{ color: "oklch(0.12 0.008 260)" }}
                />
              </div>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="text-[10px] text-white/80 font-medium px-2 py-1 bg-black/30 backdrop-blur-sm uppercase tracking-wide">
                Preview · 0:08
              </span>
            </div>
          </div>

          {/* Controls — flat on page background */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/40 font-medium mb-3">
              Style
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {VIDEO_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setActiveStyle(style)}
                  className={`px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
                    activeStyle === style
                      ? "bg-foreground text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                data-ocid="video.submit_button"
                type="button"
                className="btn-primary w-full sm:w-auto h-10 px-7 font-semibold text-sm"
                style={{ borderRadius: 0 }}
              >
                <Video size={13} className="mr-2" />
                Generate Video
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.62 0.14 150)" }}
                />
                ~2 min generation time
              </div>
            </div>

            <p className="text-xs mt-5 flex items-start gap-1.5 text-muted-foreground/40 leading-relaxed">
              <Info size={11} className="flex-shrink-0 mt-0.5" />
              AI video generation creates a realistic fly-through in{" "}
              <strong className="font-semibold text-muted-foreground/60">
                {activeStyle}
              </strong>{" "}
              style. Results may vary.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
