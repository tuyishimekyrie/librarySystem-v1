import { db } from "@/drizzle/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/drizzle/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const handler = NextAuth({
  //@ts-ignore
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    //@ts-ignore
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Fetch user from the database
        const usersResult = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);

        const user = usersResult[0];

        if (
          user &&
          user.password &&
          bcrypt.compareSync(credentials.password, user.password)
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user.email) {
        const usersResult = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        let dbUser = usersResult[0];

        if (!dbUser) {
          await db.insert(users).values({
            id: crypto.randomUUID(),
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
