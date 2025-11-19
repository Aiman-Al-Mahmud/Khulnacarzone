import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroCar1 from "@/assets/hero-car-1.jpg";
import heroCar2 from "@/assets/hero-car-2.jpg";
import heroCar3 from "@/assets/hero-car-3.jpg";
import heroCar4 from "@/assets/hero-car-4.jpg";

interface HeroProps {
  onPreOrderClick: () => void;
}

const slides = [
  {
    image: heroCar1,
    title: "Premium Cars from Japan",
    subtitle: "Verified auction reports & quality guaranteed",
  },
  {
    image: heroCar2,
    title: "Luxury Sedans & SUVs",
    subtitle: "Find your perfect ride with expert guidance",
  },
  {
    image: heroCar3,
    title: "Trusted Car Import Service",
    subtitle: "Over 10 years of excellence in Khulna",
  },
  {
    image: heroCar4,
    title: "Your Dream Car Awaits",
    subtitle: "Competitive pricing & transparent process",
  },
];

const Hero = ({ onPreOrderClick }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden mt-[120px] md:mt-[128px]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={onPreOrderClick}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Pre-Order Now
                </Button>
                <Link to="/stock-list?budget=under20">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Cars Under 20 Lakh
                  </Button>
                </Link>
              </div>
            </div>

            {/* Floating Cars Under 20 Lakh CTA - Desktop */}
            <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
              <Link to="/stock-list?budget=under20">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-2xl animate-pulse"
                >
                  🚗 Cars Under 20 Lakh
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
