import { Box, Typography } from '@mui/material';
import React from 'react';

interface DynamicQuestionTitleProps {
  title: string;
  isRequired: boolean;
}

const DynamicQuestionTitle: React.FC<DynamicQuestionTitleProps> = ({ title, isRequired }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Typography className="site-dialog__title" variant="body1">
        {title}
      </Typography>
      {isRequired && (
        <span
          style={{
            color: 'red',
            position: 'absolute',
            top: 0,
            right: -10,
          }}
        >
          *
        </span>
      )}
    </Box>
  );
};

export default DynamicQuestionTitle;
