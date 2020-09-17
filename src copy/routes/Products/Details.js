import { useQuery, useMutation } from "@apollo/react-hooks";
import { ProductListDocument, useBooleanControls, UpdateProductDocument } from "@base86inc/apollo-client";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import "firebase/auth";
import React, { useState, useEffect } from "react";
import get from "lodash/get";

export const ChangeProductThreshold = ({ product, thresholdOpen, thresholdControls }) => {
  const [threshold, setThreshold] = useState(null);
  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);
  const [handleUpdateProduct, updateProduct] = useMutation(UpdateProductDocument);
  const handleChangeThreshold = async (ev) => {
    if (product && product._id && threshold) {
      await handleUpdateProduct({
        update: thresholdControls.setFalse,
        variables: {
          productId: product._id,
          product: {
            threshold,
          },
        },
      });
    }
    setSubmitLocked.setTrue();
  };
  useEffect(() => {
    setThreshold(get(product, "threshold"));
  }, [product]);
  return (
    <Modal open={thresholdOpen} onClose={thresholdControls.setFalse}>
      <Paper
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          maxWidth: 600,
          width: "90%",
          outline: 0,
        }}
      >
        <DialogTitle>Change Price Alert Threshold</DialogTitle>
        <DialogContent>
          <div style={{ height: 40 }} />
          <Slider
            onChange={(ev, value) => {
              setThreshold(value);
              setSubmitLocked.setFalse();
            }}
            defaultValue={15}
            value={threshold}
            min={0}
            max={100}
            valueLabelFormat={(value) => `${value}%`}
            valueLabelDisplay="on"
          />
          <div style={{ height: 80 }} />
        </DialogContent>
        <DialogActions className="bottom-actions">
          <Fab color="secondary" onClick={thresholdControls.setFalse}>
            <CloseIcon />
          </Fab>
          <Box flexGrow={1} />
          <Fab color="secondary" onClick={handleChangeThreshold} disabled={updateProduct.loading || isSubmitLocked}>
            <CheckIcon />
          </Fab>
        </DialogActions>
      </Paper>
    </Modal>
  );
};
