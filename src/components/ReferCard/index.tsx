'use client';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { ProgressBarLink } from '../ProgressBar';

interface ReferCardProps {
  heading: string;
  text: string;
  href: string;
  isPdf: boolean;
}

const ReferCard: React.FC<ReferCardProps> = ({ heading, text, href, isPdf }) => {
  return isPdf ? (
    <Card className="gray-card__item" sx={{ padding: 5 }}>
      <CardContent>
        <a target="_blank" href={href} rel="noreferrer">
          <Typography variant="h2">{heading}</Typography>
          <Typography variant="body1">{text}</Typography>
          <EastIcon />
        </a>
      </CardContent>
    </Card>
  ) : (
    <Card className="gray-card__item">
      <CardContent>
        <Typography variant="h2">{heading}</Typography>
        <Typography variant="body1">{text}</Typography>
        <ProgressBarLink href={href}></ProgressBarLink>
        <EastIcon />
      </CardContent>
    </Card>
  );
};

export default ReferCard;
