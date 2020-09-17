import React, { useState, useEffect, useRef } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FilterIcon from '@material-ui/icons/FilterListOutlined';
import { useSearch } from '@elevatejs/material-crud-ui';
import CancelSearch from '../assets/Icons/CancelSearch';
import ProductBtn from '../assets/Icons/ProductBtn';
import Edit from '../assets/Icons/Edit';
import './Navigation.css';

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  buttonEdit: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `1px ${theme.palette.primary.main} solid`,
    textTransform: 'none',
    width: '110px',
    height: '44px',
  },
  buttonAddExpanded: {
    backgroundColor: 'rgb(244, 236, 234)',
    color: '#FF8070',
    border: `1px #FF8070 solid`,
    textTransform: 'none',
    width: '144px',
    height: '44px',
  },
  buttonAdd: {
    backgroundColor: 'rgb(244, 236, 234)',
    color: '#FF8070',
    border: `1px #FF8070 solid`,
    textTransform: 'none',
    width: '110px',
    height: '44px',
  },
  iconButtonAdd: {
    '& > span > div': {
      backgroundColor: 'rgb(244, 236, 234)',
      color: '#FF8070',
      border: `1px #FF8070 solid`,
      textTransform: 'none',
    },
  },
  disabledButton: {
    backgroundColor: theme.palette.background.default,
    color: '#BDBDBD',
    border: `1px #BDBDBD solid`,
  },
  disabledIconButton: {
    '& > span > div': {
      backgroundColor: theme.palette.background.default,
      color: '#BDBDBD',
      border: `1px #BDBDBD solid`,
    },
  },
  buttonShort: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `1px ${theme.palette.primary.main} solid`,
    textTransform: 'none',
    width: '44px',
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
  },
  headerShort: {
    marginLeft: 'auto',
  },
  changeViewContainer: {
    width: '279px',
    minHeight: '164px',
    backgroundColor: '#FFFFFF',
  },
  changeViewHeader: {
    height: '51px',
    borderBottom: '1px #E6E6E6 solid',
    paddingLeft: '20px',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default ({
  title,
  titleStyles,
  titleComponent,
  children,
  edit,
  add,
  filter = true,
  handleCancelSplit,
  editMode,
  viewExpand,
  changeView,
  changeViewValue,
  placeholder,
  addButtonText,
}) => {
  const useCollapsableStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      border: `1px ${theme.palette.primary.main} solid`,
      textTransform: 'none',
      width: '110px',
      height: '44px',
    },
    shortButton: {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      border: `1px ${theme.palette.primary.main} solid`,
      textTransform: 'none',
      width: '44px',
      height: '44px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
    },
    input: {
      backgroundColor: 'white',
      borderRadius: '4px',
      height: '45px',
      // width: shortVersion ? '200px' : '318px',
      width: '318px',
    },
    disabledButton: {
      backgroundColor: theme.palette.background.default,
      color: '#BDBDBD',
      border: `1px #BDBDBD solid`,
    },
    smallSearch: {
      '& > div': {
        width: 180,
      },
    },
  }));

  const classes = Object.assign(useStyles(), useCollapsableStyles());
  const [anchorEl, setAnchorEl] = useState(null);
  const openViewController = Boolean(anchorEl);
  const id = openViewController ? 'simple-popover' : undefined;
  const setViewClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const viewControllerClose = () => {
    setAnchorEl(null);
  };

  const [{ searchText }, { setSearchText }] = useSearch();

  const navigationRef = useRef();
  const titleRef = useRef();
  const searchRef = useRef();
  const [smallSearch, smallSearchControls] = useBooleanControls(false);
  const [smallFilter, smallFilterControls] = useBooleanControls(false);
  const [smallEdit, smallEditControls] = useBooleanControls(false);
  const [smallAdd, smallAddControls] = useBooleanControls(false);

  // const calculateWidth = () => {
  //   const navigationWidth = navigationRef.current.clientWidth;
  //   const titleWidth = titleRef.current.clientWidth;
  //
  //   const elements = [];
  //   elements.push({
  //     defaultWidth: 338,
  //     smallWidth: 180,
  //     controller: smallSearchControls,
  //     small: false,
  //   });
  //
  //   if (filter) {
  //     elements.push({
  //       defaultWidth: 110,
  //       smallWidth: 80,
  //       controller: smallFilterControls,
  //       small: false,
  //     });
  //   }
  //
  //   if (edit) {
  //     elements.push({
  //       defaultWidth: 126,
  //       smallWidth: 80,
  //       controller: smallEditControls,
  //       small: false,
  //     });
  //   }
  //
  //   if (add) {
  //     elements.push({
  //       defaultWidth: 126,
  //       smallWidth: 80,
  //       controller: smallAddControls,
  //       small: false,
  //     });
  //   }
  //
  //   const maxAvailableWidth = navigationWidth - titleWidth;
  //   let widthsSum = elements.reduce((sum, current) => {
  //     return sum + current.defaultWidth;
  //   }, 0);
  //   let i = elements.length - 1;
  //   elements.forEach(width => {
  //     width.small = false;
  //     width.controller.setFalse();
  //   });
  //   while (maxAvailableWidth < widthsSum) {
  //     if (i >= 0) {
  //       const width = elements[i];
  //       widthsSum -= width.defaultWidth;
  //       widthsSum += width.smallWidth;
  //       width.controller.setTrue();
  //       width.small = true;
  //       i--;
  //     }
  //   }
  // };

  return (
    <Box ref={navigationRef} style={{ marginBottom: 20 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        classes={{ root: classes.containerRoot }}
      >
        <Box
          display="flex"
          alignItems="center"
          ref={titleRef}
          style={editMode ? { minWidth: 275 } : {}}
        >
          {titleComponent ? (
            titleComponent
          ) : (
            <Typography
              style={{
                display: 'flex',
                flexGrow: 1,
                fontWeight: 'bold',
                marginRight: 12,
                letterSpacing: 0,
                color: '#333333',
                fontSize: 32,
                fontFamily: 'Comfortaa',
                whiteSpace: 'nowrap',
                ...titleStyles,
              }}
            >
              {editMode ? `Edit ${title}` : title}
            </Typography>
          )}

          {viewExpand ? (
            <IconButton onClick={(e) => setViewClick(e)}>
              <ProductBtn fill={openViewController ? '#21C5C4' : '#828282'} />
            </IconButton>
          ) : null}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          style={smallAdd ? { marginRight: -12 } : {}}
        >
          <Box
            display="flex"
            alignItems="center" /* width="100%" */
            ref={searchRef}
            className="nav-collapsable"
          >
            <TextField
              value={searchText}
              onChange={(ev) => setSearchText(ev.target.value)}
              variant="outlined"
              placeholder={placeholder ? placeholder : 'Search'}
              InputProps={{
                className: classes.input,
              }}
              className={`${classes.disabledInput} ${
                smallSearch ? classes.smallSearch : ''
              }`}
              style={{ marginRight: -24 }}
              disabled={editMode}
            />
            <IconButton
              style={{
                right: 21,
              }}
              onClick={() => setSearchText('')}
            >
              <CancelSearch />
            </IconButton>
          </Box>
          {filter ? (
            <Box className="nav-collapsable">
              {smallFilter ? (
                <IconButton
                  disabled={editMode}
                  className={`${editMode ? classes.disabledIconButton : ''}`}
                >
                  <Box classes={{ root: classes.shortButton }}>
                    <FilterIcon
                      style={{
                        color: 'inherit',
                      }}
                    />
                  </Box>
                </IconButton>
              ) : (
                <Button
                  classes={{
                    root: classes.button,
                    disabled: classes.disabledButton,
                  }}
                  disabled={editMode}
                  startIcon={
                    <FilterIcon
                      style={{
                        color: 'inherit',
                      }}
                    />
                  }
                >
                  Filter
                </Button>
              )}
            </Box>
          ) : null}
          {edit ? (
            <Box ml={smallEdit ? 0 : 2} className="nav-collapsable">
              {smallEdit ? (
                <IconButton
                  // disabled={editMode}
                  onClick={edit}
                  className={`${editMode ? classes.disabledIconButton : ''}`}
                >
                  <Box classes={{ root: classes.shortButton }}>
                    <Edit
                      style={{
                        color: 'inherit',
                      }}
                      fill="#21C5C4"
                    />
                  </Box>
                </IconButton>
              ) : (
                <Button
                  classes={{
                    root: classes.buttonEdit,
                    disabled: classes.disabledButton,
                  }}
                  startIcon={
                    <Edit
                      style={{
                        color: 'inherit',
                      }}
                      fill="#21C5C4"
                    />
                  }
                  // disabled={editMode}
                  onClick={edit}
                >
                  Edit
                </Button>
              )}
            </Box>
          ) : null}
          {add ? (
            <Box ml={smallAdd ? 0 : 2} className="nav-collapsable">
              {smallAdd ? (
                <IconButton
                  className={`${classes.iconButtonAdd} ${
                    editMode ? classes.disabledIconButton : ''
                  }`}
                  style={smallEdit && !smallFilter ? { marginLeft: -12 } : {}}
                  disabled={editMode}
                  onClick={add}
                >
                  <Box
                    classes={{ root: classes.shortButton }}
                    // style={{ marginLeft: -12 }}
                  >
                    <AddIcon
                      style={{
                        color: 'inherit',
                      }}
                    />
                  </Box>
                </IconButton>
              ) : (
                <Button
                  onClick={add}
                  classes={{
                    root: addButtonText
                      ? classes.buttonAddExpanded
                      : classes.buttonAdd,
                    disabled: classes.disabledButton,
                  }}
                  disabled={editMode}
                  startIcon={
                    <AddIcon
                      style={{
                        color: 'inherit',
                      }}
                    />
                  }
                >
                  {addButtonText ? addButtonText : 'Add'}
                </Button>
              )}
            </Box>
          ) : null}
        </Box>
      </Box>
      <Popover
        id={id}
        open={openViewController}
        onClose={viewControllerClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box classes={{ root: classes.changeViewContainer }}>
          <Box classes={{ root: classes.changeViewHeader }}>
            <Typography
              style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
              }}
            >
              Change View
            </Typography>
          </Box>
          <Box ml={1}>
            <RadioGroup>
              <List>
                {changeView &&
                  changeView.map((item) => (
                    <ListItem key={item.id}>
                      <FormControlLabel
                        checked={item.optionValue}
                        value={item.id}
                        control={<Radio color="primary" />}
                        onChange={() => changeViewValue(item.id)}
                      />
                      {item.optionName}
                    </ListItem>
                  ))}
              </List>
            </RadioGroup>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
