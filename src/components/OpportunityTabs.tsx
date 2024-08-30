'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import OfferComponent from './OfferComponent';
import AskComponent from './AskComponent';

const TABS = [
  { section: 'offer', label: 'The Offer' },
  { section: 'ask', label: 'The Ask' },
];

const OpportunityTabs: React.FC = () => {
  const [section, setSection] = useState('offer');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSection(TABS[newValue].section);
  };

  const currentTabIndex = TABS.findIndex((tab) => tab.section === section) || 0;

  const renderSection = () => {
    switch (section) {
      case 'offer':
        return <OfferComponent />;
      case 'ask':
        return <AskComponent />;
      default:
        return <OfferComponent />;
    }
  };

  return (
    <>
      <Box>
        <Tabs
          value={currentTabIndex}
          onChange={handleChange}
          aria-label="opportunity tabs"
          className="opportunity__tabs"
        >
          {TABS.map((tab) => (
            <Tab key={tab.section} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box className="opportunity__details">{renderSection()}</Box>
    </>
  );
};

export default OpportunityTabs;
