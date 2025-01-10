import React from 'react';
import { Box, MenuItem, MenuList, Skeleton } from '@mui/material';

const HeaderSkeleton = () => {
  return (
    <Box>
      <MenuList className="site-header__navigation">
        <MenuItem>
          <Skeleton sx={{ backgroundColor: 'darkgray' }} variant="text" width={80} height={40} />
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default HeaderSkeleton;
