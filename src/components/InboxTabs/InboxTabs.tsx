'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, Tab, Box, Container } from '@mui/material';
import OrderListing from '../OrderListing';
import { MessageDetails, Order } from '@/interfaces';
import './InboxTabs.scss';
import Messages from '../Messages';

type Tabs = {
  section: 'messages' | 'orders';
  label: string;
};

const TABS: Tabs[] = [
  { section: 'messages', label: 'Messages' },
  { section: 'orders', label: 'Orders' },
];

interface InboxTabsProps {
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  order: Order[];
  messageData: MessageDetails[];
}

const InboxTabs: React.FC<InboxTabsProps> = ({ order, totalPages, currentPage, messageData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOrderTab = searchParams.get('isOrderTab');
  const [section, setSection] = useState<'messages' | 'orders'>(isOrderTab ? 'orders' : 'messages');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const selectedSection = TABS[newValue].section;
    setSection(selectedSection);
    const params = new URLSearchParams(searchParams.toString());
    if (selectedSection === 'orders') {
      params.set('isOrderTab', 'true');
    } else {
      params.delete('isOrderTab');
    }
    router.push(`?${params.toString()}`);
  };

  const renderSection = () => {
    if (section === 'orders') {
      return <OrderListing allOrders={order} totalPages={totalPages} currentPage={currentPage} />;
    }
    return (
      <Box component={'main'} className="landing-page">
        <Container>
          <Messages messageData={messageData} />
        </Container>
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Container>
          <Tabs
            value={TABS.findIndex((tab) => tab.section === section)}
            onChange={handleChange}
            aria-label="profile tabs"
            className="opportunity__tabs"
          >
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
