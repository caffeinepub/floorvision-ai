import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Download,
  FileImage,
  FileText,
  Info,
  Play,
  RotateCcw,
  Share2,
  Sparkles,
  Video,
  Wand2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

/* ── Section divider with diamond ─────────────────────────── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4 py-2 container max-w-7xl mx-auto px-6">
      <div className="flex-1 h-px bg-border/50" />
      <div
        className="w-2 h-2 rotate-45 border"
        style={{ borderColor: "oklch(0.88 0.02 75)" }}
      />
      <div className="flex-1 h-px bg-border/50" />
    </div>
  );
}

/* ── Section label ─────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="pill-badge mb-5 inline-flex"
      style={{
        backgroundColor: "oklch(0.95 0.025 78)",
        color: "oklch(0.50 0.12 55)",
      }}
    >
      {children}
    </span>
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
      className="relative overflow-hidden rounded-2xl select-none cursor-ew-resize shadow-warm"
      style={{ aspectRatio: "4/3" }}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* Right image (AI render) — full width background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/floorplan-3d-render.dim_800x600.jpg"
          alt="AI 3D Render"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Left image (original) — clipped by slider position */}
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

      {/* Labels */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full shadow"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "oklch(0.30 0.01 260)",
          }}
        >
          Original 2D
        </span>
      </div>
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full shadow text-white"
          style={{ backgroundColor: "oklch(0.70 0.175 55)" }}
        >
          ✦ AI Generated
        </span>
      </div>

      {/* Slider handle line */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{
          left: `calc(${sliderPos}% - 1px)`,
          width: "2px",
          backgroundColor: "white",
        }}
      >
        {/* Drag handle circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center pointer-events-none"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 9L3 6L6 3"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H15"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 3L15 6L12 9"
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
      className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 text-left w-full ${
        isActive
          ? "shadow-warm-lg scale-[1.01]"
          : "shadow-warm hover:shadow-warm-lg hover:scale-[1.01]"
      }`}
      style={
        isActive
          ? { outline: "2px solid oklch(0.70 0.175 55)", outlineOffset: "1px" }
          : {}
      }
      onClick={onSelect}
      aria-pressed={isActive}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {isActive && (
          <div
            className="absolute inset-0 flex items-end p-3"
            style={{
              background:
                "linear-gradient(to top, oklch(0.70 0.175 55 / 0.65) 0%, transparent 60%)",
            }}
          >
            <CheckCircle2 size={18} className="text-white ml-auto" />
          </div>
        )}
      </div>
      <div
        className="px-4 py-3 transition-colors duration-200"
        style={
          isActive
            ? { backgroundColor: "oklch(0.95 0.04 78)" }
            : { backgroundColor: "oklch(1 0 0)" }
        }
      >
        <p
          className="text-sm font-semibold font-display"
          style={
            isActive
              ? { color: "oklch(0.55 0.14 55)" }
              : { color: "oklch(0.14 0.01 260)" }
          }
        >
          {label}
        </p>
        {isActive && (
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.52 0.015 75)" }}
          >
            Currently viewing
          </p>
        )}
      </div>
    </button>
  );
}

/* ── Video style pill ───────────────────────────────────────── */
function StylePill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
      style={
        isActive
          ? {
              backgroundColor: "oklch(0.70 0.175 55)",
              color: "white",
              boxShadow: "0 4px 12px rgba(180,120,40,0.20)",
            }
          : {
              backgroundColor: "oklch(1 0 0)",
              border: "1px solid oklch(0.88 0.012 75)",
              color: "oklch(0.40 0.01 260)",
            }
      }
    >
      {label}
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
        className="pt-28 pb-10 border-b border-border/40"
        style={{ backgroundColor: "oklch(0.975 0.006 78)" }}
      >
        <div className="container max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm mb-6"
            style={{ color: "oklch(0.52 0.015 75)" }}
          >
            <Link
              to="/"
              data-ocid="visualizer.link"
              className="hover:text-foreground transition-smooth"
            >
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">Visualizer</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1
                  className="font-display font-black text-foreground"
                  style={{
                    fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Your Visualization Results
                </h1>
                <Badge
                  className="rounded-full text-xs font-semibold px-3 py-1 text-white flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.70 0.175 55)" }}
                >
                  <Sparkles size={10} className="mr-1" />
                  Ready
                </Badge>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                AI has transformed your floor plan. Explore, refine, and export
                below.
              </p>
            </div>

            {/* Export bar */}
            <div
              data-ocid="export.section"
              className="flex flex-wrap items-center gap-2"
            >
              <span
                className="text-sm font-medium hidden sm:block"
                style={{ color: "oklch(0.52 0.015 75)" }}
              >
                Export:
              </span>
              <Button
                data-ocid="export.primary_button"
                variant="outline"
                size="sm"
                className="rounded-full h-8 px-4 text-xs font-semibold hover:bg-section-alt border-border/60"
              >
                <FileImage size={13} className="mr-1.5" />
                Download PNG
              </Button>
              <Button
                data-ocid="export.secondary_button"
                variant="outline"
                size="sm"
                className="rounded-full h-8 px-4 text-xs font-semibold hover:bg-section-alt border-border/60"
              >
                <FileText size={13} className="mr-1.5" />
                Download PDF
              </Button>
              <Button
                data-ocid="export.button"
                variant="outline"
                size="sm"
                className="rounded-full h-8 px-4 text-xs font-semibold hover:bg-section-alt border-border/60"
              >
                <Share2 size={13} className="mr-1.5" />
                Share Link
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: SIDE-BY-SIDE + SLIDER ───────────────────── */}
      <section data-ocid="comparison.section" className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-start mb-10">
            <SectionLabel>01 — ORIGINAL vs. GENERATED</SectionLabel>
            <h2
              className="font-display font-black text-foreground mb-3"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Side by side comparison
            </h2>
            <p className="text-muted-foreground text-base max-w-lg">
              Drag the slider below to reveal and compare the original 2D plan
              with the AI-generated 3D render.
            </p>
          </div>

          {/* Side-by-side cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            {/* Original */}
            <div className="rounded-2xl overflow-hidden shadow-warm border border-border/50">
              <div
                className="px-5 py-3 border-b border-border/40 flex items-center justify-between"
                style={{ backgroundColor: "oklch(1 0 0)" }}
              >
                <span className="text-sm font-semibold font-display text-foreground">
                  Original 2D Plan
                </span>
                <span className="text-xs text-muted-foreground">
                  Uploaded · 2.3 MB
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

            {/* AI Render */}
            <div className="rounded-2xl overflow-hidden shadow-warm-lg border border-border/50 relative">
              <div
                className="px-5 py-3 border-b border-border/40 flex items-center justify-between"
                style={{ backgroundColor: "oklch(1 0 0)" }}
              >
                <span className="text-sm font-semibold font-display text-foreground">
                  AI 3D Render
                </span>
                <span
                  className="pill-badge text-white"
                  style={{
                    backgroundColor: "oklch(0.70 0.175 55)",
                    fontSize: "0.625rem",
                  }}
                >
                  ✦ AI Generated
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

          {/* Comparison slider card */}
          <div
            className="rounded-3xl overflow-hidden border border-border/50 shadow-warm p-4 sm:p-6"
            style={{ backgroundColor: "oklch(1 0 0)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <RotateCcw size={15} style={{ color: "oklch(0.70 0.175 55)" }} />
              <p className="text-sm font-semibold text-foreground font-display">
                Interactive Comparison Slider
              </p>
              <span className="text-xs text-muted-foreground ml-auto hidden sm:block">
                Drag left / right to compare
              </span>
            </div>
            <ComparisonSlider />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── SECTION 2: EDIT WITH AI ─────────────────────────────── */}
      <section
        data-ocid="edit.section"
        className="py-20"
        style={{ backgroundColor: "oklch(0.975 0.006 78)" }}
      >
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-start mb-8">
            <SectionLabel>02 — REFINE YOUR RENDER</SectionLabel>
            <div className="relative pb-2">
              <span
                className="section-ghost-num absolute -top-4 -left-4 pointer-events-none"
                aria-hidden="true"
              >
                02
              </span>
              <h2
                className="relative font-display font-black text-foreground mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Describe the changes you want
              </h2>
            </div>
            <p className="text-muted-foreground text-base max-w-lg">
              Tell the AI what to adjust — in plain English. It understands
              colours, materials, furniture, lighting, and more.
            </p>
          </div>

          <div
            className="rounded-3xl border border-border/50 shadow-warm p-6 sm:p-8"
            style={{ backgroundColor: "oklch(1 0 0)" }}
          >
            {/* Textarea */}
            <Textarea
              data-ocid="edit.textarea"
              placeholder="e.g. Make the living room walls warm terracotta, add a skylight in the kitchen, replace carpet with oak hardwood floors..."
              rows={4}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full resize-none rounded-2xl text-sm leading-relaxed placeholder:text-muted-foreground/60"
              style={{
                fontSize: "0.9375rem",
                borderColor: "oklch(0.88 0.012 75)",
              }}
            />

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span
                className="text-xs font-medium self-center mr-1"
                style={{ color: "oklch(0.52 0.015 75)" }}
              >
                Suggestions:
              </span>
              {[
                "Add more natural light",
                "Modern furniture style",
                "Open-plan kitchen",
                "Warmer color palette",
              ].map((chip) => (
                <button
                  type="button"
                  key={chip}
                  className="suggestion-chip text-xs px-3.5 py-1.5 rounded-full font-medium"
                  style={{
                    border: "1px solid oklch(0.88 0.012 75)",
                    color: "oklch(0.40 0.01 260)",
                    backgroundColor: "transparent",
                    fontSize: "0.75rem",
                  }}
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

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
              <Button
                data-ocid="edit.submit_button"
                type="button"
                className="btn-amber w-full sm:w-auto h-11 px-8 rounded-full font-bold shadow-warm"
              >
                <Wand2 size={16} className="mr-2" />
                Apply Changes
              </Button>
              <div
                className="flex items-start gap-2 text-xs max-w-xs"
                style={{ color: "oklch(0.52 0.015 75)" }}
              >
                <Info
                  size={13}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "oklch(0.65 0.10 55)" }}
                />
                Changes are applied using AI — results may vary based on
                complexity.
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── SECTION 3: MULTI-ANGLE VIEWS ───────────────────────── */}
      <section data-ocid="angles.section" className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-start mb-10">
            <SectionLabel>03 — EXPLORE IN 3D</SectionLabel>
            <div className="relative pb-2">
              <span
                className="section-ghost-num absolute -top-4 -left-4 pointer-events-none"
                aria-hidden="true"
              >
                03
              </span>
              <h2
                className="relative font-display font-black text-foreground mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Every angle.{" "}
                <span style={{ color: "oklch(0.70 0.175 55)" }}>
                  Every room.
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground text-base max-w-lg">
              Select a view to explore your floor plan from four distinct
              perspectives. Click any view to set it as active.
            </p>
          </div>

          {/* 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          {/* Active view indicator */}
          <div
            className="mt-6 p-4 sm:p-6 rounded-3xl border border-border/50 shadow-warm"
            style={{ backgroundColor: "oklch(1 0 0)" }}
          >
            <div className="flex items-center gap-3 mb-1">
              <CheckCircle2
                size={16}
                style={{ color: "oklch(0.70 0.175 55)" }}
              />
              <p className="text-sm font-semibold text-foreground font-display">
                Active view: {ANGLE_VIEWS[activeAngle].label}
              </p>
            </div>
            <p
              className="text-xs pl-7"
              style={{ color: "oklch(0.52 0.015 75)" }}
            >
              Click any view card above to switch perspectives.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── SECTION 4: AI VIDEO ─────────────────────────────────── */}
      <section
        data-ocid="video.section"
        className="py-20"
        style={{ backgroundColor: "oklch(0.975 0.006 78)" }}
      >
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-start mb-10">
            <SectionLabel>04 — INTERIOR WALKTHROUGH</SectionLabel>
            <div className="relative pb-2">
              <span
                className="section-ghost-num absolute -top-4 -left-4 pointer-events-none"
                aria-hidden="true"
              >
                04
              </span>
              <h2
                className="relative font-display font-black text-foreground mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Generate a cinematic{" "}
                <span style={{ color: "oklch(0.70 0.175 55)" }}>
                  walkthrough
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground text-base max-w-lg">
              AI video generation creates a realistic fly-through based on your
              floor plan — complete with lighting and atmosphere.
            </p>
          </div>

          {/* Video preview */}
          <div
            data-ocid="video.canvas_target"
            className="relative rounded-3xl overflow-hidden shadow-warm-xl mb-8 cursor-pointer group"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src="/assets/generated/video-preview.dim_800x450.jpg"
              alt="Interior walkthrough preview"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.32) 100%)",
              }}
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-full bg-white/90 flex items-center justify-center shadow-warm-xl group-hover:scale-110 transition-transform duration-300"
                style={{ width: "4.5rem", height: "4.5rem" }}
              >
                <Play
                  size={22}
                  className="ml-1"
                  fill="oklch(0.70 0.175 55)"
                  style={{ color: "oklch(0.70 0.175 55)" }}
                />
              </div>
            </div>
            {/* Duration badge */}
            <div className="absolute bottom-4 right-4">
              <span className="text-xs text-white font-semibold px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                Preview · 0:08
              </span>
            </div>
          </div>

          {/* Controls */}
          <div
            className="rounded-3xl border border-border/50 shadow-warm p-6 sm:p-8"
            style={{ backgroundColor: "oklch(1 0 0)" }}
          >
            {/* Style selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground font-display mb-3">
                Style
              </p>
              <div className="flex flex-wrap gap-2">
                {VIDEO_STYLES.map((style) => (
                  <StylePill
                    key={style}
                    label={style}
                    isActive={activeStyle === style}
                    onClick={() => setActiveStyle(style)}
                  />
                ))}
              </div>
            </div>

            {/* Generate button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                data-ocid="video.submit_button"
                type="button"
                size="lg"
                className="btn-amber w-full sm:w-auto h-12 px-8 rounded-full font-bold shadow-warm-lg"
              >
                <Video size={17} className="mr-2" />
                Generate Video
              </Button>
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "oklch(0.52 0.015 75)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.65 0.14 150)" }}
                />
                ~2 min generation time
              </div>
            </div>

            {/* Disclaimer */}
            <p
              className="text-xs mt-4 flex items-start gap-2 leading-relaxed"
              style={{ color: "oklch(0.52 0.015 75)" }}
            >
              <Info
                size={12}
                className="flex-shrink-0 mt-0.5"
                style={{ color: "oklch(0.65 0.10 55)" }}
              />
              AI video generation creates a realistic fly-through based on your
              floor plan. Results may vary. Generated in{" "}
              <strong
                className="font-semibold"
                style={{ color: "oklch(0.40 0.01 260)" }}
              >
                {activeStyle}
              </strong>{" "}
              style.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
