// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     if (account.provider === "google") {
  //       const usersRef = firebase.firestore().collection("users");
  //       const snapshot = await usersRef.doc(user.id).get();

  //       if (!snapshot.exists) {
  //         await usersRef.doc(user.id).set({
  //           name: user.name,
  //           email: user.email,
  //           image: user.image,
  //           createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //         });
  //       }
  //     }
  //     return true;
  //   },
  //   async session(session, user) {
  //     session.user.uid = user.uid;
  //     return session;
  //   },
  //   async jwt(token, user) {
  //     if (user) {
  //       token.uid = user.id;
  //     }
  //     return token;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
