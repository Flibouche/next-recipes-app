// J'importe PrismaClient depuis @prisma/client
import { PrismaClient } from '@prisma/client';

// Je déclare un module global pour y stocker l'instance de PrismaClient
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// J'exporte db qui utilise soit l'instance prisma globale, soit crée une nouvelle instance PrismaClient
export const db = globalThis.prisma || new PrismaClient();

// Si nous sommes en développement, nous assignons l'instance de Prisma à la variable globale
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;