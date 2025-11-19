import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, FileCheck } from "lucide-react";
import { toast } from "sonner";

const TrueReport = () => {
  const [formData, setFormData] = useState({
    chassis: "",
    email: "",
    phone: "",
  });
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.chassis || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    console.log("True Report verification requested:", formData);
    setShowReport(true);
    toast.success("Verification complete! Report displayed below.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-40 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              True Report Verification
            </h1>
            <p className="text-lg text-muted-foreground">
              Verify the authenticity and condition of your vehicle with our comprehensive auction report service.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">Verified History</h3>
              <p className="text-sm text-muted-foreground">
                Complete auction history and vehicle records
              </p>
            </Card>
            <Card className="p-6 text-center">
              <FileCheck className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">Detailed Inspection</h3>
              <p className="text-sm text-muted-foreground">
                Professional inspection reports with photos
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">Peace of Mind</h3>
              <p className="text-sm text-muted-foreground">
                Buy with confidence knowing the vehicle's condition
              </p>
            </Card>
          </div>

          {/* Verification Form */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Request Verification</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="chassis">Chassis Number *</Label>
                <Input
                  id="chassis"
                  value={formData.chassis}
                  onChange={(e) => setFormData({ ...formData, chassis: e.target.value })}
                  placeholder="e.g., NZE144-0125487"
                  required
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter the vehicle chassis number found on registration documents
                </p>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 1234 567890"
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Verify Vehicle Report
              </Button>
            </form>
          </Card>

          {/* Demo Report Result */}
          {showReport && (
            <Card className="p-8 animate-fade-in">
              <div className="text-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Verification Successful</h3>
                <Badge variant="secondary" className="text-lg px-4 py-2">Demo Report</Badge>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Chassis Number</p>
                    <p className="font-semibold text-foreground font-mono">{formData.chassis}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Auction Grade</p>
                    <Badge variant="default">4.5/5</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p className="font-semibold text-foreground">Excellent</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-green-500">Verified ✓</Badge>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Report Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    This is a demo verification report. For actual vehicles, you'll receive detailed auction 
                    sheets, inspection photos, and complete vehicle history. Contact us for more information.
                  </p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Need more details or have questions about this report?
                  </p>
                  <Button>Contact Us for Full Report</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
};

export default TrueReport;
