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
                  className={`relative aspect-[2/3] transition-all duration-300 ${
                    isSelected 
                      ? "scale-105" 
                      : "hover:scale-105"
                  }`}
                  style={{ perspective: '1000px' }}
                  data-testid={`card-${card.id}`}
                >
                  <div 
                    className={`relative w-full h-full transition-transform duration-700 ${
                      isSelected ? '[transform:rotateY(180deg)]' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Verso da carta */}
                    <div 
                      className={`absolute inset-0 rounded-lg overflow-hidden ${
                        isSelected ? '' : 'hover-elevate'
                      }`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-amber-900/90 via-amber-800/80 to-amber-950/90 border-4 border-amber-600/50 rounded-lg flex items-center justify-center p-4">
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Padrão decorativo do verso */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-amber-300 rounded-full"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-amber-300 rounded-full"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-amber-300 rounded-full"></div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-amber-300 rounded-full"></div>
                          </div>
                          {/* Símbolo central */}
                          <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="w-16 h-16 md:w-20 md:h-20 relative">
                              <svg viewBox="0 0 100 100" className="w-full h-full fill-amber-300/80">
                                <path d="M50,30 C35,30 30,40 30,50 C30,65 50,80 50,80 C50,80 70,65 70,50 C70,40 65,30 50,30 Z" />
                                <circle cx="50" cy="25" r="8" className="fill-amber-200/60" />
                                <circle cx="35" cy="55" r="6" className="fill-amber-200/60" />
                                <circle cx="65" cy="55" r="6" className="fill-amber-200/60" />
                              </svg>
                            </div>
                            <div className="flex gap-2">
                              <Sparkles className="w-3 h-3 text-amber-300/60" />
                              <Sparkles className="w-3 h-3 text-amber-300/60" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Frente da carta */}
                    <div 
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className={`relative w-full h-full ${
                        isSelected ? 'ring-4 ring-primary shadow-lg shadow-primary/50' : ''
                      }`}>
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center rounded-lg">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                              {selectedCards.indexOf(card.id) + 1}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
