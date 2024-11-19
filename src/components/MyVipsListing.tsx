'use client';
import React, { useMemo } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MyVipCard from './MyVipCard';
import { ProfileStatus } from '@/helpers/enums';
import { MyVips } from '@/interfaces';
import SignoutBtn from './SignoutBtn';
import { ProgressBarLink } from './ProgressBar';

interface MyVipsListingProps {
  myVips: MyVips[];
  token: string;
}

const MyVipsListing: React.FC<MyVipsListingProps> = ({ myVips, token }) => {
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
    <Box className="my-vips-page">
      <Container>
        <Box className="my-vips-page__head">
          <SignoutBtn />
          <Typography className="page-title" variant="h2" align="center">
            My VIPs
            <ProgressBarLink className="button button--black" href="/agent-profile-builder">
              Add <AddIcon />
            </ProgressBarLink>
          </Typography>
        </Box>
        <Box>
          {sortedVips.map((item) => {
            const link = item.profile_status === ProfileStatus.Pending ? `/agent-profile-builder?edit=true` : `/home`;
            const name = `${item.first_name} ${item.last_name}`;
            return (
              <MyVipCard
                token={token}
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
      </Container>
    </Box>
  );
};

export default MyVipsListing;
