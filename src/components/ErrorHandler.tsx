import React from 'react';
import { get } from 'lodash';
import ErrorToaster from '@/components/ErrorToaster';

interface ErrorHandlerProps {
  error: unknown;
  errMessage: string;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, errMessage }) => {
  const message = get(error, 'message', 'Unexpected Error Occured');
  console.error(message);
  if (
    message.toLowerCase().includes('expired') ||
    message.toLowerCase().includes('token') ||
    message.toLowerCase().includes('logged')
  ) {
    return <ErrorToaster message={errMessage} login={true} errorMessage={String(error)} />;
  } else {
    return <ErrorToaster message={errMessage} errorMessage={String(error)} />;
  }
};

export default ErrorHandler;
