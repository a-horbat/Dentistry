import React, { useState, useEffect } from "react";
import { useBooleanControls } from "@base86inc/apollo-client";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputBase from "@material-ui/core/InputBase";
import DialogActions from "@material-ui/core/DialogActions";

import Fab from "../../../components/MuiFab";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    boxBorder: {
      borderColor: "#EDEDED",
    },
  })
);

const EditOrganizationDrawer = ({
  editOrgOpen,
  editOrgControls,
  organizationName,
  changeOrganizationName,
}) => {
  const classes = useStyles();
  const [changedName, setChangedName] = useState(organizationName);
  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={editOrgOpen}
      onClose={editOrgControls.setFalse}
      onOpen={editOrgControls.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: "drawer-radius container" }}
    >
      <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
        <span className="drawer-notch"></span>Edit Organization
      </DialogTitle>
      <DialogContent>
        <Box mt={3} borderBottom={1} className={classes.boxBorder}>
          <Typography
            style={{
              color: "grey",
              fontSize: 13,
            }}
          >
            Current organization name
          </Typography>
          <Typography>{organizationName}</Typography>
        </Box>
        <Box mt={3} mb={10} borderBottom={1} className={classes.boxBorder}>
          <Typography
            style={{
              color: "grey",
              fontSize: 13,
            }}
          >
            New organization name
          </Typography>
          <InputBase
            className={classes.margin}
            value={changedName}
            onChange={(event) => {
              if (event.target.value !== organizationName)
                setSubmitLocked.setFalse();
              else setSubmitLocked.setTrue();
              setChangedName(event.target.value);
            }}
            inputProps={{ "aria-label": "naked" }}
          />
        </Box>
      </DialogContent>
      <DialogActions className="bottom-actions">
        <Fab color="secondary" onClick={editOrgControls.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        <Fab
          color="secondary"
          onClick={() => {
            changeOrganizationName(changedName);
            editOrgControls.setFalse();
          }}
          disabled={isSubmitLocked}
        >
          <CheckIcon />
        </Fab>
      </DialogActions>
    </SwipeableDrawer>
  );
};

export default EditOrganizationDrawer;
