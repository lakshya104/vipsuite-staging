'use server';

import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { LoginFormValues, LoginSchema } from '@/features/LoginForm/loginTypes';
import { cookies } from 'next/headers';
import { GetSession } from './api-manager/manager';
import { CookieName } from '@/helpers/enums';

export const loginServerAction = async (values: LoginFormValues) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' };
  }
  const { username, password } = validatedFields.data;
  try {
    await signIn('credentials', {
      username,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      let errorMessage;
      let match;
      switch (error.type) {
        case 'CredentialsSignin':
          errorMessage = 'Invalid Credentials';
          break;
        default:
          errorMessage = String(error);
          match = errorMessage.match(/Invalid (email or password|user credentials)\./);
          errorMessage = match ? match[0] : String(error.cause?.err);
      }
      return { error: errorMessage };
    }
    if (isRedirectError(error)) {
      return;
    } else {
      throw error;
    }
  }
};

const deleteCookie = (cookieStore: any, name: string) => {
  // Clear the cookie for standard local development (HTTP)
  cookieStore.delete({
    name,
    path: '/',
  });

  // Clear the cookie for secure environments (HTTPS / staging / production) with SameSite=None
  cookieStore.delete({
    name,
    path: '/',
    secure: true,
    sameSite: 'none',
  });

  // Clear the cookie for secure environments with SameSite=Lax
  cookieStore.delete({
    name,
    path: '/',
    secure: true,
    sameSite: 'lax',
  });
};

export const signOutAction = async () => {
  const cookieStore = await cookies();

  // Explicitly clear session cookies to handle secure/HTTPS environments
  const cookiesToClear = [
    'authjs.session-token',
    '__Secure-authjs.session-token',
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    'authjs.callback-url',
    '__Secure-authjs.callback-url',
    'next-auth.callback-url',
    '__Secure-next-auth.callback-url',
    'authjs.csrf-token',
    '__Secure-authjs.csrf-token',
    'next-auth.csrf-token',
    '__Secure-next-auth.csrf-token',
  ];

  cookiesToClear.forEach((cookie) => {
    deleteCookie(cookieStore, cookie);
  });

  // Clear application specific cookies to remove all application data stored in cookies
  Object.values(CookieName).forEach((cookie) => {
    deleteCookie(cookieStore, cookie);
  });

  redirect('/login');
};

export default async function revalidatePathAction(path: string) {
  revalidatePath(path);
}

export async function revalidateAllData() {
  revalidatePath('/', 'layout');
}

export async function createSkipCookie() {
  (await cookies()).set({
    name: CookieName.SkipProfile,
    value: 'true',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: false,
    sameSite: 'none',
    secure: true,
  });
}

export async function createProfileCompletedCookie() {
  (await cookies()).set({
    name: CookieName.ProfileCompleted,
    value: 'true',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: false,
    sameSite: 'none',
    secure: true,
  });
}

export async function createVipAddedCookie() {
  (await cookies()).set({
    name: CookieName.VipAdded,
    value: 'true',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: false,
    sameSite: 'none',
    secure: true,
  });
}

export async function createIncompleteVipIdCookie(vipId: string) {
  (await cookies()).set({
    name: CookieName.IncompleteVipId,
    value: vipId,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: false,
    sameSite: 'none',
    secure: true,
  });
}

export async function deleteIncompleteVipCookie() {
  const cookieStore = await cookies();
  deleteCookie(cookieStore, CookieName.IncompleteVipId);
}

export async function deleteVipCookies() {
  const cookieStore = await cookies();
  deleteCookie(cookieStore, CookieName.SkipProfile);
  deleteCookie(cookieStore, CookieName.ProfileCompleted);
  deleteCookie(cookieStore, CookieName.VipAdded);
  deleteCookie(cookieStore, CookieName.IncompleteVipId);
}

export async function getAuthData() {
  try {
    const session = await GetSession();
    const { token } = session;
    const profileId = session?.profile_id;
    return { token, profileId };
  } catch {
    return { token: '', profileId: 0 };
  }
}
