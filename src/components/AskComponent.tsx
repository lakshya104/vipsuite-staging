import React from 'react';
import Typography from '@mui/material/Typography';

const AskComponent = () => {
  return (
    <>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        Hi Barbie!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, culpa ullam quam unde assumenda iusto
        exercitationem necessitatibus, deleniti laboriosam sit tempore quo suscipit neque? Labore accusantium sapiente
        voluptas deleniti esse?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dolor voluptas adipisci vitae dicta
        molestiae eveniet officia reprehenderit, ea facere consequatur suscipit impedit deleniti autem quas animi sed.
        Nemo, nulla!
      </Typography>
    </>
  );
};

export default AskComponent;
