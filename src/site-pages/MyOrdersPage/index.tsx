import React from 'react';
import { cookies } from 'next/headers';
import { GetAllOrders, GetNonce, GetSession } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import OrderListing from '@/components/OrderListing';
import { getVipId } from '@/helpers/utils';

const MyOrdersPage = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const nonce = await GetNonce(token);
    const allOrders = await GetAllOrders(token, vipId, nonce);
    if (!allOrders || allOrders.length === 0) {
      return <ErrorFallback errorMessage="No orders found" hideSubtext={true} />;
    }
    return <OrderListing allOrders={allOrders} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show orders currently." />;
  }
};

export default MyOrdersPage;
