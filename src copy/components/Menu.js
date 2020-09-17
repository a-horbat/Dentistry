import { useAsyncMethod, useBooleanControls } from '@base86inc/apollo-client';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import InvoicesIcon from './MenuIcons/Invoices';
import VendorsIcon from './MenuIcons/Vendors';
import ProductsIcon from './MenuIcons/Products';
import AlertsIcon from './MenuIcons/Alerts';
import SettingsIcon from './MenuIcons/Settings';
import UserManagementIcon from './MenuIcons/UserManagement';
import PaymentMethodsIcon from './MenuIcons/PaymentMethods';
import IntegrationIcon from './MenuIcons/Integration';
import NotificationsIcon from './MenuIcons/Notifications';
import { useToastContext } from './Toast';
import HelpIcon from './MenuIcons/Help';
import FaqIcon from './MenuIcons/Faq';
import ChatIcon from './MenuIcons/Chat';
import ContactIcon from './MenuIcons/ContactWUs';
import AboutIcon from './MenuIcons/About';
import ReportsIcon from './MenuIcons/Reports';
import FoodCostIcon from './MenuIcons/FoodCost';
import RevenueIcon from './MenuIcons/Revenue';
import LogoutIcon from './MenuIcons/LogOut';
import { useDisableScroll } from './hooks';
import PosIcon from './MenuIcons/PosSystem';
import AccountingSystemIcon from './MenuIcons/AccountingSystem';
import COGSIcon from './MenuIcons/COGS';
import CloseIcon from '@material-ui/icons/Close';
import BackIcon from '@material-ui/icons/ArrowBack';
import { auth } from 'firebase/app';
import { NavLink, useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import 'firebase/auth';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

export const usePersistentMenuStyles = makeStyles(theme =>
  createStyles({
    mainContainer: {
      [theme.breakpoints.up('md')]: {
        marginLeft: 300,
      },
    },
  }),
);

const withMenuProps = item => {
  return Object.assign(
    {
      onClick: item.onClick,
    },
    typeof item.to === 'string'
      ? {
          to: item.to,
          component: NavLink,
          activeClassName: 'text-primary',
          exact: true,
        }
      : {},
  );
};

export function MenuDrawers({
  menus,
  menuOpen,
  setMenuOpen,
  onClose,
  activeDrawerOptions,
  ...drawerOptions
}) {
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
              .map(item => (
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
                  {item.text === 'Settings' || item.text === 'Help' ? (
                    <ListItemIcon style={{ color: '#828282' }}>
                      {item.icon}
                    </ListItemIcon>
                  ) : (
                    <ListItemIcon style={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                  {item.text === 'Settings' || item.text === 'Help' ? (
                    <div
                      style={{
                        marginLeft: -10,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontSize: 14,
                              color: '#828282',
                            }}
                          >
                            {item.text}
                          </Typography>
                        }
                        disableTypography={true}
                      />
                    </div>
                  ) : (
                    <ListItemText primary={item.text} />
                  )}
                </MenuItem>
              ))}
          </List>
          <DialogActions>
            {menu.close && ( /////////////////////////////////////////////////////
              <Box pb={2.3} pl={2.3}>
                <Fab color="secondary" onClick={onClose}>
                  <CloseIcon />
                </Fab>
              </Box>
            )}
            {menu.back && (
              <Box pb={2.3} pl={2.3}>
                <Fab color="secondary" onClick={() => setMenuOpen(menu.back)}>
                  <BackIcon />
                </Fab>
              </Box>
            )}
            <Box flexGrow={1} />
            {menu.signOut && (
              <Box pb={2.5} pr={2.5}>
                <Fab color="secondary" onClick={() => auth().signOut()}>
                  <LogoutIcon style={{ height: 20, width: 20 }} />
                </Fab>
              </Box>
            )}
          </DialogActions>
        </SwipeableDrawer>
      ))}
    </>
  );
}

