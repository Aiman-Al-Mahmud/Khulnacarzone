import { Star, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="p-6 bg-card hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {review.initials}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-3xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.6011984908682!2d89.55124037605742!3d22.81723657931824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff900642e16d3d%3A0x2b5ee4b06bac9c30!2sKhulna%20Car%20Zone!5e0!3m2!1sen!2sbd!4v1763480565153!5m2!1sen!2sbd"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            />
          </div>
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
    </section>
  );
};

export default GoogleReviews;
