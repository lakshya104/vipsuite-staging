import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Login } from './libs/api-manager/manager';
import { ProfileStatus } from './helpers/enums';

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
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const res = await Login({
          username: credentials.username,
          password: credentials.password,
        });
        user = res;
        if (res && res?.account_status !== ProfileStatus.Approved) {
          throw new Error(res?.message + res?.role);
        }
        if (res && res?.acf?.profile_status == ProfileStatus.Rejected) {
          throw new Error('Your account was rejected');
        }
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
});
