import React from 'react';
import { isEmpty, isUndefined } from 'lodash';
import ReferCard from './ReferCard';
import { DashboardContent, DynamicFormRequests } from '@/interfaces';
import { Box } from '@mui/material';
import { UserRole } from '@/helpers/enums';

interface DashboardContentProps {
  dashboardContent: DashboardContent;
  formRequests: DynamicFormRequests[];
  userRole: UserRole | null;
}

const DashboardContentComponent: React.FC<DashboardContentProps> = ({ dashboardContent, formRequests, userRole }) => {
  return (
    <Box className="gray-card gray-card--home" display="flex" justifyContent="space-between" gap={2.5}>
      {dashboardContent && userRole && userRole !== UserRole.Brand && (
        <ReferCard
          type="refer"
          heading={dashboardContent?.refer_vip_heading}
          text={dashboardContent?.refer_vip_short_description}
          description={dashboardContent?.refer_vip_description}
        />
      )}
      {!isUndefined(formRequests) &&
        !isEmpty(formRequests) &&
        formRequests.map((request, index) => (
          <ReferCard type="others" key={index} heading={request.title} text={request.description} />
        ))}
    </Box>
  );
};

export default DashboardContentComponent;
