import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const Base86Tabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#21C5C4',
  },
})(Tabs);

export const Base86Tab = withStyles((theme) => ({
  root: {
    minWidth: 72,
    marginRight: theme.spacing(4),
    fontfamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.001em',
    textTransform: 'uppercase',
    color: '#BDBDBD',
    transition: 'all 0.125s',
    '&:hover': {
      color: '#555555',
      opacity: 1,
    },
    '&$selected': {
      color: '#333333',
      fontWeight: 600,
    },
    '&:focus': {
      color: '#555555',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
