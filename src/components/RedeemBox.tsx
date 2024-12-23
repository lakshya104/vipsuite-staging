'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Skeleton } from '@mui/material';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import { GetOffers } from '@/libs/api-manager/manager';
import { Offer } from '@/interfaces/opportunitiesDetails';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';

const RedeemBox = () => {
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({});
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offersLoading, setOffersLoading] = useState<boolean>(true);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setOffersLoading(true);
        const response: Offer[] = await GetOffers();
        setOffers(response);
      } catch (err) {
        console.error('Error fetching offers:', err);
        openToaster('An error occurred while fetching offers. Please try again later.');
      } finally {
        setOffersLoading(false);
      }
    };
    fetchOffers();
  }, [openToaster]);

  const toggleVisibility = (id: number) => {
    setVisibleItems((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const copyToClipboard = (id: number, code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess((prevState) => ({
        ...prevState,
        [id]: true,
      }));
      setTimeout(() => {
        setCopySuccess((prevState) => ({
          ...prevState,
          [id]: false,
        }));
      }, 2000);
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} p={2} mb={4} borderRadius={2} bgcolor="#F0F0E5">
      <Typography variant="h2" fontWeight={500} gutterBottom>
        Coupons and Offers
      </Typography>
      {offersLoading ? (
        <>
          <Skeleton variant="text" width="100%" height={150} />
          <Skeleton variant="text" width="100%" height={150} />
        </>
      ) : isEmpty(offers) ? (
        <Typography>Currently, no coupons are available, but new ones may be introduced soon</Typography>
      ) : (
        offers.map((coupon) => (
          <Card
            key={coupon.id}
            variant="outlined"
            sx={{ borderRadius: '16px', boxShadow: 'none', backgroundColor: '#FFFFF7' }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={500}>
                {coupon?.title?.rendered}
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                {coupon?.acf?.description}
              </Typography>
              {coupon?.acf?.type === 'coupon' && coupon?.acf?.coupon_code ? (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={1.5}
                  sx={{ backgroundColor: '#F0F0E5', borderRadius: '8px' }}
                >
                  <Typography variant="body1" fontWeight={600}>
                    {visibleItems[coupon.id] ? coupon?.acf?.coupon_code : 'XXXXXX'}
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() =>
                      visibleItems[coupon.id]
                        ? copyToClipboard(coupon.id, coupon?.acf?.coupon_code)
                        : toggleVisibility(coupon.id)
                    }
                    sx={{ textTransform: 'none', color: '#000' }}
                  >
                    {visibleItems[coupon.id] ? (copySuccess[coupon.id] ? 'Copied!' : 'Copy') : 'Show'}
                  </Button>
                </Box>
              ) : (
                coupon?.acf?.qr_code_image?.url &&
                (visibleItems[coupon.id] ? (
                  <Box display="flex" justifyContent="center" p={1.5}>
                    <Image
                      src={coupon?.acf?.qr_code_image.url}
                      alt={`${coupon.title} QR Code`}
                      width={250}
                      height={250}
                      style={{ borderRadius: '8px' }}
                    />
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={1.5}
                    sx={{ backgroundColor: '#F0F0E5', borderRadius: '8px' }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      XXXXXX
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => toggleVisibility(coupon.id)}
                      sx={{ textTransform: 'none', color: '#000' }}
                    >
                      Show
                    </Button>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        ))
      )}
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default RedeemBox;
