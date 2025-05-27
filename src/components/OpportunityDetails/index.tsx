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
import { DefaultImageFallback, UserRole } from '@/helpers/enums';
import en from '@/helpers/lang';
import ShowHtml from '@/components/ShowHtml';
import DynamicForm from '@/features/DynamicForm';
import OpportunityProductCard from '@/components/DashboardCard/OpportunityProductCard';
import { isNonEmptyString } from '@/helpers/utils';
import { GetAllVips, SendRsvp } from '@/libs/api-manager/manager';
import revalidatePathAction from '@/libs/actions';
import { paths } from '@/helpers/paths';
import { AgentVipsPayload, VipApiResponse, VipOptions } from '@/interfaces';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty } from 'lodash';
import VipOrderForm from '../VipOrderForm';

interface OpportunityDetailsCardProps {
  opportunity: OpportunityDetails;
  userRole: UserRole;
}

const OpportunityDetailsCard: React.FC<OpportunityDetailsCardProps> = ({ opportunity, userRole }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [toasterMessage, setToasterMessage] = useState<string>('');
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [vipOptions, setVipOptions] = useState<VipOptions[]>([]);
  const images = opportunity?.acf?.web_detail_images
    ? opportunity?.acf?.web_detail_images?.map((item) => item?.sizes['vs-container'])
    : [opportunity.acf.featured_image?.sizes['vs-container'] || DefaultImageFallback.LandscapePlaceholder];
  const showVipOptions = userRole === UserRole.Agent && isEmpty(opportunity?.acf?.grouped_products);
  const [vipsLoading, setVipsLoading] = useState<boolean>(showVipOptions ? true : false);
  const [vipSchemas, setVipSchemas] = useState(() =>
    !showVipOptions
      ? {
          profileId: z.array(z.string()),
          profileName: z.string(),
        }
      : {
          profileId: z.array(z.string()).min(1, 'Please select at least one VIP or enter a name'),
          profileName: z.string().min(1, 'Please select at least one VIP or enter a name'),
        },
  );
  const vipSchema = z.object({
    vip_profile_ids: vipSchemas.profileId,
    vip_profile_names: vipSchemas.profileName,
  });
  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vipSchema),
    defaultValues: {
      vip_profile_ids: [],
      vip_profile_names: '',
    },
  });

  const handleToasterMessage = (type: 'error' | 'success', message?: string) => {
    setToasterType(type);
    if (type === 'success') {
      setToasterMessage(message ?? en.opportunities.toasterMessage.success);
    } else {
      setToasterMessage(message ?? en.opportunities.toasterMessage.error);
    }
  };

  useEffect(() => {
    const fetchAgentVips = async () => {
      if (!showVipOptions) return;
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
  }, [showVipOptions]);

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
  const onSubmitDynamic = async (data: Record<string, any>, payloadWithVipData?: AgentVipsPayload) => {
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
      is_pleases: 'interested',
      ...(updatedPayload && { questions: updatedPayload }),
      ...(showVipOptions && payloadWithVipData),
      order_by: userRole === UserRole.Agent ? UserRole.Agent : UserRole.Vip,
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
      setVipSchemas({
        profileId: z.array(z.string()).min(1, 'Please select at least one VIP or enter a name'),
        profileName: z.string().min(1, 'Please select at least one VIP or enter a name'),
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitSimple = async (data: any) => {
    const payloadWithVipData = {
      ...(showVipOptions && {
        ...(!isEmpty(data?.vip_profile_ids) && { vip_profile_ids: data.vip_profile_ids.join(',') }),
        ...(data?.vip_profile_names && { vip_profile_names: data.vip_profile_names }),
      }),
    };

    setIsPending(true);
    const rsvp = {
      post_type: 'opportunity',
      rsvp_post: opportunity.id,
      ...(showVipOptions && payloadWithVipData),
      order_by: userRole === UserRole.Agent ? UserRole.Agent : UserRole.Vip,
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
      setVipSchemas({
        profileId: z.array(z.string()).min(1, 'Please select at least one VIP or enter a name'),
        profileName: z.string().min(1, 'Please select at least one VIP or enter a name'),
      });
      reset();
    }
  };

  const handleVipSchemas = (schemas: { profileId: z.ZodArray<z.ZodString, 'many'>; profileName: z.ZodString }) => {
    setVipSchemas(schemas);
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
          <RequestItemFormButton
            postId={opportunity?.id}
            isUserAgent={showVipOptions}
            vipOptions={vipOptions}
            vipsLoading={vipsLoading}
          />
        </>
      )}
      {opportunity?.acf?.show_offers && <RedeemBox fetchOffers={opportunity?.acf?.show_offers} />}
      {opportunity?.acf?.grouped_products ? (
        <>
          {opportunity?.acf?.questions && (
            <DynamicForm
              questions={opportunity.acf.questions}
              onSubmit={onSubmitDynamic}
              ctaText={opportunity?.acf?.cta_label}
              ctaIfAlreadyOrdered={en.opportunities.opportunityRsvp.responded}
              alreadyOrdered={opportunity?.acf?.is_rsvp || btnDisable}
              noHeading={true}
              showCta={!!opportunity?.acf?.grouped_products?.length}
              vipsLoading={vipsLoading}
              vipOptions={vipOptions}
              isUserAgent={showVipOptions}
            />
          )}
          {opportunity?.acf?.grouped_products?.length > 0 && (
            <>
              <Typography variant="h2" sx={{ mb: 2, mt: 2.5 }}>
                {en.opportunities.productHeading}
              </Typography>
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
            </>
          )}
        </>
      ) : opportunity?.acf?.questions ? (
        <DynamicForm
          questions={opportunity.acf.questions}
          onSubmit={onSubmitDynamic}
          ctaText={opportunity?.acf?.cta_label}
          ctaIfAlreadyOrdered={en.opportunities.opportunityRsvp.responded}
          alreadyOrdered={opportunity?.acf?.is_rsvp || btnDisable}
          noHeading={true}
          vipsLoading={vipsLoading}
          vipOptions={vipOptions}
          isUserAgent={showVipOptions}
        />
      ) : (
        isNonEmptyString(opportunity?.acf?.cta_label) && (
          <Box component="form" onSubmit={handleSubmit(onSubmitSimple)} className="product-size">
            {showVipOptions && (
              <VipOrderForm
                clearErrors={clearErrors}
                control={control}
                errors={errors}
                handleVipSchemas={handleVipSchemas}
                vipOptions={vipOptions}
                vipsLoading={vipsLoading}
              />
            )}
            <Button
              variant="contained"
              className="button button--black w-100"
              disabled={opportunity?.acf?.is_rsvp || btnDisable || vipsLoading}
              style={{ marginBottom: '50px' }}
              type="submit"
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
