import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { useDisableScroll } from '../hooks';
import 'firebase/auth';
import { menus, CustomerMenu } from './MenuSettings';
import MenuDrawers from './MenuDrawers';

const initialMenuOpen = React.memo((history) => {
  const path = history.location.pathname;
  return CustomerMenu.name;
});

export default React.memo(() => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState('');
  const onClose = () => setMenuOpen('');
  useDisableScroll(!!menuOpen);

  return (
    <>
      <Fab
        color="secondary"
        onClick={() => setMenuOpen(initialMenuOpen(history))}
      >
        <MenuIcon />
      </Fab>
      <MenuDrawers
        menus={menus}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onClose={onClose}
        anchor="bottom"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: 'drawer-radius' }}
      />
    </>
  );
});
