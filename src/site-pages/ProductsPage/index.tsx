import React from 'react';
import { isEmpty, isUndefined } from 'lodash';
import { GetProducts } from '@/libs/api-manager/manager';
import ErrorFallback from '@/components/ErrorFallback';
import ErrorHandler from '@/components/ErrorHandler';
import ProductListingContainer from '@/components/ProductListing';

const ProductsPage = async () => {
  try {
    const allProducts = await GetProducts();
    if (isUndefined(allProducts) || isEmpty(allProducts)) {
      return <ErrorFallback errorMessage="Currently there are no products." hideSubtext={true} />;
    }
    return <ProductListingContainer products={allProducts} />;
  } catch (error) {
    return <ErrorHandler error={error} errMessage="Not able to show opportunities currently." />;
  }
};

export default ProductsPage;
