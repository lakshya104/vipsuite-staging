import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DefaultImageFallback, ProfileStatus } from '@/helpers/enums';
import './VipInfoBox.scss';

interface VipInfoBoxProps {
  image: string;
  name: string;
  instaFollowers: number;
  tiktokFollowers: number;
  status: ProfileStatus;
  handleClick: () => void;
  // eslint-disable-next-line no-unused-vars
  handleEditProfile: (e: React.MouseEvent) => void;
}

const VipInfoBox: React.FC<VipInfoBoxProps> = ({
  image,
  name,
  instaFollowers,
  tiktokFollowers,
  status,
  handleClick,
  handleEditProfile,
}) => {
  const itemImage = image || DefaultImageFallback.personPlaceholder;
  const isDisabled = status === ProfileStatus.Rejected;

  return (
    <Box className={`vipInfoBox ${isDisabled ? 'disabled' : ''}`} onClick={() => handleClick()}>
      <Box className="imageContainer">
        <Image src={itemImage} width={100} height={100} alt={name} className="profileImage" />
        <Box className="info">
          <Box className="editProfileContainer">
            <Typography variant="body1" className="name">
              {name}
            </Typography>
            {status === ProfileStatus.Pending && (
              <EditOutlinedIcon className="editProfile" onClick={handleEditProfile} />
            )}
          </Box>
          <Typography variant="body2" className="socialFollowers">
            <Image
              src="/img/instagram.svg"
              width={10}
              height={10}
              alt={name}
              style={{ width: 18, height: 18, marginRight: 10 }}
            />
            {instaFollowers || 0}
          </Typography>
          <Typography variant="body2" className="socialFollowers">
            <Image
              src="/img/tiktok.svg"
              width={10}
              height={10}
              alt={name}
              style={{ width: 18, height: 18, marginRight: 10 }}
            />
            {tiktokFollowers || 0}
          </Typography>
          <Box className="statusContainer">
            <Typography variant="body1" className="status">
              Status: {status}
            </Typography>
          </Box>
        </Box>
      </Box>
      <IconButton>
        <ArrowForwardIosIcon className="arrowIcon" />
      </IconButton>
    </Box>
  );
};

export default VipInfoBox;