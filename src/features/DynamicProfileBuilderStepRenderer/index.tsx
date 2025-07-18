'use client';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Backdrop, Box, Button, CircularProgress, Dialog, Typography } from '@mui/material';
import isEqual from 'lodash/isEqual';
import { filter, find, forEach, isArray, isBoolean, isEmpty, isString, map, sortBy } from 'lodash';
import {
  ACF,
  dobField,
  ProfileBuilderData,
  ProfileQuestionType,
  Question,
  Section,
  SectionType,
  vipSectionData,
} from '@/interfaces';
import InputTextFormField from '@/components/InputTextFormField';
import FormDatePicker from '@/components/FormDatePicker';
import AutoCompleteSelector from '@/components/AutoCompleteSelector';
import DynamicCustomStepper from '@/components/CustomStepper/DynamicCustomStepper';
import { CreateVipProfile, UpdateProfile } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { useRouter, useSearchParams } from 'next/navigation';
import { paths } from '@/helpers/paths';
import {
  RenderCityDropDown,
  RenderDropDown,
  renderHeading,
  RenderMultiSelectInput,
  RenderSingleSelectInput,
} from './components';
import { useVisibility } from '@/hooks/useVisibility';
import { createDynamicResolver } from '@/hooks/useDynamicResolver';
import AdditionalContactsForm from '../AdditionalContactsForm';
import { MessageDialogBox } from '@/components/Dialog';
import revalidatePathAction from '@/libs/actions';
import { useEditVipIdStore } from '@/store/useStore';
import VipAddedDialog from '@/components/VipAddedDialog';

interface DynamicProfileBuilderStepRendererProps {
  id: number;
  profileDetail: ACF;
  profileBuilderSections: ProfileBuilderData;
  isAgent?: boolean;
}

export interface ChildDob {
  date_of_birth: string;
}

