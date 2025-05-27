import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MessageLink from '../MessageLink';
import './Messages.scss';
import { MessageArray } from '@/interfaces';
import { calculateRelativeTime } from '@/helpers/utils';
import { isEmpty, map } from 'lodash';
import ErrorFallback from '../ErrorFallback';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface MessagesProps {
  messageData: MessageArray[];
}

const Messages: React.FC<MessagesProps> = ({ messageData }) => {
  if (isEmpty(messageData)) {
    return (
      <ErrorFallback
        errorMessage={en.listEmptyMessage.noMessageData}
        hideSubtext={true}
        subtext={en.listEmptyMessage.addItemMessage}
      />
    );
  }

  return (
    <Box className="message__items">
      {map(messageData, (message) => (
        <Link prefetch={false} href={paths.root.messageDetails.getHref(message?.order_id)} key={message?.order_id}>
          <Box
            className="message__item"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            p={2}
            borderBottom="1px solid #E0E0E0"
          >
            <Box>
              <MessageLink
                title={message?.product_name}
                imageLink={message?.product_image}
                orderedFor={message?.order_created_for}
              />
              <Typography
                variant="body1"
                pt={2}
                color="textSecondary"
                sx={{
                  fontWeight: message?.read_by_customer === 0 ? 700 : 400,
                }}
              >
                {message?.last_message}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {calculateRelativeTime(message?.last_updated?.date)}
              </Typography>
            </Box>
            <ArrowForwardIcon />
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Messages;
