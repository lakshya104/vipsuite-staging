'use server';

import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';
import { LoginFormValues, LoginSchema } from '@/features/LoginForm/loginTypes';
import { cookies } from 'next/headers';
import { GetSession } from './api-manager/manager';
import { CookieName, GrantAccessObj } from '@/helpers/enums';

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

export default async function revalidatePathAction(path: string) {
  revalidatePath(path);
}

export async function revalidateAllData() {
  revalidatePath('/', 'layout');
}

export async function createSkipCookie() {
  (await cookies()).set(CookieName.SkipProfile, 'true');
}
export async function deleteVipCookies() {
  await Promise.all([(await cookies()).delete(CookieName.SkipProfile)]);
}

export async function getAccessCookie() {
  return (await cookies()).get('GrantAccess');
}

export async function createGrantAccessCookie() {
  const cookieStore = await cookies();
  cookieStore.set(GrantAccessObj.Name, GrantAccessObj.Value);
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
