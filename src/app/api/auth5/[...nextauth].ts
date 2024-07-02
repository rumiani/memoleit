import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
console.log(55);

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)