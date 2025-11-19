import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, X } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

const brands = ["Toyota", "Honda", "Nissan", "BMW", "Mercedes", "Audi", "Mazda", "Subaru"];
const models: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "Land Cruiser", "Prius", "Aqua"],
  Honda: ["Civic", "Accord", "CR-V", "Fit", "Vezel"],
  Nissan: ["March", "Note", "X-Trail", "Serena", "GT-R"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
  Mercedes: ["C-Class", "E-Class", "GLE", "S-Class", "A-Class"],
  Audi: ["A3", "A4", "Q5", "Q7", "A6"],
  Mazda: ["Axela", "Atenza", "Demio", "CX-5", "CX-3"],
  Subaru: ["Impreza", "Legacy", "Forester", "Levorg", "XV"],
};

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    onFilterChange?.({ brand, model, condition });
  };

  const handleClear = () => {
    setBrand("");
    setModel("");
    setCondition("all");
    onFilterChange?.({ brand: "", model: "", condition: "all" });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sticky top-40 z-40 shadow-lg">
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h3 className="font-semibold text-foreground">Search Filters</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
        </Button>
      </div>

      <div className={`${isExpanded ? "block" : "hidden"} lg:block space-y-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="brand" className="text-foreground mb-2 block">Brand</Label>
            <Select value={brand} onValueChange={(value) => {
              setBrand(value);
              setModel("");
            }}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="model" className="text-foreground mb-2 block">Model</Label>
            <Select value={model} onValueChange={setModel} disabled={!brand}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {brand &&
                  models[brand]?.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground mb-2 block">Condition</Label>
            <RadioGroup value={condition} onValueChange={setCondition}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="font-normal">New</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="used" id="used" />
                  <Label htmlFor="used" className="font-normal">Used</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div
            className="flex items-end gap-2 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Search"
            onClick={(e) => {
              // If user clicked an actual button inside (Search/Clear), let that button handle it
              if ((e.target as HTMLElement).closest("button")) return;
              handleSearch();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSearch();
              }
            }}
          >
            <Button onClick={handleSearch} className="flex-1">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              onClick={(e) => {
                // prevent parent container click from firing when clearing
                e.stopPropagation();
                handleClear();
              }}
              variant="outline"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
