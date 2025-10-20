import { type ReadingSession, type InsertReadingSession, type UpdateReadingSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createSession(session: InsertReadingSession): Promise<ReadingSession>;
  getSession(id: string): Promise<ReadingSession | undefined>;
  updateSession(id: string, updates: UpdateReadingSession): Promise<ReadingSession | undefined>;
  updateSessionPayment(id: string, paymentId: string, isPaid: boolean): Promise<ReadingSession | undefined>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, ReadingSession>;

  constructor() {
    this.sessions = new Map();
  }

  async createSession(insertSession: InsertReadingSession): Promise<ReadingSession> {
    const id = randomUUID();
    const session: ReadingSession = {
      id,
      ...insertSession,
      selectedCards: null,
      questionnaireAnswers: null,
      generatedProfile: null,
      isPaid: false,
      paymentId: null,
      photoUrl: null,
      createdAt: new Date(),
    };
    this.sessions.set(id, session);
    return session;
  }

  async getSession(id: string): Promise<ReadingSession | undefined> {
    return this.sessions.get(id);
  }

  async updateSession(id: string, updates: UpdateReadingSession): Promise<ReadingSession | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;

    const updatedSession = { ...session, ...updates };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }

  async updateSessionPayment(id: string, paymentId: string, isPaid: boolean): Promise<ReadingSession | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;

    const updatedSession = { ...session, paymentId, isPaid };
    this.sessions.set(id, updatedSession);
    return updatedSession;
  }
}

export const storage = new MemStorage();
