import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { Plan } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";
import "@/types/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email =
          typeof credentials?.email === "string" ? credentials.email.trim() : "";
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image ?? user.profilePhoto,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }) {
      if (account?.provider === "google") {
        if (user.id) {
          await prisma.user.update({
            where: { id: user.id },
            data: { provider: "google" },
          });
        }
        return true;
      }

      if (account?.provider === "credentials" && credentials) {
        const cred = credentials as Record<string, unknown>;
        const emailRaw = cred.email;
        const passwordRaw = cred.password;
        const email = String(emailRaw ?? "").trim();
        const password = String(passwordRaw ?? "");
        if (!email || !password) return false;

        const dbUser = await prisma.user.findUnique({ where: { email } });
        if (!dbUser?.passwordHash) return false;

        const valid = await bcrypt.compare(password, dbUser.passwordHash);
        return valid;
      }

      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user?.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id as string },
          select: { id: true, plan: true, credits: true },
        });
        if (dbUser) {
          token.sub = dbUser.id;
          token.id = dbUser.id;
          token.plan = dbUser.plan;
          token.credits = dbUser.credits;
        }
        return token;
      }

      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { plan: true, credits: true },
        });
        if (dbUser) {
          token.plan = dbUser.plan;
          token.credits = dbUser.credits;
        }
      }

      if (!token.id && token.sub) {
        token.id = token.sub as string;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.plan = token.plan as Plan;
        session.user.credits = token.credits as number;
      }
      return session;
    },
  },
});

export async function getServerSession() {
  return auth();
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}
