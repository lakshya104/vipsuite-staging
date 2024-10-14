import React from 'react';
import { cookies } from 'next/headers';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { GetVipWishlistItems, GetSession } from '@/libs/api-manager/manager';
import { Box } from '@mui/material';
import { WishlistItem } from '@/interfaces';
import WishlistItemCard from '@/components/WishListItemCard';
import { getVipId } from '@/helpers/utils';

const MyInterestsPage: React.FC = async () => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');

    const session = await GetSession();
    const { token, role } = session;

    const vipId = getVipId(role, userId, session);

    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }

    if (!token) {
      return <ErrorFallback errorMessage="Session token not found." />;
    }

    const vipWishListItems: WishlistItem[] = await GetVipWishlistItems(token, vipId);
    if (!vipWishListItems || vipWishListItems.length === 0) {
      return <ErrorFallback errorMessage="No Wishlisted items." hideSubtext={true} />;
    }

    return (
      <Box>
        {vipWishListItems.map((item) => {
          const link =
            item.post_type === 'brand-profile'
              ? `/brands/${item.id}`
              : item.post_type === 'event'
                ? `/events/${item.id}`
                : `/opportunities/${item.id}`;

          return (
            <WishlistItemCard
              key={item.id}
              title={item.post_title}
              image={item.image.url}
              link={link}
              date={item.event_start_date}
              location={item.event_location}
              type={item.post_type}
            />
          );
        })}
      </Box>
    );
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Wishlisted items not available at the moment." />;
  }
};

export default MyInterestsPage;
