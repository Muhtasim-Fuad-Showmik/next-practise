import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

// Generated client ID and client secret from:
// ("https://console.cloud.google.com/apis/credentials?authuser=1&project=next-practice-25188&supportedpurview=project");
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        // Make sure that the credentials contain an email and a password
        if (!credentials?.email || !credentials?.password) return null;

        // Find the specific user with the provided email in the credentials
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Return null if the user does not exist
        if (!user) return null;

        // Compare the password from the credentials
        // and the password from the retrieved user
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        // return user object if the passwords match,
        // and null otherwise
        return passwordsMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
