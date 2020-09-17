import React, { useState } from "react";
import { useBooleanControls } from "@base86inc/apollo-client";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import WideLogo from "../MenuIcons/WideLogo";
import NarrowLogo from "../MenuIcons/NarrowLogo";
import LogoutIcon from "../MenuIcons/LogOut";
import MenuSwipeRight from "../MenuIcons/MenuSwipeRight";
import MenuSwipeLeft from "../MenuIcons/MenuSwipeLeft";
import IconButton from "@material-ui/core/IconButton";
import { auth } from "firebase/app";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "firebase/auth";
import { menu } from "./MenuSettings";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  paper: {
    overflowY: "unset",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  boxRoot: {
    marginTop: "auto",
    paddingBottom: "30px",
  },
  swipeButtonRoot: {
    marginLeft: "auto",
    marginRight: "-45px",
  },
}));

export function PersistentMenu() {
  const classes = useStyles();
  const [open, openControls] = useBooleanControls(true);

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
        onClick={openControls.toggle}
        className={classes.swipeButtonRoot}
      >
        {open ? <MenuSwipeLeft /> : <MenuSwipeRight />}
      </IconButton>
      <Box ml={1} mt={2} style={{ position: "fixed" }}>
        {open ? <WideLogo /> : <NarrowLogo />}
      </Box>
      <NestedMenu menu={menu} paddingLeft={16} />

      <Box className={classes.boxRoot} width="100%">
        <List>
          {[
            {
              onClick: () => auth().signOut(),
              icon: <LogoutIcon style={{ height: 20, width: 20 }} />,
              text: "Logout",
            },
          ].map((item) => (
            <NestedMenuItem key={item.text} item={item} color="#828282" />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

const NestedMenu = ({ menu, paddingLeft }) => {
  return (
    <List>
      {menu.items.map((item) => (
        <NestedMenuItem key={item.text} item={item} paddingLeft={paddingLeft} />
      ))}
    </List>
  );
};

const NestedMenuItem = ({ item, paddingLeft, color }) => {
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
      <ListItemIcon style={color ? { color } : { color: "inherit" }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        style={color ? { color } : { color: "inherit" }}
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
};

const withMenuProps = (item) => {
  return Object.assign(
    {
      onClick: item.onClick,
    },
    typeof item.to === "string"
      ? {
          to: item.to,
          component: NavLink,
          activeClassName: "text-primary",
          exact: true,
        }
      : {}
  );
};
