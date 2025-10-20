import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MysticalBackground } from "@/components/MysticalBackground";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoUrl from "@assets/generated_images/ReveLove.IA_logo_icon_b45fe28f.png";
import { Heart, Sparkles, Lock, CheckCircle2, Star } from "lucide-react";

interface FinalResultsProps {
  sessionId: string;
  name: string;
  generatedProfile: {
    title: string;
    description: string;
    traits: string[];
  };
  isPaid: boolean;
  onUnlock: () => void;
}

const testimonials = [
  {
    name: "Carla",
    text: "Quando vi a imagem, fiquei sem palavras! Conheci alguém com traços bem parecidos há pouco tempo. É impressionante como acertou!",
    rating: 5
  },
  {
    name: "Marcos",
    text: "A leitura foi muito precisa. As características da pessoa descrita batem perfeitamente com alguém que conheço. Vale muito a pena!",
    rating: 5
  },
  {
    name: "Ana Paula",
    text: "Fiquei impressionada com o nível de detalhes! A descrição parece ter sido feita especialmente para mim.",
    rating: 5
  }
];

const faqs = [
  {
    question: "Após o pagamento, como vou receber minha imagem criada?",
    answer: "Assim que o pagamento for confirmado, sua imagem será liberada instantaneamente na tela. Você poderá visualizá-la e fazer o download."
  },
  {
    question: "O pagamento é seguro?",
    answer: "Sim! Utilizamos a Pushin Pay, uma das plataformas de pagamento mais seguras do Brasil. Seus dados estão completamente protegidos."
  },
  {
    question: "Realmente é AI consegue descobrir meu futuro amor?",
    answer: "Nossa IA analisa seus traços, energia e respostas para criar um perfil baseado nas vibrações e características que você atrai. É uma ferramenta mística combinada com tecnologia!"
  },
  {
    question: "A imagem é exclusiva para mim?",
    answer: "Sim! Cada imagem é gerada de forma única baseada nas suas respostas e características pessoais. Nenhuma outra pessoa terá a mesma imagem."
  }
];

export default function FinalResults({ sessionId, name, generatedProfile, isPaid, onUnlock }: FinalResultsProps) {
  const [showingPayment, setShowingPayment] = useState(false);

  return (
    <div className="min-h-screen relative py-12 px-4">
      <MysticalBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <img 
            src={logoUrl} 
            alt="ReveLove.IA" 
            className="w-16 h-16 mx-auto mb-4"
            data-testid="img-logo"
          />
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-4" data-testid="badge-status">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Seu Futuro Amor Revelado</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4" data-testid="heading-greeting">
            Olá, {name}! <Heart className="inline w-8 h-8 text-primary" fill="currentColor" />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-description">
            Essa leitura foi feita baseando-se em sua essência e energia. A conexão cósmica está 
            pronta para lhe revelar o que você tanto procura!
          </p>
        </div>

        <Card className="backdrop-blur-xl bg-card/60 border-primary/20 p-8">
          <div className="flex items-start gap-2 mb-6 text-primary">
            <Sparkles className="w-5 h-5 mt-1 flex-shrink-0" />
            <h2 className="text-xl font-serif font-bold">
              Este retrato da pessoa especial:
            </h2>
          </div>

          <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-8">
            <div className="relative">
              <div className={`aspect-square rounded-2xl overflow-hidden ${!isPaid ? 'filter blur-xl' : ''}`}>
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-chart-2/30 flex items-center justify-center">
                  <Heart className="w-32 h-32 text-primary/30" fill="currentColor" />
                </div>
              </div>
              
              {!isPaid && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Lock className="w-12 h-12 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Imagem Bloqueada</p>
                  </div>
                </div>
              )}
              
              {isPaid && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full mt-4"
                  data-testid="button-download"
                >
                  Baixar Imagem
                </Button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3" data-testid="heading-profile-title">
                  {generatedProfile.title}
                </h3>
                <p className={`text-base text-foreground/80 leading-relaxed ${!isPaid ? 'filter blur-sm' : ''}`} data-testid="text-profile-description">
                  {generatedProfile.description}
                </p>
              </div>

              <div className="space-y-2">
                {generatedProfile.traits.map((trait, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-2 text-sm ${!isPaid ? 'filter blur-sm' : ''}`}
                  >
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!isPaid && (
            <div className="border-t border-primary/20 pt-8">
              <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-2xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Nossa IA tem 98% de precisão!
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
                    Contra retratos inscritos de almas gêmeas já reveladas.
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted/50">
                    <img 
                      src="/attached_assets/image_1760967624741.png" 
                      alt="Depoimento WhatsApp 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted/50">
                    <img 
                      src="/attached_assets/image_1760967630543.png" 
                      alt="Depoimento WhatsApp 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted/50">
                    <img 
                      src="/attached_assets/image_1760967636121.png" 
                      alt="Depoimento WhatsApp 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-lg font-semibold text-foreground mb-2">O que as pessoas dizem</p>
                  <div className="flex justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="p-4 bg-background/50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary">
                            {testimonial.name[0]}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground mb-1">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {testimonial.text}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <p className="text-center text-sm text-muted-foreground mb-6">
                  Descubra quem está pronto a cruzar seu destino.
                  <br />
                  <span className="italic">
                    Não apenas uma foto, mas o retrato que aguarda você.
                  </span>
                </p>

                <p className="text-center text-sm text-muted-foreground mb-4">
                  Cada traço dessa imagem carrega as marcas físicas da pessoa realizada à sua 
                  energia. Desbloqueie para ver a identidade do amor que foi destinado a você.
                </p>

                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    Desbloqueie por R$24,97
                  </div>
                  <Button 
                    onClick={onUnlock}
                    size="lg"
                    className="w-full max-w-md mx-auto h-14 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90"
                    data-testid="button-unlock"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Desbloquear Imagem
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Ao fazer sua compra, você concorda que esta imagem não prevê o futuro, 
                    mas reflete a energia amorosa que você atrai através das suas escolhas e 
                    personalidade no PIX.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="backdrop-blur-xl bg-card/60 border-primary/20 p-8">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
            Perguntas Frequentes
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`accordion-faq-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary" data-testid={`button-faq-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
