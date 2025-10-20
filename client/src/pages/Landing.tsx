import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Users } from "lucide-react";
import { MysticalBackground } from "@/components/MysticalBackground";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <MysticalBackground />
      
      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
          <div className="flex justify-center mb-4 sm:mb-6">
            <img 
              src={logoUrl} 
              alt="ReveLove.IA" 
              className="w-16 h-16 sm:w-20 sm:h-20 animate-float"
            />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight px-2" data-testid="heading-hero">
              E se o amor da sua vida já tivesse um rosto?
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto px-2" data-testid="text-description">
              Toque em <span className="text-primary font-semibold">"Descobrir Agora"</span> e deixe a{" "}
              <span className="text-primary font-semibold">ReveLove.IA</span> revelar o retrato do seu futuro amor, 
              baseado no seus traços e sua energia.
            </p>
          </div>

          <Card className="backdrop-blur-xl bg-card/40 border-primary/20 p-4 sm:p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              <Users className="w-4 h-4" />
              <span data-testid="users-count">2.647 revelações feitas esta semana.</span>
            </div>

            <Button 
              size="lg" 
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity"
              onClick={onStart}
              data-testid="button-start"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" />
              Descobrir Agora
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>

            <p className="text-xs text-muted-foreground mt-3 sm:mt-4 text-center">
              Crie sua imagem gratís.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
