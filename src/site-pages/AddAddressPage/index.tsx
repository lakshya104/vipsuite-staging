import React from 'react';
import { cookies } from 'next/headers';
import AddressForm from '@/features/AddressForm';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { GetSession } from '@/libs/api-manager/manager';
import { getVipId } from '@/helpers/utils';

const AddAddressPage = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }

    if (!vipId || !token) {
      return <ErrorFallback errorMessage="Address Page not found." />;
    }

    const defaultValues = {
      first_name: '',
      last_name: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      postcode: '',
      company: '',
    };

    return <AddressForm userId={vipId} token={token} defaultValues={defaultValues} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Address Page not found." />;
  }
};

export default AddAddressPage;
