import React from 'react';
import { Dialog, DialogContent, Button, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { ProgressBarLink } from './ProgressBar';

interface VIPSuiteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  withLogo?: boolean;
  buttonsArray: { href?: string; text: string; onClick?: () => void }[];
  title?: string;
}

const VIPSuiteDialog: React.FC<VIPSuiteDialogProps> = ({ isOpen, onClose, withLogo, buttonsArray, title }) => {
  return (
    <Dialog className="site-dialog" open={isOpen} onClose={onClose}>
      <DialogContent className="site-dialog__inner">
        <Box>
          {withLogo && (
            <Box className="site-dialog__image">
              <Image
                alt="VipLogo"
                src="/Logo.svg"
                fill
                sizes="(max-width: 300px) 100vw, 300px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          )}
          {title && (
            <Typography align="center" className="site-dialog__title" variant="h3" component="h2">
              {title}
            </Typography>
          )}
          <Box my={3.5} width="100%">
            {buttonsArray.map((button, index) => (
              <Button
                fullWidth
                key={index}
                variant="contained"
                className="button  button--black"
                LinkComponent={ProgressBarLink}
                href={button.href}
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VIPSuiteDialog;
