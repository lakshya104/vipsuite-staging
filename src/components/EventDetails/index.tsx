'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import Image from 'next/image';
import he from 'he';
import { EventDetails } from '@/interfaces/events';
import EventsDialog from '../EventDialog';
import './EventDetails.scss';
import { DefaultImageFallback, UserRole } from '@/helpers/enums';
import ArrowBackBtn from '../ArrowBackBtn';
import ReferCard from '../ReferCard';
import RequestItemFormButton from '../RequestItemFormButton';
import RedeemBox from '../RedeemBox';
import en from '@/helpers/lang';
import ShowHtml from '../ShowHtml';
import { GetAllVips } from '@/libs/api-manager/manager';
import { VipApiResponse, VipOptions } from '@/interfaces';

interface EventDetailsCardProps {
  event: EventDetails;
  userRole: UserRole;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event, userRole }) => {
  const [vipOptions, setVipOptions] = useState<VipOptions[]>([]);
  const isUserAgent = userRole === UserRole.Agent;
  const [vipsLoading, setVipsLoading] = useState<boolean>(isUserAgent ? true : false);

  useEffect(() => {
    const fetchAgentVips = async () => {
      if (!isUserAgent) return;
      setVipsLoading(true);
      try {
        const response = await GetAllVips();
        setVipOptions(
          response.data.map((vip: VipApiResponse) => ({
            value: vip?.profile_id ? vip?.profile_id.toString() : null,
            label: vip?.first_name + ' ' + vip?.last_name,
          })),
        );
      } catch (error) {
        console.error('Error fetching agent VIPs:', error);
      } finally {
        setVipsLoading(false);
      }
    };
    fetchAgentVips();
  }, [isUserAgent]);

  return (
    <Box className="product-detail" mb={10}>
      <Typography className="page-title" variant="h2" component="h1" align="center">
        <span style={{ marginRight: '20px' }}>
          <ArrowBackBtn />
        </span>
        {he.decode(event?.title?.rendered || '')}
      </Typography>
      <EventContainer event={event} />
      <Box className="product-detail__content">
        {event?.acf?.brand_name && (
          <Typography
            sx={{
              fontSize: { xs: '13px', md: '16px' },
              fontWeight: 400,
              lineHeight: '15.08px',
              letterSpacing: '-0.01em',
              marginBottom: { xs: '5px', md: '10px' },
            }}
          >
            {he.decode(event?.acf?.brand_name || '')}
          </Typography>
        )}
        <Typography variant="h2" gutterBottom>
          {he.decode(event?.title?.rendered || '')}
        </Typography>
        <Typography variant="body1">
          {event?.acf?.event_start_date || event?.acf?.event_end_date ? (
            <>
              <Box component="strong">{en.events.date}</Box>{' '}
              {event?.acf?.event_start_date && event.acf.event_start_date}
              {event?.acf?.event_start_date && event?.acf?.event_end_date && ' - '}
              {event?.acf?.event_end_date && event.acf.event_end_date}
            </>
          ) : null}
        </Typography>
        <Typography variant="body1" paragraph>
          {event?.acf?.event_location && event?.acf?.event_location.trim() !== '' && (
            <>
              <Box component="strong">{en.events.location}</Box> {event.acf.event_location}
            </>
          )}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {en.events.overview}
        </Typography>
        <ShowHtml text={event?.acf?.event_quick_overview} />
        <Typography variant="h6" component="h3" gutterBottom>
          {en.events.details}
        </Typography>
        <ShowHtml text={event?.acf?.event_details} />
      </Box>
      {event?.acf?.is_lookbook_available && (
        <>
          <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
            <ReferCard
              heading={event?.acf?.lookbook_heading}
              text={event?.acf?.lookbook_description}
              href={event?.acf?.lookbook_pdf}
              type="lookbook"
            />
          </Box>
          <RequestItemFormButton
            postId={event?.id}
            isUserAgent={isUserAgent}
            vipOptions={vipOptions}
            vipsLoading={vipsLoading}
          />
        </>
      )}
      {event?.acf?.show_offers && <RedeemBox fetchOffers={event?.acf?.show_offers} />}
      <EventsDialog
        event={event}
        isUserAgent={isUserAgent}
        vipOptions={vipOptions}
        vipsLoading={vipsLoading}
        userRole={userRole}
      />
    </Box>
  );
};

interface EventContainerProps {
  event: EventDetails;
}

const EventContainer = ({ event }: EventContainerProps) => {
  const eventImageUrl = event?.acf?.event_image?.sizes?.['vs-container'] || DefaultImageFallback.LandscapePlaceholder;
  const brandLogo = event?.acf?.brand_logo?.url;

  return (
    <Card
      className="product-detail__item"
      sx={{
        backgroundImage: `url(${eventImageUrl})`,
      }}
    >
      {brandLogo && (
        <Box className="brand-logo">
          <Image
            src={brandLogo}
            alt="brand logo"
            fill
            sizes="(max-width: 1000px) 100vw, 1000px"
            placeholder="blur"
            blurDataURL={DefaultImageFallback.LandscapePlaceholder}
          />
        </Box>
      )}
    </Card>
  );
};

export default EventDetailsCard;
