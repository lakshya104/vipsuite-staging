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
  return (
    <Card className="gray-card__item">
      <CardContent>
        <Typography variant="h2">{heading}</Typography>
        <Typography variant="body1">{text}</Typography>
        {isPdf ? (
          <a target="_blank" href={href} rel="noreferrer">
            <EastIcon />
          </a>
        ) : (
          <ProgressBarLink href={href}>
            <EastIcon />
          </ProgressBarLink>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferCard;
