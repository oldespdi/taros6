import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import { insertReadingSessionSchema, updateReadingSessionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const upload = multer({
  storage: multer.diskStorage({
    destination: "attached_assets/uploads/",
    filename: (req, file, cb) => {
      const uniqueName = `${randomUUID()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

if (!process.env.PUSHINPAY_TOKEN) {
  console.warn("WARNING: PUSHINPAY_TOKEN not set. Using test mode for payments.");
}

const PUSHINPAY_API_URL = "https://api.pushinpay.com.br/api";

function generateProfile(data: {
  name: string;
  age: number;
  gender: string;
  zodiacSign: string;
  selectedCards?: number[];
  questionnaireAnswers?: Record<string, string>;
}) {
  const { name, age, gender, zodiacSign, selectedCards = [], questionnaireAnswers = {} } = data;

  const profiles = [
    {
      title: "Alma Gêmea de Energia Intensa",
      description: `${name}, a energia que você transmite atrai uma pessoa profunda e apaixonada. Essa alma compartilha sua intensidade e desejo de viver o amor de forma verdadeira e transformadora. Ela será alguém que não tem medo de mergulhar nas emoções e que valoriza a autenticidade acima de tudo. Seu futuro amor tem olhos que refletem mistério e sabedoria, uma presença que acalma e ao mesmo tempo desperta sua alma. Esta conexão será marcada por conversas profundas, compreensão mútua e uma química inegável que transcende o físico.`,
      traits: [
        "Olhares profundos que comunicam sem palavras",
        "Paixão e intensidade em tudo que faz",
        "Sabedoria emocional e compreensão genuína",
        "Presença magnética que atrai e conforta",
        "Autenticidade e verdade acima das aparências"
      ]
    },
    {
      title: "Parceiro de Sonhos e Alegria",
      description: `Baseado na sua essência, ${name}, você está destinado a encontrar alguém que ilumina sua vida com alegria e positividade. Esta pessoa será seu companheiro de aventuras, alguém que acredita nos mesmos sonhos que você e que está pronto para construí-los juntos. Seu futuro amor tem um sorriso contagiante e uma energia que eleva todos ao redor. A relação será leve, mas profunda - repleta de risadas, cumplicidade e momentos inesquecíveis. Esta pessoa trará cor e brilho aos seus dias, transformando o ordinário em extraordinário.`,
      traits: [
        "Sorriso radiante que ilumina qualquer ambiente",
        "Otimismo contagiante e energia positiva",
        "Companheirismo em todas as aventuras da vida",
        "Leveza sem perder a profundidade emocional",
        "Capacidade de transformar momentos simples em especiais"
      ]
    },
    {
      title: "Amor Calmo e Acolhedor",
      description: `A leitura revela, ${name}, que você atrairá uma alma gentil e acolhedora. Esta pessoa será seu porto seguro, alguém que oferece paz e estabilidade em meio ao caos do mundo. Seu futuro amor tem uma presença serena que acalma suas ansiedades e um coração generoso que sempre coloca você em primeiro lugar. A relação será construída sobre bases sólidas de respeito, cuidado mútuo e compreensão profunda. Esta pessoa te fará sentir em casa, onde quer que estejam juntos, criando um espaço de amor incondicional e aceitação.`,
      traits: [
        "Presença tranquila que traz paz e segurança",
        "Gentileza e cuidado em cada gesto",
        "Estabilidade emocional e maturidade",
        "Generosidade natural e coração aberto",
        "Capacidade de criar um lar onde quer que esteja"
      ]
    },
    {
      title: "Conexão de Propósito Compartilhado",
      description: `As energias revelam, ${name}, que seu amor ideal é alguém com quem você compartilhará um propósito maior. Esta pessoa não apenas te ama, mas também acredita nas mesmas causas e valores que movem seu coração. Seu futuro amor tem determinação e paixão por fazer a diferença no mundo, e juntos vocês formarão uma parceria poderosa que vai além do romance. Esta conexão será marcada por crescimento mútuo, apoio incondicional e a sensação de que juntos podem conquistar qualquer objetivo. Vocês não apenas se amam - vocês se inspiram a serem versões melhores de si mesmos.`,
      traits: [
        "Valores e propósitos alinhados com os seus",
        "Determinação e força de vontade inspiradoras",
        "Apoio incondicional em todos os seus objetivos",
        "Parceria equilibrada onde ambos crescem",
        "Visão compartilhada de futuro e legado"
      ]
    }
  ];

  const profileIndex = (selectedCards.reduce((sum, card) => sum + card, 0) + 
                        Object.keys(questionnaireAnswers).length) % profiles.length;

  return profiles[profileIndex];
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/sessions", async (req, res) => {
    try {
      const validatedData = insertReadingSessionSchema.parse(req.body);
      const session = await storage.createSession(validatedData);
      res.json(session);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Error creating session: " + error.message });
    }
  });

  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching session: " + error.message });
    }
  });

  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      const validatedData = updateReadingSessionSchema.parse(req.body);
      
      let generatedProfile = validatedData.generatedProfile;
      
      if (validatedData.questionnaireAnswers && !generatedProfile) {
        const session = await storage.getSession(req.params.id);
        if (session) {
          generatedProfile = generateProfile({
            name: session.name,
            age: session.age,
            gender: session.gender,
            zodiacSign: session.zodiacSign,
            selectedCards: validatedData.selectedCards || session.selectedCards || [],
            questionnaireAnswers: validatedData.questionnaireAnswers,
          });
        }
      }

      const updatedSession = await storage.updateSession(req.params.id, {
        ...validatedData,
        generatedProfile,
      });

      if (!updatedSession) {
        return res.status(404).json({ message: "Session not found" });
      }

      res.json(updatedSession);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Error updating session: " + error.message });
    }
  });

  app.post("/api/sessions/:id/upload-photo", upload.single("photo"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const photoUrl = `/assets/uploads/${req.file.filename}`;
      const updatedSession = await storage.updateSession(req.params.id, { photoUrl });

      if (!updatedSession) {
        return res.status(404).json({ message: "Session not found" });
      }

      res.json({ photoUrl });
    } catch (error: any) {
      res.status(500).json({ message: "Error uploading photo: " + error.message });
    }
  });

  app.post("/api/sessions/:id/create-payment", async (req, res) => {
    try {
      const { amount } = req.body;

      if (!process.env.PUSHINPAY_TOKEN) {
        console.log("Using test mode for payments (no PUSHINPAY_TOKEN)");
        
        const testPaymentId = `test-${randomUUID()}`;
        const testQrCode = "00020101021226770014BR.GOV.BCB.PIX2555api.pushinpay.com.br/pix/v2/9c29870c-9f69-4bb6-90d3-2dce9453bb455204000053039865802BR5925PUSHIN PAY TECNOLOGIA6009SAO PAULO62070503***63041D2A";
        const testQrCodeBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
        
        await storage.updateSessionPayment(req.params.id, testPaymentId, false);
        
        setTimeout(async () => {
          console.log(`Auto-confirming test payment ${testPaymentId} after 10 seconds`);
          await storage.updateSessionPayment(req.params.id, testPaymentId, true);
        }, 10000);

        return res.json({
          id: testPaymentId,
          qr_code: testQrCode,
          qr_code_base64: testQrCodeBase64,
          emv: testQrCode,
        });
      }

      console.log(`Creating payment for amount: ${amount}`);
      
      const response = await fetch(`${PUSHINPAY_API_URL}/pix/cashIn`, {
        method: "POST",
        headers: {
          "Authorization": process.env.PUSHINPAY_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: amount,
          webhook_url: `${process.env.REPLIT_DEV_DOMAIN}/api/webhooks/pushinpay`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Pushin Pay API error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return res.status(500).json({ 
          message: "Erro ao criar pagamento PIX. Verifique se o token da Pushin Pay está correto." 
        });
      }

      const paymentData = await response.json();
      console.log("Payment created successfully:", paymentData.id);

      await storage.updateSessionPayment(req.params.id, paymentData.id, false);

      res.json({
        id: paymentData.id,
        qr_code: paymentData.qr_code,
        qr_code_base64: paymentData.qr_code_base64,
        emv: paymentData.qr_code,
      });
    } catch (error: any) {
      console.error("Payment creation error:", error);
      res.status(500).json({ message: "Error creating payment: " + error.message });
    }
  });

  app.get("/api/sessions/:id/check-payment", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      res.json({ isPaid: session.isPaid });
    } catch (error: any) {
      res.status(500).json({ message: "Error checking payment: " + error.message });
    }
  });

  app.post("/api/webhooks/pushinpay", async (req, res) => {
    try {
      console.log("Pushin Pay webhook received:", req.body);

      const paymentId = req.body.id;
      const status = req.body.status;

      if (status === "paid" || status === "confirmed") {
        const sessions = Array.from((storage as any).sessions.values());
        const session = sessions.find((s: any) => s.paymentId === paymentId);

        if (session) {
          await storage.updateSessionPayment((session as any).id, paymentId, true);
          console.log(`Payment confirmed for session ${(session as any).id}`);
        }
      }

      res.status(200).json({ received: true });
    } catch (error: any) {
      console.error("Webhook processing error:", error);
      res.status(500).json({ message: "Error processing webhook: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