const DynamicProfileBuilderStepRenderer: React.FC<DynamicProfileBuilderStepRendererProps> = ({
  id,
  profileDetail,
  profileBuilderSections,
  isAgent = false,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(id);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [localProfileDetail, setLocalProfileDetail] = useState<ACF>(() => profileDetail);
  const [sectionNumber, setSectionNumber] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const [vipAddedDialogOpen, setVipAddedDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get('profile-route');
  const { clearVipIdStore, setVipId, setShouldVipEdit } = useEditVipIdStore();
  const addVipStaticSection = useMemo<Section>(
    () => vipSectionData(profileBuilderSections.representation_options),
    [profileBuilderSections.representation_options],
  );
  const agentSections = [addVipStaticSection, ...profileBuilderSections.sections];
  const section = isAgent
    ? (agentSections[sectionNumber] as Section)
    : (profileBuilderSections?.sections[sectionNumber] as Section);
  const dobStaticField = useMemo<Question>(() => dobField, []);
  const totalSteps = isAgent ? agentSections.length : profileBuilderSections?.sections.length || 0;
  const { uk_countries, us_countries, eu_countries, other_countries, uk_cities, eu_cities, us_cities, other_cities } =
    profileBuilderSections;

  const countryOptions = sortBy([...uk_countries, ...us_countries, ...eu_countries, ...other_countries]);
  const allCityOptions = sortBy([...uk_cities, ...us_cities, ...eu_cities, ...other_cities]);

  useEffect(() => {
    if (section.specific_section_type === SectionType.YourDetails) {
      const filteredQuestions = section.questions.filter((q) => q.unique_id !== dobStaticField.unique_id);
      section.questions = [dobStaticField, ...filteredQuestions];
    }
  }, [dobStaticField, section]);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Record<string, string | string[] | ChildDob[] | null>>({
    mode: 'onChange',
    defaultValues: createDynamicResolver(section, localProfileDetail, allCityOptions),
  });
  const formValues = watch();
  const prevFormValuesRef = useRef(formValues);
  const visibleQuestions = useVisibility(section, formValues);
  const prevVisibleQuestionsRef = useRef(visibleQuestions);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fieldsToReset: Record<string, any> = {};

    forEach(section.questions, (q: Question) => {
      const key = q.unique_id;
      const isVisible = visibleQuestions[key];
      const wasVisible = prevVisibleQuestionsRef.current[key];

      // Only reset if field was visible but is now hidden
      if (wasVisible && !isVisible) {
        const currentValue = formValues[key];
        const isEmptyValue =
          currentValue === '' || (Array.isArray(currentValue) && currentValue.length === 0) || currentValue === null;

        // Only reset if field has a value
        if (!isEmptyValue) {
          if (q.input_type === ProfileQuestionType.ButtonGroup) {
            fieldsToReset[key] = q.max_allowed_choices !== '1' ? [] : '';
          } else if (q.input_type === ProfileQuestionType.Checkboxes) {
            fieldsToReset[key] = [];
          } else if (q.input_type === ProfileQuestionType.KidsAge) {
            fieldsToReset[key] = [];
          } else {
            fieldsToReset[key] = '';
          }
        }
      }
    });
    prevVisibleQuestionsRef.current = visibleQuestions;
    if (Object.keys(fieldsToReset).length > 0) {
      forEach(fieldsToReset, (value, key) => {
        setValue(key, value, { shouldDirty: false, shouldTouch: false });
      });
    }
  }, [visibleQuestions, section.questions, setValue, formValues]);

  useEffect(() => {
    reset(createDynamicResolver(section, localProfileDetail, allCityOptions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionNumber, section, reset, localProfileDetail]);

  useEffect(() => {
    if (!submitted) return;
    const fieldsToClear: string[] = [];

    forEach(section.questions, (q: Question) => {
      if (!visibleQuestions[q.unique_id] && errors[q.unique_id]) {
        fieldsToClear.push(q.unique_id);
      }
    });

    if (fieldsToClear.length > 0) {
      clearErrors(fieldsToClear);
    }
    prevFormValuesRef.current = formValues;
  }, [formValues, visibleQuestions, errors, clearErrors, submitted, section.questions]);

  useEffect(() => {
    if (!submitted) return;
    // Skip if form values haven't changed
    if (isEqual(prevFormValuesRef.current, formValues)) {
      return;
    }
    prevFormValuesRef.current = formValues;

    const errorsToSet: Record<string, { type: string; message: string }> = {};
    const errorsToClear: string[] = [];

    forEach(section.questions, (q: Question) => {
      if (!visibleQuestions[q.unique_id]) {
        // Clear errors for hidden questions
        if (errors[q.unique_id]) {
          errorsToClear.push(q.unique_id);
        }
        return;
      }

      const value = formValues[q.unique_id];
      if (q.validations.includes('required')) {
        if ((isArray(value) && value.length === 0) || (!isArray(value) && !value)) {
          errorsToSet[q.unique_id] = {
            type: 'required',
            message: 'This field is required',
          };
        } else if (errors[q.unique_id]) {
          errorsToClear.push(q.unique_id);
        }
      }
    });

    // Batch update errors
    if (errorsToClear.length > 0) {
      clearErrors(errorsToClear);
    }

    if (Object.keys(errorsToSet).length > 0) {
      forEach(Object.entries(errorsToSet), ([field, error]) => {
        setError(field, error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues, visibleQuestions, section.questions, setError, clearErrors, submitted]);

  const handleDialogClose = async () => {
    setOpenDialog(false);
    await revalidatePathAction(paths.root.myVips.getHref());
    router.push(paths.root.myVips.getHref());
  };

  const kidsAgeQuestion = useMemo(
    () => find(section.questions, (q) => q.input_type === ProfileQuestionType.KidsAge),
    [section.questions],
  );

  const kidsAgeFieldName = kidsAgeQuestion?.unique_id as keyof Record<string, string | string[] | ChildDob[]>;

  const { fields, append, remove } = useFieldArray<
    Record<string, string | string[] | ChildDob[] | null>,
    string,
    `${typeof kidsAgeFieldName}`
  >({
    control,
    name: kidsAgeFieldName as `${typeof kidsAgeFieldName}`,
    keyName: 'id',
  });

  useEffect(() => {
    if (kidsAgeQuestion?.unique_id) {
      const profileKids = localProfileDetail?.[kidsAgeQuestion.unique_id as keyof ACF];
      if (isEmpty(fields) && isEmpty(profileKids) && visibleQuestions[kidsAgeQuestion.unique_id]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        append({ date_of_birth: '' } as any);
      }
    }
  }, [kidsAgeQuestion, localProfileDetail, fields, append, visibleQuestions]);

  const handleAddChild = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    append({ date_of_birth: '' } as any);
  };

  const handleRemoveChild = (index: number) => {
    remove(index);
  };

  const getInputTypeFromId = (id: string): ProfileQuestionType | undefined => {
    const question = find(section.questions, (q) => q.unique_id === id);
    return question ? question.input_type : undefined;
  };

  const onSubmit = async (data: Record<string, string | string[] | ChildDob[] | null>) => {
    setSubmitted(true);
    const errorsToSet: Record<string, { type: string; message: string }> = {};

    forEach(section.questions, (q: Question) => {
      if (!visibleQuestions[q.unique_id]) return;

      const value = data[q.unique_id];
      if (q.validations.includes('required') && !isBoolean(value)) {
        if ((isArray(value) && value.length === 0) || (!isArray(value) && !value)) {
          errorsToSet[q.unique_id] = {
            type: 'required',
            message: 'This field is required',
          };
        }
        if (
          (isArray(value) && value.some((val) => isString(val) && val.trim().toLowerCase() === 'other')) ||
          (isString(value) && value.trim().toLowerCase() === 'other')
        ) {
          let hasOtherText = false;
          if (isArray(value)) {
            hasOtherText =
              value.some(
                (val) =>
                  isString(val) && val.trim().toLowerCase().startsWith('other:') && val.split(':')[1]?.trim() !== '',
              ) || value.length > 1;
          } else if (isString(value)) {
            hasOtherText = value.trim().toLowerCase().startsWith('other:') && value.split(':')[1]?.trim() !== '';
          }
          if (!hasOtherText) {
            errorsToSet[q.unique_id] = {
              type: 'otherRequired',
              message: 'Please specify the other option',
            };
          }
        }
      }
    });

    if (Object.keys(errorsToSet).length > 0) {
      forEach(Object.entries(errorsToSet), ([field, error]) => {
        setError(field, error);
      });
      console.warn('Form has errors, cannot submit');
      return;
    }
    const transformedData = Object.fromEntries(
      map(Object.entries(data), ([key, value]) => {
        if (isString(value) && value.toLowerCase().startsWith('other:')) {
          const otherValue = value.split(':').slice(1).join(':').trim();
          return [key, otherValue !== '' ? otherValue : null];
        }

        if (Array.isArray(value)) {
          const transformedValues = filter(value, (val) => {
            if (typeof val === 'string') {
              return val.trim() !== '' && val.toLowerCase() !== 'other';
            }
            return true;
          })
            .map((val) => {
              if (typeof val === 'string' && val.toLowerCase().startsWith('other:')) {
                const otherValue = val.split(':').slice(1).join(':').trim();
                return otherValue !== '' ? otherValue : null;
              }
              return val;
            })
            .filter((val) => val !== null);
          const inputType = getInputTypeFromId(key);
          return [
            key,
            transformedValues.length > 0 ? transformedValues : inputType === ProfileQuestionType.KidsAge ? [] : null,
          ];
        }
        if (isString(value) && value.trim() === '') {
          return [key, null];
        }

        return [key, value];
      }),
    );
    const updatedProfile = { ...localProfileDetail, ...transformedData };
    setLocalProfileDetail(updatedProfile);
    const profile = {
      acf: {
        first_name: localProfileDetail.first_name,
        last_name: localProfileDetail.last_name,
        ...transformedData,
      },
    };
    try {
      setIsLoading(true);
      if (profileId) {
        await UpdateProfile(profileId, profile);
      } else {
        const profileWithTitle = {
          title: transformedData.first_name + ' ' + transformedData.last_name,
          ...profile,
        };
        const response = await CreateVipProfile(profileWithTitle);
        if (response?.code === 'duplicate_profile') {
          setOpenDialog(true);
          setErrMsg(response.message || '');
          return false;
        }
        if (response?.id) {
          setProfileId(response.id);
          setVipId(response?.id);
          setShouldVipEdit(true);
        }
      }
      if (sectionNumber < totalSteps - 1) {
        setSectionNumber((prev) => (prev + 1) as 0 | 1 | 2 | 3);
        setSubmitted(false);
        setIsLoading(false);
      } else if (sectionNumber === totalSteps - 1) {
        if (isAgent) {
          setVipAddedDialogOpen(true);
          clearVipIdStore();
        } else if (isProfileEdit) {
          router.push(paths.root.profile.getHref());
        } else {
          router.push(paths.root.home.getHref());
        }
      }
    } catch (error) {
      openToaster(error?.toString() || 'Failed to update profile');
      console.error('Failed to update profile:', error);
      setIsLoading(false);
    }
  };

  const sectionDetails = {
    additionalContactContent: section.additional_contacts_content,
    sectionTitle: section.section_title,
    sectionDescription: section.section_description,
  };

  return (
    <>
      {section?.specific_section_type === SectionType.AdditionalContacts ? (
        <AdditionalContactsForm
          profileDetail={localProfileDetail}
          onNext={(profileDetail: ACF) => setLocalProfileDetail(profileDetail)}
          id={profileId}
          sectionNumber={sectionNumber}
          totalSteps={totalSteps}
          nextSectionNumber={() => setSectionNumber((prev) => (prev + 1) as 0 | 1 | 2 | 3)}
          prevSectionNumber={() => setSectionNumber((prev) => (prev - 1) as 0 | 1 | 2 | 3)}
          handleLoading={(state: boolean) => setIsLoading(state)}
          openToaster={openToaster}
          sectionDetails={sectionDetails}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="profile-builder__form step1-form ">
          <Box className="profile-builder__search">
            <Typography variant="h2" textAlign="center">
              {section?.section_title}
            </Typography>
            <Typography variant="body1" textAlign="center">
              {section?.section_description}
            </Typography>
          </Box>
          {map(section.questions, (q: Question) => {
            const {
              unique_id: id,
              input_type: inputType,
              question_title: title,
              choices,
              populate_from_country_field: relatedParentId,
              max_allowed_choices: maxChoices,
              question_heading: heading,
              question_subheading: subHeading,
              field_instructions: helperText,
            } = q;
            const commonProps = {
              name: id,
              control,
            };
            if (!visibleQuestions[id]) return null;

            if (inputType === ProfileQuestionType.Text) {
              return (
                <Box key={id}>
                  {heading && (
                    <Typography variant="h2" gutterBottom>
                      {heading}
                    </Typography>
                  )}
                  {subHeading && <Typography mb={3}>{subHeading}</Typography>}
                  <InputTextFormField {...commonProps} placeholder={title} errors={errors} />
                  {helperText && (
                    <Typography
                      variant="body2"
                      mt={-3.5}
                      fontSize={'0.75rem'}
                      ml={1.5}
                      color="rgba(0, 0, 0, 0.6)"
                      mb={3}
                    >
                      {helperText}
                    </Typography>
                  )}
                </Box>
              );
            } else if (inputType === ProfileQuestionType.Dropdown) {
              return (
                <Box key={id}>
                  <RenderDropDown control={control} question={q} errors={errors} />
                  {helperText && (
                    <Typography
                      variant="body2"
                      mt={-3.5}
                      fontSize={'0.75rem'}
                      ml={1.5}
                      color="rgba(0, 0, 0, 0.6)"
                      mb={3}
                    >
                      {helperText}
                    </Typography>
                  )}
                </Box>
              );
            } else if (inputType === ProfileQuestionType.CountryList) {
              return (
                <Box key={id}>
                  <AutoCompleteSelector options={countryOptions} {...commonProps} label={title} />
                  {helperText && (
                    <Typography variant="body2" mt={-2} fontSize={'0.75rem'} ml={1.5} color="rgba(0, 0, 0, 0.6)" mb={3}>
                      {helperText}
                    </Typography>
                  )}
                </Box>
              );
            } else if (inputType === ProfileQuestionType.CityList) {
              const parentCountry = formValues[relatedParentId] || '';
              let cityOptions: string[] = [];
              if (relatedParentId) {
                if (parentCountry && isString(parentCountry)) {
                  if (uk_countries.includes(parentCountry)) {
                    cityOptions = uk_cities;
                  } else if (us_countries.includes(parentCountry)) {
                    cityOptions = us_cities;
                  } else if (eu_countries.includes(parentCountry)) {
                    cityOptions = eu_cities;
                  } else if (other_countries.includes(parentCountry)) {
                    cityOptions = other_cities;
                  } else {
                    cityOptions = [...allCityOptions];
                  }
                }
              }
              return (
                <Box key={id}>
                  <RenderCityDropDown
                    control={control}
                    id={id}
                    isDisabled={!parentCountry && !!relatedParentId}
                    options={relatedParentId ? cityOptions : allCityOptions}
                    parentCountry={parentCountry}
                    placeholder={!parentCountry && relatedParentId ? 'Select country first' : 'Search for a city'}
                    relatedParentId={relatedParentId}
                    setValue={setValue}
                    title={title}
                    helperText={helperText}
                  />
                </Box>
              );
            } else if (inputType === ProfileQuestionType.DatePicker) {
              return (
                <Box key={id}>
                  <FormDatePicker {...commonProps} label={title} />
                  {helperText && (
                    <Typography variant="body2" mt={-4} fontSize={'0.75rem'} ml={1.5} color="rgba(0, 0, 0, 0.6)" mb={3}>
                      {helperText}
                    </Typography>
                  )}
                </Box>
              );
            } else if (inputType === ProfileQuestionType.Radio) {
              return (
                <Box key={id}>
                  {renderHeading(q)}
                  <RenderSingleSelectInput id={id} options={[{ text: 'Yes' }, { text: 'No' }]} control={control} />
                  {helperText && (
                    <Typography variant="body2" mt={-4} fontSize={'0.75rem'} ml={1.5} color="rgba(0, 0, 0, 0.6)" mb={3}>
                      {helperText}
                    </Typography>
                  )}
                </Box>
              );
            } else if (inputType === ProfileQuestionType.ButtonGroup) {
              const isSingleSelect = maxChoices === '1';
              return (
                <Box key={id} mb={2}>
                  {renderHeading(q)}
                  {isSingleSelect ? (
                    <RenderSingleSelectInput
                      id={id}
                      options={choices}
                      control={control}
                      type={ProfileQuestionType.ButtonGroup}
                    />
                  ) : (
                    <RenderMultiSelectInput
                      id={id}
                      options={choices}
                      control={control}
                      title={title}
                      formClassName="profile-builder__form-group"
                      boxClassName="profile-builder__form-row"
                      maxChoices={maxChoices ? parseInt(maxChoices) : undefined}
                    />
                  )}
                  {helperText && (
                    <Typography variant="body2" mt={-4} fontSize={'0.75rem'} ml={1.5} color="rgba(0, 0, 0, 0.6)" mb={3}>
                      {helperText}
                    </Typography>
                  )}
                </Box>
              );
            } else if (inputType === ProfileQuestionType.Checkboxes) {
              return (
                <Box key={id} mb={2}>
                  {renderHeading(q)}
                  <RenderMultiSelectInput
                    id={id}
                    options={choices}
                    control={control}
                    title={title}
                    formClassName="profile-builder__checkbox-group"
                    maxChoices={maxChoices ? parseInt(maxChoices) : undefined}
                  />
                  {helperText && (
                    <Typography variant="body2" mt={-4} fontSize={'0.75rem'} ml={0.5} color="rgba(0, 0, 0, 0.6)" mb={3}>
                      {helperText}
                    </Typography>
                  )}
                </Box>
              );
            } else if (inputType === ProfileQuestionType.KidsAge) {
              return (
                <Fragment key={id}>
                  {map(fields, (_, index) => (
                    <Box
                      key={`kidsAge${index}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'start',
                        mb: -2,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={450} gutterBottom>
                        {`Kid ${index + 1}`}
                      </Typography>
                      <FormDatePicker
                        control={control}
                        name={`${kidsAgeQuestion?.unique_id}.${index}.date_of_birth`}
                        label={title}
                        rules={
                          q.validations.includes('required') ? { required: 'Date of birth is required' } : undefined
                        }
                      />
                      {index === fields.length - 1 && (
                        <Box className="age-button-group">
                          {fields.length < Number(maxChoices || 10) && (
                            <Button onClick={handleAddChild} sx={{ mt: 1 }}>
                              Add More
                            </Button>
                          )}
                          {index > 0 && <Button onClick={() => handleRemoveChild(index)}>Remove</Button>}
                        </Box>
                      )}
                    </Box>
                  ))}
                  {helperText && (
                    <Typography variant="body2" mt={1} fontSize={'0.75rem'} ml={1.5} color="rgba(0, 0, 0, 0.6)" mb={3}>
                      {helperText}
                    </Typography>
                  )}
                </Fragment>
              );
            } else return <InputTextFormField key={id} {...commonProps} placeholder={title} errors={errors} />;
          })}
          <DynamicCustomStepper
            handleSectionChange={() => setSectionNumber((prev) => (prev - 1) as 0 | 1 | 2 | 3)}
            sectionNumber={sectionNumber}
            totalSteps={totalSteps}
          />
        </form>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
      <MessageDialogBox
        isDialogOpen={openDialog}
        onClose={handleDialogClose}
        content={{
          title: 'Alert',
          description: errMsg,
          buttonText: 'Proceed',
        }}
      />
      <Dialog open={vipAddedDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <VipAddedDialog />
      </Dialog>
    </>
  );
};

export default DynamicProfileBuilderStepRenderer;
