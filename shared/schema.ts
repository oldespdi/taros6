import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const zodiacSigns = [
  "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
  "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
] as const;

export const readingSessions = pgTable("reading_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  zodiacSign: text("zodiac_sign").notNull(),
  photoUrl: text("photo_url"),
  selectedCards: json("selected_cards").$type<number[]>(),
  questionnaireAnswers: json("questionnaire_answers").$type<Record<string, string>>(),
  generatedProfile: json("generated_profile").$type<{
    title: string;
    description: string;
    traits: string[];
    imageUrl?: string;
  }>(),
  isPaid: boolean("is_paid").default(false),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReadingSessionSchema = createInsertSchema(readingSessions).omit({
  id: true,
  createdAt: true,
});

export const updateReadingSessionSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
  zodiacSign: z.string().optional(),
  photoUrl: z.string().optional(),
  selectedCards: z.array(z.number()).optional(),
  questionnaireAnswers: z.record(z.string()).optional(),
  generatedProfile: z.object({
    title: z.string(),
    description: z.string(),
    traits: z.array(z.string()),
    imageUrl: z.string().optional(),
  }).optional(),
  isPaid: z.boolean().optional(),
  paymentId: z.string().optional(),
});

export type InsertReadingSession = z.infer<typeof insertReadingSessionSchema>;
export type UpdateReadingSession = z.infer<typeof updateReadingSessionSchema>;
export type ReadingSession = typeof readingSessions.$inferSelect;

export interface TarotCard {
  id: number;
  name: string;
  imageUrl: string;
  meaning: string;
  loveReading: string;
}

export const tarotCards: TarotCard[] = [
  {
    id: 0,
    name: "The Sun (O Sol)",
    imageUrl: "/assets/generated_images/The_Sun_tarot_card_a7e1dfec.png",
    meaning: "Indica que essa pessoa trará alegria e luz para a vida da pessoa. Um relacionamento cheio de otimismo, honestidade e crescimento.",
    loveReading: "A alma gêmea virá de uma forma que ilumina e aquece conexão será clara e luminosa."
  },
  {
    id: 1,
    name: "Temperance (Temperança)",
    imageUrl: "/assets/generated_images/Temperance_tarot_card_6aae0f05.png",
    meaning: "Essa relação vai exigir equilíbrio, mas terá grande potencial de harmonia. A alma gêmea trará equilíbrio, mas ela grande potencial de se desenvolver espiritualmente.",
    loveReading: "Alma gêmea calma e acolhedora."
  },
  {
    id: 2,
    name: "The Emperor (O Imperador)",
    imageUrl: "/assets/generated_images/The_Emperor_tarot_card_1f7095ef.png",
    meaning: "O parceiro será confiável e maduro, pessoa trará estabilidade e segurança, ajudando a construir uma base sólida para a relação.",
    loveReading: "Alma gêmea que te inspira evolução."
  },
  {
    id: 3,
    name: "The Lovers (Os Amantes)",
    imageUrl: "/assets/generated_images/The_Lovers_tarot_card_bcb3286f.png",
    meaning: "Uma parceria de alma forte, com profunda conexão emocional e espiritual. O amor verdadeiro e autêntico.",
    loveReading: "Um amor com propósito divino."
  },
  {
    id: 4,
    name: "The Star (A Estrela)",
    imageUrl: "/assets/generated_images/The_Star_tarot_card_20cfae50.png",
    meaning: "Esperança renovada no amor. Essa pessoa trará cura e inspiração para a vida da pessoa.",
    loveReading: "Alma gêmea que renova a esperança."
  },
  {
    id: 5,
    name: "The Moon (A Lua)",
    imageUrl: "/assets/generated_images/The_Moon_tarot_card_ddae9592.png",
    meaning: "Conexão intuitiva e profunda. O relacionamento terá camadas emocionais complexas, mas muito intensas.",
    loveReading: "Amor misterioso e profundo."
  }
];

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export const questionnaire: Question[] = [
  {
    id: "q1",
    question: "Qual dessas palavras descreve melhor você?",
    options: [
      { value: "intense", label: "Intenso(a)" },
      { value: "dreamy", label: "Sonhador(a)" },
      { value: "protective", label: "Protetor(a)" },
      { value: "independent", label: "Independente" }
    ]
  },
  {
    id: "q2",
    question: "Como você descreveria seu momento atual?",
    options: [
      { value: "happy", label: "Feliz e realizado(a)" },
      { value: "hopeful", label: "Esperançoso(a) e aberto(a)" },
      { value: "challenging", label: "Passando por desafios" },
      { value: "growing", label: "Buscando crescimento pessoal" }
    ]
  },
  {
    id: "q3",
    question: "O que mais te atrai em alguém?",
    options: [
      { value: "eyes", label: "Olhar" },
      { value: "smile", label: "Sorriso" },
      { value: "voice", label: "Voz" },
      { value: "energy", label: "Energia" }
    ]
  },
  {
    id: "q4",
    question: "Que tipo de conexão você busca?",
    options: [
      { value: "soulmate", label: "Uma parceria de alma" },
      { value: "dreams", label: "Alguém para viver sonhos juntos" },
      { value: "partnership", label: "Companheirismo leve e verdadeiro" },
      { value: "purpose", label: "Um amor com propósito" }
    ]
  },
  {
    id: "q5",
    question: "Como você imagina o olhar do seu futuro amor ideal?",
    options: [
      { value: "deep", label: "Profundo e misterioso" },
      { value: "bright", label: "Brilhante e alegre" },
      { value: "calm", label: "Calmo e acolhedor" },
      { value: "intense", label: "Intenso e apaixonado" }
    ]
  },
  {
    id: "q6",
    question: "Qual característica da personalidade do seu futuro amor mais te atrai?",
    options: [
      { value: "caring", label: "Gentileza e cuidado" },
      { value: "passionate", label: "Paixão e intensidade" },
      { value: "wisdom", label: "Sabedoria e compreensão" },
      { value: "joy", label: "Leveza e alegria" }
    ]
  },
  {
    id: "q7",
    question: "Qual dessas frases mais te representa?",
    options: [
      { value: "giver", label: "Deus não une pessoas, une propósitos." },
      { value: "seeker", label: "Quem é seu, chega com paz." },
      { value: "doubt", label: "O amor certo não traz dúvida." },
      { value: "perfect", label: "Tudo tem seu tempo perfeito." }
    ]
  },
  {
    id: "q8",
    question: "Se pudesse enviar uma mensagem para seu futuro amor, qual dessas escolheria?",
    options: [
      { value: "waiting", label: "Estou esperando por você." },
      { value: "unexpected", label: "Nosso encontro será inesperado." },
      { value: "stronger", label: "Juntos somos mais fortes." },
      { value: "build", label: "Quero construir algo real com você." }
    ]
  }
];
