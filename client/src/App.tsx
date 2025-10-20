import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingScreen } from "@/components/LoadingScreen";
import Landing from "@/pages/Landing";
import UserForm from "@/pages/UserForm";
import PhotoUpload from "@/pages/PhotoUpload";
import CardSelection from "@/pages/CardSelection";
import CardResults from "@/pages/CardResults";
import Questionnaire from "@/pages/Questionnaire";
import FinalResults from "@/pages/FinalResults";
import PaymentPix from "@/pages/PaymentPix";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Step = 
  | "landing"
  | "user-form"
  | "loading-1"
  | "photo-upload"
  | "loading-2"
  | "card-selection"
  | "card-results"
  | "questionnaire"
  | "loading-3"
  | "final-results"
  | "payment";

interface SessionData {
  id: string;
  name: string;
  age: number;
  gender: string;
  zodiacSign: string;
  photoUrl?: string;
  selectedCards?: number[];
  questionnaireAnswers?: Record<string, string>;
  generatedProfile?: {
    title: string;
    description: string;
    traits: string[];
  };
  isPaid: boolean;
  paymentData?: {
    qrCode: string;
    qrCodeBase64: string;
    pixCode: string;
    paymentId: string;
  };
}

function App() {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const { toast } = useToast();

  const totalQuestions = 11;

  useEffect(() => {
    if (currentStep === "payment" && sessionData?.paymentData) {
      const checkPayment = setInterval(async () => {
        try {
          const response = await fetch(`/api/sessions/${sessionData.id}/check-payment`);
          const data = await response.json();
          
          if (data.isPaid) {
            clearInterval(checkPayment);
            setSessionData({ ...sessionData, isPaid: true });
            setCurrentStep("final-results");
            toast({
              title: "Pagamento confirmado!",
              description: "Sua imagem foi desbloqueada com sucesso.",
            });
          }
        } catch (error) {
          console.error("Error checking payment:", error);
        }
      }, 3000);

      return () => clearInterval(checkPayment);
    }
  }, [currentStep, sessionData]);

  const handleStart = () => {
    setCurrentStep("user-form");
  };

  const handleUserFormSubmit = async (data: { name: string; age: number; gender: string; zodiacSign: string }) => {
    try {
      const response = await apiRequest("POST", "/api/sessions", data);
      const session = await response.json();
      
      setSessionData({
        id: session.id,
        ...data,
        isPaid: false,
      });
      
      setCurrentStep("loading-1");
      setTimeout(() => setCurrentStep("photo-upload"), 3000);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar a sessão. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = async (file: File) => {
    if (!sessionData) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch(`/api/sessions/${sessionData.id}/upload-photo`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      setSessionData({ ...sessionData, photoUrl: data.photoUrl });
      setCurrentStep("loading-2");
      setTimeout(() => setCurrentStep("card-selection"), 2000);
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer upload da foto.",
        variant: "destructive",
      });
    }
  };

  const handlePhotoSkip = () => {
    setCurrentStep("loading-2");
    setTimeout(() => setCurrentStep("card-selection"), 2000);
  };

  const handleCardsSelected = async (cardIds: number[]) => {
    if (!sessionData) return;

    try {
      await apiRequest("PATCH", `/api/sessions/${sessionData.id}`, {
        selectedCards: cardIds,
      });
      
      setSessionData({ ...sessionData, selectedCards: cardIds });
      setCurrentStep("card-results");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as cartas selecionadas.",
        variant: "destructive",
      });
    }
  };

  const handleCardResultsContinue = () => {
    setCurrentStep("questionnaire");
  };

  const handleQuestionnaireComplete = async (answers: Record<string, string>) => {
    if (!sessionData) return;

    try {
      const response = await apiRequest("PATCH", `/api/sessions/${sessionData.id}`, {
        questionnaireAnswers: answers,
      });
      
      const data = await response.json();
      
      setSessionData({ 
        ...sessionData, 
        questionnaireAnswers: answers,
        generatedProfile: data.generatedProfile 
      });
      
      setCurrentStep("loading-3");
      setTimeout(() => setCurrentStep("final-results"), 5000);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível processar suas respostas.",
        variant: "destructive",
      });
    }
  };

  const handleUnlock = async () => {
    if (!sessionData) return;

    try {
      const response = await apiRequest("POST", `/api/sessions/${sessionData.id}/create-payment`, {
        amount: 50.00,
      });
      const paymentData = await response.json();
      
      setSessionData({
        ...sessionData,
        paymentData: {
          qrCode: paymentData.qr_code,
          qrCodeBase64: paymentData.qr_code_base64,
          pixCode: paymentData.emv || paymentData.qr_code,
          paymentId: paymentData.id,
        },
      });
      
      setCurrentStep("payment");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentConfirmed = () => {
    if (sessionData) {
      setSessionData({ ...sessionData, isPaid: true });
      setCurrentStep("final-results");
    }
  };

  const handleSimulatePayment = async () => {
    if (!sessionData) return;
    
    try {
      await apiRequest("POST", `/api/sessions/${sessionData.id}/simulate-payment`, {});
      toast({
        title: "Pagamento simulado!",
        description: "Verificando confirmação...",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível simular o pagamento.",
        variant: "destructive",
      });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {currentStep === "landing" && <Landing onStart={handleStart} />}
        
        {currentStep === "user-form" && <UserForm onSubmit={handleUserFormSubmit} />}
        
        {currentStep === "loading-1" && (
          <LoadingScreen message="Conectando com sua energia amorosa..." />
        )}
        
        {currentStep === "photo-upload" && (
          <PhotoUpload
            questionNumber={1}
            totalQuestions={totalQuestions}
            onUpload={handlePhotoUpload}
            onSkip={handlePhotoSkip}
          />
        )}
        
        {currentStep === "loading-2" && (
          <LoadingScreen 
            message="Conectando sua essência com as possibilidades do amor..."
            submessages={[
              "A inteligência cósmica está sincronizando suas vibrações com o universo do amor...",
              "Prepare-se para emergir além do invisível.",
            ]}
          />
        )}
        
        {currentStep === "card-selection" && sessionData && (
          <CardSelection
            questionNumber={2}
            totalQuestions={totalQuestions}
            onCardsSelected={handleCardsSelected}
          />
        )}
        
        {currentStep === "card-results" && sessionData?.selectedCards && (
          <CardResults
            questionNumber={3}
            totalQuestions={totalQuestions}
            selectedCardIds={sessionData.selectedCards}
            onContinue={handleCardResultsContinue}
          />
        )}
        
        {currentStep === "questionnaire" && (
          <Questionnaire
            startingQuestionNumber={4}
            totalQuestions={totalQuestions}
            onComplete={handleQuestionnaireComplete}
          />
        )}
        
        {currentStep === "loading-3" && (
          <LoadingScreen 
            message="Conectando sua essência com as possibilidades do amor..."
            submessages={[
              "Desenhando o reflexo de tudo o que você sente, acredita e deseja...",
              "Seu futuro amor pode estar mais perto do que você imagina...",
              "Revelando o rosto que aguarda seu coração...",
            ]}
          />
        )}
        
        {currentStep === "final-results" && sessionData?.generatedProfile && (
          <FinalResults
            sessionId={sessionData.id}
            name={sessionData.name}
            gender={sessionData.gender}
            generatedProfile={sessionData.generatedProfile}
            isPaid={sessionData.isPaid}
            onUnlock={handleUnlock}
          />
        )}
        
        {currentStep === "payment" && sessionData?.paymentData && (
          <PaymentPix
            qrCode={sessionData.paymentData.qrCode}
            qrCodeBase64={sessionData.paymentData.qrCodeBase64}
            pixCode={sessionData.paymentData.pixCode}
            amount={50.00}
            onPaymentConfirmed={handlePaymentConfirmed}
            onSimulatePayment={handleSimulatePayment}
          />
        )}
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
