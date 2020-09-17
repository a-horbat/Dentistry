import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FilterIcon from '@material-ui/icons/FilterListOutlined';
import Button from '@material-ui/core/Button';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import 'firebase/auth';
import CancelSearch from './Icons/CancelSearch';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `1px ${theme.palette.primary.main} solid`,
    textTransform: 'none',
    width: '110px',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: '4px',
  },
}));

export default ({
  searchText,
  setSearchText,
  filterOpen,
  filterControls,
  isFilterUsed,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const cancelSearch = () => {
    setSearchText('');
  };
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" width="100%">
        <TextField
          margin="dense"
          value={searchText}
          onChange={ev => setSearchText(ev.target.value)}
          variant="outlined"
          placeholder="Search"
          fullWidth
          classes={{ root: classes.input }}
        />
        <IconButton
          onClick={cancelSearch}
          style={{
            right: 45,
          }}
        >
          <CancelSearch />
        </IconButton>
      </Box>
      <Box>
        <Button
          classes={{ root: classes.button }}
          onClick={filterControls.setTrue}
          startIcon={
            <FilterIcon
              style={{
                color: theme.palette.primary.main,
              }}
            />
          }
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
};
