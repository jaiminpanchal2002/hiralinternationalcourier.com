/** True when Prisma can initialise (set in Vercel / local `.env`). */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}