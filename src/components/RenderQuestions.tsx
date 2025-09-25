import { Question } from '@/interfaces/events';
import React from 'react';
import DynamicQuestionTitle from './DynamicQuestionTitle';
import InputTextFormField, { InputTextAreaFormField } from './InputTextFormField';
import { QuestionType } from '@/helpers/enums';
import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormDatePicker, { FormDateTimePicker, FormTimePicker } from './FormDatePicker';
import Image from 'next/image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { map } from 'lodash';
import ErrorIcon from '@mui/icons-material/Error';
import { Control } from 'react-hook-form';
import SelectBox from './SelectBox';
import en from '@/helpers/lang';

interface RenderQuestionsProps {
  questions: Question[];
  control: Control;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  fileName: string | null;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
  noHeading?: boolean;
}

const RenderQuestions: React.FC<RenderQuestionsProps> = ({
  questions,
  control,
  errors,
  fileName,
  setFileName,
  noHeading = false,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckboxChange = (field: any, value: string) => {
    const newValue = field.value.includes(value)
      ? field.value.filter((item: string) => item !== value)
      : [...field.value, value];

    field.onChange(newValue);
  };

  const renderForm = (question: Question) => {
    const fieldName = question?.title.toLowerCase().replace(/[^a-z0-9]/g, '');

    switch (question?.input_type) {
      case QuestionType.Text:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
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
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
            <InputTextAreaFormField name={fieldName} control={control} placeholder={'Enter here...'} errors={errors} />
          </Box>
        );

      case QuestionType.CheckBoxes:
        return (
          <Box className="form-checkbox" key={fieldName} mb={2}>
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
            <br />
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <>
                  {question.choices?.map((choice) => (
                    <FormControlLabel
                      className="form-checkbox__label"
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
            {errors[fieldName] && (
              <Typography className="field-error Mui-error" color="error">
                {errors[fieldName]?.message}
              </Typography>
            )}
          </Box>
        );

      case QuestionType.Dropdown:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
            <SelectBox
              label="Select One"
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
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} sx={{ flexDirection: 'row', mb: '-10px !important' }}>
                  {question.choices?.map((choice) => (
                    <FormControlLabel key={choice.text} value={choice.text} control={<Radio />} label={choice.text} />
                  ))}
                </RadioGroup>
              )}
            />
            {errors[fieldName] && (
              <Typography className="field-error Mui-error" color="error">
                {errors[fieldName]?.message}
              </Typography>
            )}
          </Box>
        );

      case QuestionType.Date:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
            <FormDatePicker name={fieldName} control={control} selectFutureDate={true} />
          </Box>
        );
      case QuestionType.DateTime:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
            <FormDateTimePicker name={fieldName} control={control} selectFutureDate={true} />
          </Box>
        );
      case QuestionType.Time:
        return (
          <Box key={fieldName} mb={2}>
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
            <FormTimePicker name={fieldName} control={control} />
          </Box>
        );

      case QuestionType.FileUpload:
        return (
          <Box key={fieldName} mb={2} className="overflow-hidden">
            <DynamicQuestionTitle title={question?.title} isRequired={question?.is_required} />
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
                      <Typography
                        textAlign="center"
                        sx={{
                          marginBottom: '0 !important',
                          fontWeight: 'normal !important',
                          fontSize: '14px !important',
                        }}
                      >
                        {fileName}
                      </Typography>
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
                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,application/pdf"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          onChange(file);
                          setFileName(file.name);
                        } catch (error) {
                          console.error(en.renderQuestions.errorconversion, error);
                        }
                      }
                    }}
                  />
                </Button>
              )}
            />
            {errors[fieldName] && (
              <Typography className="field-error Mui-error" sx={{ mt: '-10px' }} color="error">
                {en.common.fieldErrorMessage}
              </Typography>
            )}
          </Box>
        );

      default:
        return null;
    }
  };
  return (
    <>
      {!noHeading && (
        <Typography variant="h6" gutterBottom>
          {en.renderQuestions.answerQuestion}
        </Typography>
      )}
      {questions.map((item) => renderForm(item))}
    </>
  );
};

export default RenderQuestions;
