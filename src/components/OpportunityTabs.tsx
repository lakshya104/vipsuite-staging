'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import OfferAskComponent from './OfferAskComponent';
import en from '@/helpers/lang';

const TABS = [
  { section: 'offer', label: en.opportunities.offer },
  { section: 'ask', label: en.opportunities.ask },
];

const OpportunityTabs = ({ opportunity }: { opportunity: OpportunityDetails }) => {
  const [section, setSection] = useState<'offer' | 'ask'>('offer');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSection(TABS[newValue].section as 'offer' | 'ask');
  };

  const currentTabIndex = TABS.findIndex((tab) => tab.section === section) || 0;

  return (
    <>
      <Box>
        <Tabs
          value={currentTabIndex}
          onChange={handleChange}
          aria-label="opportunity tabs"
          className="opportunity__tabs"
        >
          {TABS.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box className="opportunity__details">
        <OfferAskComponent opportunity={opportunity} show={section} />
      </Box>
    </>
  );
};

export default OpportunityTabs;
