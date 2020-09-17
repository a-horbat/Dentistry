import React, { useContext } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useButtonStyles } from '../../../../MUIStyles/General';
import SendIcon from '../../../../assets/Icons/Send';
import SidebarContext from '../../../../utils/sidebarContext';
import { useHistory } from 'react-router-dom';
const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      position: 'fixed',
      bottom: 0,
      width: `calc(100% - ${props.sidebarOpen ? '225' : '73'}px)`,
      boxShadow: theme.shadows[27],
      backgroundColor: 'white',
      padding: '22px 32px',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    btnWrapper: {
      display: 'flex',
      alignItems: 'center',
      '& button:not(:last-child)': {
        marginRight: 24,
      },
    },
  }));

const QuoteEditFooter = ({ step, changeStep, lastStep, sendRequest }) => {
  const sidebarOpen = useContext(SidebarContext);
  const classes = useStyles({ sidebarOpen })();
  const btnClasses = useButtonStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Box className={classes.btnWrapper}>
        {step !== 0 && (
          <Button
            className={btnClasses.secondaryButton}
            onClick={() => {
              changeStep(step - 1);
            }}
          >
            Back
          </Button>
        )}
        <Button
          className={btnClasses.secondaryButton}
          onClick={() => {
            history.push('/quotes');
          }}
        >
          Cancel
        </Button>
      </Box>
      <Box className={classes.btnWrapper}>
        <Button className={btnClasses.secondaryButton}>Save as draft</Button>
        <Button
          variant="outlined"
          className={btnClasses.primaryButton}
          startIcon={
            step === lastStep ? <SendIcon style={{ fill: 'white' }} /> : null
          }
          onClick={
            step === lastStep
              ? sendRequest
              : () => {
                  changeStep(step + 1);
                }
          }
        >
          {step === lastStep ? 'Complete and send' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default QuoteEditFooter;
