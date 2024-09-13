'use client';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { ProgressBarLink } from './ProgressBar';

interface ReferCardProps {
  heading: string;
  text: string;
  href: string;
  isPdf: boolean;
}

const ReferCard: React.FC<ReferCardProps> = ({ heading, text, href, isPdf }) => {
  return isPdf ? (
    <a target="_blank" href={href} rel="noreferrer">
      <Card className="gray-card__item">
        <CardContent>
          <Typography variant="h2">{heading}</Typography>
          <Typography variant="body1">{text}</Typography>
          <EastIcon />
        </CardContent>
      </Card>
    </a>
  ) : (
    <ProgressBarLink href={href}>
      <Card className="gray-card__item">
        <CardContent>
          <Typography variant="h2">{heading}</Typography>
          <Typography variant="body1">{text}</Typography>
          <EastIcon />
        </CardContent>
      </Card>
    </ProgressBarLink>
  );
};

export default ReferCard;
