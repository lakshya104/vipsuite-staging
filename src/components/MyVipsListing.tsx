'use client';
import React, { useState } from 'react';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { removeFromVipList } from '@/libs/api-manager/manager';
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
  const [vips, setVips] = useState<MyVips[]>(myVips || []);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const handleRemove = async (vipId: string) => {
    try {
      setDeletingIds((prev) => [...prev, String(vipId)]);
      const res = await removeFromVipList(vipId);
      setToasterType('success');
      openToaster(res?.message || 'VIP removed successfully');
      // remove from local state
      setVips((prev) => prev.filter((v) => String(v?.profile_id) !== String(vipId)));
    } catch (err) {
      console.error('Error removing VIP:', err);
      setToasterType('error');
      const msg = (err as unknown as { message?: string })?.message || 'Failed to remove VIP.';
      openToaster(msg);
    } finally {
      setDeletingIds((prev) => prev.filter((id) => id !== String(vipId)));
    }
  };

  const renderVips = () => {
    if (isEmpty(vips) || !Array.isArray(vips)) {
      return (
        <ErrorFallback
          errorMessage={en.listEmptyMessage.noVipListData}
          hideSubtext={true}
          subtext={en.listEmptyMessage.addVipMessage}
        />
      );
    } else {
      const sortedVips = [...vips].sort((a, b) => {
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
                isIncomplete={item?.is_profile_completed === 0}
                onDelete={() => handleRemove(String(item?.profile_id))}
                isDeleting={deletingIds.includes(String(item?.profile_id))}
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
        <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
      </Container>
    </Box>
  );
};

export default MyVipsListing;
