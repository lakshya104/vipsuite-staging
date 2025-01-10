import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './PublicJoinUs.scss';
import { ContentModule } from '@/interfaces/public-page';
import JoinUs from '../JoinUs';
import Link from 'next/link';
import { getLastPathSegment } from '@/helpers/utils';

interface JoinUsProps {
  data: ContentModule;
}

const PublicJoinUs: React.FC<JoinUsProps> = ({ data }) => {
  return (
    <>
      {data?.image?.url ? (
        <Box component="section" className="joinus-section joinus-section--home">
          <Container>
            <Grid container spacing={{ xs: 5, md: 12 }} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box
                  component="img"
                  alt="Join Us Illustration"
                  src={data?.image?.url}
                  className="joinus-section__image"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                  }}
                />
              </Grid>
              <Grid className="pl-129" item xs={12} md={5}>
                <Box mb={4}>
                  <Typography variant="h2" mb={2}>
                    {data?.heading}
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  {data.list_items?.map((item, index) => (
                    <Grid className="joinus-section__desc" item key={index} display="flex" alignItems="center" gap={2}>
                      <Box className="joinus-section__icon">
                        <StarOutlineIcon fontSize="large" />
                      </Box>
                      <Box>
                        <Typography variant="h6">{item?.heading}</Typography>
                        <Typography variant="body1">{item?.copy}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Box mt={4}>
                  <Link href={getLastPathSegment(data?.cta?.cta_url || '') || '/'} passHref>
                    <Button variant="outlined" className="button button--white">
                      {data?.cta?.cta_text || 'Find out more'}
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <JoinUs data={data} />
      )}
    </>
  );
};

export default PublicJoinUs;
