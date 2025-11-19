import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { carsData } from "@/data/carsData";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const CarDetail = () => {
  const { id } = useParams();
  const car = carsData.find((c) => c.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: "", email: "", phone: "", message: "" });

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-40 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Car Not Found</h1>
            <Link to="/stock-list">
              <Button>Back to Stock List</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const recommendedCars = carsData.filter((c) => c.id !== id && c.maker === car.maker).slice(0, 3);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inquiry submitted:", inquiryData);
    toast.success("Inquiry sent! We'll contact you soon.");
    setInquiryData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-40 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/stock-list" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ChevronLeft className="w-4 h-4" />
            Back to Stock List
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden aspect-[4/3] bg-muted">
                <img
                  src={car.images[selectedImage]}
                  alt={`${car.year} ${car.maker} ${car.model}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(selectedImage)}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <Badge className="mb-3">{car.year} Model</Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {car.maker} {car.model}
              </h1>

              <div className="grid grid-cols-2 gap-4 mb-6 p-6 bg-secondary/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Maker</p>
                  <p className="font-semibold text-foreground">{car.maker}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-semibold text-foreground">{car.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold text-foreground">{car.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Color</p>
                  <p className="font-semibold text-foreground">{car.color}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engine</p>
                  <p className="font-semibold text-foreground">{car.cc} {car.fuel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-semibold text-foreground">{car.mileage}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Grade</p>
                  <Badge variant="secondary">{car.grade}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chassis No.</p>
                  <p className="font-semibold text-foreground text-sm">{car.chassis}</p>
                </div>
              </div>

              <Button 
                onClick={() => setIsReportOpen(true)} 
                variant="outline" 
                className="w-full mb-4"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                View True Report
              </Button>
            </div>
          </div>

          {/* Description */}
          <Card className="p-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{car.description}</p>
          </Card>

          {/* Inquiry Form */}
          <Card className="p-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Request More Information</h2>
            <form onSubmit={handleInquiry} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inquiryData.email}
                    onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={inquiryData.phone}
                  onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={inquiryData.message}
                  onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full md:w-auto">Send Inquiry</Button>
            </form>
          </Card>

          {/* Recommended Cars */}
          {recommendedCars.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Similar Cars</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {recommendedCars.map((recCar) => (
                  <CarCard key={recCar.id} {...recCar} image={recCar.images[0]} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingActions />

      {/* True Report Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-3xl">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Verified True Report</h3>
            <p className="text-muted-foreground mb-6">Chassis: {car.chassis}</p>
            <Badge variant="secondary" className="mb-4">Demo Report - Grade {car.grade}</Badge>
            <p className="text-sm text-muted-foreground">
              Full auction report verification available. Contact us for detailed inspection report and history.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarDetail;
