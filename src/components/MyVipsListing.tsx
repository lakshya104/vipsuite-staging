import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MyVipCard from './MyVipCard';
import { ProfileStatus } from '@/helpers/enums';
import { MyVips } from '@/interfaces';
import SignoutBtn from './SignoutBtn';
import { ProgressBarLink } from './ProgressBar';
import { isEmpty } from 'lodash';
import ErrorFallback from './ErrorFallback';
import en from '@/helpers/lang';

interface MyVipsListingProps {
  myVips: MyVips[];
  token: string;
}

const MyVipsListing: React.FC<MyVipsListingProps> = ({ myVips, token }) => {
  const sortedVips = [...myVips].sort((a, b) => {
    const statusPriority = {
      [ProfileStatus.Approved]: 1,
      [ProfileStatus.Pending]: 2,
      [ProfileStatus.Rejected]: 3,
    };
    const statusA = statusPriority[a?.profile_status];
    const statusB = statusPriority[b?.profile_status];

    if (statusA !== statusB) {
      return statusA - statusB;
    }
    const firstNameA = a?.first_name.toLowerCase();
    const firstNameB = b?.first_name.toLowerCase();
    if (firstNameA !== firstNameB) {
      return firstNameA.localeCompare(firstNameB);
    }
    const lastNameA = a?.last_name.toLowerCase();
    const lastNameB = b?.last_name.toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });

  return (
    <Box className="my-vips-page">
      <Container>
        <Box className="my-vips-page__head">
          <SignoutBtn token={token} />
          <Typography className="page-title" variant="h2" align="center">
            My VIPs
            <ProgressBarLink className="button button--black" href="/agent-profile-builder">
              Add <AddIcon />
            </ProgressBarLink>
          </Typography>
        </Box>
        <Box>
          {isEmpty(sortedVips) ? (
            <ErrorFallback
              errorMessage={en.listEmptyMessage.noVipListData}
              hideSubtext={true}
              subtext={en.listEmptyMessage.addItemMessage}
            />
          ) : (
            sortedVips.map((item) => {
              const link =
                item?.profile_status === ProfileStatus.Pending ? `/agent-profile-builder?edit=true` : `/home`;
              const name = `${item?.first_name} ${item?.last_name}`;
              return (
                <MyVipCard
                  token={token}
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
            })
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default MyVipsListing;
