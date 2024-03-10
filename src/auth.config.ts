import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn", isLoggedIn);
      const isOnWatchlist = nextUrl.pathname.startsWith("/dashboard");
      const isOnAlerts = nextUrl.pathname.startsWith("/alerts");
      if (isOnWatchlist || isOnAlerts) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/", nextUrl));
      } 
      return true;
    },
    async session({ session, token }) {
      console.log("session", session);
      console.log("token", token);
      return session;
    }
  },
  providers: [],
} satisfies NextAuthConfig;