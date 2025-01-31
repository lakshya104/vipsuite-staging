import React from 'react';
import { GetBrandProductDetail } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ProductDetailsContainer from '@/components/ProductDetailsContainer';
import ErrorHandler from '@/components/ErrorHandler';
import { isUndefined } from 'lodash';
import en from '@/helpers/lang';

interface ProductDetailsPageProps {
  productId: number;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ productId }) => {
  const { data: product, error } = await GetBrandProductDetail(productId);
  if (error) {
    return <ErrorHandler error={error} errMessage={en.products.errMessage} />;
  }
  if (!product || isUndefined(product)) {
    return <ErrorFallback errorMessage={en.products.errMessage} />;
  }
  return <ProductDetailsContainer product={product} />;
};

export default ProductDetailsPage;
