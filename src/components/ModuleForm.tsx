import { ContentModule } from '@/interfaces/public-page';
import React from 'react';
import BookDemo from './BookDemo';
import ContactUs from './ContactUs';

interface ModuleFormProps {
  data: ContentModule;
}
const ModuleForm: React.FC<ModuleFormProps> = ({ data }) => {
  if (data?.form_type === 'book-demo') {
    return <BookDemo data={data} />;
  } else {
    return <ContactUs data={data} />;
  }
};

export default ModuleForm;
