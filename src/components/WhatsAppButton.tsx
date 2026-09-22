import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const url = "https://wa.me/5511964968794?text=Ol%C3%A1%2C%20gostaria%20de%20conhecer%20melhor%20o%20trabalho%20da%20ABRAPA.";
  return <div className="fixed bottom-5 right-5 z-50"><Button asChild className="size-14 rounded-full bg-[#25D366] p-0 shadow-lg hover:bg-[#1da851]" aria-label="Falar com a ABRAPA pelo WhatsApp"><a href={url} target="_blank" rel="noreferrer"><MessageCircle className="size-7 text-white" /></a></Button></div>;
};

export default WhatsAppButton;
