import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="border-t border-border/40 bg-background overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 pt-12 pb-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center">
              <span
                className="font-display font-black text-sm text-foreground tracking-tight"
                style={{
                  fontFamily: '"Cabinet Grotesk", sans-serif',
                  fontWeight: 800,
                }}
              >
                FloorVision AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Transform flat floor plans into vivid 3D visualizations —
              instantly.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 pb-6">
          <p className="text-xs text-muted-foreground">
            © {year} FloorVision AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built with{" "}
            <Heart
              size={11}
              fill="oklch(0.70 0.175 55)"
              stroke="oklch(0.70 0.175 55)"
            />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-smooth underline underline-offset-2"
              style={{ color: "oklch(0.60 0.12 55)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>

      {/* Large brand stamp — signature typographic wordmark */}
      <div className="w-full overflow-hidden pointer-events-none select-none">
        <p
          className="font-display font-black text-foreground/[0.05] whitespace-nowrap leading-[0.85] tracking-tighter w-full"
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontFamily: '"Cabinet Grotesk", sans-serif',
          }}
          aria-hidden="true"
        >
          FloorVision
        </p>
      </div>
    </footer>
  );
}
