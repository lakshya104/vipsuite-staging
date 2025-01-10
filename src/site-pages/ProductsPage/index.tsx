import React from 'react';
import { isUndefined } from 'lodash';
import { GetProducts } from '@/libs/api-manager/manager';
import ErrorHandler from '@/components/ErrorHandler';
import ProductListingContainer from '@/components/ProductListing';

const ProductsPage = async ({ currentPage }: { currentPage: number }) => {
  const { data: allProducts, totalPages, error } = await GetProducts(currentPage);
  if (error || isUndefined(allProducts)) {
    return <ErrorHandler error={error} errMessage="Not able to show products currently." />;
  }

  return <ProductListingContainer products={allProducts} totalPages={totalPages} currentPage={currentPage} />;
};

export default ProductsPage;
