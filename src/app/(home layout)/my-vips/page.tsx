import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import { ProgressBarLink } from '@/components/ProgressBar';
import AddIcon from '@mui/icons-material/Add';
import './my-vips.scss';

export default function Page() {
  const vipList = [
    {
      id: 1,
      name: 'Sarah Jacobs',
      image: '/img/aiavatar.png',
      instaFollowers: '50k',
      tiktokFollowers: '100k',
    },
    {
      id: 2,
      name: 'Tim Fields',
      image: '/img/aiavatar.png',
      instaFollowers: '57k',
      tiktokFollowers: '40k',
    },
    {
      id: 3,
      name: 'Aaron Finau',
      image: '/img/aiavatar.png',
      instaFollowers: '39k',
      tiktokFollowers: '45k',
    },
    {
      id: 4,
      name: 'Nelly Hull',
      image: '/img/aiavatar.png',
      instaFollowers: '78k',
      tiktokFollowers: '12k',
    },
  ];
  return (
    <Box className="my-vips-page">
      <Container>
        <Box className="my-vips-page__head">
          <Typography className="page-title" variant="h2" align="center">
            My VIPs
            <ProgressBarLink className="button button--black" href="/agent-profile-builder">
              Add <AddIcon />
            </ProgressBarLink>
          </Typography>
        </Box>
        <Box>
          {vipList.map((item) => {
            const link = '/';
            return (
              <MyVipCard
                key={item.id}
                name={item.name}
                image={item.image}
                link={link}
                instaFollowers={item.instaFollowers}
                tiktokFollowers={item.tiktokFollowers}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

interface MyVipCardProps {
  image: string;
  name: string;
  instaFollowers: string;
  tiktokFollowers: string;
  link: string;
}

const MyVipCard: React.FC<MyVipCardProps> = ({ image, name, instaFollowers, tiktokFollowers, link }) => {
  const itemImage = image || '/img/placeholder-image.jpg';

  return (
    <ProgressBarLink href={link}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          borderBottom: '1px solid #e0e0e0',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={itemImage}
            width={100}
            height={100}
            alt={name}
            style={{ width: 80, height: 80, marginRight: 2, borderRadius: '50px', margin: '0 20px 0 0' }}
          />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Image
                src="/img/instagram.svg"
                width={10}
                height={10}
                alt={name}
                style={{ width: 18, height: 18, marginRight: 10 }}
              />
              {instaFollowers}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Image
                src="/img/tiktok.svg"
                width={10}
                height={10}
                alt={name}
                style={{ width: 18, height: 18, marginRight: 10 }}
              />
              {tiktokFollowers}
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <ArrowForwardIosIcon color="primary" />
        </IconButton>
      </Box>
    </ProgressBarLink>
  );
};
