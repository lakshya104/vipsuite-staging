'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, Tab, Box, Container } from '@mui/material';
import OrderListing from '../OrderListing';
import { Order } from '@/interfaces';
import MessageTab from '@/site-pages/MessageTab';
import './InboxTabs.scss';

type Tabs = {
  section: 'messages' | 'orders';
  label: string;
};

const TABS: Tabs[] = [
  { section: 'messages', label: 'Messages' },
  { section: 'orders', label: 'Orders' },
];

const InboxTabs = ({ order }: { order: Order[] }) => {
  const searchParams = useSearchParams();
  const isOrderTab = searchParams.get('isOrderTab');
  const [section, setSection] = useState<'messages' | 'orders'>(isOrderTab ? 'orders' : 'messages');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSection(TABS[newValue]?.section);
  };

  const currentSection = section;
  const currentTabIndex = TABS.findIndex((tab) => tab?.section === currentSection) || 0;

  const renderSection = () => {
    switch (section) {
      case 'messages':
        return <MessageTab />;
      case 'orders':
        return <OrderListing allOrders={order} />;
      default:
        return <MessageTab />;
    }
  };

  return (
    <>
      <Box>
        <Container>
          <Tabs value={currentTabIndex} onChange={handleChange} aria-label="profile tabs" className="opportunity__tabs">
            {TABS.map((tab) => (
              <Tab key={tab.section} label={tab.label} />
            ))}
          </Tabs>
        </Container>
      </Box>
      <Box>{renderSection()}</Box>
    </>
  );
};

export default InboxTabs;
