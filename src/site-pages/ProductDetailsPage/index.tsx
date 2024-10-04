import React from 'react';
import { cookies } from 'next/headers';
import { GetBrandProductDetail, GetNonce, GetSession } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import ProductDetailsContainer from '@/components/ProductDetailsContainer';
import { getVipId } from '@/helpers/utils';

interface ProductDetailsPageProps {
  productId: number;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ productId }) => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('vipId');
    const session = await GetSession();
    const { token, role } = session;
    const vipId = getVipId(role, userId, session);
    if (!vipId) {
      return <ErrorFallback errorMessage="VIP ID not found." />;
    }
    const nonce = await GetNonce(token);
    const product = await GetBrandProductDetail(productId, token, Number(vipId));
    if (!product || !nonce) {
      return <ErrorFallback errorMessage="Not able to show product details currently." />;
    }
    return <ProductDetailsContainer product={product} nonce={nonce} token={token} vipId={Number(vipId)} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show product details currently." />;
  }
};

export default ProductDetailsPage;
