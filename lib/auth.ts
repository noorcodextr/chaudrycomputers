import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { admins } from "@/drizzle/schema"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (
          !credentials?.username ||
          !credentials?.password
        ) {
          return null
        }

        const result = await db
          .select()
          .from(admins)
          .where(
            eq(
              admins.username,
              credentials.username
            )
          )
          .limit(1)

        const admin = result[0]

        if (!admin) {
          return null
        }

        const passwordValid = await bcrypt.compare(
          credentials.password,
          admin.passwordHash
        )

        if (!passwordValid) {
          return null
        }

        return {
          id: admin.id.toString(),
          name: admin.username,
          email: admin.email,
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.SESSION_SECRET,
}