export function PersistentPreviewMenu() {
  return (
    <Drawer variant="permanent" classes={{ paper: 'width-300px' }}>
      <DialogTitle id="alert-dialog-title">{menu.name}</DialogTitle>
      <NestedMenu menu={previewMenu} paddingLeft={16} />
    </Drawer>
  );
}

export function PersistentMenu() {
  return (
    <Drawer variant="permanent" classes={{ paper: 'width-300px' }}>
      <DialogTitle id="alert-dialog-title">{menu.name}</DialogTitle>
      <NestedMenu menu={menu} paddingLeft={16} />
    </Drawer>
  );
}

const NestedMenu = ({ menu, paddingLeft }) => {
  return (
    <List>
      {menu.items.map(item => (
        <NestedMenuItem key={item.text} item={item} paddingLeft={paddingLeft} />
      ))}
    </List>
  );
};

const NestedMenuItem = ({ item, paddingLeft }) => {
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
      <ListItemIcon style={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
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

export default () => {
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
};

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

const initialMenuOpen = history => {
  const path = history.location.pathname;
  if (path.indexOf('/reports') === 0) return reportsMenu.name;
  if (path.indexOf('/settings/integrations') === 0)
    return integrationsMenu.name;
  if (path.indexOf('/settings') === 0) return settingsMenu.name;
  if (path.indexOf('/help') === 0) return helpMenu.name;
  return menu.name;
};

const integrationsMenu = {
  back: 'Settings',
  name: 'Integrations',
  items: [
    {
      to: '/settings/integrations/pos',
      icon: <PosIcon style={{ height: 20, width: 20 }} />,
      text: 'POS System',
    },
    {
      to: '/settings/integrations/accounting',
      icon: <AccountingSystemIcon style={{ height: 20, width: 20 }} />,
      text: 'Accounting System',
    },
  ],
};

const reportsMenu = {
  back: 'Menu',
  name: 'Reports',
  items: [
    {
      to: '/reports/food-cost',
      icon: <FoodCostIcon style={{ height: 20, width: 20 }} />,
      text: 'Food Cost',
    },
    {
      to: '/reports/revenue',
      icon: <RevenueIcon style={{ height: 20, width: 20 }} />,
      text: 'Revenue',
    },
    {
      to: '/reports/cogs',
      icon: <COGSIcon style={{ height: 20, width: 20 }} />,
      text: 'COGS',
    },
  ],
};

const previewReportsMenu = {
  back: 'Menu',
  name: 'Reports',
  items: [
    {
      to: '/preview/reports/food-cost',
      icon: <FoodCostIcon style={{ height: 20, width: 20 }} />,
      text: 'Food Cost',
    },
    {
      to: '/preview/reports/revenue',
      icon: <RevenueIcon style={{ height: 20, width: 20 }} />,
      text: 'Revenue',
    },
    {
      to: '/preview/reports/cogs',
      icon: <COGSIcon style={{ height: 20, width: 20 }} />,
      text: 'COGS',
    },
  ],
};

const settingsMenu = {
  back: 'Menu',
  name: 'Settings',
  signOut: true,
  items: [
    {
      to: '/settings/users',
      icon: <UserManagementIcon style={{ height: 20, width: 20 }} />,
      text: "Organization"
    },
    {
      to: '/settings/payment-methods',
      icon: <PaymentMethodsIcon style={{ height: 20, width: 20 }} />,
      text: 'Payment Methods',
    },
    {
      text: 'Integrations',
      icon: <IntegrationIcon style={{ height: 20, width: 20 }} />,
      menu: integrationsMenu,
    },
    {
      to: '/settings/notifications',
      icon: <NotificationsIcon style={{ height: 20, width: 20 }} />,
      text: 'Notifications',
    },
    {
      onClick: () => auth().signOut(),
      icon: <LogoutIcon style={{ height: 20, width: 20 }} />,
      text: 'Logout',
    },
  ],
};

const helpMenu = {
  back: 'Menu',
  name: 'Help',
  items: [
    {
      to: '/help/faq',
      icon: <FaqIcon style={{ height: 20, width: 20 }} />,
      text: 'FAQ',
    },
    {
      to: '/help/chat',
      icon: <ChatIcon style={{ height: 20, width: 20 }} />,
      text: 'Chat',
    },
    {
      to: '/help/contact',
      icon: <ContactIcon style={{ height: 20, width: 20 }} />,
      text: 'Contact Us',
    },
    {
      to: '/help/about',
      icon: <AboutIcon style={{ height: 20, width: 20 }} />,
      text: 'About',
    },
  ],
};

const previewHelpMenu = {
  back: 'Menu',
  name: 'Help',
  items: [
    {
      to: '/help/faq',
      icon: <FaqIcon style={{ height: 20, width: 20 }} />,
      text: 'FAQ',
    },
    {
      to: '/help/chat',
      icon: <ChatIcon style={{ height: 20, width: 20 }} />,
      text: 'Chat',
    },
    {
      to: '/help/about',
      icon: <AboutIcon style={{ height: 20, width: 20 }} />,
      text: 'About',
    },
  ],
};

const menu = {
  close: true,
  name: 'Menu',
  items: [
    {
      to: '/',
      icon: <InvoicesIcon style={{ height: 30, width: 30 }} />,
      text: 'Invoices',
    },
    {
      to: '/vendors',
      icon: <VendorsIcon style={{ height: 20, width: 30 }} />,
      text: 'Vendors',
    },
    {
      to: '/products',
      icon: <ProductsIcon style={{ height: 20, width: 30 }} />,
      text: 'Products',
    },
    {
      to: '/alerts',
      icon: <AlertsIcon style={{ height: 30, width: 30 }} />,
      text: 'Price Alerts',
    },
    {
      icon: <ReportsIcon style={{ height: 30, width: 30 }} />,
      text: 'Reports',
      menu: reportsMenu,
    },
    {
      icon: <SettingsIcon style={{ height: 30, width: 30 }} />,
      text: 'Settings',
      menu: settingsMenu,
    },
    {
      icon: <HelpIcon style={{ height: 30, width: 30 }} />,
      text: 'Help',
      menu: helpMenu,
    },
  ],
};

const previewMenu = {
  close: true,
  name: 'Menu',
  items: [
    {
      to: '/preview',
      icon: <InvoicesIcon style={{ height: 30, width: 30 }} />,
      text: 'Invoices',
    },
    {
      to: '/preview/vendors',
      icon: <VendorsIcon style={{ height: 20, width: 30 }} />,
      text: 'Vendors',
    },
    {
      to: '/preview/products',
      icon: <ProductsIcon style={{ height: 20, width: 30 }} />,
      text: 'Products',
    },
    {
      to: '/preview/alerts',
      icon: <AlertsIcon style={{ height: 30, width: 30 }} />,
      text: 'Price Alerts',
    },
    {
      icon: <ReportsIcon style={{ height: 30, width: 30 }} />,
      text: 'Reports',
      menu: previewReportsMenu,
    },
    {
      icon: <HelpIcon style={{ height: 30, width: 30 }} />,
      text: 'Help',
      menu: previewHelpMenu,
    },
  ],
};

const menus = [menu, settingsMenu, helpMenu, reportsMenu, integrationsMenu];
const previewMenus = [previewMenu, previewHelpMenu, previewReportsMenu];

export const FloatingButtonLeft = ({ children }) => {
  const { alert } = useToastContext();
  return (
    <Hidden mdUp>
      <div
        style={{
          position: 'fixed',
          padding: 24,
          bottom: 0,
          left: 0,
          zIndex: 11,
          transform: `translateY(${alert ? '-50%' : '0'})`,
        }}
      >
        {children}
      </div>
    </Hidden>
  );
};
export const FloatingButtonRight = ({ children }) => {
  const { alert } = useToastContext();
  return (
    <div
      style={{
        position: 'fixed',
        padding: 24,
        bottom: 0,
        right: 0,
        zIndex: 11,
        transform: `translateY(${alert ? '-50%' : '0'})`,
      }}
    >
      {children}
    </div>
  );
};

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
