import React from 'react';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { Session } from '@/interfaces';
import AddressForm from '@/features/AddressForm';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';

interface AddAddressPageProps {
  isAgent?: boolean;
}

const AddAddressPage: React.FC<AddAddressPageProps> = async ({ isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);

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
