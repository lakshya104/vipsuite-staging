import React from 'react';
import { GetAllOrders, GetNonce } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import OrderListing from '@/components/OrderListing';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { Session } from '@/interfaces';

interface MyOrdersPageProps {
  isAgent?: boolean;
}
const MyOrdersPage: React.FC<MyOrdersPageProps> = async ({ isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
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
