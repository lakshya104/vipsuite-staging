import React from 'react';
import { Box, Typography, Button, CardContent } from '@mui/material';

const OppotunityRSVP: React.FC = () => {
  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 600 }, margin: 'auto', px: { xs: 2, sm: 0 } }}>
      <CardContent>
        <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Barbie x Heinz
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Date:
          </Box>{' '}
          Wednesday 19th June @ 7pm
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Location:
          </Box>{' '}
          123 London Street, London, EC1 AAA
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, pb: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '50px',
              px: 15,
              py: 2,
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
          >
            RSVP
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pb: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '50px',
              px: 7,
              py: 2,
              border: '2px solid black',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            Not Available
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '50px',
              px: 7,
              py: 2,
              border: '2px solid black',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          >
            Not Interested
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
};

export default OppotunityRSVP;
