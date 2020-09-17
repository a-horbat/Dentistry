import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, Link } from 'react-router-dom';
import { auth } from 'firebase/app';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import { parseQuery } from '../../../utils/query';
import { useAuthStyles } from '../style';
import 'firebase/auth';
import Input from '../../../components/Input';
import { useButtonStyles } from '../../../MUIStyles/General';

import Base86Modal from '../../../components/Modal';

export default ({ openRegisterScreen }) => {
  const { mode, oobCode, continueUrl, lang = 'en' } = useMemo(() => {
    const { mode, oobCode, continueUrl, lang } = parseQuery(
      window.location.search,
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
    mode === 'resetPassword' ? (
      <ResetPasswordAction
        oobCode={oobCode}
        continueUrl={continueUrl}
        lang={lang}
      />
    ) : mode === 'recoverEmail' ? (
      <RecoverEmailAction
        oobCode={oobCode}
        continueUrl={continueUrl}
        lang={lang}
      />
    ) : mode === 'verifyEmail' ? (
      <VerifyEmailAction
        oobCode={oobCode}
        continueUrl={continueUrl}
        lang={lang}
      />
    ) : null;

  return action;
};

const ResetPasswordAction = ({ oobCode, continueUrl, lang = 'en' }) => {
  const classes = Object.assign(useAuthStyles(), useButtonStyles());
  const history = useHistory();
  const [passVisible, passVisibleControls] = useBooleanControls(false);
  const [
    { email, password, confirmPassword, loading, submitting, submitted, error },
    setState,
  ] = useState({
    email: '',
    password: '',
    loading: false,
    submitting: false,
    submitted: false,
    error: '',
    confirmPassword: '',
  });
  const setError = (error) => setState((v) => ({ ...v, error }));
  const setPassword = (password) => setState((v) => ({ ...v, password }));
  const setConfirmPassword = (confirmPassword) =>
    setState((v) => ({ ...v, confirmPassword }));

  useEffect(() => {
    setState((v) => ({ ...v, loading: true }));
    Promise.resolve()
      .then(() => auth().verifyPasswordResetCode(oobCode))
      .then((email) => {
        //console.log(email);
        setState((v) => ({ ...v, loading: false, email }));
      })
      .catch((e) => {
        //console.log(e);
        setState((v) => ({ ...v, loading: false, error: e.message }));
      });
  }, [oobCode]);

  function confirmPasswordReset() {
    //console.log(password);
    //console.log(confirmPassword);
    if (!email) return setError('Email required');
    if (!password) return setError('Password required');
    if (!confirmPassword) return setError('Confirm password required');
    if (password !== confirmPassword)
      return setError('Passwords need to match');
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
      <h1 className={classes.title}>New Password</h1>
      <span className={classes.note}>
        Set your new password and confirm it.
      </span>
      <div style={{ paddingRight: 140 }}>
        <Input
          handleChange={(e) => {
            setPassword(e.target.value);
          }}
          id="sign-in_email"
          placeholder="Password"
          labelText="Password"
          type="password"
          width="large"
          style={{ marginTop: 32 }}
          Icon={LockOpenRoundedIcon}
          value={password}
        />
        <Input
          handleChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          placeholder="Confirm password"
          labelText="Confirm password"
          type="password"
          width="large"
          Icon={LockOpenRoundedIcon}
          value={confirmPassword}
        />
        <div
          className={classes.buttonsContainer}
          style={{ marginTop: 10, marginBottom: 8 }}
        >
          <Button
            // disabled={loading || sent}
            onClick={confirmPasswordReset}
            className={classes.primaryButton}
            style={{ width: '47%' }}
            disabled={loading || submitting}
          >
            {submitting ? (
              <CircularProgress
                style={{ color: '#fff', marginRight: 4, height: 20, width: 20 }}
              />
            ) : null}
            Submit
          </Button>
          <Link
            to="/auth/sign-in"
            style={{ width: '47%', textDecoration: 'none' }}
          >
            <Button
              className={classes.secondaryButton}

              // onClick={onSetSignIn}
            >
              Cancel
            </Button>
          </Link>
        </div>
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </div>
      <Base86Modal
        title="Password Reset Success"
        open={submitted}
        onClose={() => {
          history.push('/auth/sign-in');
        }}
        onSubmit={() =>
          auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => history.push('/'))
            .catch(() => history.push('/'))
        }
        submitText="Continue"
        size="s"
        showCancel={false}
      >
        <Typography
          style={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: '0.001em',
          }}
        >
          Continue to application
        </Typography>
      </Base86Modal>
    </>
  );
};
const RecoverEmailAction = ({ oobCode, continueUrl, lang = 'en' }) => null;
const VerifyEmailAction = ({ oobCode, continueUrl, lang = 'en' }) => null;
