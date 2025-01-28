import React from 'react';
import { Box, Skeleton } from '@mui/material';
import '../../components/ComingSoon/comingsoon.scss';

const ComingSoonLoading = () => {
  return (
    <Box className="coming-soon__page" sx={{ p: 2 }}>
      <Skeleton
        variant="rectangular"
        height={55}
        sx={{
          backgroundColor: 'darkgray',
          mb: 2,
          width: { xs: '90%', sm: 700 },
        }}
      />
      <Skeleton
        variant="rectangular"
        height={30}
        sx={{
          backgroundColor: 'darkgray',
          mb: 2,
          width: { xs: '100%', sm: 500 },
        }}
      />
      <Box className="coming-soon__form" component="form">
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{
            backgroundColor: 'darkgray',
            mb: 2,
            width: { xs: '100%', sm: 600, borderRadius: 25 },
          }}
        />
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{
            backgroundColor: 'darkgray',
            borderRadius: 5,
            width: { xs: '50%', sm: 150 },
          }}
        />
      </Box>
    </Box>
  );
};

export default ComingSoonLoading;
