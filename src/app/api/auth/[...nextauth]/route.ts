connectDB();
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/dbConfig";
import User from "@/utils/models/user";
import { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }: { token: JWT; user?: any }) {
  //     console.log("---------user----------", user);
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //       token.name = user.name;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: { session: any; token: JWT }) {
  //     console.log("---------session---------", session);
  //     if (session.user) {
  //       session.user.id = token.id;
  //       session.user.email = token.email;
  //       session.user.name = token.name;
  //     }
  //     return session;
  //   },
  //   async signIn({ user, account, profile }: any) {
  //     console.log("User account profile",{user, account, profile} );
      
  //     if (account.provider === "google") {
  //       try {
  //         const { name, email } = user;
  //         await connectDB();
  //         const existingUser = await User.findOne({ email });
  //         if (existingUser) return existingUser;
  //         const newUser = new User({
  //           name: user.name,
  //           email: user.email,
  //           image: user.image,
  //           googleId: account.providerAccountId,
  //         });
  //         const res = await newUser.save();
  //         if (res.status === 200 || res.status === 201) {
  //           console.log(res);
  //           return user;
  //         }
  //       } catch (error) {
  //         console.log("Errorrrrrrr",error);
          
  //       }
  //     }
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
