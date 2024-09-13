'use server';

import { revalidateTag as revalidate, revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { LoginFormValues, LoginSchema } from '@/features/LoginForm/loginTypes';

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
