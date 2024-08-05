'use client';
import React from 'react';
import { Button, ButtonProps } from '@mui/material';

type LookType = 'dark-filled' | 'dark-outlined' | 'light';
type WidthType = '100%' | 'auto';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  look: LookType;
  width?: WidthType | undefined;
}

const getButtonStyles = (look: LookType, width: string = 'auto') => {
  const baseStyles = {
    borderRadius: '38px',
    padding: '10px 24px',
    textTransform: 'none',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    width: width,
  };

  const styles = {
    'dark-filled': {
      backgroundColor: '#1B1B1B',
      color: '#FFFFFF',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: '#333333',
      },
      '&:disabled': {
        backgroundColor: '#333333',
        color: '#666666',
      },
    },
    'dark-outlined': {
      backgroundColor: 'transparent',
      color: '#1B1B1B',
      border: '1px solid #1B1B1B',
      '&:hover': {
        backgroundColor: 'rgba(27, 27, 27, 0.1)',
      },
      '&:disabled': {
        borderColor: '#666666',
        color: '#666666',
      },
    },
    light: {
      backgroundColor: '#FFFFFF',
      color: '#1B1B1B',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: '#F5F5F5',
      },
      '&:disabled': {
        backgroundColor: '#E0E0E0',
        color: '#999999',
      },
    },
  };

  return { ...baseStyles, ...styles[look] };
};

const Btn: React.FC<CustomButtonProps> = ({ look, width, ...props }) => {
  const buttonStyles = getButtonStyles(look, width);
  const variant = look === 'dark-outlined' ? 'outlined' : 'contained';

  return <Button variant={variant} sx={buttonStyles} {...props} />;
};

export default Btn;
