import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import './ProductDetails.scss';
import ProductDetailsPage from '@/site-pages/ProductDetailsPage';
import ProductDetailsPageLoading from '@/site-pages/ProductDetailsPage/loading';

// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
//   try {
//     const { data: product } = await GetBrandProductDetail(parseInt(params.id));
//     const previousImages = (await parent).openGraph?.images || [];

//     return {
//       title: product.name,
//       description: htmlToPlainText(product.short_description) || htmlToPlainText(product.description.slice(0, 160)),
//       openGraph: {
//         images: [product.images[0].src, ...previousImages],
//       },
//     };
//   } catch {
//     return {
//       title: 'Product Details',
//       description: 'Product details not available.',
//     };
//   }
// }

export default async function Page(props: {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ opportunity: string }>;
}) {
  const pageParams = await props.params;
  const searchParams = await props.searchParams;
  const productId = pageParams?.id;
  const opportunityId = parseInt(searchParams?.opportunity as string);
  return (
    <Box className="product-details__page">
      <Suspense fallback={<ProductDetailsPageLoading />}>
        <ProductDetailsPage productId={productId} opportunityId={opportunityId} />
      </Suspense>
    </Box>
  );
}
