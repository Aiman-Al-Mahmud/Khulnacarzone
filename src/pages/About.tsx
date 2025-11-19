import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Award, Globe } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Verified Quality",
      description: "Every vehicle comes with complete auction reports and verification",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expert Team",
      description: "Experienced professionals guiding you through the entire process",
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "10+ Years Experience",
      description: "Trusted name in car import and export business in Bangladesh",
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Japan Direct Import",
      description: "Direct connections with Japanese auction houses for best deals",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-40 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Khulna Car Zone</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your trusted partner for premium car import and export services in Khulna, Bangladesh. 
              We bring quality Japanese vehicles to your doorstep with complete transparency and trust.
            </p>
          </div>

          {/* Story Section */}
          <Card className="p-8 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded over a decade ago, Khulna Car Zone has become synonymous with trust and quality in 
                the car import business. We started with a simple mission: to make it easier for Bangladeshi 
                customers to access high-quality Japanese vehicles with complete transparency.
              </p>
              <p>
                Today, we are proud to have served hundreds of satisfied customers, helping them find their 
                dream cars with verified auction reports and competitive pricing. Our team of experts works 
                tirelessly to ensure every vehicle meets our strict quality standards.
              </p>
              <p>
                Located in the heart of Khulna at 6 KDA Avenue, we offer a comfortable showroom experience 
                where you can explore our latest arrivals and discuss your requirements with our knowledgeable staff.
              </p>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 text-center hover:scale-105 transition-transform">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in complete honesty with our customers. Every car comes with full auction reports 
                  and history, so you know exactly what you're getting.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Quality</h3>
                <p className="text-muted-foreground">
                  Quality is never compromised. We carefully select vehicles that meet international standards 
                  and verify their condition before offering to customers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Customer Service</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. Our team is always ready to assist you, from choosing 
                  the right car to after-sales support.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default About;
