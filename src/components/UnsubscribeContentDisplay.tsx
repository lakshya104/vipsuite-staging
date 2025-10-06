import { Typography } from '@mui/material';
import { map } from 'lodash';
import React from 'react';

export interface ContentConfig {
  icon: React.ReactNode;
  title: string;
  descriptions: string[];
}

const ContentDisplay: React.FC<ContentConfig> = ({ icon, title, descriptions }) => (
  <>
    {icon}
    <Typography sx={{ fontSize: '32px', fontWeight: '600', color: '#1a1a1a', mb: 1.5 }}>{title}</Typography>
    {map(descriptions, (desc, index) => (
      <Typography
        key={index}
        sx={{
          fontSize: '14px',
          color: '#999',
          lineHeight: 1.6,
          mb: 1,
        }}
      >
        {desc}
      </Typography>
    ))}
  </>
);

export default ContentDisplay;
