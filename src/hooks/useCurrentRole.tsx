import { useSession } from 'next-auth/react';

interface User {
  role: string;
}
export const useCurrentRole = () => {
  const session = useSession();
  return (session?.data?.user as User).role;
};
