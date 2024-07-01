import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler =  NextAuth({
  // Configure Google provider
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return session
    }, 
  },
})
export {handler as GET, handler as POST } 
