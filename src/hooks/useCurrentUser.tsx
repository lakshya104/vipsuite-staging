import { Session } from '@/interfaces';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();
  return session?.data?.user as unknown as Session;
};
