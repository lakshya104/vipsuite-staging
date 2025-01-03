import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MessageLink from '../MessageLink';
import './Messages.scss';
import { ProgressBarLink } from '../ProgressBar';
import { MessageArray } from '@/interfaces';
import { calculateRelativeTime } from '@/helpers/utils';
import { isEmpty } from 'lodash';
import ErrorFallback from '../ErrorFallback';
import en from '@/helpers/lang';

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
  console.log({ messageData });

  return (
    <Box className="message__items">
      {messageData.map((message) => (
        <ProgressBarLink href={`/messages/${message?.order_id}`} key={message?.order_id}>
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
              <MessageLink title={message?.product_name} imageLink={message?.product_image} />
              <Typography variant="body1" pt={2} color="textSecondary">
                {message?.last_message}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {calculateRelativeTime(message?.last_updated?.date)}
              </Typography>
            </Box>
            <ArrowForwardIcon />
          </Box>
        </ProgressBarLink>
      ))}
    </Box>
  );
};

export default Messages;
