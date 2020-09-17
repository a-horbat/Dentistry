import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Fab from "@material-ui/core/Fab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { useDisableScroll } from "./hooks";

export const useSelectOneControls = (initial) => {
  const [selected, setSelected] = useState(initial);
  const IN = Object.keys(selected).filter((k) => selected[k]);
  return { selected, setSelected, IN };
};

export const SelectOneDrawer = ({
  name,
  loading,
  selected,
  setSelected,
  renderItem,
  options,
  controls,
  open,
}) => {
  const changeSelected = (f) => {
    controls.setFalse();
    setSelected(f);
  };
  useDisableScroll(open);
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={controls.setFalse}
      onOpen={controls.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: "drawer-radius container h-80vh" }}
    >
      <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
        <span className="drawer-notch"></span>
        {name}
      </DialogTitle>
      <DialogContent style={{ paddingRight: 0, paddingLeft: 0 }}>
        {loading && <LinearProgress />}
        <SelectOneList
          selected={selected}
          onSubmit={changeSelected}
          options={options}
          renderItem={renderItem}
        />
        <div style={{ paddingBottom: 120 }} />
      </DialogContent>
      <DialogActions className="bottom-actions" style={{ padding: 24 }}>
        <Fab color="secondary" onClick={controls.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
      </DialogActions>
    </SwipeableDrawer>
  );
};

export const SelectOneList = ({ selected, onSubmit, renderItem, options }) => {
  return (
    <List>
      {options.map((option, i) =>
        renderItem ? (
          renderItem(option, i)
        ) : (
          <ListItem
            button
            key={option.name}
            onClick={() => onSubmit(option.value || option.name)}
            style={{ paddingLeft: 24, paddingRight: 24 }}
            selected={
              (option.value && selected === option.value) ||
              (option.name && selected === option.name)
            }
          >
            <Box display="flex" flexGrow={1} alignItems="center">
              {option.icon} <Typography>{option.name}</Typography>
            </Box>
          </ListItem>
        )
      )}
    </List>
  );
};
