import React, { Fragment } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import he from 'he';
import './InboxHeader/InboxHeader.scss';
import { MessageDetails } from '@/interfaces';
import { calculateRelativeTime, extractDate } from '@/helpers/utils';
import { ProgressBarLink } from './ProgressBar';
import MessageForm from '@/features/MessageForm';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface MessagesDetailProps {
  messageDetail: MessageDetails;
}

const MessagesDetail: React.FC<MessagesDetailProps> = ({ messageDetail }) => {
  return (
    <>
      <Container>
        <Typography className="page-title" variant="h2" align="center">
          <ProgressBarLink href={paths.root.inbox.getHref()} aria-label="Back to All Messages">
            <ArrowBackIcon />
          </ProgressBarLink>
          {he.decode(messageDetail?.product_name || '')}
        </Typography>
      </Container>
      <Box className="user-inbox message-detail order-details-page">
        <Container>
          <Box className="order-details-page">
            <Box className="inbox_content">
              {messageDetail.messages.map((message) => (
                <Fragment key={message?.id}>
                  <Typography variant="body1">{message?.content}</Typography>
                  <Typography className="inbox__date">
                    {calculateRelativeTime(message?.date_created?.date)} <span></span>
                    {extractDate(message?.date_created?.date)} <span></span>
                    {en.messageDetail.addedBy} {message?.added_by}
                  </Typography>
                </Fragment>
              ))}
            </Box>
            <MessageForm orderId={messageDetail?.order_id} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MessagesDetail;
