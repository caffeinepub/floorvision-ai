import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CloudUpload,
  Eye,
  Pencil,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

/* ── Section divider with diamond ─────────────────────────── */
function SectionDivider() {
  return (
    <div className="flex items-center gap-4 py-2 container max-w-7xl mx-auto px-6">
      <div className="flex-1 h-px bg-border/60" />
      <div
        className="w-2 h-2 rotate-45 border"
        style={{ borderColor: "oklch(0.88 0.02 75)" }}
      />
      <div className="flex-1 h-px bg-border/60" />
    </div>
  );
}

/* ── How It Works step ─────────────────────────────────────── */
function Step({
  number,
  icon: Icon,
  title,
  description,
  isLast,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-0 flex-1">
      {/* Card */}
      <div
        className="flex flex-col flex-1 sm:mx-3 bg-card rounded-2xl px-6 pt-5 pb-6 shadow-warm border border-border/50 relative overflow-hidden group transition-all duration-300 hover:shadow-warm-lg"
        style={{ borderTop: "2.5px solid oklch(0.70 0.175 55)" }}
      >
        {/* Editorial step number — large, behind content */}
        <span
          className="step-num absolute bottom-3 right-4 pointer-events-none select-none"
          aria-hidden="true"
        >
          {`0${number}`}
        </span>

        {/* Icon row */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "oklch(0.95 0.025 78)" }}
          >
            <Icon size={20} style={{ color: "oklch(0.70 0.175 55)" }} />
          </div>
          <span
            className="font-display font-black text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.72 0.10 60)", letterSpacing: "0.12em" }}
          >
            Step {number}
          </span>
        </div>

        <h3 className="font-display font-bold text-foreground text-base mb-1.5 relative z-10">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed relative z-10 max-w-[20ch]">
          {description}
        </p>
      </div>

      {/* Arrow connector */}
      {!isLast && (
        <div className="hidden sm:flex items-center justify-center self-center flex-shrink-0">
          <div
            className="flex items-center gap-0.5"
            style={{ color: "oklch(0.78 0.08 60)" }}
          >
            <div className="w-6 h-px bg-current opacity-40" />
            <div className="w-4 h-px bg-current opacity-60" />
            <ChevronRight size={14} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Feature card ───────────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  number,
  title,
  description,
  tagline,
}: {
  icon: React.ElementType;
  number: string;
  title: string;
  description: string;
  tagline: string;
}) {
  return (
    <article className="group relative bg-card rounded-2xl p-7 border border-border/60 feature-card shadow-xs hover:shadow-warm overflow-hidden">
      {/* Ghost number */}
      <span
        className="absolute -top-3 -right-2 font-display font-black text-7xl leading-none pointer-events-none select-none"
        style={{ color: "oklch(0.93 0.010 75)" }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shadow-warm"
        style={{ backgroundColor: "oklch(0.95 0.025 78)" }}
      >
        <Icon size={22} style={{ color: "oklch(0.70 0.175 55)" }} />
      </div>

      <span
        className="pill-badge mb-3 inline-flex"
        style={{
          backgroundColor: "oklch(0.95 0.025 78)",
          color: "oklch(0.55 0.12 55)",
        }}
      >
        {tagline}
      </span>

      <h3 className="font-display font-bold text-lg text-foreground mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </article>
  );
}

export default function HomePage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-bg.dim_1600x900.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Warm white gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,252,248,0.88) 0%, rgba(255,252,248,0.70) 50%, rgba(250,245,235,0.80) 100%)",
            }}
          />
        </div>

        {/* Decorative floating circle */}
        <div
          className="absolute top-24 right-[8%] w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.70 0.175 55 / 0.35) 0%, transparent 70%)",
          }}
        />

        <div className="relative container max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
          {/* Pill badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span
              className="pill-badge"
              style={{
                backgroundColor: "oklch(0.70 0.175 55)",
                color: "white",
              }}
            >
              <Sparkles size={9} />
              AI-Powered · v2.0
            </span>
            <span
              className="pill-badge"
              style={{
                backgroundColor: "oklch(0.95 0.022 78)",
                color: "oklch(0.45 0.08 60)",
                border: "1px solid oklch(0.88 0.025 72)",
              }}
            >
              Free to start · No card required
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-display font-black text-foreground mb-5"
            style={{
              fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: "1.0",
            }}
          >
            See Your Floor Plan
            <br />
            <em
              className="not-italic block mt-1"
              style={{
                color: "oklch(0.70 0.175 55)",
                fontFamily: '"Fraunces", serif',
                fontWeight: 600,
                fontSize: "1.08em",
                textShadow: "0 2px 24px oklch(0.70 0.175 55 / 0.18)",
              }}
            >
              Come to Life
            </em>
          </h1>

          {/* Decorative rule under headline */}
          <div className="hero-rule max-w-xs mx-auto mb-7">
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.10 60)", letterSpacing: "0.18em" }}
            >
              AI-Powered Visualization
            </span>
          </div>

          {/* Subheadline */}
          <p
            className="text-foreground/60 leading-relaxed max-w-xl mx-auto mb-10"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.175rem)" }}
          >
            FloorVision AI transforms flat 2D architectural drawings into
            stunning, colourful 3D visualizations — instantly. No expertise
            required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link to="/visualizer">
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="btn-amber h-12 px-8 rounded-full font-semibold shadow-warm-lg"
              >
                Upload Your Plan
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link to="/visualizer">
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-full font-semibold border-foreground/20 hover:border-foreground/40 hover:bg-foreground/[0.04] transition-all duration-200"
              >
                See a Demo
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              "No credit card required",
              "Works with any floor plan",
              "Results in seconds",
            ].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs text-foreground/55 font-medium"
              >
                <Check
                  size={12}
                  className="flex-shrink-0"
                  style={{ color: "oklch(0.70 0.175 55)" }}
                />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section
        data-ocid="howitworks.section"
        id="howitworks"
        className="py-24 bg-section-alt"
      >
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-14">
            <span
              className="pill-badge mb-4"
              style={{
                backgroundColor: "oklch(0.95 0.025 78)",
                color: "oklch(0.55 0.12 55)",
              }}
            >
              HOW IT WORKS
            </span>
            <div className="relative pb-2">
              <span
                className="section-ghost-num absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none"
                aria-hidden="true"
              >
                01
              </span>
              <h2
                className="relative font-display font-black text-foreground"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Three steps to a living space
                <br />
                <span style={{ color: "oklch(0.70 0.175 55)" }}>
                  you can see
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground mt-4 max-w-lg text-base leading-relaxed">
              Our AI pipeline takes your blueprint from flat lines to a
              full-colour spatial experience in moments.
            </p>
          </div>

          {/* Pipeline steps */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-0">
            <Step
              number="1"
              icon={Upload}
              title="Upload your 2D plan"
              description="Drop any PDF, PNG, or JPG floor plan — hand-drawn or architectural."
            />
            <Step
              number="2"
              icon={Sparkles}
              title="AI transforms it"
              description="Our model reads every wall, room, and dimension in seconds."
            />
            <Step
              number="3"
              icon={Eye}
              title="Explore in 3D"
              description="Navigate multiple angles, adjust colours, and share instantly."
              isLast
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── UPLOAD ─────────────────────────────────────────────── */}
      <section
        data-ocid="upload.section"
        id="upload"
        className="py-24 bg-background"
      >
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-10">
            <span
              className="pill-badge mb-4"
              style={{
                backgroundColor: "oklch(0.95 0.025 78)",
                color: "oklch(0.55 0.12 55)",
              }}
            >
              GET STARTED
            </span>
            <div className="relative pb-2">
              <span
                className="section-ghost-num absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none"
                aria-hidden="true"
              >
                02
              </span>
              <h2
                className="relative font-display font-black text-foreground"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Upload Your Floor Plan
              </h2>
            </div>
            <p className="text-muted-foreground mt-4 text-base max-w-md">
              Start with your own plan or try with our sample below.
            </p>
          </div>

          {/* Dropzone */}
          <label
            data-ocid="upload.dropzone"
            htmlFor="floor-plan-upload"
            className="relative rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer group block"
            style={{
              borderColor: isDragOver
                ? "oklch(0.70 0.175 55)"
                : "oklch(0.87 0.018 75)",
              backgroundColor: isDragOver
                ? "oklch(0.96 0.025 78)"
                : "transparent",
              transform: isDragOver ? "scale(1.01)" : "scale(1)",
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
            <div className="flex flex-col items-center justify-center py-20 px-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-warm"
                style={{ backgroundColor: "oklch(0.95 0.025 78)" }}
              >
                <CloudUpload
                  size={30}
                  style={{ color: "oklch(0.70 0.175 55)" }}
                />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Drag & drop your floor plan here
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Supports PDF, PNG, JPG
              </p>
              <span
                className="text-sm font-semibold underline underline-offset-2 cursor-pointer transition-smooth"
                style={{ color: "oklch(0.70 0.175 55)" }}
              >
                Browse files
              </span>
            </div>
          </label>

          {/* Sample option */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-px w-16 bg-border/60" />
              <span>Or try with a sample</span>
              <div className="h-px w-16 bg-border/60" />
            </div>
            <Link
              to="/visualizer"
              data-ocid="upload.secondary_button"
              className="group flex items-center gap-3 p-3 pr-5 rounded-2xl border border-border/60 hover:shadow-warm transition-all duration-200 bg-card"
              style={{ borderColor: "oklch(0.90 0.012 75)" }}
            >
              <div className="w-16 h-12 rounded-xl overflow-hidden shadow-warm flex-shrink-0">
                <img
                  src="/assets/generated/floorplan-2d.dim_800x600.jpg"
                  alt="Sample 2D floor plan"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground font-display">
                  Modern 3-Bedroom Home
                </p>
                <p className="text-xs text-muted-foreground">
                  Sample floor plan · 1,420 sq ft
                </p>
              </div>
              <ArrowRight
                size={16}
                className="ml-auto group-hover:translate-x-1 transition-all duration-200"
                style={{ color: "oklch(0.62 0.10 55)" }}
              />
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section
        data-ocid="features.section"
        id="features"
        className="py-24 bg-section-alt"
      >
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-14">
            <span
              className="pill-badge mb-4"
              style={{
                backgroundColor: "oklch(0.95 0.025 78)",
                color: "oklch(0.55 0.12 55)",
              }}
            >
              FEATURES
            </span>
            <div className="relative pb-2">
              <span
                className="section-ghost-num absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none"
                aria-hidden="true"
              >
                03
              </span>
              <h2
                className="relative font-display font-black text-foreground"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Everything you need to{" "}
                <span style={{ color: "oklch(0.70 0.175 55)" }}>
                  understand
                </span>
                <br />
                your space
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FeatureCard
              icon={Sparkles}
              number="01"
              title="Instant 3D Render"
              description="Upload any 2D floor plan and receive a photorealistic 3D visualization in under 30 seconds."
              tagline="AI-Powered"
            />
            <FeatureCard
              icon={Pencil}
              number="02"
              title="Edit With Words"
              description='Describe changes in plain English — "terracotta walls" or "add a skylight" — and watch the render update.'
              tagline="Natural Language"
            />
            <FeatureCard
              icon={RotateCcw}
              number="03"
              title="Multi-Angle Views"
              description="Explore bird's-eye, side perspective, cross-section, and exploded axonometric views of your space."
              tagline="4 View Modes"
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section
        data-ocid="cta.section"
        className="py-16 relative overflow-hidden"
        style={{ backgroundColor: "oklch(0.70 0.175 55)" }}
      >
        {/* Decorative background shapes */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative container max-w-5xl mx-auto px-6 text-center">
          <h2
            className="font-display font-black text-white mb-3"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Ready to visualize your space?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-lg mx-auto">
            Join thousands of homeowners, architects, and designers who use
            FloorVision AI every day.
          </p>
          <Link to="/visualizer">
            <Button
              data-ocid="cta.primary_button"
              size="lg"
              className="h-12 px-8 rounded-full font-bold text-base bg-white hover:bg-white/95 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 shadow-warm-xl"
              style={{ color: "oklch(0.70 0.175 55)" }}
            >
              Get Started Free
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <p className="text-white/55 text-xs mt-4 font-medium">
            No credit card · Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
