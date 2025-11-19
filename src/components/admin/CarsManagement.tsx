import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import CarForm from "./CarForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Car {
  id: string;
  maker: string;
  model: string;
  year: number;
  color: string;
  cc: string;
  fuel: string;
  mileage: string;
  grade: string;
  chassis: string;
  images: string[];
  description: string;
  condition: string;
  category: string;
  under_20_lakh: boolean;
}

const CarsManagement = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCars(data || []);
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
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      const { error } = await supabase.from("cars").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Car deleted successfully!",
      });

      fetchCars();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleUnder20Lakh = async (car: Car) => {
    try {
      const { error } = await supabase
        .from("cars")
        .update({ under_20_lakh: !car.under_20_lakh })
        .eq("id", car.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Car ${!car.under_20_lakh ? "added to" : "removed from"} Under 20 Lakh section!`,
      });

      fetchCars();
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
        <h2 className="text-2xl font-bold text-foreground">Cars Management</h2>
        <Button
          onClick={() => {
            setEditingCar(null);
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Car
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="p-4 space-y-4">
            {car.images[0] && (
              <img
                src={car.images[0]}
                alt={`${car.maker} ${car.model}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <div>
              <h3 className="font-bold text-lg">
                {car.maker} {car.model} ({car.year})
              </h3>
              <p className="text-sm text-muted-foreground">
                {car.color} | {car.cc} | {car.fuel}
              </p>
              <p className="text-sm text-muted-foreground">{car.chassis}</p>
              {car.under_20_lakh && (
                <span className="inline-block mt-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                  Under 20 Lakh
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleUnder20Lakh(car)}
                className="flex-1 gap-2"
              >
                <Tag className="w-4 h-4" />
                {car.under_20_lakh ? "Remove Tag" : "Add Tag"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingCar(car);
                  setShowForm(true);
                }}
              >
                <Pencil className="w-4 h-4" />
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

      {cars.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No cars found. Add your first car to get started!
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <CarForm
            car={editingCar}
            onSuccess={() => {
              setShowForm(false);
              fetchCars();
            }}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarsManagement;
