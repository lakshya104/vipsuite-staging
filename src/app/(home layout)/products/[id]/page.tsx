import React, { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { Box } from '@mui/material';
import './ProductDetails.scss';
import { GetBrandProductDetail } from '@/libs/api-manager/manager';
import ProductDetailsPage from '@/site-pages/ProductDetailsPage';
import ProductDetailsPageLoading from '@/site-pages/ProductDetailsPage/loading';
import { Product } from '@/interfaces/brand';
import { htmlToPlainText } from '@/helpers/utils';
import { Session } from '@/interfaces';
import { auth } from '@/auth';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const isAgent = (session?.user as unknown as Session)?.role === 'agent';
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
    const product: Product = await GetBrandProductDetail(parseInt(params.id), token, vipId);
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: product.name,
      description: htmlToPlainText(product.short_description) || htmlToPlainText(product.description.slice(0, 160)),
      openGraph: {
        images: [product.images[0].src, ...previousImages],
      },
    };
  } catch {
    return {
      title: 'Product Details',
      description: 'Product details not available.',
    };
  }
}

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
  const productId = parseInt(params?.id);
  return (
    <Box className="product-details__page">
      <Suspense fallback={<ProductDetailsPageLoading />}>
        <ProductDetailsPage productId={productId} />
      </Suspense>
    </Box>
  );
}
