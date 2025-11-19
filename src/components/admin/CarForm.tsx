import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface CarFormProps {
  car: any | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const CarForm = ({ car, onSuccess, onCancel }: CarFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    maker: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    cc: "",
    fuel: "",
    mileage: "",
    grade: "",
    chassis: "",
    description: "",
    condition: "used",
    category: "",
    images: [] as string[],
  });
  const [newImageUrl, setNewImageUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (car) {
      setFormData({
        maker: car.maker,
        model: car.model,
        year: car.year,
        color: car.color,
        cc: car.cc,
        fuel: car.fuel,
        mileage: car.mileage,
        grade: car.grade,
        chassis: car.chassis,
        description: car.description,
        condition: car.condition,
        category: car.category,
        images: car.images || [],
      });
    }
  }, [car]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (car) {
        const { error } = await supabase
          .from("cars")
          .update(formData)
          .eq("id", car.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("cars").insert([formData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: car ? "Car updated successfully!" : "Car added successfully!",
      });

      onSuccess();
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

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl.trim()],
      });
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-foreground">
        {car ? "Edit Car" : "Add New Car"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maker">Maker *</Label>
          <Input
            id="maker"
            value={formData.maker}
            onChange={(e) => setFormData({ ...formData, maker: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model *</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color *</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cc">CC *</Label>
          <Input
            id="cc"
            value={formData.cc}
            onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
            placeholder="e.g., 1500cc"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuel">Fuel Type *</Label>
          <Select value={formData.fuel} onValueChange={(value) => setFormData({ ...formData, fuel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mileage">Mileage *</Label>
          <Input
            id="mileage"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
            placeholder="e.g., 45,000 km"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade *</Label>
          <Input
            id="grade"
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            placeholder="e.g., 4.5/5"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chassis">Chassis Number *</Label>
          <Input
            id="chassis"
            value={formData.chassis}
            onChange={(e) => setFormData({ ...formData, chassis: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Condition *</Label>
          <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="used">Used</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g., sedan, suv, sports"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Car Images (URLs)</Label>
        <div className="flex gap-2">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
          <Button type="button" onClick={addImage}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.images.map((url, index) => (
            <div key={index} className="relative group">
              <img src={url} alt={`Car ${index + 1}`} className="w-24 h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : car ? "Update Car" : "Add Car"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CarForm;
