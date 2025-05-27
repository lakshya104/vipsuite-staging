import { GetSession } from '@/libs/api-manager/manager';
import React from 'react';
import StatusUpdate from './StatusUpdate';

const GetSessionForStatusUpdate = async () => {
  const session = await GetSession();
  return session && <StatusUpdate />;
};

export default GetSessionForStatusUpdate;
