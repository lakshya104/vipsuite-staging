import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './CustomStepper.scss';

interface DynamicCustomStepperProps {
  sectionNumber: number;
  totalSteps: number;
  handleSectionChange: () => void;
}

const DynamicCustomStepper: React.FC<DynamicCustomStepperProps> = ({
  sectionNumber,
  totalSteps,
  handleSectionChange,
}) => {
  return (
    <Box className="custom-stepper">
      <IconButton disabled={sectionNumber === 0} onClick={() => sectionNumber > 0 && handleSectionChange()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="body1">
        {sectionNumber + 1} of {totalSteps}
      </Typography>
      <IconButton type="submit">
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default DynamicCustomStepper;
