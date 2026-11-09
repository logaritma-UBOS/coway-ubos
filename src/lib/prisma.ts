import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
  let dbUrl =
    process.env.DATABASE_URL ||
    'postgresql://postgres.nbgdryaqfrvthkkxminq:Bismillah1m202303@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true';

  // Otomatis ganti ke password baru Bismillah1m202303 jika Netlify masih membawa password lama
  if (dbUrl.includes('Bismillah%401m202303') || dbUrl.includes('Bismillah@1m202303')) {
    dbUrl = dbUrl.replace(/Bismillah(%40|@)1m202303/g, 'Bismillah1m202303');
  }

  const pool = new Pool({ connectionString: dbUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
