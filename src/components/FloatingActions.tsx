import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/8801615242424"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white relative"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-16 bg-black/90 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp
          </span>
        </Button>
      </a>

      <a href="tel:+8801615242424" className="group">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-2xl bg-primary hover:bg-primary/90 relative"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-16 bg-black/90 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call Now
          </span>
        </Button>
      </a>
    </div>
  );
};

export default FloatingActions;
