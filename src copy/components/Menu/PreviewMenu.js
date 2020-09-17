import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import { useDisableScroll } from '../hooks';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import {
  integrationsMenu,
  reportsMenu,
  settingsMenu,
  helpMenu,
  menu,
  previewMenus,
} from './MenuSettings';
import { MenuDrawers } from './MenuDrawers';

export const PreviewMenu = () => {
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
        menus={previewMenus}
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
};

const initialMenuOpen = (history) => {
  const path = history.location.pathname;
  if (path.indexOf('/reports') === 0) return reportsMenu.name;
  if (path.indexOf('/settings/integrations') === 0)
    return integrationsMenu.name;
  if (path.indexOf('/settings') === 0) return settingsMenu.name;
  if (path.indexOf('/help') === 0) return helpMenu.name;
  return menu.name;
};
