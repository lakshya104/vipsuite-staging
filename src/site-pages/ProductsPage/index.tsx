import React from 'react';
import { isUndefined } from 'lodash';
import { GetProducts } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import ProductListingContainer from '@/components/ProductListing';

const ProductsPage = async () => {
  const { data: allProducts, error } = await GetProducts();
  if (error || isUndefined(allProducts)) {
    return <ErrorHandler error={error} errMessage="Not able to show products currently." />;
  }
  return <ProductListingContainer products={allProducts} />;
};

export default ProductsPage;
