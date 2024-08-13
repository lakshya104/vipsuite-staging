'use client';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';

interface ReferCardProps {
  heading: string;
  text: string;
  href: string;
}

const ReferCard: React.FC<ReferCardProps> = ({ heading, text, href }) => {
  return (
    <Card className="gray-card__item" sx={{ backgroundColor: ' #f0f0e5' }}>
      <CardContent>
        <Typography variant="h2">{heading}</Typography>
        <Typography variant="body1">{text}</Typography>
        <Link href={href}>
          <EastIcon />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ReferCard;
