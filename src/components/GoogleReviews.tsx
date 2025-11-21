import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    name: "Ahmed Rahman",
    initials: "AR",
    rating: 5,
    text: "Excellent service! Got my dream Toyota Land Cruiser with verified auction report. The team was very professional and transparent throughout the process.",
  },
  {
    name: "Sadia Khan",
    initials: "SK",
    rating: 5,
    text: "Very satisfied with my Honda Vezel purchase. True report verification gave me confidence. Highly recommend Khulna Car Zone!",
  },
  {
    name: "Mahmud Hasan",
    initials: "MH",
    rating: 5,
    text: "Best car import service in Khulna! Smooth process from start to finish. The car quality exceeded my expectations.",
  },
];

const GoogleReviews = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map Container - Left Side */}
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.6011984908682!2d89.55124037605742!3d22.81723657931824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff900642e16d3d%3A0x2b5ee4b06bac9c30!2sKhulna%20Car%20Zone!5e0!3m2!1sen!2sbd!4v1763480565153!5m2!1sen!2sbd"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            />
            <div className="mt-4 text-center">
              <a
                href="https://maps.app.goo.gl/uAdL1LCL1Lihg8MB9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  Read More Reviews
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>

          {/* Reviews Carousel - Right Side */}
          <div className="w-full">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem key={index}>
                    <Card className="p-8 bg-card h-[400px] flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                          {review.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-xl">{review.name}</div>
                          <div className="flex gap-1 mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">{review.text}</p>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
