import { useState, useCallback } from 'react';

interface UseToasterReturn {
  toasterOpen: boolean;
  error: string;
  // eslint-disable-next-line no-unused-vars
  openToaster: (message: string, onClose?: () => void) => void;
  closeToaster: () => void;
}

const UseToaster = (): UseToasterReturn => {
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const openToaster = useCallback((message: string, onClose?: () => void) => {
    setError(message);
    setToasterOpen(true);

    setTimeout(() => {
      setToasterOpen(false);
      setError('');
      if (onClose) onClose();
    }, 2000);
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
