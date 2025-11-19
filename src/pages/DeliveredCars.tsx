import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { deliveredCars } from "@/data/deliveredCarsData";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Car, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeliveredCars = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingActions />
      
      <main className="container mx-auto px-4 py-12 mt-40">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Delivered <span className="text-primary">Cars Gallery</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch our happy customers receive their dream cars. See real testimonials and delivery moments from satisfied Khulna Car Zone customers.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-card rounded-lg border border-border animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Cars Delivered</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-border animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Districts Covered</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-border animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="text-4xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
        </div>

        {/* Video Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {deliveredCars.map((car, index) => (
            <div
              key={car.id}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedVideo(car.youtubeId)}
            >
              {/* YouTube Thumbnail */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={`https://img.youtube.com/vi/${car.youtubeId}/maxresdefault.jpg`}
                  alt={car.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to standard quality thumbnail
                    e.currentTarget.src = `https://img.youtube.com/vi/${car.youtubeId}/hqdefault.jpg`;
                  }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary-foreground border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Customer Testimonial
                </Badge>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                  {car.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {car.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="font-medium">{car.carModel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(car.deliveryDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{car.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-12 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Your Dream Car?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers. Browse our collection of quality Japanese vehicles and start your journey today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/stock-list">Browse Stock List</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Contact Us Today</a>
            </Button>
          </div>
        </div>
      </main>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black border-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-50 text-white hover:bg-white/20"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          {selectedVideo && (
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default DeliveredCars;
