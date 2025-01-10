import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './faq.scss';
import { ContentModule } from '@/interfaces/public-page';

interface FAQProps {
  data: ContentModule;
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  return (
    <Box component="main" className="site-main terms-page">
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Box className="accordion-container">
          {data.faqs.map((faq, index) => (
            <Accordion className="accordion-tab" key={index} sx={{ mb: 2 }}>
              <AccordionSummary className="accordion-title" expandIcon={<ExpandMoreIcon />}>
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordion-detail">
                <Typography>{faq.answer || 'Details will be provided soon.'}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
