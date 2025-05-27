'use client';
import { useEffect, useLayoutEffect } from 'react';
import { LastLogin } from '@/libs/api-manager/manager';
import { useUserStatusStore } from '@/store/useStore';

const StatusUpdate = () => {
  const { shouldUpdate, setLastUpdateTime } = useUserStatusStore();

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const updateStatus = async () => {
      if (!shouldUpdate(5)) {
        console.log('Skipping status update - within cooldown period');
        return;
      }

      try {
        await LastLogin();
        const now = Date.now();
        setLastUpdateTime(now);
        console.log('Status updated at:', new Date(now).toLocaleTimeString());
      } catch (err) {
        console.error('Error updating status:', err);
      }
    };
    updateStatus();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateStatus();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    const intervalId = setInterval(updateStatus, 5 * 60 * 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [shouldUpdate, setLastUpdateTime]);

  return null;
};

export default StatusUpdate;
