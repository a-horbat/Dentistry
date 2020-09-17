import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Edit from './Icons/Edit';
import ProductBtn from './Icons/ProductBtn';

const useStyles = makeStyles(theme => ({
  containerRoot: {
    backgroundColor: '#E5E5E5',
  },
  button: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `1px ${theme.palette.primary.main} solid`,
    textTransform: 'none',
    width: '110px',
  },
  addButton: {
    backgroundColor: '#f4edeb',
    color: '#FF8070',
    border: `1px #FF8070 solid`,
    textTransform: 'none',
    width: '110px',
  },
}));

export default ({ title, children }) => {
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        classes={{ root: classes.containerRoot }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            style={{
              display: 'flex',
              flexGrow: 1,
              fontWeight: 'bold',
              marginRight: 12,
              letterSpacing: 0,
              color: '#333333',
              fontSize: 34,
              fontFamily: 'Comfortaa',
            }}
          >
            {title}
          </Typography>
          <Box>
            <ProductBtn />
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box>{children}</Box>
          <Box ml={2}>
            <Button classes={{ root: classes.button }} startIcon={<Edit />}>
              Edit
            </Button>
          </Box>
          <Box ml={2}>
            <Button
              classes={{ root: classes.addButton }}
              startIcon={
                <AddIcon
                  style={{
                    color: '#FF8070',
                  }}
                />
              }
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
