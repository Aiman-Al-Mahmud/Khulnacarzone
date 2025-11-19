import carSample1 from "@/assets/car-sample-1.jpg";
import carSample2 from "@/assets/car-sample-2.jpg";
import carSample3 from "@/assets/car-sample-3.jpg";
import carSample4 from "@/assets/car-sample-4.jpg";

export interface Car {
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
  condition: "new" | "used";
  category: string;
  createdAt: string;
}

export const carsData: Car[] = [
  {
    id: "1",
    maker: "Toyota",
    model: "Corolla Axio",
    year: 2019,
    color: "Pearl White",
    cc: "1500cc",
    fuel: "Petrol",
    mileage: "45,000 km",
    grade: "4.5/5",
    chassis: "NZE144-0125487",
    images: [carSample1, carSample2, carSample3, carSample4],
    description: "Excellent condition Toyota Corolla Axio with full auction report. One owner, regularly serviced. Perfect family sedan with great fuel economy.",
    condition: "used",
    category: "sedan",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    maker: "Honda",
    model: "Vezel Hybrid",
    year: 2020,
    color: "Silver Metallic",
    cc: "1500cc",
    fuel: "Hybrid",
    mileage: "32,000 km",
    grade: "5/5",
    chassis: "RU3-1205489",
    images: [carSample2, carSample3, carSample4, carSample1],
    description: "Like new Honda Vezel Hybrid with advanced safety features. Low mileage, perfect for city driving. Full verification report available.",
    condition: "used",
    category: "suv",
    createdAt: "2025-01-12",
  },
  {
    id: "3",
    maker: "Nissan",
    model: "GT-R",
    year: 2018,
    color: "Metallic Red",
    cc: "3800cc",
    fuel: "Petrol",
    mileage: "28,000 km",
    grade: "4/5",
    chassis: "R35-782456",
    images: [carSample3, carSample4, carSample1, carSample2],
    description: "Legendary Nissan GT-R in stunning condition. High performance sports car with verified auction history. A true driver's machine.",
    condition: "used",
    category: "sports",
    createdAt: "2025-01-08",
  },
  {
    id: "4",
    maker: "BMW",
    model: "5 Series",
    year: 2021,
    color: "Black",
    cc: "2000cc",
    fuel: "Diesel",
    mileage: "15,000 km",
    grade: "5/5",
    chassis: "G30-456789",
    images: [carSample4, carSample1, carSample2, carSample3],
    description: "Premium BMW 5 Series with luxury features. Nearly new condition with full service history. Executive class sedan with cutting-edge technology.",
    condition: "used",
    category: "luxury",
    createdAt: "2025-01-15",
  },
  {
    id: "5",
    maker: "Toyota",
    model: "Prius Alpha",
    year: 2017,
    color: "Silver",
    cc: "1800cc",
    fuel: "Hybrid",
    mileage: "68,000 km",
    grade: "4/5",
    chassis: "ZVW41-0156789",
    images: [carSample1, carSample3, carSample2, carSample4],
    description: "Spacious 7-seater hybrid with excellent fuel efficiency. Well-maintained with complete service records. Perfect for families.",
    condition: "used",
    category: "hybrid",
    createdAt: "2025-01-05",
  },
  {
    id: "6",
    maker: "Honda",
    model: "Fit Hybrid",
    year: 2019,
    color: "Blue Metallic",
    cc: "1300cc",
    fuel: "Hybrid",
    mileage: "40,000 km",
    grade: "4.5/5",
    chassis: "GP5-1145678",
    images: [carSample2, carSample4, carSample1, carSample3],
    description: "Compact and fuel-efficient Honda Fit Hybrid. Great for city commuting with verified auction grade. Reliable and economical.",
    condition: "used",
    category: "compact",
    createdAt: "2025-01-11",
  },
];
