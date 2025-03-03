'use client';
import React, { useState } from 'react';
import { Backdrop, Box, CircularProgress, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import MyVipCard from './MyVipCard';
import { MyVips } from '@/interfaces';
import { ProgressBarLink } from './ProgressBar';
import { isEmpty } from 'lodash';
import ErrorFallback from './ErrorFallback';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';
import VipInfoBox from './VipInfoBox';
import { DefaultImageFallback } from '@/helpers/enums';
import { createIsAgentCookie, createVipIdCookie } from '@/libs/actions';

interface MyVipsListingProps {
  myVips: MyVips[];
  token: string;
  agentId: number;
  agentName: string;
}

const MyVipsListing: React.FC<MyVipsListingProps> = ({ myVips, token, agentId, agentName }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
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
            const link = paths.root.home.getHref();
            const name = `${item?.first_name} ${item?.last_name}`;
            return (
              <MyVipCard
                token={token}
                vipId={String(item?.profile_id)}
                key={item?.profile_id}
                name={name}
                image={item?.profile_image}
                link={link}
                instaFollowers={item?.instagram_follower_count}
                tiktokFollowers={item?.tiktok_follower_count}
              />
            );
          })}
        </Box>
      );
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await createIsAgentCookie('true');
      await createVipIdCookie(agentId.toString());
      router.push(paths.root.home.getHref());
    } catch (error) {
      console.error(en.myVipsPage.addError, error);
      setLoading(false);
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
        <VipInfoBox
          image={DefaultImageFallback.PersonPlaceholder}
          name={`Me (${agentName})`}
          handleClick={handleClick}
          isAgentCard={true}
        />
        {renderVips()}
      </Container>
      <Backdrop sx={{ color: 'white', zIndex: 10000 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default MyVipsListing;
