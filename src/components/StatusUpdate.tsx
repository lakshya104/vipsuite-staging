'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { GetMessageCount, LastLogin } from '@/libs/api-manager/manager';
import { useMessageCountStore, useUserStatusStore } from '@/store/useStore';

const StatusUpdate = () => {
  const { shouldUpdate, setLastUpdateTime } = useUserStatusStore();
  const { setMessageCount } = useMessageCountStore();
  const isUpdatingRef = useRef(false);

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  const updateStatus = async () => {
    if (isUpdatingRef.current) {
      console.log('Update already in progress, skipping...');
      return;
    }

    if (!shouldUpdate(5)) {
      console.log('Skipping status update - within cooldown period');
      return;
    }

    isUpdatingRef.current = true;
    try {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const [_, count] = await Promise.all([LastLogin(), GetMessageCount()]);
      setMessageCount(count.data['message-count'] || 0);
      console.log('Message count updated:', count.data['message-count']);
      const now = Date.now();
      setLastUpdateTime(now);
      console.log('Status updated at:', new Date(now).toLocaleTimeString());
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      isUpdatingRef.current = false;
    }
  };

  useIsomorphicLayoutEffect(() => {
    updateStatus();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isUpdatingRef.current) {
        // Add a small delay to avoid immediate duplicate calls
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            updateStatus();
          }
        }, 1000);
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
