import React from 'react';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { ProgressBarLink } from '../ProgressBar';
import { PageData } from '@/interfaces/public-page';
import { paths } from '@/helpers/paths';

interface PromoComponentProps {
  data: PageData | undefined;
}
const PromoComponent: React.FC<PromoComponentProps> = ({ data }) => {
  return (
    <Box className="content-module">
      <Grid2 container spacing={{ xs: 5, md: 12 }} alignItems="center">
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src="/img/join-us.png"
            alt="Join Us Illustration"
            className="joinus-section__image"
            sx={{
              width: '100%',
              borderRadius: 2,
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {data?.acf?.subhading}
          </Typography>
          <Typography variant="body1" paragraph>
            {data?.acf?.copy}
          </Typography>
          <ProgressBarLink href={paths.auth.onBoarding.getHref()}>
            <Button variant="contained" type="submit" className="joinbtn">
              {data?.acf?.cta?.cta_text}
            </Button>
          </ProgressBarLink>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PromoComponent;
