import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  copySucceeded: boolean;
  pixKey: string;
}

const PixModal = ({ isOpen, onClose, copySucceeded, pixKey }: PixModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto" aria-describedby="pix-description">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {copySucceeded ? "Código PIX copiado" : "PIX copia e cola para doação"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-2xl mb-2 text-foreground">
            {copySucceeded ? "Código copiado com sucesso!" : "Use este código PIX"}
          </h3>
          <p id="pix-description" className="text-muted-foreground">
            {copySucceeded
              ? "O código PIX foi copiado. Abra o aplicativo do seu banco e escolha PIX copia e cola para continuar."
              : "Copie o código abaixo e use a opção PIX copia e cola no aplicativo do seu banco."
            }
          </p>
          {(
            <code className="mt-4 rounded-lg bg-muted px-4 py-3 break-all max-w-full font-mono text-xs font-semibold text-foreground">
              {pixKey}
            </code>
          )}
          <p className="mt-4 text-sm text-muted-foreground">Favorecida: ABRAPA Associação Brasileira de Apoio aos Portadores de Aids · CNPJ 07.055.645/0001-70. Confira os dados no aplicativo do seu banco.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PixModal;
