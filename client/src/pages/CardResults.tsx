import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MysticalBackground } from "@/components/MysticalBackground";
import { tarotCards } from "@shared/schema";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";
import { Sparkles, Heart } from "lucide-react";

interface CardResultsProps {
  questionNumber: number;
  totalQuestions: number;
  selectedCardIds: number[];
  onContinue: () => void;
}

export default function CardResults({ questionNumber, totalQuestions, selectedCardIds, onContinue }: CardResultsProps) {
  const selectedCards = tarotCards.filter(card => selectedCardIds.includes(card.id));

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 py-12">
      <MysticalBackground />
      
      <div className="relative z-10 w-full max-w-5xl animate-fade-in">
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
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2" data-testid="heading-results">
            Você selecionou suas 3 cartas! Veja abaixo o resultado da sua leitura:
          </h2>
          <p className="text-sm text-primary/80 italic max-w-2xl mx-auto" data-testid="text-instructions">
            Selecione suas 3 cartas pela primeira para a próxima etapa.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {selectedCards.map((card, index) => (
            <Card 
              key={card.id} 
              className="backdrop-blur-xl bg-card/60 border-primary/20 p-6 md:p-8 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
              data-testid={`card-result-${card.id}`}
            >
              <div className="grid md:grid-cols-[200px_1fr] gap-6">
                <div className="flex justify-center">
                  <img 
                    src={card.imageUrl} 
                    alt={card.name}
                    className="w-full max-w-[200px] rounded-lg shadow-lg"
                    data-testid={`img-card-${card.id}`}
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2 flex items-center gap-2" data-testid={`heading-card-${card.id}`}>
                      {card.name}
                      <Sparkles className="w-5 h-5 text-primary" />
                    </h3>
                    <p className="text-base text-foreground/90 leading-relaxed" data-testid={`text-card-meaning-${card.id}`}>
                      {card.meaning}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/20">
                    <p className="text-sm text-primary italic flex items-start gap-2" data-testid={`text-card-love-${card.id}`}>
                      <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" />
                      <span>{card.loveReading}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button 
          onClick={onContinue}
          className="w-full max-w-md mx-auto block h-12 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-chart-2"
          data-testid="button-next"
        >
          Próxima
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
