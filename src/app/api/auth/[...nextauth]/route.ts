import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/dbConfig";
import User from "@/utils/models/user";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: any;
      user: any;
    }) {
      if (account) {
        token.accessToken = account.access_token;
        token.providerId = account.providerId;
      }
      if (user) {
        token.id = user.id;
      }
      console.log("JWT", token, account);
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      console.log("---------session and token---------", token);
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      session.providerId = token.providerId;
      return session;
    },
    async signIn({ user, account, profile }: any) {
      // console.log("---------", user, account, profile);

      try {
        await connectDB();
        const { id: providerId, name, email, image } = user;
        const { provider, access_token: accessToken } = account;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          const newUser = new User({
            providerId,
            provider,
            accessToken,
            name,
            email,
            image,
          });
          console.log("user:", existingUser);

          await newUser.save();
        }
        return true;
      } catch (error) {
        console.log("Could not connect to the DB", error);
        return false;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
