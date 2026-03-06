import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { useRef, useState } from "react";

/* ── Feature Card ────────────────────────────────────────────── */
function FeatureCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative bg-card rounded-2xl p-7 border border-border/60 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5">
      {/* Step number — top right corner */}
      <span className="absolute top-6 right-6 text-[0.625rem] font-bold tabular-nums text-foreground/20 font-display tracking-widest">
        {number}
      </span>
      <h3
        className="font-display font-semibold text-[0.9375rem] text-foreground mb-2.5 tracking-tight leading-snug pr-8"
        style={{ fontFamily: '"Cabinet Grotesk", sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-[100svh] flex items-end overflow-hidden"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-bg.dim_1600x900.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Layered gradient overlay — clean and dark at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,6,14,0.92) 0%, rgba(6,6,14,0.52) 42%, rgba(6,6,14,0.18) 100%)",
            }}
          />
          {/* Subtle cool-blue tint in corner */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 15% 90%, rgba(20,25,80,0.28) 0%, transparent 65%)",
            }}
          />
        </div>

        {/* Hero content — anchored bottom */}
        <div className="relative w-full container max-w-7xl mx-auto px-6 pb-20 pt-36">
          <div className="max-w-[640px]">
            {/* Label */}
            <div className="animate-hero-1 flex items-center gap-3 mb-7">
              <div className="w-5 h-px bg-white/30" />
              <span className="text-white/45 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase">
                AI Floor Plan Visualization
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black text-white mb-6 animate-hero-2"
              style={{
                fontFamily: '"Cabinet Grotesk", sans-serif',
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: "1.01",
                fontWeight: 900,
              }}
            >
              See your space
              <br />
              <em
                className="not-italic text-white/75"
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                before you build it.
              </em>
            </h1>

            {/* Subline */}
            <p className="text-white/50 text-[0.9375rem] leading-relaxed max-w-[440px] mb-10 animate-hero-3">
              Upload any 2D floor plan — hand-drawn or digital — and get a
              vivid, colour-rendered 3D visualization in seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3 animate-hero-4">
              <Link to="/visualizer">
                <Button
                  data-ocid="hero.primary_button"
                  className="h-11 px-7 font-semibold rounded-xl bg-white text-foreground hover:bg-white/92 transition-all duration-200 text-[0.875rem] shadow-elevated"
                >
                  Upload Your Plan
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
              <Link
                to="/visualizer"
                data-ocid="hero.secondary_button"
                className="flex items-center gap-2 h-11 text-[0.875rem] font-medium text-white/50 hover:text-white/80 transition-smooth rounded-xl px-5 border border-white/12 hover:border-white/25 hover:bg-white/5"
              >
                View demo
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────────────────── */}
      <div className="border-y border-border/70 bg-card">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start divide-x divide-border/50">
            {[
              "No credit card required",
              "Works with any floor plan",
              "Results in under 30s",
              "Trusted by 12,000+ homeowners",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 py-4 px-6">
                <CheckCircle2
                  size={12}
                  strokeWidth={2.5}
                  style={{ color: "oklch(0.52 0.14 145)" }}
                  className="flex-shrink-0"
                />
                <span className="text-[0.75rem] font-medium text-foreground/50 whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section
        data-ocid="howitworks.section"
        id="howitworks"
        className="py-32 bg-background"
      >
        <div className="container max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
            <div>
              <span className="label-tag mb-5 block w-fit">How it works</span>
              <h2
                className="font-display font-black text-foreground"
                style={{
                  fontFamily: '"Cabinet Grotesk", sans-serif',
                  fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "1.05",
                }}
              >
                Three steps.
                <br />
                One clear picture.
              </h2>
            </div>
            <Link
              to="/visualizer"
              className="text-[0.8125rem] font-medium text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5 group"
            >
              Try it now
              <ArrowRight
                size={13}
                className="group-hover:translate-x-0.5 transition-transform duration-150"
              />
            </Link>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                title: "Upload your 2D plan",
                description:
                  "Drop any PDF, PNG, or JPG floor plan — hand-drawn or architectural. We handle the rest.",
              },
              {
                n: "02",
                title: "AI transforms it",
                description:
                  "Our model reads every wall, room, and dimension. A vivid 3D render is generated in seconds.",
              },
              {
                n: "03",
                title: "Explore in 3D",
                description:
                  "Navigate multiple angles, adjust colours with plain text, and share or export your result.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="relative bg-card rounded-2xl p-8 border border-border/60 shadow-card group hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Large ghost number */}
                <span
                  className="absolute -top-3 -right-1 text-[5rem] font-black tabular-nums leading-none pointer-events-none select-none font-display"
                  style={{
                    fontFamily: '"Cabinet Grotesk", sans-serif',
                    color: "oklch(0.14 0.020 255 / 0.04)",
                    letterSpacing: "-0.06em",
                  }}
                  aria-hidden="true"
                >
                  {step.n}
                </span>

                {/* Step number badge */}
                <span className="step-badge mb-5 inline-block">{step.n}</span>

                <h3
                  className="font-display font-bold text-[1.0625rem] text-foreground mb-3"
                  style={{
                    fontFamily: '"Cabinet Grotesk", sans-serif',
                    letterSpacing: "-0.025em",
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPLOAD ─────────────────────────────────────────────────── */}
      <section
        data-ocid="upload.section"
        id="upload"
        className="py-32 bg-section-alt border-t border-border/60"
      >
        <div className="container max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="label-tag mb-5 inline-block">Get started</span>
            <h2
              className="font-display font-black text-foreground"
              style={{
                fontFamily: '"Cabinet Grotesk", sans-serif',
                fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Upload your floor plan
            </h2>
            <p className="text-muted-foreground text-[0.875rem] mt-3 leading-relaxed">
              Drop your file below or browse — transformation takes seconds.
            </p>
          </div>

          {/* Dropzone */}
          <label
            data-ocid="upload.dropzone"
            htmlFor="floor-plan-upload"
            className="relative cursor-pointer block transition-all duration-250 group min-h-[260px] flex flex-col items-center justify-center rounded-2xl"
            style={{
              borderWidth: "1.5px",
              borderStyle: "dashed",
              borderColor: isDragOver
                ? "oklch(0.20 0.040 255 / 0.55)"
                : "oklch(0.860 0.008 250)",
              backgroundColor: isDragOver
                ? "oklch(0.20 0.040 255 / 0.03)"
                : "oklch(1.0 0 0)",
              boxShadow: isDragOver
                ? "0 0 0 4px oklch(0.20 0.040 255 / 0.06), 0 4px 16px rgba(0,0,40,0.06)"
                : "0 1px 3px rgba(0,0,30,0.04), 0 4px 16px rgba(0,0,30,0.04), 0 0 0 1px rgba(0,0,30,0.03)",
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
            }}
          >
            <input
              ref={fileInputRef}
              id="floor-plan-upload"
              type="file"
              className="sr-only"
              accept=".pdf,.png,.jpg,.jpeg"
              aria-label="Select floor plan file"
            />
            <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
              {/* Icon container */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: "oklch(0.940 0.006 250)",
                  border: "1px solid oklch(0.900 0.008 250)",
                }}
              >
                <Upload
                  size={22}
                  style={{ color: "oklch(0.38 0.026 255)" }}
                  strokeWidth={1.75}
                />
              </div>
              <p className="font-display font-semibold text-[0.9375rem] text-foreground mb-1.5 tracking-tight">
                Drop your floor plan here
              </p>
              <p className="text-muted-foreground text-[0.8125rem] mb-4">
                or{" "}
                <span
                  className="font-semibold underline underline-offset-2 decoration-dashed"
                  style={{ color: "oklch(0.26 0.040 255)" }}
                >
                  browse files
                </span>
              </p>
              <p className="text-[0.6875rem] text-muted-foreground/50 tracking-wide">
                PDF · PNG · JPG — up to 50 MB
              </p>
            </div>
          </label>

          {/* Sample link */}
          <div className="mt-5 flex justify-center">
            <Link
              to="/visualizer"
              data-ocid="upload.secondary_button"
              className="text-[0.8125rem] text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5 group"
            >
              or view a sample visualization
              <ArrowRight
                size={12}
                className="group-hover:translate-x-0.5 transition-transform duration-150"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section
        data-ocid="features.section"
        id="features"
        className="py-32 border-t border-border/60 bg-background"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-6">
            <div>
              <span className="label-tag mb-5 block w-fit">Features</span>
              <h2
                className="font-display font-black text-foreground"
                style={{
                  fontFamily: '"Cabinet Grotesk", sans-serif',
                  fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "1.05",
                }}
              >
                Everything you need
                <br />
                to understand your space.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              number="01"
              title="Instant 3D Render"
              description="Upload any 2D floor plan and receive a photorealistic 3D visualization in under 30 seconds."
            />
            <FeatureCard
              number="02"
              title="Edit with words"
              description='Describe changes in plain English — "terracotta walls" or "add a skylight" — and watch the render update live.'
            />
            <FeatureCard
              number="03"
              title="Multi-angle views"
              description="Explore bird's-eye, side perspective, cross-section, and exploded axonometric views of your space."
            />
            <FeatureCard
              number="04"
              title="Cinematic walkthrough"
              description="Generate an AI video flythrough of your interior — complete with lighting, depth, and atmosphere."
            />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────── */}
      <section
        data-ocid="cta.section"
        className="py-24 border-t border-border/60 bg-section-alt"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <div
            className="relative overflow-hidden rounded-3xl px-10 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
            style={{
              background: "oklch(0.14 0.028 255)",
              boxShadow:
                "0 4px 24px rgba(0,0,40,0.12), 0 24px 64px rgba(0,0,40,0.14)",
            }}
          >
            {/* Subtle radial depth in corner */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 90% 20%, rgba(60,80,200,0.15) 0%, transparent 55%)",
              }}
            />

            <div className="relative">
              <span
                className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold mb-5 px-3 py-1.5 rounded-full tracking-widest uppercase"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                Free to start · No credit card
              </span>
              <h2
                className="font-display font-black text-white"
                style={{
                  fontFamily: '"Cabinet Grotesk", sans-serif',
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "1.05",
                }}
              >
                Ready to see your
                <br />
                space come to life?
              </h2>
            </div>
            <Link to="/visualizer" className="flex-shrink-0 relative">
              <Button
                data-ocid="cta.primary_button"
                className="h-12 px-8 font-semibold rounded-xl bg-white text-foreground hover:bg-white/92 transition-all duration-200 text-[0.875rem] shadow-elevated"
              >
                Get started free
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
