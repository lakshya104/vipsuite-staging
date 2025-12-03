import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { DefaultImageFallback } from '@/helpers/enums';
import './VipInfoBox.scss';
import en from '@/helpers/lang';
import DialogConfirmBox from '../Dialog/DialogConfirm';

interface VipInfoBoxProps {
  image: string;
  name: string;
  instaFollowers?: string;
  tiktokFollowers?: string;
  handleClick: () => void;
  isAgentCard?: boolean;
  is_referenced?: boolean;
  onDelete?: () => void;
  isIncomplete?: boolean;
}

const VipInfoBox: React.FC<VipInfoBoxProps> = ({
  image,
  name,
  instaFollowers,
  tiktokFollowers,
  handleClick,
  isAgentCard,
  is_referenced,
  onDelete,
  isIncomplete,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const itemImage = image || DefaultImageFallback.PersonPlaceholder;

  /** Fully stops event bubbling to prevent navigation */
  const stopAllEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation?.();
  };

  const onDeleteIconClick = (e: React.MouseEvent) => {
    stopAllEvents(e);
    if (onDelete) {
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (onDelete) onDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <Box
      className="vipInfoBox"
      sx={{
        opacity: is_referenced ? 0.5 : 1,
      }}
    >
      <Box className="imageContainer">
        <Image src={itemImage} width={100} height={100} alt={name} className="profileImage" />

        <Box className="info">
          {/* NAME + DELETE ICON */}
          <Box className="editProfileContainer" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" className="name">
                {name} {is_referenced && '(Referenced Profile)'}
              </Typography>

              {onDelete && (
                <IconButton
                  size="small"
                  aria-label={`delete ${name}`}
                  onClick={onDeleteIconClick}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            {isIncomplete && (
              <Typography variant="subtitle1" fontSize={12} color="#635656">
                {en.myVipsPage.profileIncomplete}
              </Typography>
            )}
          </Box>

          {/* SOCIAL FOLLOWERS */}
          {!isAgentCard && (
            <>
              <Typography variant="body2" className="socialFollowers">
                <Image src="/img/instagram.svg" width={18} height={18} alt="Instagram" style={{ marginRight: 10 }} />
                {instaFollowers || 'NA'}
              </Typography>

              <Typography variant="body2" className="socialFollowers">
                <Image src="/img/tiktok.svg" width={18} height={18} alt="TikTok" style={{ marginRight: 10 }} />
                {tiktokFollowers || 'NA'}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* RIGHT ARROW ICON */}
      <IconButton onClick={is_referenced ? undefined : handleClick}>
        <ArrowForwardIosIcon className="arrowIcon" />
      </IconButton>

      {/* CONFIRM DELETE DIALOG */}
      <DialogConfirmBox
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete VIP"
        description={`Are you sure you want to delete ${name}?`}
        confirmText="Delete"
      />
    </Box>
  );
};

export default VipInfoBox;
