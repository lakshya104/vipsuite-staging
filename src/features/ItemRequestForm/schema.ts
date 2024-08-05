import * as z from 'zod';

export const formSchema = z.object({
  size: z.string().min(1, 'Size is required'),
});

export type ProductFormValues = z.infer<typeof formSchema>;

export const defaultValues = {
  size: '',
};
