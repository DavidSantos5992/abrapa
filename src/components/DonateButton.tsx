import { donationPix } from "@/lib/donation";
import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import PixModal from "./PixModal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DonateButtonProps {
  size?: "sm" | "default" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const DonateButton = ({ size = "lg", className, children }: DonateButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copySucceeded, setCopySucceeded] = useState(false);
  const pixKey = donationPix;

  const handleCopyPix = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    try {
      let copied = false;

      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(pixKey);
          copied = true;
        } catch {
          copied = false;
        }
      }

      if (!copied) {
        const textarea = document.createElement("textarea");
        textarea.value = pixKey;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Falha ao copiar a chave PIX");
      }

      setCopySucceeded(true);
      setIsModalOpen(true);
    } catch {
      setCopySucceeded(false);
      setIsModalOpen(true);
      toast.error("A cópia automática não foi permitida. Use a chave exibida no modal.");
    }
  };

  return (
    <>
      <Button
        onClick={handleCopyPix}
        size={size}
        className={cn(
          "gradient-hero shadow-glow hover:opacity-90 transition-smooth gap-2",
          className
        )}
      >
        <Copy className={cn(
          size === "sm" ? "w-3 h-3" : "w-5 h-5"
        )} />
        {children || "Copiar PIX"}
      </Button>
      <PixModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        copySucceeded={copySucceeded}
        pixKey={pixKey}
      />
    </>
  );
};

export default DonateButton;
