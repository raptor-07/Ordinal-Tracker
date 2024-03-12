import NextAuth from "next-auth";
import { db } from "./lib/db";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token }) {
      return token;
    },
  },
  ...authConfig,
});
