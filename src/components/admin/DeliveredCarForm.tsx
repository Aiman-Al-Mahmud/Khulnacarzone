import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface DeliveredCarFormProps {
  deliveredCar: any | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const DeliveredCarForm = ({ deliveredCar, onSuccess, onCancel }: DeliveredCarFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    customer_name: "",
    video_url: "",
    thumbnail: "",
    delivery_date: new Date().toISOString().split("T")[0],
    car_model: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (deliveredCar) {
      setFormData({
        title: deliveredCar.title,
        customer_name: deliveredCar.customer_name,
        video_url: deliveredCar.video_url,
        thumbnail: deliveredCar.thumbnail || "",
        delivery_date: deliveredCar.delivery_date,
        car_model: deliveredCar.car_model,
      });
    }
  }, [deliveredCar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        thumbnail: formData.thumbnail || null,
      };

      if (deliveredCar) {
        const { error } = await supabase
          .from("delivered_cars")
          .update(dataToSubmit)
          .eq("id", deliveredCar.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("delivered_cars").insert([dataToSubmit]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: deliveredCar ? "Record updated successfully!" : "Record added successfully!",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-foreground">
        {deliveredCar ? "Edit Delivery Record" : "Add Delivery Record"}
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Toyota Land Cruiser Delivered to Mr. Ahmed"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer_name">Customer Name *</Label>
          <Input
            id="customer_name"
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="car_model">Car Model *</Label>
          <Input
            id="car_model"
            value={formData.car_model}
            onChange={(e) => setFormData({ ...formData, car_model: e.target.value })}
            placeholder="e.g., Toyota Land Cruiser 2019"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="delivery_date">Delivery Date *</Label>
          <Input
            id="delivery_date"
            type="date"
            value={formData.delivery_date}
            onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="video_url">YouTube Video URL *</Label>
          <Input
            id="video_url"
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
          <p className="text-xs text-muted-foreground">
            Paste the full YouTube video URL
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail URL (optional)</Label>
          <Input
            id="thumbnail"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            placeholder="https://example.com/thumbnail.jpg"
          />
          {formData.thumbnail && (
            <img src={formData.thumbnail} alt="Thumbnail preview" className="w-full h-48 object-cover rounded mt-2" />
          )}
          <p className="text-xs text-muted-foreground">
            If not provided, YouTube thumbnail will be used
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : deliveredCar ? "Update Record" : "Add Record"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DeliveredCarForm;
