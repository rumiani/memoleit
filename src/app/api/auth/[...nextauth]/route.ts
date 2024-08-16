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
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: any }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken;
      // console.log("---------session and token---------", session);
      return session;
    },
    async signIn({ user, account, profile }: any) {
      // console.log("---------", user, account, profile);

      const { id: providerId, name, email, image } = user;
      const { provider, access_token: accessToken } = account;

      try {
        await connectDB();
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
          console.log(newUser);

          await newUser.save();
        }
        return true;
      } catch (error) {
        console.log("Error", "Could not connect to the DB");
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
