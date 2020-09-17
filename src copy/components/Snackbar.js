import React, { useEffect } from "react";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useBooleanControls } from "@base86inc/apollo-client";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    margin: theme.spacing(3, 0, 2)
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

export default function SnackbarContentWrapper(props) {
  const classes = useStyles(props);
  const [open, controls] = useBooleanControls(true);
  const { className, message, variant, ...other } = props;
  const sanitized = parseMessage(message);
  const Icon = variantIcon[variant];
  useEffect(() => {
    if (sanitized) {
      controls.setTrue();
    }
  }, [sanitized]);
  return open && sanitized ? (
    <SnackbarContent
      className={clsx(classes.root, classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          <span dangerouslySetInnerHTML={{ __html: sanitized }} />
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={() => controls.setFalse()}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  ) : null;
}

export const parseMessage = (message) => {
  if (!message) return "";
  return message.replace(/Network error: |GraphQL error: |Node error: /g, "");
};
