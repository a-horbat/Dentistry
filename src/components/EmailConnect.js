import React, { useState } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Box from '@material-ui/core/Box';
import isEmail from 'validator/lib/isEmail';
import CancelSearch from '../assets/Icons/CancelSearch';

export const EmailConnect = React.memo(
  ({ onSubmit, btnText, loading = true }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passVisible, passVisibleControls] = useBooleanControls(false);
    const [errorValidation, errorControl] = useBooleanControls(false);

    const cancelMail = () => {
      setEmail('');
      errorControl.setFalse();
    };

    return (
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (isEmail(email)) {
            onSubmit(email, password);
            errorControl.setFalse();
          } else {
            errorControl.setTrue();
          }
        }}
      >
        <TextField
          error={errorValidation}
          helperText={errorValidation ? 'Incorrect email.' : ''}
          margin="normal"
          value={email}
          label="Email"
          onChange={(ev) => {
            setEmail(ev.target.value);
            if (errorValidation) errorControl.setFalse();
          }}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton onClick={cancelMail}>
                <CancelSearch />
              </IconButton>
            ),
          }}
        />
        <TextField
          margin="normal"
          type={passVisible ? 'text' : 'password'}
          value={password}
          label="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={passVisibleControls.toggle}>
                {passVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
          fullWidth
        />
        <Box mt={2}>
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            color="secondary"
            style={{ height: 40, borderRadius: 20 }}
          >
            <Box display="flex" alignItems="center">
              <Typography>{btnText}</Typography>
              {loading ? (
                <Box ml={1}>
                  <CircularProgress size={16} color="inherit" />
                </Box>
              ) : null}
            </Box>
          </Button>
        </Box>
      </form>
    );
  },
);
