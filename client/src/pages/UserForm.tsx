import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MysticalBackground } from "@/components/MysticalBackground";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodiacSigns } from "@shared/schema";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";
import { Sparkles } from "lucide-react";

interface UserFormData {
  name: string;
  age: number;
  gender: string;
  zodiacSign: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    age: 0,
    gender: "",
    zodiacSign: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.gender && formData.zodiacSign) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <MysticalBackground />
      
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <img 
            src={logoUrl} 
            alt="ReveLove.IA" 
            className="w-16 h-16 mx-auto mb-4"
            data-testid="img-logo"
          />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2" data-testid="heading-form-title">
            Estamos nos conectando com sua essência...
          </h2>
          <p className="text-sm text-muted-foreground" data-testid="text-form-description">
            Cada detalhe importa na construção do seu destino amoroso.
          </p>
        </div>

        <Card className="backdrop-blur-xl bg-card/60 border-primary/20 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
                data-testid="input-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                Idade
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Sua idade"
                value={formData.age || ""}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
                min="18"
                max="100"
                data-testid="input-age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                Gênero
              </Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary" data-testid="select-gender">
                  <SelectValue placeholder="Selecione seu gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zodiacSign" className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                Signo
              </Label>
              <Select value={formData.zodiacSign} onValueChange={(value) => setFormData({ ...formData, zodiacSign: value })}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary" data-testid="select-sign">
                  <SelectValue placeholder="Selecione seu signo" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign} value={sign}>
                      {sign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-chart-2"
              data-testid="button-submit-form"
            >
              Descobrir Agora
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
