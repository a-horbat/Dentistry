import { useBooleanControls } from '@base86inc/apollo-client';
import { useUploadInvoicePhoto } from '@base86inc/apollo-client/build/src/components/UploadContent';
import Snackbar from '../../components/Snackbar';
import { useDisableScroll } from '../../components/hooks';
import PdfThumb, {
  loadPdf,
  loadPage,
  makePdfThumb,
} from '../../components/PdfThumb';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import MuiFab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { UploadField } from './Upload';
import 'firebase/auth';

export const Fab = withStyles(theme => ({
  root: {
    '&.Mui-disabled': {
      backgroundColor: '#FFCCC6',
      color: 'white',
    },
  },
}))(MuiFab);

function handlePdfFile(reader, canvasId, onError) {
  return loadPdf(reader.result)
    .then(loadPage(1))
    .then(makePdfThumb({ canvas: document.getElementById(canvasId) }))
    .catch(onError);
}

function imageReader(file, canvasId, onLoad, onError) {
  const reader = new FileReader();
  if (file.type === 'application/pdf') {
    reader.onload = () => handlePdfFile(reader, canvasId, onError);
    reader.onerror = onError;
    reader.readAsArrayBuffer(file);
  } else {
    reader.onload = ev => {
      onLoad(ev.target.result);
    };
    reader.onerror = onError;
    reader.readAsDataURL(file);
  }
}

export function InvoiceForm({ id, onSubmit, error, loading, setSubmitLocked }) {
  const [err, setErr] = useState('');
  const [imagePreview, setImagePreview] = useState(undefined);
  const [imageUrls, setImageUrls] = useState([]);
  if (imageUrls.length !== 0) setSubmitLocked.setFalse();
  else setSubmitLocked.setTrue();
  const [uploading, handleUpload] = useUploadInvoicePhoto(
    value => {
      setImageUrls(urls => urls.concat(value));
    },
    e => console.log('Upload err', e),
  );
  const onChange = ev => {
    handleUpload(ev);
    const fr = new FileReader();
    fr.onload = ev => {
      setImagePreview(ev.target.result);
    };
    fr.onerror = err => {
      console.log(err);
    };
    fr.readAsDataURL(ev.target.files[0]);
  };
  const handleRemove = index => () => {
    setImageUrls(urls => urls.filter((u, i) => i !== index));
  };
  const handleSubmit = ev => {
    try {
      setErr('');
      ev.preventDefault();
      if (!imageUrls.length) throw new Error('Image required');
      onSubmit({ imageUrl: imageUrls[0], imageUrls });
    } catch (e) {
      setErr(e.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} id={id}>
      <Box mb={2}>
        <UploadField
          name="main-image"
          onChange={onChange}
          value={imagePreview}
          style={{
            height: 200,
            borderRadius: 4,
          }}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="nowrap"
        style={{
          paddingTop: 4,
          overflowX: 'auto',
          scrollSnapType: 'both mandatory',
          scrollSnapAlign: 'start',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {imageUrls.map((url, i) => (
          <Badge
            key={i}
            overlap="circle"
            badgeContent={
              <IconButton
                onClick={handleRemove(i)}
                style={{ backgroundColor: '#f44336', marginRight: 8 }}
                size="small"
              >
                <CloseIcon style={{ color: '#fff', height: 16, width: 16 }} />
              </IconButton>
            }
          >
            <ButtonBase
              onClick={() => setImagePreview(url)}
              style={{
                borderRadius: 4,
                border: imagePreview === url ? '2px solid #21C5C4' : '',
                marginRight: 8,
                overflow: 'hidden',
              }}
            >
              {(url || '').toLowerCase().includes('.pdf') ? (
                <PdfThumb src={url} width={60} height={60} />
              ) : (
                <img
                  src={url}
                  alt={`Invoice ${i + 1}`}
                  style={{ width: 60, height: 60, objectFit: 'cover' }}
                />
              )}
            </ButtonBase>
          </Badge>
        ))}
        <UploadField
          name="thumb-image"
          uploading={uploading}
          onChange={onChange}
          style={{
            width: 60,
            height: 60,
            borderRadius: 4,
          }}
          placeholder={<AddIcon />}
        />
      </Box>
      <Snackbar message={error || err} variant="error" />
    </form>
  );
}

export const InvoiceScannerDrawer = ({
  scanOpen,
  scanControls,
  loading,
  error,
  onSubmit,
}) => {
  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);
  useDisableScroll(scanOpen);
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={scanOpen}
      onClose={scanControls.setFalse}
      onOpen={scanControls.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: 'drawer-radius container' }}
    >
      <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
        <span className="drawer-notch"></span>Scan invoice
      </DialogTitle>
      <DialogContent>
        <InvoiceForm
          id="submit-invoice"
          error={error && error.message}
          loading={loading}
          onSubmit={onSubmit}
          setSubmitLocked={setSubmitLocked}
        />
        <div style={{ paddingBottom: 80 }} />
      </DialogContent>
      <DialogActions className="bottom-actions" style={{ padding: 24 }}>
        <Fab color="secondary" onClick={scanControls.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        <Fab
          color="secondary"
          type="submit"
          form="submit-invoice"
          disabled={loading || isSubmitLocked}
        >
          <CheckIcon />
        </Fab>
      </DialogActions>
    </SwipeableDrawer>
  );
};
