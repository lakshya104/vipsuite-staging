import React from 'react';
import { Button } from '@mui/material';

const ContinueToCartBtn = ({ onNext }: { onNext: () => void }) => {
  return (
    <Button className="button button--black" sx={{ width: 'full' }} onClick={onNext} fullWidth>
      Continue Order
    </Button>
  );
};

export default ContinueToCartBtn;
