import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#howitworks" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !isMenuOpen;

  return (
    <header
      data-ocid="nav.section"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "glass-nav"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.link"
            className="flex items-center gap-2.5 group"
          >
            {/* Small geometric mark */}
            <div
              className={`w-6 h-6 rounded-[6px] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isTransparent ? "bg-white/20" : ""
              }`}
              style={
                isTransparent
                  ? {}
                  : { backgroundColor: "oklch(0.20 0.040 255)" }
              }
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="4"
                  height="4"
                  rx="1"
                  fill={isTransparent ? "rgba(255,255,255,0.85)" : "white"}
                />
                <rect
                  x="7"
                  y="1"
                  width="4"
                  height="4"
                  rx="1"
                  fill={
                    isTransparent
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(255,255,255,0.45)"
                  }
                />
                <rect
                  x="1"
                  y="7"
                  width="4"
                  height="4"
                  rx="1"
                  fill={
                    isTransparent
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(255,255,255,0.45)"
                  }
                />
                <rect
                  x="7"
                  y="7"
                  width="4"
                  height="4"
                  rx="1"
                  fill={isTransparent ? "rgba(255,255,255,0.85)" : "white"}
                />
              </svg>
            </div>
            <span
              className={`font-display font-bold tracking-tight transition-all duration-300 ${
                isTransparent ? "text-white" : "text-foreground"
              }`}
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className={`text-[0.8125rem] font-medium transition-smooth nav-link-hover ${
                  isTransparent
                    ? "text-white/65 hover:text-white"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/visualizer"
              data-ocid="nav.link"
              className={`text-[0.8125rem] font-medium transition-smooth ${
                isTransparent
                  ? "text-white/60 hover:text-white"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              Sign in
            </Link>
            <Link to="/visualizer">
              <Button
                data-ocid="nav.primary_button"
                size="sm"
                className={`text-[0.8125rem] font-semibold px-5 h-8 transition-all duration-200 shadow-none rounded-lg ${
                  isTransparent
                    ? "bg-white text-foreground hover:bg-white/90"
                    : "btn-primary"
                }`}
              >
                Start free
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg transition-smooth ${
              isTransparent
                ? "text-white/70 hover:text-white"
                : "text-foreground/70 hover:text-foreground hover:bg-accent"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-nav border-t border-border/50 py-3 px-6 space-y-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-3 py-2.5 text-sm font-medium text-foreground/65 hover:text-foreground transition-smooth rounded-lg hover:bg-accent/50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 pb-1">
            <Link
              to="/visualizer"
              className="block"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="btn-primary w-full font-semibold text-sm">
                Start free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
