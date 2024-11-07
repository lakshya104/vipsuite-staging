import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MessageLink from '../MessageLink';
import './Messages.scss';
import { ProgressBarLink } from '../ProgressBar';

const Messages = () => {
  const messages = [
    {
      id: 1,
      title: 'Title of the message goes here',
      excerpt: 'Short snippet of the message is shown here as an excerpt. Lorem ipsum dolor sit amet, id scripserit...',
      timeAgo: '1hr ago',
    },
    {
      id: 2,
      title: 'Title of the message goes here',
      excerpt: 'Short snippet of the message is shown here as an excerpt. Lorem ipsum dolor sit amet, id scripserit...',
      timeAgo: '12hrs ago',
    },
    {
      id: 3,
      title: 'Title of the message goes here',
      excerpt: 'Short snippet of the message is shown here as an excerpt. Lorem ipsum dolor sit amet, id scripserit...',
      timeAgo: '3 days ago',
    },
    {
      id: 4,
      title: 'Title of the message goes here',
      excerpt: 'Short snippet of the message is shown here as an excerpt. Lorem ipsum dolor sit amet, id scripserit...',
      timeAgo: '7 days ago',
    },
  ];

  return (
    <Container>
      <Box className="message__items">
        {messages.map((message) => (
          <ProgressBarLink href={`/messages/${message.id}`} key={message.id}>
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
                <MessageLink />
                <Typography variant="h2">{message.title}</Typography>
                <Typography variant="body1" color="textSecondary">
                  {message.excerpt}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {message.timeAgo}
                </Typography>
              </Box>
              <ArrowForwardIcon />
            </Box>
          </ProgressBarLink>
        ))}
      </Box>
    </Container>
  );
};

export default Messages;
