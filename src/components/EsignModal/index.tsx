'use client';
import React, { useState, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SignatureCanvas from 'react-signature-canvas';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';
import en from '@/helpers/lang';

interface EsignModalProps {
  // eslint-disable-next-line no-unused-vars
  onESignChange: (signature: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleESignModel: (open: boolean) => void;
  ESignOpen: boolean;
}
const EsignModal: React.FC<EsignModalProps> = ({ onESignChange, handleESignModel, ESignOpen }) => {
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const sigPadRef = useRef<SignatureCanvas | null>(null);
  const handleClose = () => {
    handleESignModel(false);
  };

  const handleClear = () => {
    sigPadRef.current?.clear();
    onESignChange('');
  };

  const handleSave = () => {
    if (!sigPadRef?.current.isEmpty()) {
      const result = sigPadRef.current?.getTrimmedCanvas().toDataURL('image/png');
      const signature = result.replace(/^data:[^;]+;base64,/, '');
      onESignChange(signature);
    } else {
      setToasterType('error');
      openToaster(en.eSign.addSignature);
    }
  };

  return (
    <>
      <Dialog open={ESignOpen} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, ml: 1 }}>
          {en.eSign.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ marginBottom: '16px', color: 'text.secondary' }}>
            {en.eSign.description}
          </Typography>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
              height: '300px',
              overflow: 'hidden',
              marginBottom: '8px',
            }}
          >
            <SignatureCanvas
              backgroundColor="white"
              ref={sigPadRef}
              penColor="black"
              canvasProps={{ width: 550, height: 300, className: 'sigCanvas' }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            padding: '16px',
          }}
        >
          <Button
            onClick={handleClear}
            className="button button--black"
            sx={{ textTransform: 'none', margin: '0 8px' }}
          >
            {en.eSign.clear}
          </Button>
          <Button
            onClick={handleSave}
            className="button button--black"
            sx={{ textTransform: 'none', margin: '12px 8px' }}
          >
            {en.eSign.submit}
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </>
  );
};

export default EsignModal;
