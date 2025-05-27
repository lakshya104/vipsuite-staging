'use client';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MyVipCard from './MyVipCard';
import { MyVips } from '@/interfaces';
import { ProgressBarLink } from './ProgressBar';
import { isEmpty } from 'lodash';
import ErrorFallback from './ErrorFallback';
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';

interface MyVipsListingProps {
  myVips: MyVips[];
}

const MyVipsListing: React.FC<MyVipsListingProps> = ({ myVips }) => {
  const renderVips = () => {
    if (isEmpty(myVips) || !Array.isArray(myVips)) {
      return (
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noVipListData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.addVipMessage}
        />
      );
    } else {
      const sortedVips = [...myVips].sort((a, b) => {
        if (!a?.first_name && !a?.last_name) return 1;
        if (!b?.first_name && !b?.last_name) return -1;

        const firstNameA = a?.first_name?.toLowerCase() || '';
        const firstNameB = b?.first_name?.toLowerCase() || '';
        if (firstNameA !== firstNameB) {
          return firstNameA.localeCompare(firstNameB);
        }
        const lastNameA = a?.last_name?.toLowerCase() || '';
        const lastNameB = b?.last_name?.toLowerCase() || '';
        return lastNameA.localeCompare(lastNameB);
      });

      return (
        <Box>
          {sortedVips.map((item) => {
            const link = withSearchParams(() => paths.root.agentProfileBuilder.getHref(), {
              edit: 'true',
            });
            const name = `${item?.first_name} ${item?.last_name}`;
            return (
              <MyVipCard
                vipId={String(item?.profile_id)}
                key={item?.profile_id}
                name={name}
                image={item?.profile_image}
                link={link}
                instaFollowers={item?.instagram_follower_count}
                tiktokFollowers={item?.tiktok_follower_count}
                is_referenced={item?.referenced}
              />
            );
          })}
        </Box>
      );
    }
  };

  return (
    <Box className="my-vips-page">
      <Container>
        <Box className="my-vips-page__head">
          <ProgressBarLink className="button button--black" href={paths.root.agentProfileBuilder.getHref()}>
            {en.myVipsPage.addText}
            <AddIcon />
          </ProgressBarLink>
          <Typography variant="h2" align="center">
            {en.myVipsPage.pageTitle}
          </Typography>
        </Box>
        {renderVips()}
      </Container>
    </Box>
  );
};

export default MyVipsListing;
