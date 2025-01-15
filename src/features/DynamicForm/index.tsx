import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, FormControlLabel, RadioGroup, Radio, Button, Typography } from '@mui/material';
import Image from 'next/image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { map } from 'lodash';
import ErrorIcon from '@mui/icons-material/Error';
import { Question } from '@/interfaces/events';
import InputTextFormField, { InputTextAreaFormField } from '../../components/InputTextFormField';
import FormDatePicker, { FormDateTimePicker, FormTimePicker } from '../../components/FormDatePicker';
import { mapQuestionsToSchema } from '@/helpers/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBoxWithoutLabel from '../../components/SelectBoxWithOutLabel';
import { QuestionType } from '@/helpers/enums';

interface DynamicFormProps {
  questions: Question[];
  type?: 'product' | 'event' | 'opportunity';
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Record<string, unknown>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ questions, onSubmit, type }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const formSchema = mapQuestionsToSchema(questions);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: questions.reduce(
      (acc, question) => {
        const fieldName = question.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        acc[fieldName] = question.input_type === 'checkboxes' ? [] : '';
        return acc;
      },
      {} as Record<string, unknown>,
    ),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckboxChange = (field: any, value: string) => {
    const newValue = field.value.includes(value)
      ? field.value.filter((item: string) => item !== value)
      : [...field.value, value];

    field.onChange(newValue);
  };

  const renderField = (question: Question) => {
    const fieldName = question.title.toLowerCase().replace(/[^a-z0-9]/g, '');

    switch (question?.input_type) {
      case QuestionType.Text:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <InputTextFormField
              noLabel={true}
              name={fieldName}
              control={control}
              placeholder={'Enter here...'}
              errors={errors}
            />
          </Box>
        );
      case QuestionType.TextArea:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <InputTextAreaFormField name={fieldName} control={control} placeholder={'Enter here...'} errors={errors} />
          </Box>
        );

      case QuestionType.CheckBoxes:
        return (
          <Box className="form-checkbox" key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <br />
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <>
                  {question.choices?.map((choice) => (
                    <FormControlLabel
                      key={choice.text}
                      control={
                        <input
                          type="checkbox"
                          value={choice.text}
                          style={{ color: 'red', cursor: 'pointer' }}
                          checked={(field.value as string[]).includes(choice.text)}
                          onChange={() => handleCheckboxChange(field, choice.text)}
                        />
                      }
                      label={choice.text}
                    />
                  ))}
                </>
              )}
            />
            {errors[fieldName] && <Typography color="error">{errors[fieldName]?.message}</Typography>}
          </Box>
        );

      case QuestionType.Dropdown:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <SelectBoxWithoutLabel
              name={fieldName}
              control={control}
              options={map(question.choices, (choice) => ({
                value: choice.text,
                label: choice.text,
              }))}
              errors={errors}
            />
          </Box>
        );

      case QuestionType.Radio:
        return (
          <Box className="form-radioBtn" key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                  {question.choices?.map((choice) => (
                    <FormControlLabel key={choice.text} value={choice.text} control={<Radio />} label={choice.text} />
                  ))}
                </RadioGroup>
              )}
            />
            {errors[fieldName] && <Typography color="error">{errors[fieldName]?.message}</Typography>}
          </Box>
        );

      case QuestionType.Date:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <FormDatePicker name={fieldName} control={control} selectFutureDate={true} />
          </Box>
        );
      case QuestionType.DateTime:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <FormDateTimePicker name={fieldName} control={control} selectFutureDate={true} />
          </Box>
        );
      case QuestionType.Time:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <FormTimePicker name={fieldName} control={control} />
          </Box>
        );

      case QuestionType.FileUpload:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicTitle title={question.title} isRequired={question?.is_required} />
            <Controller
              name={fieldName}
              control={control}
              render={({ field: { onChange } }) => (
                <Button
                  className="button"
                  style={{ border: errors[fieldName] ? '1px solid #d32f2f' : '1px solid black', padding: '25px 0' }}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  component="label"
                  startIcon={
                    !fileName && errors[fieldName] ? (
                      <ErrorIcon color="error" />
                    ) : (
                      !fileName && <Image src="/img/Upload.png" alt="Upload" width={20} height={20} />
                    )
                  }
                >
                  {fileName ? (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CheckCircleOutlineIcon color="success" />
                      <Typography textAlign="center">{fileName}</Typography>
                    </Box>
                  ) : errors[fieldName] ? (
                    <span style={{ color: '#d32f2f', textTransform: 'capitalize', fontWeight: 'lighter' }}>
                      Upload a file
                    </span>
                  ) : (
                    <span style={{ textTransform: 'capitalize', fontWeight: 'lighter' }}>Upload a file</span>
                  )}
                  <input
                    type="file"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          onChange(file);
                          setFileName(file.name);
                        } catch (error) {
                          console.error('Error converting file to base64:', error);
                        }
                      }
                    }}
                  />
                </Button>
              )}
            />
            {errors[fieldName] && <Typography color="error">{'This field is required'}</Typography>}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Answer the following questions.
      </Typography>
      {questions.map((question) => renderField(question))}
      <Box mt={2}>
        <Button className="button button--black" type="submit" fullWidth>
          {type === 'product' ? 'Submit' : 'Submit'}
        </Button>
      </Box>
    </form>
  );
};

export default DynamicForm;

interface DynamicTitleProps {
  title: string;
  isRequired: boolean;
}

const DynamicTitle: React.FC<DynamicTitleProps> = ({ title, isRequired }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Typography variant="body1">{title}</Typography>
      {isRequired && (
        <span
          style={{
            color: 'red',
            position: 'absolute',
            top: 0,
            right: -10,
          }}
        >
          *
        </span>
      )}
    </Box>
  );
};
