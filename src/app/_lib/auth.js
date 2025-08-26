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
      console.log(auth, "EN CALLBACK");
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        console.log("Entre a sign in");
        const existingUser = await getUser(user.email);
        console.log(existingUser);
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
