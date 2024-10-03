import React from 'react';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorFallback from '@/components/ErrorFallback';
import { GetVipWishlistItems } from '@/libs/api-manager/manager';
import { Box } from '@mui/material';
import { WishlistItem } from '@/interfaces';
import WishlistItemCard from '@/components/WishListItemCard';

const MyInterestsPage = async () => {
  try {
    const vipWishListItems: WishlistItem[] = await GetVipWishlistItems();
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
