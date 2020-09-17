import { useBooleanControls } from '@base86inc/apollo-client';
import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MuiFab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Snackbar from '../../../components/Snackbar';
import uniq from 'lodash/uniq';
import 'firebase/auth';
import isEmail from 'validator/lib/isEmail';
import CancelSearch from '../../../components/Icons/CancelSearch';

export const Fab = withStyles(theme => ({
  root: {
    '&.Mui-disabled': {
      backgroundColor: '#FFCCC6',
      color: 'white',
    },
  },
}))(MuiFab);

export const InviteUserDrawer = ({
  inviteOpen,
  inviteControls,
  loading,
  error,
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [errorValidation, errorControl] = useBooleanControls(false);

  const cancelMail = () => {
    setEmail('');
    errorControl.setFalse();
  };

  const handleSubmit = ev => {
    if (ev) {
      ev.preventDefault();
    }
    if (email && !emails.length) {
      onSubmit([email]);
    } else if (emails.length) {
      onSubmit(emails);
    }
    valuesReset();
  };
  const handleAdd = ev => {
    if (ev) {
      ev.preventDefault();
    }
    if (isEmail(email)) {
      setEmails(uniq([].concat(emails).concat(email)));
      setEmail('');
      errorControl.setFalse();
    } else {
      errorControl.setTrue();
    }
  };
  const handleDelete = email => {
    setEmails(emails.filter(e => e !== email));
  };

  const valuesReset = () => {
    setEmail('');
    setEmails([]);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={inviteOpen}
      onClose={inviteControls.setFalse}
      onOpen={inviteControls.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: 'drawer-radius container' }}
    >
      <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
        <span className="drawer-notch"></span>Invite Users
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleAdd}>
          <TextField
            error={errorValidation}
            helperText={errorValidation ? 'Incorrect email.' : ''}
            value={email}
            onChange={ev => {
              setEmail(ev.target.value);
              if (errorValidation) errorControl.setFalse();
            }}
            label="Enter e-mail"
            variant="filled"
            InputProps={{
              endAdornment: (
                <IconButton onClick={cancelMail}>
                  <CancelSearch />
                </IconButton>
              ),
            }}
            fullWidth
          />
          <Box mt={3} mb={2} style={{ minHeight: 80 }}>
            {emails.map((label, i) => (
              <Chip
                color="primary"
                key={i}
                label={label}
                onDelete={() => handleDelete(label)}
                style={{ marginLeft: 4, marginBottom: 4 }}
              />
            ))}
          </Box>
        </form>
        <Snackbar message={error && error.message} variant="error" />
        <div style={{ paddingBottom: 120 }} />
      </DialogContent>
      <DialogActions className="bottom-actions" style={{ padding: 24 }}>
        <Fab color="secondary" onClick={inviteControls.setFalse}>
          <CloseIcon />
        </Fab>

        <Box flexGrow={1} />
        <Fab
          color="secondary"
          onClick={() => {
            inviteControls.setFalse();
            valuesReset();
          }}
        >
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        <Box pb={2.3} pr={2.3}>
          <Fab
            color="secondary"
            onClick={handleSubmit}
            disabled={emails.length === 0 || loading}
          >
            {loading ? (
              <CircularProgress
                size={16}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <CheckIcon />
            )}
          </Fab>
        </Box>
      </DialogActions>
    </SwipeableDrawer>
  );
};
