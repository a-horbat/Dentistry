import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useToastContext } from '../Toast';

export const PersistentPreviewBanner = React.memo(({ onClick }) => {
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
});
