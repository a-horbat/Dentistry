import React, { createContext, useState, useContext, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

export const initialToastState = {
  alert: null,
};
const setError = (message) =>
  console.warn('ToastContext Not Initializes', message);
const setWarning = (message) =>
  console.warn('ToastContext Not Initializes', message);
const setSuccess = (message) =>
  console.warn('ToastContext Not Initializes', message);
const setInfo = (message) =>
  console.warn('ToastContext Not Initializes', message);

export const ToastContext = createContext({
  ...initialToastState,
  setError,
  setWarning,
  setSuccess,
  setInfo,
});

export const useToastContext = () => useContext(ToastContext);

const useStyles = makeStyles((theme) => ({
  snackRoot: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      left: 0,
      bottom: 0,
      zIndex: 1000,
    },
  },
  alertRoot: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      left: 0,
      bottom: 0,
      margin: 0,
      borderRadius: 0,
    },
  },
  filledSuccess: {
    backgroundColor: theme.palette.primary.main,
  },
  filledError: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const ToastProvider = React.memo(({ children }) => {
  const classes = useStyles();
  const [{ alert }, setState] = useState({
    alert: null,
  });
  const toMessage = (message) =>
    typeof message === 'string' ? { message } : message;
  const setError = (error) =>
    setState((v) => ({ alert: { severity: 'error', ...toMessage(error) } }));
  const setWarning = (warning) =>
    setState((v) => ({
      alert: { severity: 'warning', ...toMessage(warning) },
    }));
  const setSuccess = (success) =>
    setState((v) => ({
      alert: { severity: 'success', ...toMessage(success) },
    }));
  const setInfo = (info) =>
    setState((v) => ({ alert: { severity: 'info', ...toMessage(info) } }));
  const handleClose = () => setState({ ...initialToastState });
  useEffect(() => {
    window.setSuccess = setSuccess;
    return () => {
      window.setSuccess = () => {};
    };
  }, []);
  return (
    <ToastContext.Provider
      value={{
        alert,
        setError,
        setWarning,
        setSuccess,
        setInfo,
        handleClose,
      }}
    >
      {children}
      {alert ? (
        <Snackbar
          open={Boolean(alert)}
          onClose={handleClose}
          autoHideDuration={6000}
          {...alert.snackProps}
          classes={{ root: classes.snackRoot }}
        >
          <Alert
            onClose={handleClose}
            severity={alert.severity}
            classes={{
              root: classes.alertRoot,
              filledError: classes.filledError,
              filledSuccess: classes.filledSuccess,
            }}
            elevation={6}
            variant="filled"
            {...alert.alertProps}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ) : null}
    </ToastContext.Provider>
  );
});
