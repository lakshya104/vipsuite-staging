import { useState, useCallback } from 'react';
import { signOut } from 'next-auth/react';
import { paths, withSearchParams } from '@/helpers/paths';

const UseToaster = () => {
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const openToaster = useCallback((message: string, onClose?: () => void) => {
    if (!message) return;
    if (
      message.toLowerCase().includes('expired') ||
      message.toLowerCase().includes('token') ||
      message.toLowerCase().includes('logged')
    ) {
      signOut({
        callbackUrl: withSearchParams(() => paths.auth.login.getHref(), {
          'token-expired': 'true',
          error: message || 'User must be logged in.',
        }),
      });
    } else {
      setError(message);
      setToasterOpen(true);
      setTimeout(() => {
        setToasterOpen(false);
        setError('');
        if (onClose) onClose();
      }, 4000);
    }
  }, []);

  const closeToaster = useCallback(() => {
    setToasterOpen(false);
    setError('');
  }, []);

  return {
    toasterOpen,
    error,
    openToaster,
    closeToaster,
  };
};

export default UseToaster;
