import type { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER || 'smtp://localhost:1025',
      from: process.env.EMAIL_FROM || 'noreply@holoholo.ai',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
