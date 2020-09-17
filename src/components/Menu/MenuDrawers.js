import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import BackIcon from '@material-ui/icons/ArrowBack';
import { auth } from 'firebase/app';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '../../assets/Icons/LogOut';
import 'firebase/auth';

const withMenuProps = (item) => {
  return {
    onClick: item.onClick,
    ...(typeof item.to === 'string'
      ? {
          to: item.to,
          component: NavLink,
          activeClassName: 'text-primary',
          exact: true,
        }
      : {}),
  };
};
const MenuDrawers = React.memo(
  ({
    menus,
    menuOpen,
    setMenuOpen,
    onClose,
    activeDrawerOptions,
    ...drawerOptions
  }) => {
    return (
      <>
        {menus.map((menu, i) => (
          <SwipeableDrawer
            key={i}
            onClose={onClose}
            onOpen={() => setMenuOpen(menus[0].name)}
            open={menuOpen === menu.name}
            {...drawerOptions}
          >
            <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
              <span className="drawer-notch" />
              {menu.name}
            </DialogTitle>
            <List>
              {menu.items
                .filter(({ onClick }) => !onClick)
                .map((item) => (
                  <MenuItem
                    key={item.text}
                    {...withMenuProps(item)}
                    {...(item.menu &&
                      item.menu.name && {
                        onClick: () => setMenuOpen(item.menu.name),
                      })}
                    style={{
                      marginTop: item.text === 'Settings' ? 10 : 0,
                    }}
                  >
                    <ListItemIcon style={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </MenuItem>
                ))}
            </List>
            <DialogActions>
              {menu.close && (
                <Fab color="secondary" onClick={onClose}>
                  <CloseIcon />
                </Fab>
              )}
              {menu.back && (
                <Fab color="secondary" onClick={() => setMenuOpen(menu.back)}>
                  <BackIcon />
                </Fab>
              )}
              <Box flexGrow={1} />
              {menu.signOut && (
                <Fab color="secondary" onClick={() => auth().signOut()}>
                  <LogoutIcon style={{ height: 20, width: 20 }} />
                </Fab>
              )}
            </DialogActions>
          </SwipeableDrawer>
        ))}
      </>
    );
  },
);

export default MenuDrawers;
