import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MysticalBackground } from "@/components/MysticalBackground";
import { Copy, CheckCircle2, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";

interface PaymentPixProps {
  qrCode: string;
  qrCodeBase64: string;
  pixCode: string;
  amount: number;
  onPaymentConfirmed: () => void;
}

export default function PaymentPix({ qrCode, qrCodeBase64, pixCode, amount, onPaymentConfirmed }: PaymentPixProps) {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast({
        title: "Código copiado!",
        description: "Cole no app do seu banco para realizar o pagamento.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Tente copiar manualmente o código PIX.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-3 sm:p-4">
      <MysticalBackground />
      
      <div className="relative z-10 w-full max-w-2xl animate-fade-in">
        <div className="text-center mb-6 sm:mb-8">
          <img 
            src={logoUrl} 
            alt="ReveLove.IA" 
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4"
            data-testid="img-logo"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground mb-2 px-2" data-testid="heading-payment">
            Pagamento via PIX
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-2" data-testid="text-instructions">
            Escaneie o QR Code ou copie o código PIX para finalizar
          </p>
        </div>

        <Card className="backdrop-blur-xl bg-card/60 border-primary/20 p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-primary">
                R$ {amount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-2xl flex justify-center" data-testid="qr-code-container">
              {qrCodeBase64 ? (
                <img 
                  src={qrCodeBase64} 
                  alt="QR Code PIX" 
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
                  data-testid="qr-code-image"
                />
              ) : (
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-muted/20 flex items-center justify-center" data-testid="qr-code-placeholder">
                  <QrCode className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="text-center text-xs sm:text-sm text-muted-foreground" data-testid="text-pix-instructions">
                Ou copie o código PIX:
              </div>
              
              <div className="bg-background/50 border border-border/50 rounded-lg p-3 sm:p-4 break-all text-xs font-mono text-muted-foreground max-h-24 overflow-y-auto" data-testid="text-pix-code">
                {pixCode}
              </div>

              <Button
                onClick={copyToClipboard}
                variant={copied ? "default" : "outline"}
                className="w-full h-11 sm:h-12 text-sm sm:text-base"
                data-testid="button-copy-pix"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Código Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Código PIX
                  </>
                )}
              </Button>
            </div>

            <div className="bg-primary/10 rounded-lg p-3 sm:p-4 text-center" data-testid="status-waiting">
              <p className="text-sm text-foreground" data-testid="text-status">
                <strong>Aguardando pagamento...</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-2" data-testid="text-status-description">
                Assim que o pagamento for confirmado, sua imagem será liberada automaticamente.
              </p>
              
              <div className="flex justify-center gap-1 mt-3 sm:mt-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4 sm:mt-6 text-center px-2">
          <p className="text-xs text-muted-foreground">
            Pagamento seguro via Pushin Pay. Seus dados estão protegidos.
          </p>
        </div>
      </div>
    </div>
  );
}
