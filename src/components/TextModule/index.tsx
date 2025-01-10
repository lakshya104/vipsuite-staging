'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Skeleton } from '@mui/material';
import { ContentModule } from '@/interfaces/public-page';
import { wrapInParagraph } from '@/helpers/utils';
import './TextModule.scss';

interface TextModuleProps {
  data: ContentModule;
}

const TextModule: React.FC<TextModuleProps> = ({ data }) => {
  const privacyPolicy = wrapInParagraph(data?.content || '');
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Box component="main" className="site-main terms-page">
      <Container>
        <Box className="terms-content">
          {isClient ? (
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: privacyPolicy || '' }} />
          ) : (
            <Box
              sx={{ gap: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
            >
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'darkgray', borderRadius: '12px', width: { xs: 300, sm: 600 } }}
                height={150}
              />
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'darkgray', borderRadius: '12px', width: { xs: 300, sm: 600 } }}
                height={150}
              />
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'darkgray', borderRadius: '12px', width: { xs: 300, sm: 600 } }}
                height={150}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TextModule;
