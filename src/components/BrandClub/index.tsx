import React from 'react';
import { ContentModule } from '@/interfaces/public-page';
import LeftImageContainer from '../LeftImageContainer';
import RightImageContainer from '../RightImageContainer';

interface BrandClubProps {
  data: ContentModule;
}

const BrandClub: React.FC<BrandClubProps> = ({ data }) => {
  return data?.content_blocks?.[0]?.image_position === 'left' ? (
    <LeftImageContainer data={data?.content_blocks[0]} />
  ) : (
    <RightImageContainer data={data?.content_blocks[0]} />
  );
};

export default BrandClub;
