import { redirect } from 'next/navigation';
import { paths } from '@/helpers/paths';

export default async function Page() {
  redirect(paths.auth.onBoarding.getHref());
}
