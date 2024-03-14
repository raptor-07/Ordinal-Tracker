import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;
export const db = new PrismaClient();