import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CarCardProps {
  id: string;
  image: string;
  year: number;
  maker: string;
  model: string;
  color: string;
  cc: string;
  fuel: string;
  mileage: string;
  grade: string;
  description: string;
}

const CarCard = ({
  id,
  image,
  year,
  maker,
  model,
  color,
  cc,
  fuel,
  mileage,
  grade,
  description,
}: CarCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 hover:scale-[1.02]">
      <Link to={`/car/${id}`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={`${year} ${maker} ${model}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-black/70 hover:bg-black p-2 rounded-full text-white">
              <Heart className="w-4 h-4" />
            </button>
            <button className="bg-black/70 hover:bg-black p-2 rounded-full text-white">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {year} Model
          </Badge>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/car/${id}`}>
          <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
            {maker} {model}
          </h3>
        </Link>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">Color:</span> {color}
          </div>
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">CC:</span> {cc} {fuel}
          </div>
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">Mileage:</span> {mileage}
          </div>
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">Grade:</span>{" "}
            <Badge variant="secondary" className="text-xs">
              {grade}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="flex gap-2">
          <Link to={`/car/${id}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            True Report
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CarCard;
