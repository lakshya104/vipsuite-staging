import React, { Fragment } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import he from 'he';
import './MessageDetail.scss';
import { MessageDetails, MessageObject } from '@/interfaces';
import { calculateRelativeTime, extractDate } from '@/helpers/utils';
import { ProgressBarLink } from '../ProgressBar';
import MessageForm from '@/features/MessageForm';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface MessagesDetailProps {
  messageDetail: MessageDetails;
}

export const linkifyText = (raw?: string) => {
  if (!raw) return null;

  const decoded = he.decode(raw);
  const urlRegex = /((?:https?:\/\/|www\.)[^\s]+)/gi;

  return decoded.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      const href = part.startsWith('www.') ? `https://${part}` : part;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

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
              {messageDetail.messages.map((message: MessageObject) => (
                <Fragment key={message?.id}>
                  <Typography variant="body1">{linkifyText(message?.content)}</Typography>
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
