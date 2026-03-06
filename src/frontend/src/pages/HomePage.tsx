import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

/* ── Feature row ─────────────────────────────────────────── */
function FeatureRow({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid grid-cols-[1.5rem_1fr] sm:grid-cols-[1.5rem_1fr_1fr] gap-x-6 gap-y-1 py-7 border-b border-border/40 group">
      <span className="text-[10px] text-muted-foreground/30 font-medium pt-0.5 tabular-nums tracking-widest select-none">
        {number}
      </span>
      <h3 className="font-display font-semibold text-sm text-foreground tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed col-start-2 sm:col-start-3 mt-0.5 sm:mt-0">
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

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex items-end overflow-hidden"
      >
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-bg.dim_1600x900.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.12) 100%)",
            }}
          />
        </div>

        {/* Hero text anchored to bottom */}
        <div className="relative w-full container max-w-6xl mx-auto px-6 pb-20 pt-40">
          <div className="max-w-3xl">
            {/* Hairline accent before headline */}
            <div className="w-12 h-px bg-white/30 mb-8" />

            <h1
              className="font-display font-black text-white mb-7"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: "1.0",
              }}
            >
              See your space
              <br />
              <em
                className="not-italic"
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                before you build it.
              </em>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-md mb-10">
              Upload any 2D floor plan and get a vivid, colour-rendered 3D
              visualization in seconds. No expertise required.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <Link to="/visualizer">
                <Button
                  data-ocid="hero.primary_button"
                  className="h-11 px-8 font-semibold bg-white text-foreground hover:bg-white/92 transition-all duration-200 text-sm tracking-wide"
                  style={{ borderRadius: 0 }}
                >
                  Upload Your Plan
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
              <Link
                to="/visualizer"
                data-ocid="hero.secondary_button"
                className="flex items-center gap-2 h-11 text-sm font-medium text-white/65 hover:text-white transition-smooth"
              >
                See a demo
                <span className="text-white/40">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────────────── */}
      <div className="border-y border-border/30">
        <div className="container max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-2">
          {[
            "No credit card required",
            "Works with any floor plan",
            "Results in seconds",
            "Trusted by 12,000+ homeowners",
          ].map((item) => (
            <span
              key={item}
              className="text-xs text-muted-foreground/60 font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section
        data-ocid="howitworks.section"
        id="howitworks"
        className="py-32 bg-background"
      >
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground/40 tracking-[0.18em] uppercase mb-4 font-medium">
                How it works
              </p>
              <h2
                className="font-display font-black text-foreground"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
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
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5"
            >
              Try it now
              <span className="text-muted-foreground/40 group-hover:translate-x-0.5 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>

          {/* Numbered list layout */}
          <div className="border-t border-border/30">
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
                className="grid grid-cols-[80px_1fr] border-b border-border/30 py-10"
              >
                <span
                  className="text-7xl font-black text-foreground/[0.04] tabular-nums select-none leading-none"
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <div className="pt-1">
                  <h3
                    className="font-display font-bold text-xl text-foreground mb-2"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPLOAD ─────────────────────────────────────────────── */}
      <section
        data-ocid="upload.section"
        id="upload"
        className="py-32 bg-section-alt border-t border-border/40"
      >
        <div className="container max-w-3xl mx-auto px-6">
          <p className="text-[10px] text-muted-foreground/40 tracking-[0.18em] uppercase mb-4 font-medium text-center">
            Get started
          </p>
          <h2
            className="font-display font-black text-foreground text-center mb-12"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Upload your floor plan
          </h2>

          {/* Dropzone — the section itself */}
          <label
            data-ocid="upload.dropzone"
            htmlFor="floor-plan-upload"
            className="relative border border-dashed cursor-pointer block transition-all duration-200 group min-h-[320px] flex flex-col items-center justify-center"
            style={{
              borderColor: isDragOver
                ? "oklch(0.38 0.12 250)"
                : "oklch(0.82 0.004 260)",
              backgroundColor: isDragOver
                ? "oklch(0.97 0.004 250)"
                : "transparent",
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
            <div className="flex flex-col items-center justify-center py-16 px-8">
              <span
                className="text-7xl font-thin text-foreground/[0.12] leading-none mb-6 select-none"
                aria-hidden="true"
              >
                +
              </span>
              <p className="font-display font-medium text-sm text-foreground mb-1.5">
                Drop your floor plan here
              </p>
              <p className="text-muted-foreground text-xs">
                PDF, PNG, JPG — up to 50 MB
              </p>
            </div>
          </label>

          {/* Sample link — plain text */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/visualizer"
              data-ocid="upload.secondary_button"
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5"
            >
              or view a sample
              <span className="text-muted-foreground/40">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section
        data-ocid="features.section"
        id="features"
        className="py-32 border-t border-border/40 bg-background"
      >
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground/40 tracking-[0.18em] uppercase mb-4 font-medium">
                Features
              </p>
              <h2
                className="font-display font-black text-foreground"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
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

          <div className="border-t border-border/40">
            <FeatureRow
              number="01"
              title="Instant 3D Render"
              description="Upload any 2D floor plan and receive a photorealistic 3D visualization in under 30 seconds."
            />
            <FeatureRow
              number="02"
              title="Edit with words"
              description='Describe changes in plain English — "terracotta walls" or "add a skylight" — and watch the render update live.'
            />
            <FeatureRow
              number="03"
              title="Multi-angle views"
              description="Explore bird's-eye, side perspective, cross-section, and exploded axonometric views of your space."
            />
            <FeatureRow
              number="04"
              title="Cinematic walkthrough"
              description="Generate an AI video flythrough of your interior — complete with lighting, depth, and atmosphere."
            />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section
        data-ocid="cta.section"
        className="relative overflow-hidden py-24 border-t border-border/40 bg-foreground"
      >
        {/* Decorative typographic element */}
        <span
          className="absolute right-8 bottom-0 font-display font-black select-none pointer-events-none leading-none text-white/[0.04]"
          style={{ fontSize: "clamp(5rem, 18vw, 120px)" }}
          aria-hidden="true"
        >
          3D
        </span>

        <div className="relative container max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
          <div>
            <h2
              className="font-display font-black text-white"
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                letterSpacing: "-0.04em",
                lineHeight: "1.05",
              }}
            >
              Ready to see your
              <br />
              space come to life?
            </h2>
            <p className="text-white/30 text-xs mt-4 tracking-wide">
              No credit card · Free to start
            </p>
          </div>
          <Link to="/visualizer">
            <Button
              data-ocid="cta.primary_button"
              className="h-11 px-8 font-semibold bg-white text-foreground hover:bg-white/92 transition-all duration-200 flex-shrink-0 text-sm tracking-wide"
              style={{ borderRadius: 0 }}
            >
              Get started free
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
