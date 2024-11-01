import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/dbConfig";
import User from "@/utils/models/user";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: { timeout: 30000 },
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
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // await connectDB();
      // const user = await User.findOne({ email: session.user.email });
      // if (user?.isBlocked) {
      //   throw new Error("User is blocked"); // Optional: Redirect to an error page
      // }
      // console.log(46,session.user);

      session.user.id = token.id;
      session.accessToken = token.accessToken;
      session.providerId = token.providerId;
      return session;
    },
    async signIn({ user, account, profile }: any) {
      try {
        await connectDB();
        const { id: providerId, name, email, image } = user;
        const { provider, access_token: accessToken } = account;

        const existingUser = await User.findOne({ email });
        // if (existingUser && existingUser.isActive) {
        //   return false;
        // }
        if (!existingUser) {
          const newUser = new User({
            providerId,
            provider,
            accessToken,
            name,
            email,
            image,
          });
          await newUser.save();
          const webhookUrl = process.env.DISCORD_WEBHOOK_URL; // Store your webhook URL in .env.local
          await fetch(webhookUrl!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: `🎉 New user signed up!\nUsername: ${name}\nEmail: ${email}`,
            }),
          });
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
  debug: process.env.NODE_ENV === "development",
};
