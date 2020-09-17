import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CancelSearch from '../../assets/Icons/CancelSearch';
import isEmail from 'validator/lib/isEmail';
import uniq from 'lodash/uniq';
import ClearIcon from '@material-ui/icons/Clear';
import Base86Modal from '../../components/Modal';

const useStyles = makeStyles({
  chipRoot: {
    backgroundColor: '#828282',
    color: 'white',
  },
});

const InviteUsers = ({ submitEmails, close, open }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [errorValidation, errorControl] = useBooleanControls(false);

  const emailSubmitCheck = () => {
    if (email !== '') {
      if (isEmail(email)) {
        const arr = uniq([].concat(emails).concat(email));
        submitEmails(arr);
        errorControl.setFalse();
        close();
      } else {
        errorControl.setTrue();
      }
    } else if (emails.length !== 0) {
      submitEmails(emails);
      close();
    }
  };

  const cancelMail = () => {
    setEmail('');
    errorControl.setFalse();
  };

  const handleAdd = (ev) => {
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
  const handleDelete = (email) => {
    setEmails(emails.filter((e) => e !== email));
  };

  return (
    <Base86Modal
      title="Invite Users"
      open={open}
      onClose={close}
      submitText="Send Invite"
      size="s"
      onSubmit={emailSubmitCheck}
    >
      <form onSubmit={handleAdd}>
        <TextField
          error={errorValidation}
          helperText={errorValidation ? 'Incorrect email.' : ''}
          value={email}
          onChange={(ev) => {
            setEmail(ev.target.value);
            if (errorValidation) errorControl.setFalse();
          }}
          label="Enter e-mail"
          variant="outlined"
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
              key={i}
              label={label}
              onDelete={() => handleDelete(label)}
              deleteIcon={<ClearIcon style={{ color: 'white' }} />}
              style={{ marginLeft: 4, marginBottom: 4 }}
              classes={{ root: classes.chipRoot }}
            />
          ))}
        </Box>
      </form>
    </Base86Modal>
  );
};

export default InviteUsers;
