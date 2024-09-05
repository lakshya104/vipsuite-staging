import React from 'react';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';

interface ErrorHandlerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  errMessage: string;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, errMessage }) => {
  const message = get(error, 'message', '');
  if (message === 'Expired token') {
    return <ErrorToaster message={errMessage} login={true} errorMessage={String(error)} />;
  } else {
    return <ErrorToaster message={errMessage} errorMessage={String(error)} />;
  }
};

export default ErrorHandler;
