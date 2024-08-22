import React from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import './opportunities.scss';
import FeedLikeIcon from '@/components/FeedLikeIcon';
import { ProgressBarLink } from '@/components/ProgressBar';

export default async function Page() {
  return (
    <>
      <Box className="opportunities">
        <Container>
          <Typography className="page-title" variant="h2" align="center">
            Opportunities
          </Typography>
          <Card
            className="opportunities-card__item-inner"
            sx={{
              backgroundImage: `url(https://s3-alpha-sig.figma.com/img/6646/4e1a/abe0541fd90e62a1c07e42e810e3db3c?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INGpYFj5hK3kG8w4VKy3FvoxNpW1cR5ezfAC6dlpK68powjRhlUM8jFP25ETNeOm~lzOfLj6~a-hfj2u40g-NGM8aP65OJC90YslwpN3XErEy47~A-YuUAArvAR2YRpp75ksWWbC54EuWTslQ-W1r-XlvZJSpLGLVVtyHKkJRP9g2VQq0-UizSWiG4E5ThaRB-lG2GHK12tGTacVjlftHnMm6j3ayMKvKlCK7bsjf5WrpbhZDZkCTJxXYpR-NhLBjBMmSbjjOXMegvxJCRuBLSMPic7Ck66pQC-SA6OUD~XZIMq5T54FiQ~D6YVA4Sqhc6rgPqkYEEBQiO2~vvuqog__)`,
            }}
          >
            <Typography
              variant="overline"
              sx={{ backgroundColor: 'white', padding: '5px 10px', borderRadius: '3px', margin: 1, fontWeight: '500' }}
              gutterBottom
            >
              VIP Clup
            </Typography>
            <FeedLikeIcon />
            <ProgressBarLink href={`/`}>
              <CardContent className="opportunities-card__item-content">
                <Typography variant="h2">Barbie x Heinz</Typography>
                <Typography variant="body2">Food & Beverage | Film | TV</Typography>
              </CardContent>
            </ProgressBarLink>
          </Card>
        </Container>
      </Box>
    </>
  );
}
