import { prisma } from './src/lib/auth';

async function main() {
  const result = await prisma.user.updateMany({
    data: { isPremium: true }
  });
  console.log('Update Success:', result);
}

main().catch(console.error).finally(() => prisma.$disconnect());
