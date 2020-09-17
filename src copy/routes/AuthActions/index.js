import React, { useMemo, useEffect, useState, useRef } from "react";
import { useBooleanControls } from "@base86inc/apollo-client";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { parseQuery } from "../../utils/query";
import { useHistory } from "react-router-dom";
import { auth } from "firebase/app";
import "firebase/auth";

export default ({ openRegisterScreen }) => {
  const { mode, oobCode, continueUrl, lang = "en" } = useMemo(() => {
    const { mode, oobCode, continueUrl, lang } = parseQuery(
      window.location.search
    );
    return { mode, oobCode, continueUrl, lang };
  }, [window.location.search]);

  const register = (
    <Box
      bgcolor="#eee"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Typography>Do not have an account? </Typography>
      <Button onClick={openRegisterScreen}>
        <Typography color="secondary">Register now</Typography>
      </Button>
    </Box>
  );

  const action =
    mode === "resetPassword" ? (
      <ResetPasswordAction
        oobCode={oobCode}
        continueUrl={continueUrl}
        lang={lang}
      />
    ) : mode === "recoverEmail" ? (
      <RecoverEmailAction
        oobCode={oobCode}
        continueUrl={continueUrl}
        lang={lang}
      />
    ) : mode === "verifyEmail" ? (
      <VerifyEmailAction
        oobCode={oobCode}
        continueUrl={continueUrl}
        lang={lang}
      />
    ) : null;

  return (
    <Box
      position="absolute"
      display="flex"
      alignItems="center"
      flexDirection="column"
      flexGrow={1}
      width="100%"
      height="100%"
    >
      <Hidden mdUp>
        <Box pt={8} />
      </Hidden>
      <Hidden smDown>
        <Box pt={20} />
      </Hidden>
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <Hidden smDown>
          <Paper>
            <Box p={2}>{action}</Box>
            {register}
          </Paper>
        </Hidden>
        <Hidden mdUp>{action}</Hidden>
      </Container>
      <Hidden mdUp>{register}</Hidden>
    </Box>
  );
};

const ResetPasswordAction = ({ oobCode, continueUrl, lang = "en" }) => {
  const history = useHistory();
  const [passVisible, passVisibleControls] = useBooleanControls(false);
  const [
    { email, password, loading, submitting, submitted, error },
    setState,
  ] = useState({
    email: "",
    password: "",
    loading: false,
    submitting: false,
    submitted: false,
    error: "",
  });
  const setError = (error) => setState((v) => ({ ...v, error }));
  const setPassword = (password) => setState((v) => ({ ...v, password }));

  useEffect(() => {
    setState((v) => ({ ...v, loading: true }));
    Promise.resolve()
      .then(() => auth().verifyPasswordResetCode(oobCode))
      .then((email) => {
        console.log(email);
        setState((v) => ({ ...v, loading: false, email }));
      })
      .catch((e) => {
        console.log(e);
        setState((v) => ({ ...v, loading: false, error: e.message }));
      });
  }, [oobCode]);

  function confirmPasswordReset() {
    if (!email) return setError("Email required");
    if (!password) return setError("Password required");
    setState((v) => ({ ...v, submitting: true }));
    auth()
      .confirmPasswordReset(oobCode, password)
      .then((resp) => {
        setState((v) => ({ ...v, submitting: false, submitted: true }));
      })
      .catch((e) => {
        setState((v) => ({
          ...v,
          error: e.message,
          submitting: false,
          submitted: false,
        }));
      });
  }

  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          confirmPasswordReset();
        }}
      >
        <Typography variant="h6">Password Reset</Typography>
        <TextField
          type="email"
          value={email}
          label="Email"
          error={Boolean(error)}
          helperText={error}
          disabled
          fullWidth
        />
        {loading ? <LinearProgress variant="indeterminate" /> : null}
        <Box mt={1}>
          <TextField
            margin="normal"
            type={passVisible ? "text" : "password"}
            value={password}
            label="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={passVisibleControls.toggle}>
                  {passVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            fullWidth
          />
        </Box>
        <Box my={3} display="flex" justifyContent="center">
          <Button
            type="submit"
            disabled={loading || submitting}
            variant="contained"
            color="secondary"
            style={{ height: 40, borderRadius: 20 }}
          >
            <Box display="flex" alignItems="center">
              <Typography>Reset Password</Typography>
              {submitting ? (
                <Box ml={1}>
                  <CircularProgress size={16} color="inherit" />
                </Box>
              ) : null}
            </Box>
          </Button>
        </Box>
      </form>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={submitted}
        onClose={() => history.push("/")}
      >
        <DialogTitle>Password Reset Success</DialogTitle>
        <DialogContent>
          <DialogContentText>Continue to application</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => history.push("/"))
                .catch(() => history.push("/"))
            }
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const RecoverEmailAction = ({ oobCode, continueUrl, lang = "en" }) => null;
const VerifyEmailAction = ({ oobCode, continueUrl, lang = "en" }) => null;
