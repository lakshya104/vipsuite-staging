'use client';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';

interface ReferCardProps {
  heading: string;
  text: string;
  href: string;
}

const ReferCard: React.FC<ReferCardProps> = ({ heading, text, href }) => {
  return (
    <Card className="gray-card__item">
      <CardContent>
        <Typography variant="h2">{heading}</Typography>
        <Typography variant="body1">{text}</Typography>
        <a target="_blank" href={href} rel="noreferrer">
          <EastIcon />
        </a>
      </CardContent>
    </Card>
  );
};

export default ReferCard;
