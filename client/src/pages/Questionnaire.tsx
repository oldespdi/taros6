import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MysticalBackground } from "@/components/MysticalBackground";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { questionnaire, type Question } from "@shared/schema";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionnaireProps {
  startingQuestionNumber: number;
  totalQuestions: number;
  onComplete: (answers: Record<string, string>) => void;
}

export default function Questionnaire({ startingQuestionNumber, totalQuestions, onComplete }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questionnaire[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionnaire.length - 1;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <MysticalBackground />
      
      <div className="relative z-10 w-full max-w-2xl animate-fade-in">
        <div className="text-center mb-6">
          <img 
            src={logoUrl} 
            alt="ReveLove.IA" 
            className="w-16 h-16 mx-auto mb-4"
            data-testid="img-logo"
          />
          <div className="text-sm text-muted-foreground mb-2" data-testid="text-question-number">
            Pergunta {startingQuestionNumber + currentQuestionIndex} de {totalQuestions}
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground" data-testid="heading-question">
            {currentQuestion.question}
          </h2>
        </div>

        <ProgressIndicator currentStep={currentQuestionIndex} totalSteps={questionnaire.length} />

        <Card className="backdrop-blur-xl bg-card/60 border-primary/20 p-6 md:p-8 mt-6">
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                  currentAnswer === option.value
                    ? "bg-primary text-primary-foreground ring-2 ring-primary shadow-lg"
                    : "bg-background/50 hover-elevate text-foreground"
                }`}
                data-testid={`option-${option.value}`}
              >
                <span className="text-base font-medium">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            {currentQuestionIndex > 0 && (
              <Button 
                onClick={handleBack}
                variant="outline"
                className="flex-1 h-12"
                data-testid="button-back"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
            
            <Button 
              onClick={handleNext}
              disabled={!currentAnswer}
              className={`h-12 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-chart-2 ${
                currentQuestionIndex > 0 ? 'flex-1' : 'w-full'
              }`}
              data-testid="button-next-question"
            >
              {isLastQuestion ? 'Finalizar' : 'Próxima'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
