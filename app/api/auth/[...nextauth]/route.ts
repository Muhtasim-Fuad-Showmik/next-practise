import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Generated client ID and client secret from:
// ("https://console.cloud.google.com/apis/credentials?authuser=1&project=next-practice-25188&supportedpurview=project");
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
