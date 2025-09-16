import React from 'react';
import { GetBrandProductDetail, GetSession } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ProductDetailsContainer from '@/components/ProductDetailsContainer';
import ErrorHandler from '@/components/ErrorHandler';
import { isUndefined } from 'lodash';
import en from '@/helpers/lang';
import { UserRole } from '@/helpers/enums';

interface ProductDetailsPageProps {
  productId: number;
  opportunityId: number;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ opportunityId, productId }) => {
  const [{ data: product, error }, session] = await Promise.all([
    GetBrandProductDetail(opportunityId, productId),
    GetSession(),
  ]);
  const userRole = session?.role;
  if (error) {
    return <ErrorHandler error={error} errMessage={en.products.errMessage} />;
  }
  if (!product || isUndefined(product)) {
    return <ErrorFallback errorMessage={en.products.errMessage} />;
  }
  return <ProductDetailsContainer product={product} isUserAgent={userRole === UserRole.Agent} userRole={userRole} />;
};

export default ProductDetailsPage;
