import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import cn from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '../../assets/Icons/Settings/Home';
import isEqual from 'lodash/isEqual';
import usePlacesAutocomplete from 'use-places-autocomplete';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Base86Modal from '../../components/Modal';
import './style.css';

const useStyles = makeStyles({
  container: {
    minHeight: '252px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  input: {
    paddingLeft: '10px',
    width: '456px',
    height: '56px',
    border: '1px solid #E6E6E6',
    borderRadius: '6px',
    outline: 'none',
  },
  inputAddress: {
    paddingLeft: '40px',
    width: '456px',
    height: '56px',
    border: '1px solid #E6E6E6',
    borderRadius: '6px',
    outline: 'none',
  },
  wrappedInput: {
    '&:focus': {
      border: '5px solid #333333',
    },
  },
  expandedInput: {
    '&:focus': {
      border: '5px solid red',
    },
  },
  text: {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#828282',
  },
});

const EditOrganization = ({
  orgAddress,
  orgName,
  open,
  onClose,
  editOrganizationSubmit,
}) => {
  const classes = useStyles();
  const [nameText, setTextName] = useState(orgName);
  const [addressText, setAddressText] = useState(orgAddress);

  const [suggestionsArr, setSuggestionsArr] = useState({
    data: [],
    cursor: -1,
  });
  const [focusedInput, setFocusedInput] = useState(''); // name or address
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const getAddress = (suggestion) => {
    let result = '';
    suggestion.terms.forEach((element) => {
      if (element.offset !== 0) result += element.value + ' ';
    });
    return result;
  };

  if (!isEqual(data, suggestionsArr.data))
    setSuggestionsArr({ data, cursor: -1 });

  const handleAddressInput = (e) => {
    setValue(e.target.value);
    setAddressText(e.target.value);
  };

  const handleNameInput = (e) => {
    setValue(e.target.value);
    setTextName(e.target.value);
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (focusedInput === 'name' && suggestionsArr.cursor !== -1) {
          const orgApiName = suggestionsArr.data[
            suggestionsArr.cursor
          ].terms.find((el) => el.offset === 0).value;
          setTextName(orgApiName);
        }
        //        setAddressText(suggestionsArr.data[suggestionsArr.cursor].description);
        setAddressText(getAddress(suggestionsArr.data[suggestionsArr.cursor]));
        setValue('');
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (suggestionsArr.cursor < suggestionsArr.data.length)
          setSuggestionsArr({
            ...suggestionsArr,
            ['cursor']: ++suggestionsArr.cursor,
          });

        if (suggestionsArr.cursor === suggestionsArr.data.length)
          setSuggestionsArr({
            ...suggestionsArr,
            ['cursor']: -1,
          });

        /* if (suggestionsArr.cursor === suggestionsArr.data.length)
          setAddressText(value);
        //cursor before changing
        else
          setAddressText(
            suggestionsArr.data[suggestionsArr.cursor].description,
          );*/
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (suggestionsArr.cursor === -1)
          setSuggestionsArr({
            ...suggestionsArr,
            ['cursor']: suggestionsArr.data.length - 1,
          });

        if (suggestionsArr.cursor > -1)
          setSuggestionsArr({
            ...suggestionsArr,
            ['cursor']: --suggestionsArr.cursor,
          });

        /*if (suggestionsArr.cursor === -1) setAddressText(value);
        //cursor before changing
        else
          setAddressText(
            suggestionsArr.data[suggestionsArr.cursor].description,
          );*/
        break;
      case 'Escape':
        event.preventDefault();
        setValue('');
        break;
    }
  };

  const handleClickAway = () => {
    setValue('');
  };

  return (
    <Base86Modal
      title="Edit Organization"
      open={open}
      onClose={onClose}
      submitText="Save"
      size="s"
      modalType="changeOrganization"
      onSubmit={() => {
        editOrganizationSubmit(nameText, addressText);
        onClose();
      }}
    >
      <Box className={classes.container}>
        <Box>
          <Typography className={classes.text}>Organization name</Typography>
          <input
            value={nameText}
            onChange={handleNameInput}
            className={cn(classes.input, {
              expandedInput: data.length !== 0,
              wrappedInput: data.length === 0,
            })}
            onKeyDown={handleKeyPress}
            onFocus={() => {
              setFocusedInput('name');
            }}
          />
          {focusedInput === 'name' ? (
            <div
              style={{
                position: 'absolute',
                zIndex: 100,
                top: '40%',
                left: 32,
                right: 0,
                width: '456px',
                backgroundColor: data.length !== 0 ? 'white' : 'inherit',
                borderLeft: data.length !== 0 ? '1px gray solid' : 'none',
                borderRight: data.length !== 0 ? '1px gray solid' : 'none',
                borderBottom: data.length !== 0 ? '1px gray solid' : 'none',
                borderBottomRightRadius: '6px',
                borderBottomLeftRadius: '6px',
              }}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <List>
                  {data.map((suggestion, index) => {
                    const orgApiName = suggestion.terms.find(
                      (el) => el.offset === 0,
                    ).value;
                    return (
                      <ListItem
                        style={{
                          backgroundColor:
                            suggestionsArr.cursor === index
                              ? '#F5F5F5'
                              : 'inherit',
                        }}
                        key={suggestion.description}
                        onClick={() => {
                          setTextName(orgApiName);
                          setAddressText(getAddress(suggestion));
                          setValue('');
                        }}
                      >
                        <ListItemText>{orgApiName}</ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </ClickAwayListener>
            </div>
          ) : null}
        </Box>
        <Box>
          <Typography className={classes.text}>Organization Address</Typography>
          <Box display="flex" flexDirection="column" width="100%">
            <Box display="flex" alignItems="center">
              <div
                style={{
                  position: 'fixed',
                  left: 45,
                  zIndex: 10,
                }}
              >
                <Home />
              </div>
              <input
                value={addressText}
                onChange={handleAddressInput}
                variant="outlined"
                className={cn(classes.inputAddress, {
                  expandedInput: data.length !== 0,
                  wrappedInput: data.length === 0,
                })}
                onKeyDown={handleKeyPress}
                onFocus={() => {
                  setFocusedInput('address');
                }}
              />
              {focusedInput === 'address' ? (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: '70%',
                    left: 32,
                    right: 0,
                    width: '456px',
                    backgroundColor: data.length !== 0 ? 'white' : 'inherit',
                    borderLeft: data.length !== 0 ? '1px gray solid' : 'none',
                    borderRight: data.length !== 0 ? '1px gray solid' : 'none',
                    borderBottom: data.length !== 0 ? '1px gray solid' : 'none',
                    borderBottomRightRadius: '6px',
                    borderBottomLeftRadius: '6px',
                  }}
                >
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <List>
                      {data.map((suggestion, index) => {
                        return (
                          <ListItem
                            style={{
                              backgroundColor:
                                suggestionsArr.cursor === index
                                  ? '#F5F5F5'
                                  : 'inherit',
                            }}
                            key={suggestion.description}
                            onClick={() => {
                              setAddressText(getAddress(suggestion));
                              setValue('');
                            }}
                          >
                            <ListItemText>
                              {getAddress(suggestion)}
                            </ListItemText>
                          </ListItem>
                        );
                      })}
                    </List>
                  </ClickAwayListener>
                </div>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </Base86Modal>
  );
};

export default EditOrganization;
