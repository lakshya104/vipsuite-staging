import { useState, useCallback } from 'react';
import { signOut } from 'next-auth/react';

const UseToaster = () => {
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const handleLogin = () => {
    signOut({ callbackUrl: '/login' });
  };

  const openToaster = useCallback((message: string, onClose?: () => void) => {
    setError(message);
    setToasterOpen(true);
    if (
      message.toLowerCase().includes('expired') ||
      message.toLowerCase().includes('token') ||
      message.toLowerCase().includes('logged')
    ) {
      const timeoutId = setTimeout(() => {
        handleLogin();
      }, 1500);
      return () => {
        clearTimeout(timeoutId);
      };
    }

    setTimeout(() => {
      setToasterOpen(false);
      setError('');
      if (onClose) onClose();
    }, 4000);
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
