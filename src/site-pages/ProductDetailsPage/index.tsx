import React from 'react';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { Session } from '@/interfaces';
import { GetBrandProductDetail, GetNonce } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import ProductDetailsContainer from '@/components/ProductDetailsContainer';

interface ProductDetailsPageProps {
  productId: number;
  isAgent?: boolean;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ productId, isAgent }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await auth();
    const token = (session?.user as unknown as Session)?.token;
    const vipId = !isAgent ? (session?.user as unknown as Session)?.vip_profile_id : Number(userId?.value);
    const nonce = await GetNonce(token);
    const product = await GetBrandProductDetail(productId, token, vipId);
    if (!product || !nonce) {
      return <ErrorFallback errorMessage="Not able to show product details currently." />;
    }
    return <ProductDetailsContainer product={product} nonce={nonce} token={token} vipId={vipId} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show product details currently." />;
  }
};

export default ProductDetailsPage;
