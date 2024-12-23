// import React from 'react';
// import { Box } from '@mui/material';
// import { isEmpty } from 'lodash';
// import ErrorFallback from '@/components/ErrorFallback';
// import { GetVipWishlistItems } from '@/libs/api-manager/manager';
// import { WishlistItem } from '@/interfaces';
// import WishlistItemCard from '@/components/WishListItemCard';

// const MyInterestsPage: React.FC = async () => {
//   const vipWishListItems: WishlistItem[] = await GetVipWishlistItems();
//   if (!vipWishListItems || isEmpty(vipWishListItems)) {
//     return <ErrorFallback errorMessage="No Wishlisted items." hideSubtext={true} />;
//   }
//   return (
//     <Box>
//       {vipWishListItems.map((item) => {
//         const link =
//           item.post_type === 'brand-profile'
//             ? `/brands/${item.id}`
//             : item.post_type === 'event'
//               ? `/events/${item.id}`
//               : `/opportunities/${item.id}`;
//         return (
//           <WishlistItemCard
//             key={item.id}
//             title={item.post_title}
//             image={item.image.url}
//             link={link}
//             date={item.event_start_date}
//             location={item.event_location}
//             type={item.post_type}
//           />
//         );
//       })}
//     </Box>
//   );
// };

// export default MyInterestsPage;
