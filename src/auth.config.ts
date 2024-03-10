import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn", isLoggedIn);
      const isOnWatchlist = nextUrl.pathname.startsWith("/watchlist");
      const isOnAlerts = nextUrl.pathname.startsWith("/alerts");
      if (isOnWatchlist || isOnAlerts) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/dashboard", nextUrl));
      } 
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
