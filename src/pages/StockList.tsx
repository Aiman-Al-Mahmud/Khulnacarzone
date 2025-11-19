import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";
import FloatingActions from "@/components/FloatingActions";
import { carsData } from "@/data/carsData";
import { Badge } from "@/components/ui/badge";

const StockList = () => {
  const [searchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState(carsData);
  const budget = searchParams.get("budget");

  useEffect(() => {
    if (budget === "under20") {
      // Filter logic for cars under 20 lakh would go here
      // For now, showing all cars as demo
      setFilteredCars(carsData);
    }
  }, [budget]);

  const handleFilterChange = (filters: any) => {
    let filtered = [...carsData];

    if (filters.brand) {
      filtered = filtered.filter((car) => car.maker === filters.brand);
    }

    if (filters.model) {
      filtered = filtered.filter((car) => car.model === filters.model);
    }

    if (filters.condition !== "all") {
      filtered = filtered.filter((car) => car.condition === filters.condition);
    }

    setFilteredCars(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-40 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Stock</h1>
            {budget === "under20" && (
              <Badge className="text-lg px-4 py-2">
                Cars Under 20 Lakh
              </Badge>
            )}
            <p className="text-muted-foreground mt-2">
              Showing {filteredCars.length} vehicles
            </p>
          </div>

          <FilterBar onFilterChange={handleFilterChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} {...car} image={car.images[0]} />
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No cars found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default StockList;
