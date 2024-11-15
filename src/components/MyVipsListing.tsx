'use client';
import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import MyVipCard from './MyVipCard';
import { ProfileStatus } from '@/helpers/enums';
import { MyVips } from '@/interfaces';

interface MyVipsListingProps {
  myVips: MyVips[];
}

const MyVipsListing: React.FC<MyVipsListingProps> = ({ myVips }) => {
  const sortedVips = useMemo(() => {
    return [...myVips].sort((a, b) => {
      const statusPriority = {
        [ProfileStatus.Approved]: 1,
        [ProfileStatus.Pending]: 2,
        [ProfileStatus.Rejected]: 3,
      };
      const statusA = statusPriority[a.profile_status];
      const statusB = statusPriority[b.profile_status];
      if (statusA !== statusB) {
        return statusA - statusB;
      }
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [myVips]);

  return (
    <Box>
      {sortedVips.map((item) => {
        const link = item.profile_status === ProfileStatus.Pending ? `/agent-profile-builder?edit=true` : `/home`;
        const name = `${item.first_name} ${item.last_name}`;
        return (
          <MyVipCard
            vipId={String(item.vip_profile_id)}
            key={item.vip_profile_id}
            name={name}
            image={item.profile_image}
            link={link}
            instaFollowers={item.instagram_follower_count}
            tiktokFollowers={item.tiktok_follower_count}
            status={item.profile_status}
          />
        );
      })}
    </Box>
  );
};

export default MyVipsListing;
