import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Instantiate Prisma (use global to prevent hot-reload exhaustion in dev)
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@contoh.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.passwordHash) {
          throw new Error("Email tidak terdaftar atau kredensial salah");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          throw new Error("Password salah");
        }

        if (!user.isActive) {
          throw new Error("Akun Anda belum aktif atau sedang ditangguhkan");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          cowayId: user.cowayId,
          whatsappNumber: user.whatsappNumber,
          slug: user.slug,
          isPremium: user.isPremium,
        } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.cowayId = (user as any).cowayId;
        token.whatsappNumber = (user as any).whatsappNumber;
        token.slug = (user as any).slug;
        token.isPremium = (user as any).isPremium;
        token.isAdmin = user.email === 'logaritma.tim@gmail.com';
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).cowayId = token.cowayId as string;
        (session.user as any).whatsappNumber = token.whatsappNumber as string;
        (session.user as any).slug = token.slug as string;
        (session.user as any).isPremium = token.isPremium as boolean;
        (session.user as any).isAdmin = token.isAdmin as boolean;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_coway_ubos_2026",
};
