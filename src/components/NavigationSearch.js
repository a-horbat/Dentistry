/*
import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FilterIcon from '@material-ui/icons/FilterListOutlined';
import Button from '@material-ui/core/Button';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import 'firebase/auth';
import { useSearch } from '@elevatejs/material-crud-ui';
import CancelSearch from '../assets/Icons/CancelSearch';
import './Navigation.css';

export default ({
  filterOpen,
  filterControls,
  isFilterUsed,
  shortVersion,
  split,
  editMode,
}) => {
  const [{ searchText }, { setSearchText }] = useSearch();
  const useStyles = makeStyles((theme) => ({
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
      backgroundColor: theme.palette.mainBackground.main,
      color: '#BDBDBD',
      border: `1px #BDBDBD solid`,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const cancelSearch = () => {
    setSearchText('');
  };

  if (!isFilterUsed) {
    return <></>;
  }
  return (
    <Box display="flex" alignItems="center">
      <Box
        display="flex"
        mr={shortVersion ? -4 : -3}
        alignItems="center"
      >
        <TextField
          value={searchText}
          onChange={(ev) => setSearchText(ev.target.value)}
          variant="outlined"
          placeholder="Search"
          fullWidth
          // style={{ width: `${split ? '100px' : 'auto'}` }}
          InputProps={{
            className: classes.input,
          }}
          classes={{ root: classes.disabledInput }}
          disabled={editMode}
        />
        <IconButton
          onClick={cancelSearch}
          style={{
            right: 45,
          }}
          disabled={editMode}
        >
          <CancelSearch />
        </IconButton>
      </Box>
      <Box>
        {false ? ( // shortVersion
          <IconButton>
            <Box classes={{ root: classes.shortButton }}>
              <FilterIcon
                style={{
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
          </IconButton>
        ) : (
          <Button
            classes={{ root: classes.button, disabled: classes.disabledButton }}
            onClick={filterControls.setTrue}
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
    </Box>
  );
};
*/
