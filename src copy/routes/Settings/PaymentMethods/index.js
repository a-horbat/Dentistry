import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import MainMenu from '../../../components/Menu';
import { usePersistentMenuStyles } from '../../../components/Menu/usePersistentMenuStyles';
import Nav from '../../../components/Nav';
import PaymentMethodsIcon from '../../../components/MenuIcons/PaymentMethods';
import { AddPaymentMethodDrawer } from './AddPayment';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useBooleanControls } from '@base86inc/apollo-client';

export default () => {
  const classes = usePersistentMenuStyles();
  const [addPaymentOpen, addPaymentControls] = useBooleanControls(false);
  const onAddPayment = paymentCard => {
    console.log('onAddPayment', paymentCard);
  };
  return (
    <Box className={classes.mainContainer}>
      <Nav title="Payments" />
      <Box flexGrow={1} textAlign="center" pt={4}>
        <Typography style={{ color: '#bdbdbd' }}>
          <PaymentMethodsIcon style={{ height: 120, width: 120 }} />
        </Typography>
        <Typography variant="h6">There are no cards on file.</Typography>
        <Typography>Add a card.</Typography>
      </Box>
      <Hidden mdUp>
        <div style={{ paddingBottom: 120 }} />
        <div
          style={{
            position: 'fixed',
            padding: 24,
            bottom: 0,
            left: 0,
            zIndex: 11,
          }}
        >
          <MainMenu />
        </div>
      </Hidden>
      <div
        style={{
          position: 'fixed',
          padding: 24,
          bottom: 0,
          right: 0,
          zIndex: 11,
        }}
      >
        <Fab color="secondary" onClick={addPaymentControls.setTrue}>
          <AddIcon />
        </Fab>
      </div>
      <AddPaymentMethodDrawer
        open={addPaymentOpen}
        controls={addPaymentControls}
        onSubmit={onAddPayment}
      />
    </Box>
  );
};
