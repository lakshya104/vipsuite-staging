import React from 'react';
import Typography from '@mui/material/Typography';

const OfferComponent = () => {
  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        Hi Barbie!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Its here! Heinz have finally succumbed to public demand, and are officially releasing a condiment sought after
        by fans since they teased the idea when Barbie The Movie hit cinemas last summer.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
        Heinz and Mattel are now bringing this dreamy BARBIECUE sauce to life, and it’s just in time to celebrate.
      </Typography>
    </>
  );
};

export default OfferComponent;
