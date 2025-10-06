import { PrismaClient } from './persistence/generated/prisma/index.js';

export interface AppContext {
  prisma: PrismaClient;
}

export function createAppContext(): AppContext {
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'info', 'warn', 'error']
      : ['warn', 'error'],
  });

  return {
    prisma,
  };
}

export async function closeAppContext(context: AppContext): Promise<void> {
  await context.prisma.$disconnect();
}
