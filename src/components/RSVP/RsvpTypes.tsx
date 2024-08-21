export interface RsvpFormValues {
  adultsChildren: string;
  eventTitle: string;
  notAvailable: string | null;
  notInterested: string | null;
}

export const defaultValues = {
  adultsChildren: '',
  eventTitle: '',
  notAvailable: null,
  notInterested: null,
};
