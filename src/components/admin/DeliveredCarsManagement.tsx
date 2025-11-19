import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DeliveredCarForm from "./DeliveredCarForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DeliveredCar {
  id: string;
  title: string;
  customer_name: string;
  video_url: string;
  thumbnail: string | null;
  delivery_date: string;
  car_model: string;
}

const DeliveredCarsManagement = () => {
  const [deliveredCars, setDeliveredCars] = useState<DeliveredCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<DeliveredCar | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDeliveredCars();
  }, []);

  const fetchDeliveredCars = async () => {
    try {
      const { data, error } = await supabase
        .from("delivered_cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDeliveredCars(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this delivery record?")) return;

    try {
      const { error } = await supabase.from("delivered_cars").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Delivery record deleted successfully!",
      });

      fetchDeliveredCars();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Delivered Cars Management</h2>
        <Button
          onClick={() => {
            setEditingCar(null);
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Delivery Record
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveredCars.map((car) => (
          <Card key={car.id} className="p-4 space-y-4">
            {car.thumbnail && (
              <img
                src={car.thumbnail}
                alt={car.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <div>
              <h3 className="font-bold text-lg">{car.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Customer: {car.customer_name}
              </p>
              <p className="text-sm text-muted-foreground">
                Model: {car.car_model}
              </p>
              <p className="text-sm text-muted-foreground">
                Date: {car.delivery_date}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingCar(car);
                  setShowForm(true);
                }}
                className="flex-1"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(car.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {deliveredCars.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No delivery records found. Add your first delivery to get started!
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DeliveredCarForm
            deliveredCar={editingCar}
            onSuccess={() => {
              setShowForm(false);
              fetchDeliveredCars();
            }}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveredCarsManagement;
