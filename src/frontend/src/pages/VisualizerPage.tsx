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

/* ── Section header ─────────────────────────────────────────── */
function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <span className="label-tag mb-4 block w-fit">{label}</span>
      <h2
        className="font-display font-black text-foreground"
        style={{
          fontFamily: '"Cabinet Grotesk", sans-serif',
          fontSize: "clamp(1.375rem, 2.2vw, 1.875rem)",
          letterSpacing: "-0.035em",
          lineHeight: "1.1",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Comparison Slider ──────────────────────────────────────── */
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
      className="relative overflow-hidden select-none cursor-ew-resize rounded-xl"
      style={{ aspectRatio: "16/9" }}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* Right image — AI render */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/floorplan-3d-render.dim_800x600.jpg"
          alt="AI 3D Render"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Left image — original, clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src="/assets/generated/floorplan-2d.dim_800x600.jpg"
          alt="Original 2D Plan"
          className="h-full object-cover"
          style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Image labels */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span
          className="text-[0.6875rem] font-semibold px-2.5 py-1 rounded-lg"
          style={{
            backgroundColor: "rgba(255,255,255,0.90)",
            color: "oklch(0.22 0.018 255)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        >
          Original 2D
        </span>
      </div>
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <span
          className="text-[0.6875rem] font-semibold px-2.5 py-1 rounded-lg"
          style={{
            backgroundColor: "oklch(0.20 0.040 255 / 0.88)",
            color: "white",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
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
          boxShadow: "0 0 12px rgba(0,0,0,0.20)",
        }}
      >
        {/* Drag handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center pointer-events-none shadow-elevated"
          style={{ border: "1.5px solid rgba(0,0,0,0.07)" }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4.5 7L2 4.5L4.5 2"
              stroke="oklch(0.20 0.040 255)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 4.5H12"
              stroke="oklch(0.20 0.040 255)"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <path
              d="M9.5 2L12 4.5L9.5 7"
              stroke="oklch(0.20 0.040 255)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Angle view card ─────────────────────────────────────────── */
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
      className={`group overflow-hidden cursor-pointer transition-all duration-250 text-left w-full relative rounded-xl ${
        isActive
          ? "shadow-elevated"
          : "border border-border/60 hover:border-border hover:shadow-card"
      }`}
      style={
        isActive
          ? {
              boxShadow:
                "0 0 0 2px oklch(0.20 0.040 255), 0 4px 16px rgba(0,0,40,0.12)",
            }
          : {}
      }
      onClick={onSelect}
      aria-pressed={isActive}
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient overlay + label */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2.5"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 100%)",
          }}
        >
          <p className="text-[0.625rem] font-bold uppercase tracking-widest text-white/85">
            {label}
          </p>
        </div>
        {/* Active check */}
        {isActive && (
          <div
            className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.20 0.040 255)" }}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1.5 4L3.5 6L6.5 2.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
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

      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <section
        data-ocid="visualizer.section"
        className="pt-[60px] border-b border-border/60 bg-card"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            {/* Left: back + status */}
            <div className="flex items-center gap-3 text-[0.8125rem] text-muted-foreground">
              <Link
                to="/"
                data-ocid="visualizer.link"
                className="flex items-center gap-1.5 hover:text-foreground transition-smooth font-medium group"
              >
                <ArrowLeft
                  size={13}
                  className="group-hover:-translate-x-0.5 transition-transform duration-150"
                />
                Back
              </Link>
              <span className="text-border select-none">·</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.52 0.14 145)" }}
                />
                <span className="text-muted-foreground/60 text-[0.75rem]">
                  Visualization Ready
                </span>
              </div>
            </div>

            {/* Right: export actions */}
            <div
              data-ocid="export.section"
              className="hidden sm:flex items-center gap-0.5"
            >
              {[
                {
                  icon: <FileImage size={11} />,
                  label: "PNG",
                  ocid: "export.primary_button",
                },
                {
                  icon: <FileText size={11} />,
                  label: "PDF",
                  ocid: "export.secondary_button",
                },
                {
                  icon: <Share2 size={11} />,
                  label: "Share",
                  ocid: "export.button",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  data-ocid={action.ocid}
                  className="flex items-center gap-1.5 text-[0.75rem] font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth px-3 py-1.5 rounded-lg"
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: SIDE-BY-SIDE + SLIDER ─────────────────────── */}
      <section data-ocid="comparison.section" className="py-14 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            label="01 — Comparison"
            title="Original vs. AI render"
          />

          {/* Side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
            {/* 2D Original */}
            <div className="overflow-hidden rounded-2xl relative border border-border/60 shadow-card">
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span
                  className="text-[0.6875rem] font-semibold px-2.5 py-1 rounded-lg"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.90)",
                    color: "oklch(0.22 0.018 255)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.55)",
                  }}
                >
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

            {/* 3D Render */}
            <div className="overflow-hidden rounded-2xl relative border border-border/60 shadow-card">
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span
                  className="text-[0.6875rem] font-semibold px-2.5 py-1 rounded-lg"
                  style={{
                    backgroundColor: "oklch(0.20 0.040 255 / 0.88)",
                    color: "white",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
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

          {/* Comparison slider */}
          <div className="border border-border/60 rounded-2xl overflow-hidden shadow-card">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-card">
              <RotateCcw size={11} className="text-muted-foreground/35" />
              <p className="text-[0.6875rem] font-semibold text-muted-foreground/50 tracking-wide uppercase">
                Interactive Comparison
              </p>
              <span className="text-[0.6875rem] text-muted-foreground/35 ml-auto hidden sm:block">
                Drag to compare
              </span>
            </div>
            <ComparisonSlider />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: EDIT WITH AI ──────────────────────────────── */}
      <section
        data-ocid="edit.section"
        className="py-14 border-t border-border/60 bg-section-alt"
      >
        <div className="container max-w-3xl mx-auto px-6">
          <SectionHeader
            label="02 — Refine"
            title="Describe the changes you want"
          />

          {/* Card */}
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "oklch(1.0 0 0)",
              boxShadow:
                "0 1px 3px rgba(0,0,30,0.04), 0 6px 24px rgba(0,0,30,0.06), 0 0 0 1px rgba(0,0,30,0.05)",
            }}
          >
            <Textarea
              data-ocid="edit.textarea"
              placeholder="e.g. Make the living room walls warm terracotta, add a skylight in the kitchen, replace carpet with oak hardwood floors..."
              rows={4}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full resize-none text-[0.875rem] leading-relaxed placeholder:text-muted-foreground/30 bg-transparent border-0 border-b border-border/50 focus:border-foreground/20 focus:ring-0 px-0 py-3 rounded-none"
            />

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                "Add more natural light",
                "Modern furniture style",
                "Open-plan kitchen",
                "Warmer color palette",
              ].map((chip) => (
                <button
                  type="button"
                  key={chip}
                  className="text-[0.75rem] px-3.5 py-1.5 text-muted-foreground font-medium rounded-full transition-all duration-150 border border-border/60 hover:border-border hover:text-foreground hover:bg-accent/50"
                  style={{ backgroundColor: "oklch(0.970 0.004 250)" }}
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 pt-5 border-t border-border/40">
              <Button
                data-ocid="edit.submit_button"
                type="button"
                className="btn-primary w-full sm:w-auto h-10 px-7 font-semibold text-[0.875rem]"
              >
                <Wand2 size={13} className="mr-2" />
                Apply Changes
              </Button>
              <p className="flex items-start gap-1.5 text-[0.75rem] text-muted-foreground/40 max-w-xs">
                <Info size={11} className="flex-shrink-0 mt-0.5" />
                Results may vary based on complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MULTI-ANGLE VIEWS ─────────────────────────── */}
      <section
        data-ocid="angles.section"
        className="py-14 border-t border-border/60 bg-background"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            label="03 — Explore"
            title={<>Every angle. Every room.</>}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
          <div className="mt-4 flex items-center gap-2.5 pt-4 border-t border-border/40">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "oklch(0.20 0.040 255)" }}
            />
            <p className="text-[0.75rem] text-muted-foreground">
              Viewing:{" "}
              <span className="font-semibold text-foreground">
                {ANGLE_VIEWS[activeAngle].label}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: AI VIDEO ──────────────────────────────────── */}
      <section
        data-ocid="video.section"
        className="py-14 border-t border-border/60 bg-section-alt"
      >
        <div className="container max-w-3xl mx-auto px-6">
          <SectionHeader
            label="04 — Walkthrough"
            title="Generate a cinematic walkthrough"
          />

          {/* Video preview */}
          <div
            data-ocid="video.canvas_target"
            className="relative overflow-hidden mb-5 cursor-pointer group rounded-2xl border border-border/60 shadow-card"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src="/assets/generated/video-preview.dim_800x450.jpg"
              alt="Interior walkthrough preview"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              loading="lazy"
            />
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.30) 100%)",
              }}
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-full bg-white/92 flex items-center justify-center group-hover:bg-white group-hover:scale-105 transition-all duration-200 shadow-elevated"
                style={{ border: "1.5px solid rgba(255,255,255,0.50)" }}
              >
                <Play
                  size={16}
                  className="ml-0.5"
                  fill="oklch(0.20 0.040 255)"
                  style={{ color: "oklch(0.20 0.040 255)" }}
                />
              </div>
            </div>
            {/* Duration */}
            <div className="absolute bottom-3 right-3">
              <span
                className="text-[0.6875rem] text-white/85 font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.32)" }}
              >
                Preview · 0:08
              </span>
            </div>
          </div>

          {/* Controls card */}
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "oklch(1.0 0 0)",
              boxShadow:
                "0 1px 3px rgba(0,0,30,0.04), 0 6px 24px rgba(0,0,30,0.06), 0 0 0 1px rgba(0,0,30,0.05)",
            }}
          >
            <p className="text-[0.6875rem] font-bold text-foreground/40 uppercase tracking-widest mb-3">
              Style
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {VIDEO_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setActiveStyle(style)}
                  className={`px-4 py-1.5 text-[0.75rem] font-semibold transition-all duration-150 rounded-full border ${
                    activeStyle === style
                      ? "text-white border-transparent"
                      : "text-muted-foreground hover:text-foreground border-border/60 hover:border-border hover:bg-accent/50"
                  }`}
                  style={
                    activeStyle === style
                      ? { backgroundColor: "oklch(0.20 0.040 255)" }
                      : {}
                  }
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-5 border-t border-border/40">
              <Button
                data-ocid="video.submit_button"
                type="button"
                className="btn-primary w-full sm:w-auto h-10 px-7 font-semibold text-[0.875rem]"
              >
                <Video size={13} className="mr-2" />
                Generate Video
              </Button>
              <div className="flex items-center gap-2 text-[0.75rem] text-muted-foreground/45">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.52 0.14 145)" }}
                />
                ~2 min generation time
              </div>
            </div>

            <p className="text-[0.75rem] mt-4 flex items-start gap-1.5 text-muted-foreground/35 leading-relaxed">
              <Info size={11} className="flex-shrink-0 mt-0.5" />
              AI video generation creates a realistic fly-through in{" "}
              <strong className="font-semibold text-muted-foreground/55">
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
