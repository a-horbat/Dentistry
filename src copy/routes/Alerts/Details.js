import React from 'react';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import 'firebase/auth';
import get from 'lodash/get';
import { useDisableScroll } from '../../components/hooks';
import { AlertItemBadge } from './List';

export const AlertDetailsDrawer = ({
  alert,
  alertOpen,
  alertControls,
  onIgnoreAlert,
  onViewInvoices,
}) => {
  useDisableScroll(alertOpen);
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={alertOpen}
      onClose={alertControls.setFalse}
      onOpen={alertControls.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: 'drawer-radius container h-80vh' }}
    >
      <DialogContent>
        <span className="drawer-notch"></span>
        <AlertDetails
          alert={alert}
          onIgnoreAlert={onIgnoreAlert}
          onViewInvoices={onViewInvoices}
        />
      </DialogContent>
      <DialogActions className="bottom-actions" style={{ padding: 24 }}>
        <Fab color="secondary" onClick={alertControls.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
      </DialogActions>
    </SwipeableDrawer>
  );
};

export const AlertDetails = ({ alert, onIgnoreAlert, onViewInvoices }) => {
  const status = get(alert, 'product.status');
  const productName = get(alert, 'product.name') || status;
  return (
    <>
      {alert && (
        <ListItem disableGutters={true}>
          <ListItemAvatar>
            <AlertItemBadge product={get(alert, 'product')} />
          </ListItemAvatar>
          <Box width={'100%'}>
            <ListItemText primary={productName} />
            <Divider />
          </Box>
        </ListItem>
      )}
      <Box my={3}>
        <Typography>
          Your cost went up by 22% over the previous invoice from this vendor.
          Others are paying an average of $3.47 / lb.
        </Typography>
      </Box>
      {onViewInvoices ? (
        <Box mb={3}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={() => onViewInvoices(get(alert, 'product'))}
            style={{ borderRadius: 30 }}
          >
            View Invoices
          </Button>
        </Box>
      ) : null}
      {onIgnoreAlert ? (
        <Box mb={3}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={onIgnoreAlert}
            style={{ borderRadius: 30 }}
          >
            Ignore
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export const IgnoreAlertDrawer = ({ ignoreAlertOpen, ignoreAlertControls }) => {
  return (
    <Dialog open={ignoreAlertOpen} onClose={ignoreAlertControls.setFalse}>
      <DialogContent>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h6">Ignore Alert?</Typography>
          </Box>
        </Box>
        <Typography>
          Ignore all future alerts for this product? Not recommended for high
          value products.
        </Typography>
        <div style={{ height: 80 }} />
      </DialogContent>
      <DialogActions className="bottom-actions">
        <Fab color="secondary" onClick={ignoreAlertControls.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
      </DialogActions>
    </Dialog>
  );
};

export function currencySymbol(unit) {
  switch (unit) {
    case 'USD':
      return '$';
    default:
      return '$';
  }
}
