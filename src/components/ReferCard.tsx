'use client';
import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';

const StyledCard = styled(Card)(() => ({
  //   maxWidth: '350px',
  width: 'full',
  minHeight: '111px',
  borderRadius: '8px 0px 0px 0px',
  backgroundColor: '#F0F0E5',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  padding: 0,
  margin: 0,
}));

const StyledLink = styled(Link)({
  position: 'absolute',
  bottom: '5%',
  right: '5%',
  color: 'inherit',
  textDecoration: 'none',
});

interface ReferCardProps {
  heading: string;
  text: string;
  href: string;
}

const ReferCard: React.FC<ReferCardProps> = ({ heading, text, href }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography sx={{ fontSize: '16px' }} gutterBottom>
          {heading}
        </Typography>
        <Typography sx={{ fontSize: '11px', color: '#767673' }}>{text}</Typography>
      </CardContent>
      <StyledLink href={href}>
        <EastIcon />
      </StyledLink>
    </StyledCard>
  );
};

export default ReferCard;
