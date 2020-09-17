import React, { useState, useContext, useEffect } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { auth } from 'firebase/app';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import WideLogo from '../assets/Icons/WideLogo';
import NarrowLogo from '../assets/Icons/NarrowLogo';
import LogoutIcon from '../assets/Icons/LogOut';
import MenuSwipeRight from '../assets/Icons/MenuSwipeRight';
import MenuSwipeLeft from '../assets/Icons/MenuSwipeLeft';
import 'firebase/auth';
import { CustomerMenu, SupplierMenu } from './Menu/MenuSettings';
import './Menu/style.css';
import { Role } from '../client';
import RoleContext from '../utils/roleContext';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const roleToMenu = {
  [Role.Customer]: CustomerMenu,
  [Role.Supplier]: SupplierMenu,
  [Role.Admin]: SupplierMenu,
};

const drawerWidth = 225;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxShadow: '4px 0px 12px rgba(37, 37, 37, 0.08)',
  },
  paper: {
    overflowY: 'unset',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  boxRoot: {
    marginTop: 'auto',
    paddingBottom: '30px',
    overflow: 'hidden',
  },
  swipeButtonRoot: {
    marginLeft: 'auto',
    marginRight: '-33px',
    marginTop: '26px',
    padding: 0,
  },
  menuItem: {
    height: '60px',
  },
  menuItemText: {
    fontSize: theme.typography.body2.fontSize,
    '& *': {
      fontSize: theme.typography.body2.fontSize,
    },
  },
}));

const Sidebar = React.memo(({ mainController, setOpenMenu, openMenu }) => {
  const classes = useStyles();
  const [open, openControls] = useBooleanControls(openMenu);
  const roleContext = useContext(RoleContext);
  useEffect(() => {
    //console.log(roleContext);
  }, [roleContext]);
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.paper, classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <IconButton
        onClick={() => {
          openControls.toggle();
          mainController.toggle();
          // setOpenMenu(!openMenu)
        }}
        className={classes.swipeButtonRoot}
      >
        {open ? <MenuSwipeLeft /> : <MenuSwipeRight />}
      </IconButton>
      <Box
        style={{
          position: 'fixed',
          marginTop: open ? 32 : 38,
          marginLeft: open ? 25 : 18,
        }}
      >
        {open ? <WideLogo /> : <NarrowLogo />}
      </Box>
      <NestedMenu
        menu={roleToMenu[roleContext.role]}
        paddingLeft={23}
        setOpenMenu={setOpenMenu}
        openMenu={openMenu}
      />
      <FormControl style={{ padding: '6px 23px' }}>
        <InputLabel
          id="demo-simple-select-label"
          style={{ padding: '6px 23px' }}
        >
          Role
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={roleContext.role}
          onChange={roleContext.setRole}
        >
          <MenuItem value={Role.Admin}>Admin</MenuItem>
          <MenuItem value={Role.Supplier}>Supplier</MenuItem>
          <MenuItem value={Role.Customer}>Customer</MenuItem>
        </Select>
      </FormControl>

      <Box className={classes.boxRoot} width="100%">
        <List>
          {[
            {
              onClick: () => auth().signOut(),
              icon: <LogoutIcon style={{ height: 20, width: 20 }} />,
              text: 'Log Out',
            },
          ].map((item) => (
            <NestedMenuItem key={item.text} item={item} color="#828282" />
          ))}
        </List>
      </Box>
    </Drawer>
  );
});

const NestedMenu = React.memo(
  ({ menu, paddingLeft, openMenu, setOpenMenu }) => {
    return (
      <List style={{ overflow: 'hidden' }}>
        {menu.items.map((item) => (
          <NestedMenuItem
            key={item.text}
            item={item}
            paddingLeft={paddingLeft}
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
          />
        ))}
      </List>
    );
  },
);

const NestedMenuItem = React.memo(
  ({ item, paddingLeft, color, openMenu, setOpenMenu }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const classes = useStyles();
    return [
      <MenuItem
        key={item.text}
        classes={{ root: classes.menuItem }}
        style={{ paddingLeft }}
        {...withMenuProps(item)}
        {...(item.menu && item.menu.name
          ? {
              onClick: () => setMenuOpen(!menuOpen),
            }
          : null)}
      >
        <ListItemIcon style={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
        <ListItemText className={classes.menuItemText} primary={item.text} />
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
  },
);

const withMenuProps = (item) => {
  return {
    onClick: item.onClick,
    ...(typeof item.to === 'string'
      ? {
          to: item.to,
          component: NavLink,
          activeClassName: 'text-primary menu-item-active',
          exact: false,
        }
      : {}),
  };
};

export default Sidebar;
