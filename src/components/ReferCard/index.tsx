'use client';
import React, { useState } from 'react';
import { Box, Card, CardContent, Dialog, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReferVIPForm from '@/features/Refer-Vip';
import MakeRequest from '@/features/Make-Request';

interface ReferCardProps {
  heading: string;
  text: string;
  href?: string;
  type: 'lookbook' | 'refer' | 'make-request' | 'others';
  description?: string;
}

const ReferCard: React.FC<ReferCardProps> = ({ heading, text, href, type, description }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeDialog = () => {
    setIsOpen(false);
  };
  return type === 'lookbook' ? (
    <Card className="gray-card__item">
      <CardContent>
        <Typography variant="h2">{heading}</Typography>
        <Typography variant="body1">{text}</Typography>
        <a target="_blank" href={href} rel="noreferrer"></a>
        <EastIcon />
      </CardContent>
    </Card>
  ) : (
    <>
      <Card onClick={() => setIsOpen(true)} className="gray-card__item" sx={{ cursor: 'pointer' }}>
        <CardContent>
          <Typography variant="h2">{heading}</Typography>
          <Typography variant="body1">{text}</Typography>
          <EastIcon />
        </CardContent>
      </Card>
      <Dialog open={isOpen} fullScreen aria-labelledby="form-dialog-title">
        <Box position="relative">
          <ArrowBackIcon
            onClick={closeDialog}
            sx={{
              cursor: 'pointer',
              color: 'white',
              position: 'absolute',
              top: 25,
              left: 25,
            }}
          />
          {type === 'refer' ? (
            <ReferVIPForm description={description || text} closeDialog={closeDialog} />
          ) : (
            <MakeRequest description={description || text} title={heading} type={type} closeDialog={closeDialog} />
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default ReferCard;
