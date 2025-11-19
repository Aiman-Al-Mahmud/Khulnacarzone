import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";
import PreOrderModal from "@/components/PreOrderModal";
import FloatingActions from "@/components/FloatingActions";
import GoogleReviews from "@/components/GoogleReviews";
import LoanCalculator from "@/components/LoanCalculator";
import { Button } from "@/components/ui/button";
import { carsData } from "@/data/carsData";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const recentCars = carsData.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero onPreOrderClick={() => setIsPreOrderOpen(true)} />

        {/* Full-width Cars Under 20 Lakh CTA - Mobile */}
        <div className="lg:hidden bg-primary py-4 px-4">
          <Link to="/stock-list?budget=under20">
            <Button size="lg" variant="secondary" className="w-full text-lg">
              🚗 View Cars Under 20 Lakh
            </Button>
          </Link>
        </div>

        {/* Search Section */}
        <section className="py-12 bg-secondary/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Find Your Perfect Car
            </h2>
            <FilterBar />
          </div>
        </section>

        {/* Recent Cars */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Latest Arrivals
              </h2>
              <Link to="/stock-list">
                <Button variant="outline" className="group">
                  See All Cars
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCars.map((car) => (
                <CarCard key={car.id} {...car} image={car.images[0]} />
              ))}
            </div>
          </div>
        </section>

        {/* Google Reviews */}
        <GoogleReviews />

        {/* Loan Calculator */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <LoanCalculator />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/90 to-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Own Your Dream Car?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust Khulna Car Zone for quality imports with verified reports.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setIsPreOrderOpen(true)}
              >
                Pre-Order Now
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
      <PreOrderModal isOpen={isPreOrderOpen} onClose={() => setIsPreOrderOpen(false)} />
    </div>
  );
};

export default Index;
