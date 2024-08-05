import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginApi } from './libs/api';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session({ session, token }) {
      session.user.displayName = token.displayName;
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.token = token.token;
      session.user.role = token.role;
      session.user.phone = token.phone;
      session.user.secondary_email = token.secondary_email;
      session.user.instagram_handle = token.instagram_handle;
      session.user.tiktok_handle = token.tiktok_handle;
      session.user.vip_profile = token.vip_profile;
      session.user.isProfileApproved = token.isProfileApproved;
      session.user.isAccountApproved = token.isAccountApproved;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.data.id;
        token.email = user.data.user_email;
        token.token = user.data.token;
        token.displayName = user.data.display_name;
        token.role = user.data.role;
        token.phone = user.data.phone;
        token.secondary_email = user.data.secondary_email;
        token.instagram_handle = user.data.instagram_handle;
        token.tiktok_handle = user.data.tiktok_handle;
        token.vip_profile = user.data.vip_profile;
        token.isProfileApproved = user.data.is_profile_approved;
        token.isAccountApproved = user.data.is_account_approved;
      }
      return token;
    },
  },
  session: { strategy: 'jwt' },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const res = await loginApi({
          username: credentials.username,
          password: credentials.password,
        });
        user = res;
        if (res && user) {
          return user;
        }
        if (!res.data) {
          throw new Error(res.message);
        }
        return null;
      },
    }),
  ],
});
