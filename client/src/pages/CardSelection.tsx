import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MysticalBackground } from "@/components/MysticalBackground";
import { tarotCards } from "@shared/schema";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";
import { Sparkles, Heart, Sun, Moon, Star } from "lucide-react";

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
                <div
                  key={card.id}
                  className="relative aspect-[2/3]"
                  style={{ perspective: '1000px' }}
                >
                  <button
                    onClick={() => toggleCard(card.id)}
                    className={`relative w-full h-full transition-all duration-500 ${
                      isSelected ? 'scale-105' : 'hover:scale-105'
                    }`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: isSelected ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                    data-testid={`card-${card.id}`}
                  >
                    {/* Verso da carta (visível inicialmente) */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg ${
                        !isSelected ? 'hover-elevate' : ''
                      }`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-2 border-amber-600/40 rounded-lg shadow-xl relative overflow-hidden">
                        {/* Padrão de fundo */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(251 191 36 / 0.3) 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                          }}></div>
                        </div>
                        
                        {/* Ornamentos nos cantos */}
                        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500/60 rounded-tl"></div>
                        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500/60 rounded-tr"></div>
                        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500/60 rounded-bl"></div>
                        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500/60 rounded-br"></div>
                        
                        {/* Centro com coração e símbolos */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            {/* Símbolos ao redor */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                              <Sun className="w-4 h-4 text-amber-400/70" />
                            </div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                              <Moon className="w-4 h-4 text-amber-400/70" />
                            </div>
                            <div className="absolute top-1/2 -left-8 -translate-y-1/2">
                              <Star className="w-3 h-3 text-amber-400/70" />
                            </div>
                            <div className="absolute top-1/2 -right-8 -translate-y-1/2">
                              <Star className="w-3 h-3 text-amber-400/70" />
                            </div>
                            
                            {/* Coração central */}
                            <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-6 rounded-full shadow-lg">
                              <Heart className="w-10 h-10 text-amber-200 fill-amber-200" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Frente da carta (visível quando selecionada) */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
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
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                              {selectedCards.indexOf(card.id) + 1}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
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
