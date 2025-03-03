import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DefaultImageFallback } from '@/helpers/enums';
import './VipInfoBox.scss';

interface VipInfoBoxProps {
  image: string;
  name: string;
  instaFollowers?: string;
  tiktokFollowers?: string;
  handleClick: () => void;
  isAgentCard?: boolean;
}

const VipInfoBox: React.FC<VipInfoBoxProps> = ({
  image,
  name,
  instaFollowers,
  tiktokFollowers,
  handleClick,
  isAgentCard,
}) => {
  const itemImage = image || DefaultImageFallback.PersonPlaceholder;

  return (
    <Box className={`vipInfoBox`} onClick={() => handleClick()}>
      <Box className="imageContainer">
        <Image src={itemImage} width={100} height={100} alt={name} className="profileImage" />
        <Box className="info">
          <Box className="editProfileContainer">
            <Typography variant="body1" className="name" gutterBottom>
              {name}
            </Typography>
          </Box>
          {!isAgentCard && (
            <Typography variant="body2" className="socialFollowers">
              <Image
                src="/img/instagram.svg"
                width={10}
                height={10}
                alt={name}
                style={{ width: 18, height: 18, marginRight: 10 }}
              />
              {instaFollowers || 'NA'}
            </Typography>
          )}
          {!isAgentCard && (
            <Typography variant="body2" className="socialFollowers">
              <Image
                src="/img/tiktok.svg"
                width={10}
                height={10}
                alt={name}
                style={{ width: 18, height: 18, marginRight: 10 }}
              />
              {tiktokFollowers || 'NA'}
            </Typography>
          )}
        </Box>
      </Box>
      <IconButton>
        <ArrowForwardIosIcon className="arrowIcon" />
      </IconButton>
    </Box>
  );
};

export default VipInfoBox;
