import React from 'react';
import { isEmpty, isUndefined } from 'lodash';
import ReferCard from './ReferCard';
import { DashboardContent, DynamicFormRequests } from '@/interfaces';
import { Box } from '@mui/material';
import { useUserInfoStore } from '@/store/useStore';
import { UserRole } from '@/helpers/enums';

interface DashboardContentProps {
  dashboardContent: DashboardContent;
  showMakeRequest: boolean;
  formRequests: DynamicFormRequests[];
}

const DashboardContentComponent: React.FC<DashboardContentProps> = ({
  dashboardContent,
  showMakeRequest,
  formRequests,
}) => {
  const { userRoleStore } = useUserInfoStore();
  return (
    <Box className="gray-card gray-card--home" display="flex" justifyContent="space-between" gap={2.5}>
      {dashboardContent && (
        <>
          {userRoleStore !== UserRole.Brand && (
            <ReferCard
              type="refer"
              heading={dashboardContent?.refer_vip_heading}
              text={dashboardContent?.refer_vip_short_description}
              description={dashboardContent?.refer_vip_description}
            />
          )}
          {showMakeRequest && (
            <ReferCard
              type="make-request"
              heading={dashboardContent?.make_request_heading}
              text={dashboardContent?.make_request_short_description}
              description={dashboardContent?.make_request_description}
            />
          )}
        </>
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
