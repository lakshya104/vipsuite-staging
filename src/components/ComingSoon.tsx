import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { ProgressBarLink } from './ProgressBar';
import Btn from './Button/CommonBtn';

interface ComingSoonPageProps {
  page: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ page }) => {
  return (
    <Box
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textTransform: 'capitalize',
            color: 'black',
          }}
          gutterBottom
        >
          {page} is Coming Soon
        </Typography>
        <Typography
          variant="h5"
          paragraph
          sx={{
            color: 'black',
          }}
        >
          <span style={{ textTransform: 'capitalize' }}>{page}</span> page is on its way. Stay tuned!
        </Typography>
        <ProgressBarLink href="/home">
          <Btn look="dark-filled">Back to Home</Btn>
        </ProgressBarLink>
      </Container>
    </Box>
  );
};

export default ComingSoonPage;