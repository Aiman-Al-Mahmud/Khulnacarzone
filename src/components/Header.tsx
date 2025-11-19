import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo2.png";

const Header = () => {
  const [isTopBarVisible, setIsTopBarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Animate topbar on load
    const timer = setTimeout(() => {
      setIsTopBarVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/stock-list", label: "Stock List" },
    { to: "/verification", label: "True Report Verification" },
    { to: "/blog", label: "Blog" },
    { to: "/delivered-cars", label: "Delivered Cars" },
    { to: "/contact", label: "Contact Us" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar with roll-on effect */}
      <div
        className={`bg-[hsl(var(--topbar-bg))] text-foreground py-1.5 px-4 overflow-hidden ${
          isTopBarVisible ? "" : "opacity-0"
        }`}
      >
        <div className={`transition-transform duration-1000 ease-out ${
          isTopBarVisible ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm gap-2">
          <a
            href="tel:+8801615242424"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Phone: +8801615242424</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>6 KDA Avenue, Khulna Bangladesh</span>
          </div>
        </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-1.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 -my-3">
              {/* Increased logo size for better visibility with negative margin to prevent navbar expansion */}
              <img
                src={logo}
                alt="Khulna Car Zone"
                className="h-20 md:h-24 lg:h-28 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Icons & Mobile Menu */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/8801615242424"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                WhatsApp
              </a>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
