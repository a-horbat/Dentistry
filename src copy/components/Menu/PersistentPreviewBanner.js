import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useToastContext } from '../Toast';
import Button from '@material-ui/core/Button';

export const PersistentPreviewBanner = ({ onClick }) => {
  const history = useHistory();
  const { setError, handleClose } = useToastContext();
  const handleSignIn = () => {
    handleClose();
    if (onClick) onClick();
    // history.push('/')
  };
  useEffect(() => {
    setError({
      message: 'Sign in to edit this content',
      snackProps: {
        autoHideDuration: undefined,
        onClose: () => {},
      },
      alertProps: {
        onClose: () => {},
        action: (
          <Button color="inherit" size="small" onClick={handleSignIn}>
            Sign In
          </Button>
        ),
      },
    });
  }, []);
  return null;
};
