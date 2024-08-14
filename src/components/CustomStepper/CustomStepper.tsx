import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './CustomStepper.scss';

interface CustomStepperProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
}

const CustomStepper: React.FC<CustomStepperProps> = ({ currentStep, totalSteps, onPrev }) => {
  const onPrevious = () => {
    onPrev();
  };
  const disableBtn = currentStep === 1;
  return (
    <Box className="custom-stepper">
      <IconButton
        sx={{
          color: disableBtn ? 'gray' : 'black',
          opacity: disableBtn ? 0.3 : 1,
          pointerEvents: disableBtn ? 'none' : 'auto',
          '&:hover': {
            backgroundColor: disableBtn ? 'transparent' : '',
          },
        }}
        onClick={onPrevious}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="body1">
        {currentStep} of {totalSteps}
      </Typography>
      <IconButton type="submit">
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default CustomStepper;
