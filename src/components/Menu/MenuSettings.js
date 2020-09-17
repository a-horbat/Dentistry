import React from 'react';
import InvoicesIcon from '../../assets/Icons/Invoices';
import VendorsIcon from '../../assets/Icons/Vendors';
import ProductsIcon from '../../assets/Icons/Products';
import QuotesIcon from '../../assets/Icons/Quotes';
import SettingsIcon from '../../assets/Icons/Settings';
import OrdersIcon from '../../assets/Icons/Orders';
import HelpIcon from '../../assets/Icons/Help';

export const CustomerMenu = {
  close: true,
  name: 'Menu',
  items: [
    {
      to: '/products',
      icon: <ProductsIcon />,
      text: 'Products',
    },
    {
      to: '/suppliers',
      icon: <VendorsIcon style={{ height: 22, width: 22 }} />,
      text: 'Suppliers',
    },
    {
      to: '/quotes',
      icon: <QuotesIcon />,
      text: 'Quotes',
    },
    /* {
      to: '/orders',
      icon: <OrdersIcon />,
      text: 'Orders',
    }, */
    {
      to: '/settings',
      icon: <SettingsIcon style={{ height: 27, width: 27 }} />,
      text: 'Settings',
    },
    {
      to: '/help',
      icon: <HelpIcon />,
      text: 'Help',
    },
  ],
};

export const SupplierMenu = {
  close: true,
  name: 'Menu',
  items: [
    {
      to: '/products',
      icon: <ProductsIcon />,
      text: 'Products',
    },
    {
      to: '/quotes',
      icon: <QuotesIcon />,
      text: 'Quotes',
    },
    {
      to: '/settings',
      icon: <SettingsIcon style={{ height: 27, width: 27 }} />,
      text: 'Settings',
    },
    {
      to: '/help',
      icon: <HelpIcon />,
      text: 'Help',
    },
  ],
};

export const menus = [CustomerMenu];
export default {
  CustomerMenu,
  SupplierMenu,
};
