'use client';
import React from 'react';
import { Box } from '@mui/material';
import { wrapInParagraph } from '@/helpers/utils';

interface ShowHtmlProps {
  text: string;
}

const ShowHtml: React.FC<ShowHtmlProps> = ({ text }) => {
  const content = wrapInParagraph(text);
  return (
    <Box
      sx={{
        iframe: {
          width: '100%',
          aspectRatio: '16/9',
          border: 0,
          my: 2,
        },
        video: {
          maxWidth: '100%',
          height: 'auto',
        },
        p: {
          marginBottom: 2,
        },
        a: {
          color: 'blue',
          textDecoration: 'underline',
        },
      }}
      dangerouslySetInnerHTML={{ __html: content || '' }}
    />
  );
};

export default ShowHtml;
