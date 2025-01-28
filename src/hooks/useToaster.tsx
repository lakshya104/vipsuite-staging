import { useState, useCallback } from 'react';

const UseToaster = () => {
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const openToaster = useCallback((message: string, onClose?: () => void) => {
    setError(message);
    setToasterOpen(true);

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
