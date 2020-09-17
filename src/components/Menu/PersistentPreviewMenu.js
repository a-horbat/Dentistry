import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';
import 'firebase/auth';
import { CustomerMenu } from './MenuSettings';

export const PersistentPreviewMenu = React.memo(() => {
  return (
    <Drawer variant="permanent" classes={{ paper: 'width-300px' }}>
      <DialogTitle id="alert-dialog-title">{CustomerMenu.name}</DialogTitle>
    </Drawer>
  );
});

const NestedMenu = React.memo(({ menu, paddingLeft }) => {
  return (
    <List>
      {menu.items.map((item) => (
        <NestedMenuItem key={item.text} item={item} paddingLeft={paddingLeft} />
      ))}
    </List>
  );
});

const NestedMenuItem = React.memo(({ item, paddingLeft, color }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return [
    <MenuItem
      key={item.text}
      style={{ paddingLeft }}
      {...withMenuProps(item)}
      {...(item.menu && item.menu.name
        ? {
            onClick: () => setMenuOpen(!menuOpen),
          }
        : null)}
    >
      <ListItemIcon style={color ? { color } : { color: 'inherit' }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        style={color ? { color } : { color: 'inherit' }}
      />
      {item.menu && item.menu.name ? (
        menuOpen ? (
          <ExpandLess />
        ) : (
          <ExpandMore />
        )
      ) : null}
    </MenuItem>,
    item.menu && item.menu.items ? (
      <Collapse key={`${item.text}_${item.menu.name}`} in={menuOpen}>
        <NestedMenu menu={item.menu} paddingLeft={paddingLeft + 16} />
      </Collapse>
    ) : null,
  ];
});

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
