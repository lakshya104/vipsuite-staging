import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { Question } from '@/interfaces/events';
import { isNonEmptyString, mapQuestionsToSchema } from '@/helpers/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import RenderQuestions from '@/components/RenderQuestions';
import en from '@/helpers/lang';

interface DynamicFormProps {
  questions: Question[];
  type?: 'product' | 'event' | 'opportunity';
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Record<string, unknown>) => void;
  ctaText: string;
  ctaIfAlreadyOrdered?: string;
  alreadyOrdered?: boolean;
  noHeading?: boolean;
  showCta?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  questions,
  onSubmit,
  ctaText,
  alreadyOrdered,
  ctaIfAlreadyOrdered,
  noHeading = false,
  showCta,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const formSchema = mapQuestionsToSchema(questions);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: formSchema ? zodResolver(formSchema) : undefined,
    defaultValues: questions.reduce(
      (acc, question) => {
        const fieldName = question.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        acc[fieldName] = question.input_type === 'checkboxes' ? [] : '';
        return acc;
      },
      {} as Record<string, unknown>,
    ),
  });

  return (
    <Box className="site-dialog opportunity__form">
      <Box className="site-dialog__content">
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
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
          {isNonEmptyString(ctaText) && (
            <Box mt={2}>
              {showCta ? (
                ''
              ) : (
                <Button className="button button--black" type="submit" fullWidth disabled={alreadyOrdered}>
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
