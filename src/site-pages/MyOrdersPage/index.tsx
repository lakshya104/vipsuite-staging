import React from 'react';
import { cookies } from 'next/headers';
import { GetAllOrders, GetNonce } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import OrderListing from '@/components/OrderListing';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import { UserRole } from '@/helpers/enums';

interface SessionUser extends Session {
  token: string;
  vip_profile_id: number;
  role: string;
}

const MyOrdersPage = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const { token, vip_profile_id, role } = session?.user as SessionUser;
    const vipId = role === UserRole.Vip ? vip_profile_id : Number(userId?.value);
    const nonce = await GetNonce(token);
    const allOrders = await GetAllOrders(token, vipId, nonce);
    if (!allOrders || allOrders.length === 0) {
      return <ErrorFallback errorMessage="No orders found" hideSubtext={true} />;
    }
    return <OrderListing allOrders={allOrders} role={role} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show orders currently." />;
  }
};

export default MyOrdersPage;
