'use client';
import React from 'react';
import { Box } from '@mui/material';
import MyVipCard from './MyVipCard';
import { ProfileStatus } from '@/helpers/enums';
import { MyVips } from '@/interfaces';
import { orderBy } from 'lodash';

interface MyVipsListingProps {
  myVips: MyVips[];
}

const MyVipsListing: React.FC<MyVipsListingProps> = ({ myVips }) => {
  const sortVipProfiles = (vips: MyVips[]) => {
    return orderBy(
      vips,
      [
        (vip) => {
          if (vip.profile_status === ProfileStatus.Approved) return 1;
          if (vip.profile_status === ProfileStatus.Pending) return 2;
          return 3;
        },
        'first_name',
      ],
      ['asc', 'asc'],
    );
  };
  const sortedVips = sortVipProfiles(myVips);
  return (
    <Box>
      {sortedVips.map((item) => {
        const link = item.profile_status === ProfileStatus.Pending ? `/agent-profile-builder?edit=true` : `/home`;
        const name = `${item?.first_name} ${item?.last_name}`;
        return (
          <MyVipCard
            vipId={String(item?.vip_profile_id)}
            key={item?.vip_profile_id}
            name={name}
            image={item?.profile_image}
            link={link}
            instaFollowers={item?.instagram_follower_count}
            tiktokFollowers={item?.tiktok_follower_count}
            status={item?.profile_status}
          />
        );
      })}
    </Box>
  );
};

export default MyVipsListing;
