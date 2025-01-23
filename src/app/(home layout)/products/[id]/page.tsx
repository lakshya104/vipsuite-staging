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

interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const productId = parseInt(params?.id);
  return (
    <Box className="product-details__page">
      <Suspense fallback={<ProductDetailsPageLoading />}>
        <ProductDetailsPage productId={productId} />
      </Suspense>
    </Box>
  );
}
