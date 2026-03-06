import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="container max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[260px]">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              {/* Logo mark */}
              <div
                className="w-6 h-6 rounded-[6px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "oklch(0.20 0.040 255)" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x="1" y="1" width="4" height="4" rx="1" fill="white" />
                  <rect
                    x="7"
                    y="1"
                    width="4"
                    height="4"
                    rx="1"
                    fill="rgba(255,255,255,0.45)"
                  />
                  <rect
                    x="1"
                    y="7"
                    width="4"
                    height="4"
                    rx="1"
                    fill="rgba(255,255,255,0.45)"
                  />
                  <rect x="7" y="7" width="4" height="4" rx="1" fill="white" />
                </svg>
              </div>
              <span
                className="font-display font-black text-foreground tracking-tight group-hover:text-foreground/75 transition-smooth"
                style={{
                  fontFamily: '"Cabinet Grotesk", sans-serif',
                  fontWeight: 800,
                  fontSize: "0.9375rem",
                  letterSpacing: "-0.02em",
                }}
              >
                FloorVision AI
              </span>
            </Link>
            <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
              Transform flat floor plans into vivid 3D visualizations —
              instantly. No expertise required.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
            <div>
              <p className="text-[0.6875rem] font-bold text-foreground/35 uppercase tracking-[0.08em] mb-5">
                Product
              </p>
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How it works", href: "#howitworks" },
                  { label: "Pricing", href: "#pricing" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[0.8125rem] text-muted-foreground hover:text-foreground transition-smooth w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[0.6875rem] font-bold text-foreground/35 uppercase tracking-[0.08em] mb-5">
                Company
              </p>
              <nav className="flex flex-col gap-3">
                {["Privacy", "Terms", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-[0.8125rem] text-muted-foreground hover:text-foreground transition-smooth w-fit"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.75rem] text-muted-foreground/55">
            © {year} FloorVision AI. All rights reserved.
          </p>
          <p className="text-[0.75rem] text-muted-foreground/45 flex items-center gap-1.5">
            Built with{" "}
            <Heart
              size={10}
              fill="oklch(0.55 0.16 20)"
              stroke="oklch(0.55 0.16 20)"
            />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground/70 transition-smooth underline underline-offset-2 decoration-border"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
