import { Card, CardContent, Typography, Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Item {
  name: string;
  logo: string;
  title: string;
  testimonial: string;
}

interface StyledCardProps {
  item: Item;
}

const StyledCard: React.FC<StyledCardProps> = ({ item }) => {
  return (
    <Card
      sx={{
        width: { sm: '350px', md: '412px' },
        height: { sm: '350px', md: '412px' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 2,
        padding: 2,
        textAlign: 'center',
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        background: '#EBEBE3',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 2,
        }}
      >
        <Image src="/Logo.png" alt={item.name} height={100} width={100} />
      </Box>
      <CardContent>
        <Typography variant="h6" component="div">
          {item.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {item.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.testimonial}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StyledCard;
