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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
        <div className="flex items-center justify-between h-14">
          {/* Text wordmark — no image */}
          <Link to="/" data-ocid="nav.link" className="flex items-center group">
            <span
              className={`font-display font-black text-sm tracking-tight transition-all duration-300 ${
                isTransparent ? "text-white" : "text-foreground"
              }`}
              style={{
                fontFamily: '"Cabinet Grotesk", sans-serif',
                fontWeight: 800,
              }}
            >
              FloorVision AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className={`text-[11px] uppercase tracking-wide font-medium transition-smooth nav-link-hover ${
                  isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/visualizer"
              data-ocid="nav.link"
              className={`text-[11px] uppercase tracking-wide font-medium transition-smooth ${
                isTransparent
                  ? "text-white/65 hover:text-white"
                  : "text-foreground/55 hover:text-foreground"
              }`}
            >
              Sign in
            </Link>
            <Link to="/visualizer">
              <Button
                data-ocid="nav.primary_button"
                size="sm"
                className={`text-xs font-semibold px-5 h-8 tracking-wide transition-all duration-200 ${
                  isTransparent
                    ? "bg-white text-foreground hover:bg-white/90"
                    : "btn-primary"
                }`}
                style={{ borderRadius: 0 }}
              >
                Start free
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`md:hidden p-2 transition-smooth ${
              isTransparent
                ? "text-white/70 hover:text-white"
                : "text-foreground/70 hover:text-foreground"
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
        <div className="md:hidden glass-nav border-t border-border/40 py-4 px-6 space-y-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-3 py-2.5 text-xs uppercase tracking-wide font-medium text-foreground/70 hover:text-foreground transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 pb-1">
            <Link
              to="/visualizer"
              className="block"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button
                className="btn-primary w-full font-semibold text-xs tracking-wide"
                style={{ borderRadius: 0 }}
              >
                Start free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
