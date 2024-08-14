connectDB();
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/dbConfig";
import User from "@/utils/models/user";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

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
      console.log("---------session and token---------", session);
      return session;
    },
    async signIn({ user, account, profile }: any) {
      console.log("---------User-------- account---------",{user, account} );

      if (account.provider === "github") {
        try {
          const { name, email } = user;
          await connectDB();
          console.log(email);

          const existingUser = await User.findOne({ email });
          if (existingUser) return existingUser;
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          const res = await newUser.save();
          if (res.status === 200 || res.status === 201) {
            console.log(res);
            return user;
          }
        } catch (error) {
          console.log("Errorrrrrrr",error);

        }
    }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
