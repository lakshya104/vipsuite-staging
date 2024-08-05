'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import RSVP from '../RSVP';

const EventDetails = () => {
  const [liked, setLiked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmationOpen = () => {
    setDialogOpen(false);
    setConfirmationOpen(true);
  };
  const handleConfirmationClose = () => setConfirmationOpen(false);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        overflowX: 'hidden',
        px: { xs: 2, sm: 0 },
        mx: 'auto',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: '1200px' }}>
        <Box sx={{ position: 'relative', width: '100%', mt: { xs: '60px', sm: '0px' } }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: '350px', sm: '400px' },
              overflow: 'hidden',
              borderRadius: { xs: 1, sm: 0 },
            }}
          >
            <Image src="/img/maldives.png" alt="LEGOLAND Woodland Village" fill style={{ objectFit: 'cover' }} />
          </Box>
          <Box sx={{ position: 'absolute', top: 8, right: 8 }} onClick={handleLike}>
            {liked ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: 'white' }} />}
          </Box>
        </Box>
        <CardContent sx={{ px: { xs: 2, sm: 5 } }}>
          <Typography variant="h6" component="h1" gutterBottom sx={{ color: '#494947' }}>
            Lego
          </Typography>
          <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            LEGOLAND Woodland Village
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              Date:
            </Box>{' '}
            Saturday 18th - Sunday 19th May
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              Location:
            </Box>{' '}
            LEGOLAND Windsor Resort, Winkfield Road, Windsor, Berkshire, SL4 4AY
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1B1B1B' }}>
            Quick Overview
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
            You and your family are invited to celebrate the grand opening of LEGOLAND Windsor Resort brand-new
            accommodation, LEGOLAND Woodland Village.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1B1B1B' }}>
            Details
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
            You and your family will enjoy a tranquil family stay on the Saturday night, you will relax and unwind from
            your jam-packed day on park in your very own woodland retreat and make tree-mendous memories. On the
            Saturday evening, youll all enjoy a delicious campfire inspired dining experience at The Clubhouse
            Restaurant and Bar, along with breakfast on Sunday morning.
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
            Not only this, but youll all have access to the park on Saturday & Sunday so you can enjoy over 55 rides and
            attractions, including the brand new Minifigure Speedway (suitable for those 105cm+ tall). You can also
            swing over to the new LEGOLAND Adventure Golf on Sunday morning for a mini golf experience like no other. We
            can book you in between 9am-10:30am.
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
            Please note: There will be photographers at the event to take your photos, which will be seeded to press
            after the event, along with filming.
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
            @legolandwindsor #LEGOLANDWoodlandVillage #LEGO #LEGOLANDWindsor #Ad/Press Invite @RunRaggedUK
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
            We would love to welcome you to the LEGOLAND Woodland Village - where you will have a fantastic day out with
            your family. But space is limited so do let me know ASAP if you can make it.
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, pb: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '50px',
            px: 15,
            py: 2,
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          onClick={handleDialogOpen}
        >
          RSVP
        </Button>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <RSVP onClose={handleDialogClose} onConfirmation={handleConfirmationOpen} />
        </DialogContent>
      </Dialog>
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogContent>
          <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1B1B1B' }}>
            RSVP Confirmed!
          </Typography>
          <Typography variant="body1" paragraph>
            Please check your email for your event confirmation and details. If you have any additional questions,
            please contact one of the team on info@thevipsuite.co.uk
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleConfirmationClose}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '50px',
              px: 12,
              py: 2,
              border: '2px solid black',
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
          >
            Back to All Events
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EventDetails;
