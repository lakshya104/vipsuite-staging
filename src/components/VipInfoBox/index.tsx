import React, { useState } from 'react';
import { Box, IconButton, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
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

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleArrowClick = (e: React.MouseEvent<HTMLElement>) => {
    // open menu instead of direct navigation
    stopAllEvents(e);
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  const handleMenuEdit = (e: React.MouseEvent<HTMLElement>) => {
    stopAllEvents(e);
    handleMenuClose();
    handleClick();
  };

  const handleMenuDelete = (e: React.MouseEvent<HTMLElement>) => {
    stopAllEvents(e);
    handleMenuClose();
    onDeleteIconClick(e as React.MouseEvent);
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

      {/* RIGHT ARROW ICON (opens menu) */}
      <IconButton
        aria-controls={menuAnchor ? 'vip-options-menu' : undefined}
        aria-haspopup="true"
        onClick={handleArrowClick}
      >
        <ArrowForwardIosIcon className="arrowIcon" />
      </IconButton>

      <Menu
        id="vip-options-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleMenuEdit} disabled={is_referenced}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

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
