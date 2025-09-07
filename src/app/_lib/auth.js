import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUser } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email);

        if (!existingUser) {
          return false;
        }

        return true;
      } catch {
        return false;
      }
    },
    // async session({ session, user }) {
    //   const guest = await getUser(session.user.email);
    //   session.user.userId = user.id;
    //   return session;
    // },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
