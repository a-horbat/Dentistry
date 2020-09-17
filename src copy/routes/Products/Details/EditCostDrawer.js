import React, { useState } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputBase from '@material-ui/core/InputBase';
import DialogActions from '@material-ui/core/DialogActions';
import Fab from '../../../components/Fab';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    boxBorder: {
      borderColor: '#EDEDED',
    },
  }),
);

const EditCostDrawer = ({
  editCostControl,
  editCostOpen,
  updateUnitCost,
  baseUnitCost,
}) => {
  const classes = useStyles();
  const [changedUnitCost, setChangedUnitCost] = useState(baseUnitCost);
  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);

  const unitCostChange = event => {
    const inputValue = event.target.value;

    if (inputValue == baseUnitCost || inputValue === '')
      setSubmitLocked.setTrue();
    else setSubmitLocked.setFalse();

    const lastChar = inputValue.substr(inputValue.length - 1);
    const regex = /^[0-9]+$/;

    let dotCount = 0;
    if (inputValue) {
      inputValue.split('').forEach(el => {
        if (el === '.') dotCount++;
      });
    }

    if (
      lastChar.match(regex) ||
      inputValue === '' ||
      (lastChar === '.' && dotCount < 2)
    )
      setChangedUnitCost(inputValue);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={editCostOpen}
      onClose={editCostControl.setFalse}
      onOpen={editCostControl.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: 'drawer-radius container' }}
    >
      <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
        <span className="drawer-notch"></span>Edit base unit cost
      </DialogTitle>
      <DialogContent>
        <Box mt={3} borderBottom={1} className={classes.boxBorder}>
          <Typography
            style={{
              color: 'grey',
              fontSize: 13,
            }}
          >
            Current base unit cost
          </Typography>
          <Typography>{`$${baseUnitCost}`}</Typography>
        </Box>
        <Box mt={3} mb={10} borderBottom={1} className={classes.boxBorder}>
          <Typography
            style={{
              color: 'grey',
              fontSize: 13,
            }}
          >
            New base unit cost
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography>$</Typography>
            <InputBase
              className={classes.margin}
              value={changedUnitCost}
              onChange={unitCostChange}
              inputProps={{ 'aria-label': 'naked' }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="bottom-actions">
        <Fab color="secondary" onClick={editCostControl.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        <Fab
          color="secondary"
          onClick={() => {
            updateUnitCost(changedUnitCost);
            editCostControl.setFalse();
          }}
          disabled={isSubmitLocked}
        >
          <CheckIcon />
        </Fab>
      </DialogActions>
    </SwipeableDrawer>
  );
};

export default EditCostDrawer;
