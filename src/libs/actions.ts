'use server';

import { revalidateTag as revalidate, revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { LoginFormValues, LoginSchema } from '@/features/LoginForm/loginTypes';
import { cookies } from 'next/headers';
import { GetSession } from './api-manager/manager';
import { CookieName } from '@/helpers/enums';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { getProfileId } from '@/helpers/utils';
import { redirect } from 'next/navigation';

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

export const signOutAction = async () => {
  await signOut({ redirect: false });
  redirect('/login');
};

export async function revalidateTag(name: string) {
  revalidate(name);
}

export default async function revalidatePathAction(path: string) {
  revalidatePath(path);
}

export async function revalidateAllData() {
  revalidatePath('/', 'layout');
}

export async function createVipIdCookie(id: string) {
  (await cookies()).set(CookieName.ProfileId, id);
}

export async function createIsAgentCookie(bool: string) {
  (await cookies()).set(CookieName.IsAgent, bool);
}

export async function createSkipCookie() {
  (await cookies()).set(CookieName.SkipProfile, 'true');
}
export async function deleteVipCookies() {
  await Promise.all([
    (await cookies()).delete(CookieName.ProfileId),
    (await cookies()).delete(CookieName.SkipProfile),
    (await cookies()).delete(CookieName.IsAgent),
  ]);
}

export async function getVipIdCookie() {
  return (await cookies()).get(CookieName.ProfileId);
}

export async function getAuthData() {
  try {
    const [cookieStore, session] = await Promise.all([cookies(), GetSession()]);
    const userId = cookieStore.get(CookieName.ProfileId);
    const { token, role } = session;
    const profileId = getProfileId(role, userId, session);

    return { token, profileId };
  } catch {
    return { token: '', profileId: 0 };
  }
}
