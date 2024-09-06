import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { benefits } from '@/data';
import './JoinUs.scss';

const JoinUs = () => {
  return (
    <Box component="section" className="joinus-section">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box className="joinus-section__head">
              <Typography variant="h2">Why Join Us?</Typography>
              <Button variant="outlined" className="button button--white">
                Join Today
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} className="joinus-section__content">
            <Grid container spacing={2.5} justifyContent={'space-between'}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={0} className="joinus-section__feature">
                    <Box className="joinus-section__icon">
                      <StarOutlineIcon />
                    </Box>
                    <Box>
                      <Typography variant="h3">{benefit.title}</Typography>
                      <Typography variant="body1">{benefit.description}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default JoinUs;
