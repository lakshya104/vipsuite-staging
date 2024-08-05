import * as React from 'react';
import { Card, CardContent, Typography, Grid, Box, Container } from '@mui/material';
import { opportunities } from '@/data';
import './Opportunity.scss';

const Opportunity = () => {
  return (
    <Box component="section" className="site-opportunity">
      <Container>
        <Typography component="h2" variant="h2">
          Opportunities
        </Typography>
        <Grid container alignItems="center" justifyContent="center" spacing={3}>
          {opportunities.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="site-opportunity__card">
                <CardContent className="site-opportunity__card-inner">
                  <Typography>{item.title}</Typography>
                  <Typography variant="body2">{item.time}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Opportunity;
