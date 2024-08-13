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

  return (
    <Box className="custom-stepper">
      <IconButton onClick={onPrevious}>
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
