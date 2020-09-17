import React from "react";
import InvoicesIcon from "../MenuIcons/Invoices";
import VendorsIcon from "../MenuIcons/Vendors";
import ProductsIcon from "../MenuIcons/Products";
import AlertsIcon from "../MenuIcons/Alerts";
import SettingsIcon from "../MenuIcons/Settings";
import UserManagementIcon from "../MenuIcons/UserManagement";
import PaymentMethodsIcon from "../MenuIcons/PaymentMethods";
import IntegrationIcon from "../MenuIcons/Integration";
import NotificationsIcon from "../MenuIcons/Notifications";
import HelpIcon from "../MenuIcons/Help";
import FaqIcon from "../MenuIcons/Faq";
import ChatIcon from "../MenuIcons/Chat";
import ContactIcon from "../MenuIcons/ContactWUs";
import AboutIcon from "../MenuIcons/About";
import ReportsIcon from "../MenuIcons/Reports";
import FoodCostIcon from "../MenuIcons/FoodCost";
import RevenueIcon from "../MenuIcons/Revenue";
import COGSIcon from "../MenuIcons/COGS";
import PosIcon from "../MenuIcons/PosSystem";
import AccountingSystemIcon from "../MenuIcons/AccountingSystem";

export const integrationsMenu = {
  back: "Settings",
  name: "Integrations",
  items: [
    {
      to: "/settings/integrations/pos",
      icon: <PosIcon style={{ height: 20, width: 20 }} />,
      text: "POS System",
    },
    {
      to: "/settings/integrations/accounting",
      icon: <AccountingSystemIcon style={{ height: 20, width: 20 }} />,
      text: "Accounting System",
    },
  ],
};

export const reportsMenu = {
  back: "Menu",
  name: "Reports",
  items: [
    {
      to: "/reports/food-cost",
      icon: <FoodCostIcon style={{ height: 20, width: 20 }} />,
      text: "Food Cost",
    },
    {
      to: "/reports/revenue",
      icon: <RevenueIcon style={{ height: 20, width: 20 }} />,
      text: "Revenue",
    },
    {
      to: "/reports/cogs",
      icon: <COGSIcon style={{ height: 20, width: 20 }} />,
      text: "COGS",
    },
  ],
};

const previewReportsMenu = {
  back: "Menu",
  name: "Reports",
  items: [
    {
      to: "/preview/reports/food-cost",
      icon: <FoodCostIcon style={{ height: 20, width: 20 }} />,
      text: "Food Cost",
    },
    {
      to: "/preview/reports/revenue",
      icon: <RevenueIcon style={{ height: 20, width: 20 }} />,
      text: "Revenue",
    },
    {
      to: "/preview/reports/cogs",
      icon: <COGSIcon style={{ height: 20, width: 20 }} />,
      text: "COGS",
    },
  ],
};

export const settingsMenu = {
  back: "Menu",
  name: "Settings",
  signOut: true,
  items: [
    {
      to: "/settings/users",
      icon: <UserManagementIcon style={{ height: 20, width: 20 }} />,
      text: "User Management",
    },
    {
      to: "/settings/payment-methods",
      icon: <PaymentMethodsIcon style={{ height: 20, width: 20 }} />,
      text: "Payment Methods",
    },
    {
      text: "Integrations",
      icon: <IntegrationIcon style={{ height: 20, width: 20 }} />,
      menu: integrationsMenu,
    },
    {
      to: "/settings/notifications",
      icon: <NotificationsIcon style={{ height: 20, width: 20 }} />,
      text: "Notifications",
    },
  ],
};

export const helpMenu = {
  back: "Menu",
  name: "Help",
  items: [
    {
      to: "/help/faq",
      icon: <FaqIcon style={{ height: 20, width: 20 }} />,
      text: "FAQ",
    },
    {
      to: "/help/chat",
      icon: <ChatIcon style={{ height: 20, width: 20 }} />,
      text: "Chat",
    },
    {
      to: "/help/contact",
      icon: <ContactIcon style={{ height: 20, width: 20 }} />,
      text: "Contact Us",
    },
    {
      to: "/help/about",
      icon: <AboutIcon style={{ height: 20, width: 20 }} />,
      text: "About",
    },
  ],
};

const previewHelpMenu = {
  back: "Menu",
  name: "Help",
  items: [
    {
      to: "/help/faq",
      icon: <FaqIcon style={{ height: 20, width: 20 }} />,
      text: "FAQ",
    },
    {
      to: "/help/chat",
      icon: <ChatIcon style={{ height: 20, width: 20 }} />,
      text: "Chat",
    },
    {
      to: "/help/about",
      icon: <AboutIcon style={{ height: 20, width: 20 }} />,
      text: "About",
    },
  ],
};

export const menu = {
  close: true,
  name: "Menu",
  items: [
    {
      to: "/",
      icon: <InvoicesIcon style={{ height: 30, width: 30 }} />,
      text: "Invoices",
    },
    {
      to: "/vendors",
      icon: <VendorsIcon style={{ height: 20, width: 30 }} />,
      text: "Vendors",
    },
    {
      to: "/products",
      icon: <ProductsIcon style={{ height: 20, width: 30 }} />,
      text: "Products",
    },
    {
      to: "/alerts",
      icon: <AlertsIcon style={{ height: 30, width: 30 }} />,
      text: "Price Alerts",
    },
    {
      icon: <ReportsIcon style={{ height: 30, width: 30 }} />,
      text: "Reports",
      menu: reportsMenu,
    },
    {
      icon: <SettingsIcon style={{ height: 30, width: 30 }} />,
      text: "Settings",
      menu: settingsMenu,
    },
    {
      icon: <HelpIcon style={{ height: 30, width: 30 }} />,
      text: "Help",
      menu: helpMenu,
    },
  ],
};

export const previewMenu = {
  close: true,
  name: "Menu",
  items: [
    {
      to: "/preview",
      icon: <InvoicesIcon style={{ height: 30, width: 30 }} />,
      text: "Invoices",
    },
    {
      to: "/preview/vendors",
      icon: <VendorsIcon style={{ height: 20, width: 30 }} />,
      text: "Vendors",
    },
    {
      to: "/preview/products",
      icon: <ProductsIcon style={{ height: 20, width: 30 }} />,
      text: "Products",
    },
    {
      to: "/preview/alerts",
      icon: <AlertsIcon style={{ height: 30, width: 30 }} />,
      text: "Price Alerts",
    },
    {
      icon: <ReportsIcon style={{ height: 30, width: 30 }} />,
      text: "Reports",
      menu: previewReportsMenu,
    },
    {
      icon: <HelpIcon style={{ height: 30, width: 30 }} />,
      text: "Help",
      menu: previewHelpMenu,
    },
  ],
};

export const menus = [
  menu,
  settingsMenu,
  helpMenu,
  reportsMenu,
  integrationsMenu,
];
export const previewMenus = [previewMenu, previewHelpMenu, previewReportsMenu];
