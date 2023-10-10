import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export class Database {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async connect(): Promise<void> {
    await this.prisma.$connect();
    console.log('Database connected');
  }

  async disconnect(): Promise<void> {
    this.prisma?.$disconnect();
  }
}

export default new Database();
