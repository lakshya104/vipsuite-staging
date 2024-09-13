import React from 'react';
import { DashboardContent } from '@/interfaces/brand';
import ReferCard from './ReferCard';

interface DashboardContentProps {
  dashboardContent: DashboardContent;
  totalFollowers: number;
}

const DashboardContentComponent: React.FC<DashboardContentProps> = ({ dashboardContent, totalFollowers }) => {
  return (
    <>
      <ReferCard
        heading={dashboardContent.rafer_vip_heading}
        text={dashboardContent.rafer_vip_short_description}
        href="/refer-a-vip"
        isPdf={false}
      />
      {totalFollowers >= 100000 && (
        <ReferCard
          heading={dashboardContent.make_request_heading}
          text={dashboardContent.make_request_short_description}
          href="/make-request"
          isPdf={false}
        />
      )}
    </>
  );
};

export default DashboardContentComponent;
