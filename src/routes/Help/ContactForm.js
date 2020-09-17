import React, { useState } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FormIcon from '../../assets/Icons/Help/Form';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CancelSearch from '../../assets/Icons/CancelSearch';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingBottom: '28px',
  },
  header: {
    paddingLeft: '32px',
    height: '69px',
    display: 'flex',
    alignItems: 'center',
  },
  formContainer: {
    marginLeft: '32px',
    width: '456px',
  },
  columnLabel: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#828282',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#FFFFFF',
    color: theme.palette.primary.main,
    border: `1px ${theme.palette.primary.main} solid`,
    textTransform: 'none',
    width: '176px',
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
  },
  buttonsContainer: {
    marginTop: '28px',
    display: 'flex',
  },
  disabledButton: {
    backgroundColor: '#FFFFFF',
    color: '#BDBDBD',
    border: `1px #BDBDBD solid`,
  },
}));

const ContactForm = () => {
  const classes = useStyles();

  const [emailText, setEmailText] = useState('');
  const [phoneText, setPhoneText] = useState('');
  const [messageText, setMessageText] = useState('');
  const [errorMailValidation, errorMailControl] = useBooleanControls(false);
  const [errorPhoneValidation, errorPhoneControl] = useBooleanControls(false);

  const isSendable = !!emailText && !!phoneText && !!messageText;

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <FormIcon />
        <Typography
          style={{
            marginTop: '6px',
            marginLeft: '16px',
            fontFamily: 'Comfortaa',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '22px',
            color: '#333333',
          }}
        >
          Contact us
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.formContainer}>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            if (isEmail(emailText)) {
              errorMailControl.setFalse();
            } else {
              errorMailControl.setTrue();
            }
            if (isMobilePhone(phoneText)) {
              errorPhoneControl.setFalse();
            } else {
              errorPhoneControl.setTrue();
            }
            //TO DO submit
          }}
        >
          <Box>
            <Typography className={classes.columnLabel}>Email</Typography>

            <TextField
              error={errorMailValidation}
              helperText={errorMailValidation ? 'Incorrect email.' : ''}
              fullWidth
              value={emailText}
              onChange={(ev) => {
                setEmailText(ev.target.value);
                if (errorMailValidation) errorMailControl.setFalse();
              }}
              id="outlined-basic"
              variant="outlined"
              placeholder="youremail@sample.com"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setEmailText('');
                      errorMailControl.setFalse();
                    }}
                  >
                    <CancelSearch />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Box mt={3}>
            <Typography className={classes.columnLabel}>Phone</Typography>
            <TextField
              error={errorPhoneValidation}
              helperText={errorPhoneValidation ? 'Incorrect phone.' : ''}
              value={phoneText}
              onChange={(ev) => {
                setPhoneText(ev.target.value);
                if (errorPhoneValidation) errorPhoneControl.setFalse();
              }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              placeholder="+7 0000 0000 0000"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setPhoneText('');
                      errorPhoneControl.setFalse();
                    }}
                  >
                    <CancelSearch />
                  </IconButton>
                ),
              }}
            />
          </Box>

          <Box mt={3}>
            <Typography className={classes.columnLabel}>
              Your message
            </Typography>
            <TextField
              value={messageText}
              onChange={(ev) => setMessageText(ev.target.value)}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              multiline
              rows={4}
              placeholder="Some description here"
              InputProps={{
                endAdornment: (
                  <IconButton
                    style={{
                      bottom: 29,
                    }}
                    onClick={() => setMessageText('')}
                  >
                    <CancelSearch />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Box className={classes.buttonsContainer}>
            <Button
              disabled={!isSendable}
              classes={{
                root: classes.button,
                disabled: classes.disabledButton,
              }}
              type="submit"
            >
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
