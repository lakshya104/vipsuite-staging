'use server';

import { revalidateTag as revalidate, revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { LoginFormValues, LoginSchema } from '@/features/LoginForm/loginTypes';
import { cookies } from 'next/headers';
import { GetSession } from './api-manager/manager';
import { getVipId } from '@/helpers/utils';

export const login = async (values: LoginFormValues) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/home',
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
    throw error;
  }
};

export const signOutAction = async () => {
  await signOut();
};

export async function revalidateTag(name: string) {
  revalidate(name);
}

export default async function revalidatePathAction(path: string) {
  revalidatePath(path);
}

export async function createVipIdCookie(id: string) {
  cookies().set('vipId', id);
}

export async function deleteVipCookies() {
  cookies().delete('vipId');
  cookies().delete('followers');
}

export async function createVipFollowersCookie(followers: string) {
  cookies().set('followers', followers);
}

export async function deleteVipVipFollowersCookie() {
  cookies().delete('followers');
}

export async function getVipIdCookie() {
  return cookies().get('vipId');
}

export async function getAuthData() {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);

    return { token, vipId };
  } catch {
    return { token: '', vipId: 0 };
  }
}
