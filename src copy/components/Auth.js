import { IntuitLoginDocument } from "@base86inc/apollo-client";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import Slide from "@material-ui/core/Slide";
import { auth } from "firebase/app";
import React, { useState } from "react";
import { client } from "../client";
import { EmailConnect } from "./EmailConnect";
import { GoogleConnect } from "./GoogleConnect";
import { IntuitConnect } from "./IntuitConnect";
import gql from "graphql-tag";

export default function Auth({ initialScreen }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [screenType, setScreenType] = useState(initialScreen);
  const openRegisterScreen = () => setScreenType("register");
  const openLoginScreen = () => setScreenType("sign_in");
  const openForgotPassword = () => setScreenType("forgot_password");
  const onSubmitEmailPassword = async (email, password) => {
    try {
      setLoading(true);
      if (screenType === "register") {
        await auth().createUserWithEmailAndPassword(email, password);
      } else {
        await auth().signInWithEmailAndPassword(email, password);
      }
      await client.resetStore();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const onGoogleAuth = async () => {
    try {
      const provider = new auth.GoogleAuthProvider();
      await auth().signInWithPopup(provider);
      setLoading(true);
      await client.resetStore();
    } catch (err) {
      setError(err.message);
    }
  };
  const onSuccess = async (code) => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: IntuitLoginDocument,
        variables: { code },
      });
      await auth().signInWithCustomToken(data.intuitLogin);
      await client.resetStore();
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const action =
    screenType === "forgot_password" ? (
      <ForgotPassword />
    ) : (
      <>
        <Box mb={2}>
          <Typography variant="h6">
            {screenType === "register" ? "Registration" : "Sign In"}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography>
            {screenType === "register"
              ? "Create your account with:"
              : "Sign in with:"}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          mb={6}
        >
          <Box mr={2}>
            <GoogleConnect onClick={onGoogleAuth} />
          </Box>
          <IntuitConnect onSuccess={onSuccess} />
        </Box>
        <Box>
          <Typography>Or use your e-mail</Typography>
          {error ? <Typography color="secondary">{error}</Typography> : null}
        </Box>
        <Box flexGrow={1} px={2} textAlign="center">
          <EmailConnect
            btnText={screenType === "register" ? "Create account" : "Sign In"}
            onSubmit={onSubmitEmailPassword}
            loading={loading}
          />
          {screenType === "register" ? (
            <Box my={2}>
              <Link component={Typography}>&nbsp;</Link>
            </Box>
          ) : (
            <Box my={2}>
              <Link component={Typography} onClick={openForgotPassword}>
                Forgot Password
              </Link>
            </Box>
          )}
        </Box>
      </>
    );

  const links = (
    <Box
      bgcolor="#eee"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      {screenType === "register" ? (
        <>
          <Typography>Already have an account? </Typography>
          <Button onClick={openLoginScreen}>
            <Typography color="secondary">Sign in</Typography>
          </Button>
        </>
      ) : (
        <>
          <Typography>Do not have an account? </Typography>
          <Button onClick={openRegisterScreen}>
            <Typography color="secondary">Register now</Typography>
          </Button>
        </>
      )}
    </Box>
  );

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
        {action}
        {links}
      </Hidden>
      <Hidden smDown>
        <Box flex={1} />
        <Box>
          <Paper>
            <Box
              p={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
              overflow="hidden"
            >
              {action}
            </Box>
            {links}
          </Paper>
        </Box>
        <Box flex={1} />
      </Hidden>
    </Box>
  );
}

const ForgotPassword = () => {
  const [{ email, loading, error, sent }, setState] = useState({
    loading: false,
    sent: false,
    email: "",
    error: "",
  });
  const handleEmail = (ev) => {
    const email = ev.target.value;
    setState((v) => ({ ...v, sent: false, email }));
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      setState((v) => ({ ...v, loading: true, error: "" }));
      if (!email) throw new Error("Email is required");
      await client.mutate({
        mutation: gql`
          mutation SendResetPasswordEmail($email: String!) {
            sendResetPasswordEmail(email: $email)
          }
        `,
        variables: {
          email,
        },
      });
      setState((v) => ({ ...v, sent: true, loading: false }));
    } catch (err) {
      setState((v) => ({ ...v, loading: false, error: err.message }));
    }
  };
  return (
    <Box flex={1} component="form" onSubmit={handleSubmit} position="relative">
      <Box mb={4}>
        <Typography variant="h6">
          <strong>Reset Password</strong>
        </Typography>
      </Box>
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography gutterBottom>
          Please enter your email to reset your password:
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmail}
          error={Boolean(error)}
          helperText={error}
          margin="normal"
          fullWidth
        />
      </Box>
      <Box
        my={3}
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          type="submit"
          disabled={loading || sent}
          variant="contained"
          color="secondary"
          style={{
            height: 40,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          {loading ? (
            <CircularProgress
              style={{ color: "#fff", marginRight: 4, height: 20, width: 20 }}
            />
          ) : null}
          Reset Password
        </Button>
      </Box>
      <Slide in={sent} direction="up" mountOnEnter>
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          bgcolor="#fff"
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <Typography>Reset Password Email Sent</Typography>
          <Typography variant="caption">
            Check your email for next steps.
          </Typography>
        </Box>
      </Slide>
    </Box>
  );
};
