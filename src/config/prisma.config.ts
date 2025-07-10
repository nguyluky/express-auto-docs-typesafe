
import { PrismaClient } from '@prisma/client';
import { Logger } from '../utils/logger';

const prisma = new PrismaClient()

const logger = new Logger("PRISMA");
async function connectToDatabase() {
  try {
    await prisma.$connect();
    logger.info('Connected to the database successfully');
  } catch (error) {
    logger.error('Failed to connect to the database');
    logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
connectToDatabase();

export default prisma;