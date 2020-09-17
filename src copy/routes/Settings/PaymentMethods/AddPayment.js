import { useBooleanControls } from "@base86inc/apollo-client";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MuiFab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import CancelSearch from "../../../components/Icons/CancelSearch";
import IconButton from "@material-ui/core/IconButton";

export const useSelectManyControls = initial => {
  const [selected, setSelected] = useState(initial);
  const IN = Object.keys(selected).filter(k => selected[k]);
  return { selected, setSelected, IN };
};

export const Fab = withStyles(theme => ({
  root: {
    "&.Mui-disabled": {
      backgroundColor: "#FFCCC6",
      color: "white",  
    }
  },
}))(MuiFab);

export const AddPaymentMethodDrawer = ({
  id = "add-payment-method",
  name = "New card",
  loading,
  values,
  onSubmit,
  options,
  controls,
  open
}) => {

  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={controls.setFalse}
      onOpen={controls.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: "drawer-radius container" }}
    >
      <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
        <span className="drawer-notch"></span>
        {name}
      </DialogTitle>
      <DialogContent>
        {loading && <LinearProgress />}
        <AddPaymentMethod
          id={id}
          values={values}
          onSubmit={onSubmit}
          options={options}
          setSubmitLocked={setSubmitLocked}
        />
        <div style={{ paddingBottom: 120 }} />
      </DialogContent>
      <DialogActions className="bottom-actions">
        <Fab color="secondary" onClick={controls.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        <Fab
          color="secondary"
          onClick={controls.setFalse}
          disabled={loading || isSubmitLocked}
          form={id}
          type="submit"
        >
          <CheckIcon />
        </Fab>
      </DialogActions>
    </SwipeableDrawer>
  );
};

const AddPaymentMethod = ({ id, values: initial, onSubmit, setSubmitLocked }) => {
  const [values, setValues] = useState(initial || {});
  const [errorCardValidation, errorControl] = useBooleanControls(false);
  const handleChange = name => ev => {
    const value = ev.target.value
    setValues(v => ({ ...v, [name]: value }));
    lockingChange({ ...values, [name]: value });

    if (lockingChange({ ...values, [name]: value })) setSubmitLocked.setTrue();
    else setSubmitLocked.setFalse();
  };

  const lockingChange = obj => !Boolean(obj["ccNumber"] && obj["ccName"] && obj["ccExp"] && obj["ccCvc"] && obj["ccZip"]);      
  
  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(values);
  };

  const cancelValue = inputName => {
    setValues(v => ({ ...v, [inputName]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} id={id}>
      <TextField
        label="Card number"
        onChange={handleChange("ccNumber")}
        value={values["ccNumber"] || ""}
        name="ccNumber"
        margin="normal"
        InputProps={{
          endAdornment: <IconButton onClick={() => cancelValue("ccNumber")}>
            <CancelSearch />
          </IconButton>
        }}
        fullWidth
      />
      <TextField
        label="Name"
        onChange={handleChange("ccName")}
        value={values["ccName"] || ""}
        name="ccName"
        margin="normal"
        InputProps={{
          endAdornment: <IconButton onClick={() => cancelValue("ccName")}>
            <CancelSearch />
          </IconButton>
        }}
        fullWidth
      />
      <Grid container>
        <Grid item xs={6}>
          <Box mr={1}>
            <TextField
              label="Exp. date"
              onChange={handleChange("ccExp")}
              value={values["ccExp"] || ""}
              name="ccExp"
              margin="normal"
              InputProps={{
                endAdornment: <IconButton onClick={() => cancelValue("ccExp")}>
                  <CancelSearch />
                </IconButton>
              }}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box ml={1}>
            <TextField
              label="CVC code"
              onChange={handleChange("ccCvc")}
              value={values["ccCvc"] || ""}
              name="ccCvc"
              margin="normal"
              InputProps={{
                endAdornment: <IconButton onClick={() => cancelValue("ccCvc")}>
                  <CancelSearch />
                </IconButton>
              }}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
      <TextField
        label="ZIP code"
        onChange={handleChange("ccZip")}
        value={values["ccZip"] || ""}
        name="ccZip"
        margin="normal"
        InputProps={{
          endAdornment: <IconButton onClick={() => cancelValue("ccZip")}>
            <CancelSearch />
          </IconButton>
        }}
        fullWidth
      />
    </form>
  );
};
