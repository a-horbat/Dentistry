import React, { useState } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cn from 'classnames';
import Fuse from 'fuse.js';

const useStyles = makeStyles({
  input: {
    paddingLeft: '10px',
    paddingRight: '40px',
    width: '268px',
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
  buttonPlus: {
    position: 'absolute',
    right: 1,
  },
  buttonExpand: {
    position: 'absolute',
    right: 13,
    top: 13,
  },
});

const DropDown = ({ value, setValue, optionsArr, onFocusCallback, table }) => {
  const [options, setOptions] = useState([]);
  const [cursor, setCursor] = useState(-1);

  const [isFocus, focusControl] = useBooleanControls(false);

  const classes = useStyles();

  const fuse = new Fuse(optionsArr, {});

  const textHandle = (text) => {
    const arr = [];
    fuse.search(text).forEach((el, index) => {
      if (index < 5) arr.push(optionsArr[el]);
    });
    setOptions(arr);
  };

  const isOptions = options.length !== 0;

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (cursor !== -1) {
          const text = options[cursor];
          setValue(text);
        } else if (isOptions) {
          const text = options[0];
          setValue(text);
        }
        setOptions([]);
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (cursor < options.length) setCursor(cursor + 1);
        if (cursor === options.length - 1) setCursor(-1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (cursor === -1) setCursor(options.length - 1);
        if (cursor > -1) setCursor(cursor - 1);
        break;

      case 'Escape':
        event.preventDefault();
        setOptions([]);
        break;
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <input
        type="text"
        className={cn(classes.input, {
          expandedInput: options.length !== 0,
          wrappedInput: options.length === 0,
        })}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          textHandle(ev.target.value);
        }}
        onKeyDown={handleKeyPress}
        onFocus={() => {
          focusControl.setTrue();
          if (onFocusCallback) {
            onFocusCallback();
          }
        }}
        onBlur={focusControl.setFalse}
      />
      {isFocus ? (
        <IconButton className={classes.buttonPlus}>
          <AddIcon style={{ color: '#828282' }} />
        </IconButton>
      ) : (
        <ExpandMoreIcon
          className={classes.buttonExpand}
          style={{ color: '#828282' }}
        />
      )}
      {isOptions && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: 56,
            right: table ? 45 : 0,
            width: '268px',
            backgroundColor: isOptions ? 'white' : 'inherit',
            borderLeft: isOptions ? '1px gray solid' : 'none',
            borderRight: isOptions ? '1px gray solid' : 'none',
            borderBottom: isOptions ? '1px gray solid' : 'none',
            borderBottomRightRadius: '6px',
            borderBottomLeftRadius: '6px',
          }}
        >
          <ClickAwayListener
            onClickAway={() => {
              if (isOptions) {
                const text = options[0];
                setValue(text);
              }
              setOptions([]);
            }}
          >
            <List>
              {options.map((suggestion, index) => {
                return (
                  <ListItem
                    style={{
                      backgroundColor: cursor === index ? '#F5F5F5' : 'inherit',
                    }}
                    key={suggestion}
                    onClick={() => {
                      setValue(suggestion);
                      setOptions([]);
                    }}
                  >
                    <ListItemText>{suggestion}</ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </ClickAwayListener>
        </div>
      )}
    </div>
  );
};

export default DropDown;
