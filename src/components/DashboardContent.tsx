import React from 'react';
import { isUndefined } from 'lodash';
import ReferCard from './ReferCard';
import { DashboardContent } from '@/interfaces';
import { Box } from '@mui/material';

interface DashboardContentProps {
  dashboardContent: DashboardContent;
  totalFollowers?: number;
}

const DashboardContentComponent: React.FC<DashboardContentProps> = ({ dashboardContent, totalFollowers }) => {
  return (
    <Box className="gray-card" display="flex" justifyContent="space-between" gap={2.5}>
      <ReferCard
        heading={dashboardContent?.rafer_vip_heading}
        text={dashboardContent?.rafer_vip_short_description}
        href="/refer-a-vip"
        isPdf={false}
      />
      {!isUndefined(totalFollowers) && totalFollowers > 100000 && (
        <ReferCard
          heading={dashboardContent?.make_request_heading}
          text={dashboardContent?.make_request_short_description}
          href="/make-request"
          isPdf={false}
        />
      )}
    </Box>
  );
};

export default DashboardContentComponent;
