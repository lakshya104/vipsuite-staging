'use client';
import React, { useEffect, useState } from 'react';
import { Box, CardContent, Typography, Button, Grid2, Backdrop, CircularProgress } from '@mui/material';
import he from 'he';
import OpportunityTabs from '@/components/OpportunityTabs';
import './OpportunityDetails.scss';
import './OpportunityTab.scss';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import ImageSlider from '@/components/Slider';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import ArrowBackBtn from '@/components/ArrowBackBtn';
import ReferCard from '@/components/ReferCard';
import RequestItemFormButton from '@/components/RequestItemFormButton';
import RedeemBox from '@/components/RedeemBox';
import { DefaultImageFallback } from '@/helpers/enums';
import en from '@/helpers/lang';
import ShowHtml from '@/components/ShowHtml';
import DynamicForm from '@/features/DynamicForm';
import OpportunityProductCard from '@/components/DashboardCard/OpportunityProductCard';
import { isNonEmptyString } from '@/helpers/utils';
import { SendRsvp } from '@/libs/api-manager/manager';
import revalidatePathAction from '@/libs/actions';
import { paths } from '@/helpers/paths';

interface OpportunityDetailsCardProps {
  opportunity: OpportunityDetails;
}

const OpportunityDetailsCard: React.FC<OpportunityDetailsCardProps> = ({ opportunity }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [toasterMessage, setToasterMessage] = useState<string>('');
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const images = opportunity?.acf?.web_detail_images
    ? opportunity?.acf?.web_detail_images?.map((item) => item?.sizes['vs-container'])
    : [opportunity.acf.featured_image?.sizes['vs-container'] || DefaultImageFallback.LandscapePlaceholder];

  const handleToasterMessage = (type: 'error' | 'success', message?: string) => {
    setToasterType(type);
    if (type === 'success') {
      setToasterMessage(message ?? en.opportunities.toasterMessage.success);
    } else {
      setToasterMessage(message ?? en.opportunities.toasterMessage.error);
    }
  };

  useEffect(() => {
    if (toasterMessage) openToaster(toasterMessage);
  }, [openToaster, toasterMessage]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.replace(/^data:[^;]+;base64,/, '');
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitDynamic = async (data: Record<string, any>) => {
    setIsPending(true);
    const updatedPayload = await Promise.all(
      opportunity.acf.questions.map(async (field) => {
        const key = field?.title?.toLowerCase()?.replace(/[^a-z0-9]/g, '');
        let answer;
        if (field?.input_type === 'file_upload' && field?.is_required) {
          answer = await convertToBase64(data[key]);
        } else {
          answer = data[key];
        }
        return {
          ...field,
          answer,
        };
      }),
    );
    const rsvp = {
      post_type: 'opportunity',
      rsvp_post: opportunity.id,
      ...(updatedPayload && { questions: updatedPayload }),
    };
    try {
      const res = await SendRsvp(rsvp);
      handleToasterMessage('success', res?.message);
      setBtnDisable(true);
    } catch (error) {
      handleToasterMessage('error', String(error));
      setBtnDisable(false);
    } finally {
      setIsPending(false);
      await revalidatePathAction(paths.root.eventDetails.getHref(opportunity?.id));
    }
  };

  const onSubmitSimple = async () => {
    setIsPending(true);
    const rsvp = {
      post_type: 'opportunity',
      rsvp_post: opportunity.id,
    };
    try {
      const res = await SendRsvp(rsvp);
      handleToasterMessage('success', res?.message);
      setBtnDisable(true);
    } catch (error) {
      handleToasterMessage('error', String(error));
      setBtnDisable(false);
    } finally {
      setIsPending(false);
      await revalidatePathAction(paths.root.eventDetails.getHref(opportunity?.id));
    }
  };

  return (
    <Box className="opportunity-detail-page" component="main">
      <Typography className="page-title" variant="h2" component="h1" align="center">
        <ArrowBackBtn />
        {he.decode(opportunity?.title?.rendered || '')}
      </Typography>
      <Box>
        <ImageSlider images={images} withLikeIcon={true} item={opportunity} />
      </Box>
      {opportunity?.acf?.show_description ? (
        <Box>
          <Typography variant="h3" sx={{ my: 2 }}>
            {en.opportunities.description}
          </Typography>
          <ShowHtml text={opportunity?.acf?.description} />
        </Box>
      ) : (
        <CardContent>
          <OpportunityTabs opportunity={opportunity} />
        </CardContent>
      )}
      {opportunity?.acf?.is_lookbook_available && (
        <>
          <Box className="gray-card" display={'flex'} justifyContent={'space-between'} gap={2.5}>
            <ReferCard
              heading={opportunity?.acf?.lookbook_heading}
              text={opportunity?.acf?.lookbook_description}
              href={opportunity?.acf?.lookbook_pdf}
              type="lookbook"
            />
          </Box>
          <RequestItemFormButton postId={opportunity?.id} />
        </>
      )}
      {opportunity?.acf?.show_offers && <RedeemBox fetchOffers={opportunity?.acf?.show_offers} />}
      {opportunity?.acf?.grouped_products ? (
        <Grid2 className="landing-product" container spacing={2} sx={{ mb: 5 }}>
          {opportunity?.acf?.grouped_products.map((product) => (
            <Grid2
              className="landing-product__item opportunity-product"
              size={{ xs: 12, sm: 6, lg: 4 }}
              key={product?.product_id}
            >
              <OpportunityProductCard
                oppId={opportunity?.id}
                id={product?.product_id}
                name={product?.product_name}
                image={product?.product_image}
                description={product?.product_short_description}
                isRequestOnly={product?.is_request_only}
              />
            </Grid2>
          ))}
        </Grid2>
      ) : opportunity?.acf?.questions ? (
        <DynamicForm
          questions={opportunity.acf.questions}
          onSubmit={onSubmitDynamic}
          ctaText={opportunity?.acf?.cta_label}
          ctaIfAlreadyOrdered={en.opportunities.opportunityRsvp.responded}
          alreadyOrdered={opportunity?.acf?.is_rsvp || btnDisable}
          noHeading={true}
        />
      ) : (
        isNonEmptyString(opportunity?.acf?.cta_label) && (
          <Box>
            <Button
              variant="contained"
              className="button button--black w-100"
              onClick={onSubmitSimple}
              disabled={opportunity?.acf?.is_rsvp || btnDisable}
              style={{ marginBottom: '50px' }}
            >
              {opportunity?.acf?.is_rsvp ? en.opportunities.opportunityRsvp.responded : opportunity?.acf?.cta_label}
            </Button>
          </Box>
        )
      )}
      <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster
        open={toasterOpen}
        setOpen={closeToaster}
        message={error}
        severity={toasterType as 'error' | 'success' | 'warning' | 'info'}
      />
    </Box>
  );
};

export default OpportunityDetailsCard;
