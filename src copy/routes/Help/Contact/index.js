import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import React, { useState } from 'react';
import MainMenu from '../../../components/Menu';
import { usePersistentMenuStyles } from '../../../components/Menu/usePersistentMenuStyles';
import Nav from '../../../components/Nav';
import ContactIcon from '../../../components/MenuIcons/ContactWUs';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import MuiFab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

export const Fab = withStyles(theme => ({
  root: {
    '&.Mui-disabled': {
      backgroundColor: '#FFCCC6',
      color: 'white',
    },
  },
}))(MuiFab);

export default () => {
  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);
  const [formContain, setFormContain] = useState({});
  const classes = usePersistentMenuStyles();
  const onSubmit = ev => {
    ev.preventDefault();
    console.log('On submit');
  };

  const textHandle = (event, field) => {
    setFormContain({ ...formContain, [field]: event.target.value });

    if (lockingChange({ ...formContain, [field]: event.target.value }))
      setSubmitLocked.setTrue();
    else setSubmitLocked.setFalse();
  };

  const lockingChange = obj =>
    !Boolean(obj['phone'] && obj['code'] && obj['message']);

  return (
    <Box className={classes.mainContainer}>
      <Nav title="Contact" />
      <Box flexGrow={1} textAlign="center" pt={2} px={2}>
        <form id="contact-form" onSubmit={onSubmit}>
          <TextField
            name="phone"
            label="Your Phone"
            fullWidth
            margin="normal"
            onChange={ev => textHandle(ev, 'phone')}
          />
          <TextField
            name="code"
            label="Confirmation Code"
            fullWidth
            margin="normal"
            onChange={ev => textHandle(ev, 'code')}
          />
          <TextField
            name="message"
            label="Your Message"
            multiline
            fullWidth
            rows={5}
            margin="normal"
            onChange={ev => textHandle(ev, 'message')}
          />
        </form>
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
        <Fab
          color="secondary"
          type="submit"
          form="contact-form"
          disabled={isSubmitLocked}
        >
          <CheckIcon />
        </Fab>
      </div>
    </Box>
  );
};
