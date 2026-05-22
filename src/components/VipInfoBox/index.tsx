import React, { useState } from 'react';
import { Box, IconButton, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DefaultImageFallback } from '@/helpers/enums';
import './VipInfoBox.scss';
import en from '@/helpers/lang';
import DialogConfirmBox from '../Dialog/DialogConfirm';
import { useRouter } from 'next/navigation';
import { paths, withSearchParams } from '@/helpers/paths';
import { createIncompleteVipIdCookie } from '@/libs/actions';

interface VipInfoBoxProps {
  image: string;
  name: string;
  instaFollowers?: string;
  tiktokFollowers?: string;
  isAgentCard?: boolean;
  is_referenced?: boolean;
  onDelete?: () => void;
  isIncomplete?: boolean;
  profileCompletionUrl?: string;
  vipId: string;
}

const VipInfoBox: React.FC<VipInfoBoxProps> = ({
  image,
  name,
  instaFollowers,
  tiktokFollowers,
  isAgentCard,
  is_referenced,
  onDelete,
  isIncomplete,
  profileCompletionUrl,
  vipId,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const router = useRouter();
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
    handleMenuClose();
  };

  const handleCompleteProfile = () => {
    const id = profileCompletionUrl?.split('/').at(-2);
    const token = profileCompletionUrl?.split('/').pop();
    if (profileCompletionUrl && token && id) {
      router.push(withSearchParams(() => paths.root.completeVipProfile.getHref(id, token), { agent: 'true' }));
    }
    handleMenuClose();
  };

  const handleEditProfile = async () => {
    await createIncompleteVipIdCookie(vipId);
    const editUrl = withSearchParams(() => paths.root.agentProfileBuilder.getHref(), { editVip: 'true' });
    router.push(editUrl);
    handleMenuClose();
  };

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleArrowClick = (e: React.MouseEvent<HTMLElement>) => {
    // open menu instead of direct navigation
    stopAllEvents(e);
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  const handleMenuDelete = (e: React.MouseEvent<HTMLElement>) => {
    stopAllEvents(e);
    handleMenuClose();
    onDeleteIconClick(e as React.MouseEvent);
  };

  const handleCopyProfileUrl = async (e: React.MouseEvent<HTMLElement>) => {
    stopAllEvents(e);
    handleMenuClose();
    if (profileCompletionUrl) {
      const profileLink = isIncomplete ? profileCompletionUrl : profileCompletionUrl + '?editVip=true';
      try {
        await navigator.clipboard.writeText(profileLink);
        const event = new CustomEvent('showToaster', {
          detail: { message: 'Profile URL copied to clipboard', type: 'success' },
        });
        window.dispatchEvent(event);
      } catch (error) {
        console.error('Failed to copy profile URL:', error);
        const event = new CustomEvent('showToaster', {
          detail: { message: 'Failed to copy profile URL', type: 'error' },
        });
        window.dispatchEvent(event);
      }
    }
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
        <MoreVertIcon className="arrowIcon" />
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
        {profileCompletionUrl && isIncomplete
          ? [
              <MenuItem key="complete-profile" onClick={handleCompleteProfile}>
                <ListItemIcon>
                  <Image src="/img/edit.png" width={18} height={18} alt="EditIcon" />
                </ListItemIcon>
                <ListItemText>Complete Profile</ListItemText>
              </MenuItem>,
            ]
          : !is_referenced
            ? [
                <MenuItem key="edit-profile" onClick={handleEditProfile}>
                  <ListItemIcon>
                    <Image src="/img/edit.png" width={18} height={18} alt="EditIcon" />
                  </ListItemIcon>
                  <ListItemText>Edit Profile</ListItemText>
                </MenuItem>,
              ]
            : []}
        {profileCompletionUrl && (
          <MenuItem key="copy-profile" onClick={handleCopyProfileUrl}>
            <ListItemIcon>
              <ContentCopyIcon fontSize="small" style={{ color: 'black' }} />
            </ListItemIcon>
            <ListItemText>Copy Profile URL</ListItemText>
          </MenuItem>
        )}
        <MenuItem key="delete" onClick={handleMenuDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" style={{ color: 'black' }} />
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
        description={`Are you sure you want to delete ${name} VIP?`}
        confirmText="Yes"
      />
    </Box>
  );
};

export default VipInfoBox;
