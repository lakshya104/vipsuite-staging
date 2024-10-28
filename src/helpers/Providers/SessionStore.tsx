'use client';
import { Session } from '@/interfaces';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useEffect } from 'react';
import { getVipId } from '../utils';

const SessionStore = ({ session, userId }: { session: Session; userId: RequestCookie | undefined }) => {
  useEffect(() => {
    if (session) {
      const { token, role } = session;
      const vipId = getVipId(role, userId, session);
      localStorage.setItem('token', token || '');
      localStorage.setItem('vipId', vipId.toString());
    }
  }, [session, userId]);

  return null;
};

export default SessionStore;
