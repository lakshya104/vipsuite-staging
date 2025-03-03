import React from 'react';
import { Box, Typography, Button, Grid2, Paper, Container } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './JoinUs.scss';
import { ProgressBarLink } from '../ProgressBar';
import { ContentModule } from '@/interfaces/public-page';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface JoinUsProps {
  data: ContentModule;
}
const JoinUs: React.FC<JoinUsProps> = ({ data }) => {
  return (
    <Box component="section" className="joinus-section joinus-section--dark">
      <Container>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Box className="joinus-section__head">
              <Typography variant="h2">{data?.heading}</Typography>
              <ProgressBarLink href={paths.auth.onBoarding.getHref()}>
                <Button variant="outlined" className="button button--white">
                  {data?.cta?.cta_text || en.joinUs.findOut}
                </Button>
              </ProgressBarLink>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8 }} className="joinus-section__content">
            <Grid2 container spacing={2.5} justifyContent={'space-between'}>
              {data.list_items?.map((item, index) => (
                <Grid2 size={{ xs: 12, md: 6 }} key={index} className="joinus-section__items">
                  <Paper elevation={0} className="joinus-section__feature">
                    <Box className="joinus-section__icon">
                      <StarOutlineIcon />
                    </Box>
                    <Box>
                      <Typography variant="h3">{item?.heading}</Typography>
                      <Typography variant="body1">{item?.copy}</Typography>
                    </Box>
                  </Paper>
                </Grid2>
              ))}
              <Button variant="outlined" className="joinus-section__button button button--white">
                {data?.cta?.cta_text || en.joinUs.findOut}
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default JoinUs;
