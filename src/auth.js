import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Login } from './libs/api-manager/manager';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    // maxAge: 8 * 60 * 60
  },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const res = await Login({
          username: credentials.email,
          password: credentials.password,
        });
        user = res;
        if (res && res?.account_status !== 'approved') {
          throw new Error(res.message);
        }
        if (res && res?.acf?.profile_status == 'rejected') {
          throw new Error('Your account was rejected');
        }
        if (res && user) {
          return user;
        }
        return null;
      },
    }),
  ],
});
