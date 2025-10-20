import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MysticalBackground } from "@/components/MysticalBackground";
import { tarotCards } from "@shared/schema";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";
import { Sparkles } from "lucide-react";

interface CardSelectionProps {
  questionNumber: number;
  totalQuestions: number;
  onCardsSelected: (cardIds: number[]) => void;
}

export default function CardSelection({ questionNumber, totalQuestions, onCardsSelected }: CardSelectionProps) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const toggleCard = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleSubmit = () => {
    if (selectedCards.length === 3) {
      onCardsSelected(selectedCards);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 py-12">
      <MysticalBackground />
      
      <div className="relative z-10 w-full max-w-4xl animate-fade-in">
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
            Escolha 3 cartas que mais te chamarem atenção:
          </h2>
        </div>

        <Card className="backdrop-blur-xl bg-card/60 border-primary/20 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {tarotCards.map((card) => {
              const isSelected = selectedCards.includes(card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  className={`relative aspect-[2/3] rounded-lg overflow-hidden transition-all duration-300 ${
                    isSelected 
                      ? "ring-4 ring-primary shadow-lg shadow-primary/50 scale-105" 
                      : "hover-elevate hover:scale-105"
                  }`}
                  data-testid={`card-${card.id}`}
                >
                  <img 
                    src={card.imageUrl} 
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {selectedCards.indexOf(card.id) + 1}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <div className="text-center text-sm text-muted-foreground">
              {selectedCards.length}/3 cartas selecionadas
            </div>
            
            <Button 
              onClick={handleSubmit}
              disabled={selectedCards.length !== 3}
              className="w-full h-12 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-chart-2"
              data-testid="button-continue"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Próxima
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
