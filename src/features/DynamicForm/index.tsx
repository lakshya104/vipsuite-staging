import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { Question } from '@/interfaces/events';
import { isNonEmptyString, mapQuestionsToSchema } from '@/helpers/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import RenderQuestions from '@/components/RenderQuestions';
import en from '@/helpers/lang';
import { AgentVipsPayload, vipInitialSchema, vipOptionalSchema, VipOptions } from '@/interfaces';
import { z } from 'zod';
import { isEmpty } from 'lodash';
import VipOrderForm from '@/components/VipOrderForm';

interface DynamicFormProps {
  questions: Question[];
  type?: 'product' | 'event' | 'opportunity';
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Record<string, unknown>, payloadWithVipData?: AgentVipsPayload) => void;
  ctaText: string;
  ctaIfAlreadyOrdered?: string;
  alreadyOrdered?: boolean;
  noHeading?: boolean;
  showCta?: boolean;
  vipsLoading?: boolean;
  vipOptions?: VipOptions[];
  isUserAgent?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  questions,
  onSubmit,
  ctaText,
  alreadyOrdered,
  ctaIfAlreadyOrdered,
  noHeading = false,
  showCta,
  vipsLoading = false,
  vipOptions,
  isUserAgent = false,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [vipSchemas, setVipSchemas] = useState(() => (!isUserAgent ? vipOptionalSchema : vipInitialSchema));
  const vipSchema = z.object({
    vip_profile_ids: vipSchemas.profileId,
    vip_profile_names: vipSchemas.profileName,
  });
  const formSchema = mapQuestionsToSchema(questions);
  let combinedSchema = formSchema;
  if (isUserAgent && combinedSchema) {
    combinedSchema = combinedSchema.merge(vipSchema);
  }
  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: combinedSchema ? zodResolver(combinedSchema) : undefined,
    defaultValues:
      questions?.reduce(
        (acc, question) => {
          const fieldName = question.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          acc[fieldName] = question.input_type === 'checkboxes' ? [] : '';
          acc['vip_profile_ids'] = [];
          acc['vip_profile_names'] = '';
          return acc;
        },
        {} as Record<string, unknown>,
      ) ||
      (isUserAgent && {
        vip_profile_ids: [],
        vip_profile_names: '',
      }) ||
      {},
  });

  const handleVipSchemas = (schemas: { profileId: z.ZodArray<z.ZodString, 'many'>; profileName: z.ZodString }) => {
    setVipSchemas(schemas);
  };

  return (
    <Box className="site-dialog opportunity__form">
      <Box className="site-dialog__content">
        <form
          onSubmit={handleSubmit((data) => {
            const payloadWithVipData = {
              ...(isUserAgent && {
                ...(!isEmpty(data?.vip_profile_ids)
                  ? { vip_profile_ids: (data.vip_profile_ids as string[]).join(',') }
                  : {}),
                ...(data?.vip_profile_names ? { vip_profile_names: data.vip_profile_names as string } : {}),
              }),
            };
            onSubmit(data, payloadWithVipData);
            reset();
            setVipSchemas(vipInitialSchema);
            setFileName(null);
          })}
        >
          <RenderQuestions
            control={control}
            errors={errors}
            fileName={fileName}
            setFileName={setFileName}
            questions={questions}
            noHeading={noHeading}
          />
          {isUserAgent && vipOptions && (
            <VipOrderForm
              clearErrors={clearErrors}
              control={control}
              errors={errors}
              handleVipSchemas={handleVipSchemas}
              vipOptions={vipOptions}
              vipsLoading={vipsLoading}
            />
          )}
          {isNonEmptyString(ctaText) && (
            <Box mt={2}>
              {showCta ? (
                ''
              ) : (
                <Button
                  className="button button--black"
                  type="submit"
                  fullWidth
                  disabled={alreadyOrdered || vipsLoading}
                >
                  {alreadyOrdered ? ctaIfAlreadyOrdered : ctaText || en.common.orderNow}
                </Button>
              )}
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default DynamicForm;
