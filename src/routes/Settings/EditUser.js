import React, { useState } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Mail from '../../assets/Icons/Settings/Mail';
import Base86Modal from '../../components/Modal';
import isEmail from 'validator/lib/isEmail';

const useStyles = makeStyles({
  container: {
    minHeight: '358px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: '4px',
    height: '45px',
  },
  inputEmail: {
    paddingLeft: '35px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#828282',
  },
});

const EditUser = ({ id, email, onClose, open, editUser }) => {
  const classes = useStyles();
  const [firstNameText, setFirstNameText] = useState('');
  const [lastNameText, setLastNameText] = useState('');
  const [emailText, setEmailText] = useState(email);
  const [errorValidation, errorControl] = useBooleanControls(false);

  const checkSubmit = () => {
    if (isEmail(emailText)) {
      editUser(id, firstNameText, lastNameText, emailText);
      onClose();
    } else errorControl.setTrue();
  };

  return (
    <Base86Modal
      title="Edit user"
      open={open}
      onClose={onClose}
      submitText="Save"
      size="s"
      onSubmit={checkSubmit}
    >
      <Box className={classes.container}>
        <Box>
          <Typography className={classes.text}>First Name</Typography>
          <TextField
            value={firstNameText}
            onChange={(ev) => setFirstNameText(ev.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
          />
        </Box>
        <Box>
          <Typography className={classes.text}>Last Name</Typography>
          <TextField
            value={lastNameText}
            onChange={(ev) => setLastNameText(ev.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
          />
        </Box>
        <Box>
          <Typography className={classes.text}>Email</Typography>
          <Box display="flex" alignItems="center">
            <div
              style={{
                position: 'fixed',
                left: 45,
                zIndex: 10,
                marginBottom: errorValidation ? '18px' : '0',
              }}
            >
              <Mail />
            </div>
            <TextField
              error={errorValidation}
              helperText={errorValidation ? 'Incorrect email.' : ''}
              value={emailText}
              onChange={(ev) => {
                setEmailText(ev.target.value);
                if (errorValidation) errorControl.setFalse();
              }}
              variant="outlined"
              fullWidth
              InputProps={{
                className: cn(classes.input, classes.inputEmail),
              }}
            />
          </Box>
        </Box>
      </Box>
    </Base86Modal>
  );
};

export default EditUser;
