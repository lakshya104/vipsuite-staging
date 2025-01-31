import React from 'react';
import { Button } from '@mui/material';
import en from '@/helpers/lang';

const ContinueToCartBtn = ({ onNext }: { onNext: () => void }) => {
  return (
    <Button className="button button--black" sx={{ width: 'full' }} onClick={onNext} fullWidth>
      {en.basket.continue}
    </Button>
  );
};

export default ContinueToCartBtn;
