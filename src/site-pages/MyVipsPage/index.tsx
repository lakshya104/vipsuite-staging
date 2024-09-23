import React from 'react';
import { GetAllVips } from '@/libs/api-manager/manager';
import MyVipCard from '@/components/MyVipCard';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import { Session } from '@/interfaces';
import { auth } from '@/auth';
import { Box } from '@mui/material';

interface MyVips {
  vip_profile_id: number;
  first_name: string;
  last_name: string;
  profile_image: string;
  profile_status: string;
}

const MyVipPage = async () => {
  try {
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;

    if (!token) {
      return <ErrorFallback errorMessage="Your token is invalid." />;
    }

    const myVips: MyVips[] = await GetAllVips(token);

    if (!myVips || myVips.length === 0) {
      return <ErrorFallback errorMessage="No VIPs found." />;
    }

    return (
      <Box>
        {myVips.map((item) => {
          const link = '/agent-home';
          const name = `${item?.first_name} ${item?.last_name}`;
          return (
            <MyVipCard
              vipId={String(item.vip_profile_id)}
              key={item.vip_profile_id}
              name={name}
              image={item.profile_image}
              link={link}
              instaFollowers={'100k'}
              tiktokFollowers={'50k'}
              status={item.profile_status}
            />
          );
        })}
      </Box>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show VIP details currently." />;
  }
};

export default MyVipPage;
