import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MysticalBackground } from "@/components/MysticalBackground";
import { Upload, Image as ImageIcon } from "lucide-react";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";

interface PhotoUploadProps {
  questionNumber: number;
  totalQuestions: number;
  onUpload: (file: File) => void;
  onSkip: () => void;
}

export default function PhotoUpload({ questionNumber, totalQuestions, onUpload, onSkip }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <MysticalBackground />
      
      <div className="relative z-10 w-full max-w-2xl animate-fade-in">
        <div className="text-center mb-8">
          <img 
            src={logoUrl} 
            alt="ReveLove.IA" 
            className="w-16 h-16 mx-auto mb-4"
            data-testid="img-logo"
          />
          <div className="text-sm text-muted-foreground mb-2" data-testid="text-question-number">
            Pergunta {questionNumber} de {totalQuestions}
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2" data-testid="heading-question">
            Envie uma foto sua para que a IA analise seus traços.
          </h2>
        </div>

        <Card className="backdrop-blur-xl bg-card/60 border-primary/20 p-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            data-testid="input-file"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center cursor-pointer hover-elevate transition-all"
            data-testid="upload-zone"
          >
            {preview ? (
              <div className="space-y-4">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Clique para escolher outra imagem
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 mx-auto text-primary/50" />
                <div>
                  <p className="text-base font-medium text-foreground mb-1">
                    Escolher arquivo
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Nenhum arquivo escolhido
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <Button 
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="w-full h-12 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-chart-2"
              data-testid="button-upload"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Próxima
            </Button>

            <Button 
              onClick={onSkip}
              variant="ghost"
              className="w-full text-sm text-muted-foreground hover:text-foreground"
              data-testid="button-skip"
            >
              Pular esta etapa
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
