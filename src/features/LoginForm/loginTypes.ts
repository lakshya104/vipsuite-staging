import * as z from 'zod';
import { loginPasswordValidation, requiredEmailValidation } from '@/helpers/validations';
import en from '@/helpers/lang';

export const LoginSchema = z.object({
  email: requiredEmailValidation,
  password: loginPasswordValidation,
});

export interface LoginFormValues {
  email: string;
  password: string;
}

export const reviewDialogBoxContent = {
  title: en.customReviewScreen.thankyou,
  subTitle: en.customReviewScreen.inReview,
  description: en.customReviewScreen.description,
  buttonText: en.customReviewScreen.done,
  isCrossIcon: true,
};
export const rejectDialogBoxContent = {
  title: en.customRejectedScreen.rejectedTxt,
  subTitle: en.customRejectedScreen.subTitle,
  description: en.customRejectedScreen.rejectedPara,
  buttonText: en.customRejectedScreen.continue,
  isCrossIcon: true,
};
