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
        const userData = {
          id: user?.id,
          account_status: user?.account_status,
          role: user?.role,
          email: user?.email,
          first_name: user?.first_name,
          last_name: user?.last_name,
          profile_id: user?.profile_id,
          token: user?.token,
          acf: {
            known_for: user?.acf?.known_for,
          },
        };
        token.user = userData;
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
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
});
