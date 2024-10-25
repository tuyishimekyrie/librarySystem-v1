import { db } from "@/drizzle/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
  roles,
  userRoles,
} from "@/drizzle/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import crypto from "crypto";

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
        console.log("user",user);

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
        // Check if user already exists in the database
        const usersResult = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        let dbUser = usersResult[0];

        // If the user does not exist, insert them and assign the default role
        if (!dbUser) {
          const newUserId = crypto.randomUUID();

          await db.insert(users).values({
            id: newUserId,
            name: user.name,
            email: user.email,
            image: user.image,
          });

          // Assign the default role
          const roleResult = await db
            .select()
            .from(roles)
            .where(eq(roles.name, "student"))
            .limit(1);

          const studentRole = roleResult[0];

          if (studentRole) {
            await db.insert(userRoles).values({
              userId: newUserId,
              roleId: studentRole.id,
            });
          }
        } else {
          // Link the Google account to the existing user account
          const existingAccountResult = await db
            .select()
            .from(accounts)
            .where(eq(accounts.userId, dbUser.id))
            // @ts-ignore
            .where(eq(accounts.provider, account.provider))
            .where(eq(accounts.providerAccountId, account.providerAccountId))
            .limit(1);

          if (existingAccountResult.length === 0) {
            // @ts-ignore
            await db.insert(accounts).values({
              userId: dbUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            });
          }
        }
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
