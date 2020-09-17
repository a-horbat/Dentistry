import React, { useState } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import { Popover } from '@material-ui/core';
import { useFindContext } from '@elevatejs/material-crud-ui';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { useButtonStyles } from '../../MUIStyles/General';
import { useProductTableStyles } from '../../MUIStyles/Tables';
import Edit from '../../assets/Icons/Edit';
import useEntityDetailStyles from '../../MUIStyles/EntityDetails';
import DetailTable from '../../components/DetailTable';
import { Base86Tabs, Base86Tab } from '../../components/Tabs';
import External from '../../assets/Icons/External';

const columnsProduct = [
  { id: 'name', label: 'Name' },
  {
    id: 'customer',
    label: 'Customer',
  },
  {
    id: 'products',
    label: 'Products',
  },
  {
    id: 'amount',
    label: 'Amount',
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'sendDate',
    label: 'Send Date',
  },
];

const createProductData = (
  _id,
  name,
  customer,
  products,
  amount,
  status,
  sendDate,
) => {
  return {
    _id,
    name,
    customer,
    products,
    amount,
    status,
    sendDate,
  };
};

const columnsSupplier = [
  { id: 'name', label: 'Product Name' },
  {
    id: 'category',
    label: 'Category',
  },
  {
    id: 'sku',
    label: 'SKU',
  },
  {
    id: 'manufacturer',
    label: 'Manufacturer',
  },
  {
    id: 'type',
    label: 'Type',
  },
];

function createData(
  _id,
  name,
  supplier,
  sku,
  manufacturer,
  price,
  priceDate,
  popover,
) {
  return { _id, name, supplier, sku, manufacturer, price, priceDate, popover };
}

const rows = [
  createData('COLOR', 'Gold'),
  createData('INGRIDIENTS', 'Stainless Steel'),
  createData('ITEM', 'Aspirating Syringe'),
  createData('QUANTITY', 'Each'),
  createData('SIZE', 'Standart'),
  createData('WIDTH', 'Thumb Ring'),
];

const createSupplierData = (_id, name, category, sku, manufacturer, type) => {
  return {
    _id,
    name,
    category,
    sku,
    manufacturer,
    type,
  };
};

const ProductDetail = React.memo(
  ({
    //setSelectedProductHistory,
    //selected,
    openFullScreen,
    openProductHistoryCallback,
    openQuoteDetailCallback,
    highlight,
    expandable = true,
    closable = true,
    onClose,
    detailEditControls,
    //openSupplierDetailCallback,
  }) => {
    const classes = Object.assign(
      useEntityDetailStyles(),
      useButtonStyles(),
      useProductTableStyles(),
    );
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const { idField } = useFindContext();
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newValue) => {
      setTab(newValue);
    };

    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };

    const handleClick1 = (event) => {
      setAnchorEl1(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClose1 = () => {
      setAnchorEl1(null);
    };

    const open = Boolean(anchorEl);

    const open1 = Boolean(anchorEl1);
    const id = open ? 'simple-popover' : undefined;
    const id1 = open1 ? 'simple-popover1' : undefined;

    const ProductDetailPopover = (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box class={classes.Popover}>
          <Box className={classes.PopoverItem}>
            <img
              alt="active"
              src={require('../../assets/Icons/Ellipse 15.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>Primary</Typography>
            <CheckIcon
              className={classes.PopoverIcon}
              style={{
                marginLeft: '70px',
                color: '#21C5C4',
                fontSize: 18,
                marginBottom: 'unset',
              }}
            />
          </Box>
          <Box className={classes.PopoverItem}>
            <img
              alt="orange"
              src={require('../../assets/Icons/orange.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>Backup</Typography>
          </Box>
          <Box className={classes.PopoverItem}>
            <img
              alt="red"
              src={require('../../assets/Icons/red.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>Banned</Typography>
          </Box>
          <Box className={classes.PopoverItem}>
            <img
              alt="grey"
              src={require('../../assets/Icons/grey.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>N/A</Typography>
          </Box>
        </Box>
      </Popover>
    );
    return (
      <Box
        className="half-container"
        style={{
          // overflow: 'hidden',
          // minWidth: 784,
          width: '100%',
          maxHeight: '100%',
          height: '100%',
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box className="headerStatic" style={{ paddingBottom: '20px' }}>
          <Box className={classes.HeaderContainer}>
            <img
              alt="details"
              className={classes.detailImage}
              src={require('../../assets/Icons/Rectangle 109.png')}
            />
            <Typography
              variant="h1"
              className={classes.detailHeader}
              style={{
                fontFamily: 'Comfortaa',
              }}
            >
              Aspirating Syringe Thumb Ring Silver Basic Ea
            </Typography>
            <Box>
              <Box style={{ marginTop: -10 }}>
                {!highlight && expandable && (
                  <IconButton onClick={openFullScreen}>
                    <img
                      alt="expand"
                      className={classes.detailButton}
                      src={require('../../assets/Icons/expand.png')}
                    />
                  </IconButton>
                )}
                <IconButton onClick={handleClick1}>
                  <MoreVertIcon className={classes.detailButton} />
                </IconButton>
                {!highlight && closable && (
                  <IconButton onClick={onClose}>
                    <CancelIcon className={classes.detailButton} />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
          <Box className={classes.detailTextContainer}>
            <Box className={classes.detailSingleTextContainer}>
              <Typography
                className={classes.detailSubheader}
                variant="h5"
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                $60
              </Typography>
              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                catalog price
              </Typography>
            </Box>
            <Box className={classes.detailSingleTextContainer}>
              <Typography
                className={classes.detailSubheader}
                variant="h5"
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                Each
              </Typography>
              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                Packaging/UoM
              </Typography>
            </Box>
            <Box className={classes.detailSingleTextContainer}>
              <Typography
                className={classes.detailSubheader}
                variant="h5"
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                MFG5{' '}
              </Typography>
              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                MANUFACTURER
              </Typography>
            </Box>
            <Box className={classes.detailSingleTextContainer}>
              <Typography
                className={classes.detailSubheader}
                variant="h5"
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                223
              </Typography>
              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                MFG SKU
              </Typography>
            </Box>
            <Box className={classes.detailSingleTextContainer}>
              <Typography
                className={classes.detailSubheader}
                variant="h5"
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                555678
              </Typography>
              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                supplier sku
              </Typography>
            </Box>
            <Box className={classes.detailSingleTextContainer}>
              <Typography
                className={classes.detailSubheader}
                variant="h5"
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                Each
              </Typography>
              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                brand
              </Typography>
            </Box>
          </Box>
          <Typography
            className={classes.detailDescription}
            style={{ color: ' #828282' }}
          >
            Supplies & Small Equipment / Browse Supplies / Anesthetics /
            <span
              style={{
                color: '#333333',
              }}
            >
              Anesthetic Buffering
            </span>
          </Typography>
        </Box>
        <Box
          className="scrollPart"
          style={{ flexGrow: '1', overflow: 'auto', overflowX: 'hidden' }}
        >
          <Box className={classes.Container}>
            <Typography
              variant="h4"
              className={classes.detailDescriptionHeader}
              style={{ marginTop: 30 }}
            >
              Description
            </Typography>
            <Typography className={classes.detailDescriptionFull}>
              Quality stainless steel aspirating syringes with no removable
              parts to lose or break off. Standard offers a larger thumb ring
              and standard plunger length for traditional aspiration. Petite
              features a smaller thumb ring and shorter plunger length, allowing
              a comfortable fit for the smaller-handed doctor. Both are
              lightweight, durable, and tailored to fit your specific injection
              style.
            </Typography>
          </Box>
          <Typography
            variant="h4"
            className={classes.detailDescriptionHeader}
            style={{ marginTop: 40 }}
          >
            Specification
          </Typography>
          <Table size="small">
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.name}
                  style={{
                    background: `${index % 2 == 0 ? '#FAFAFA' : '#F0F0F0'}`,
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography
            variant="h4"
            className={classes.detailDescriptionHeader}
            style={{ marginTop: 40 }}
          >
            Supplier Options
          </Typography>
          <Box position="relative">
            <Base86Tabs
              value={tab}
              onChange={handleTabChange}
              className={classes.quoteTabs}
            >
              <Base86Tab label="Quote history" />
              <Base86Tab label="MASTER PRODUCTS" />
            </Base86Tabs>
            <IconButton className={classes.external}>
              <External />
            </IconButton>
          </Box>
          <Box
            className={classes.tableBox}
            id="quotesTableBox"
            style={{ marginBottom: 32 }}
          >
            <DetailTable
              rows={Array(8)
                .fill(null)
                .map((_, i) => {
                  return createProductData(
                    'sadsad' + i,
                    'BYD Care Earloop Mask ASTM Level 2 Blue 50/Bx' + i,
                    'Endodontics',
                    '$35.00',
                    '$40.00',
                    '47',
                    '$406.27',
                  );
                })}
              columns={columnsProduct}
              className={classes.productTable}
              selected={'-'}
              style={{ display: tab === 0 ? 'table' : 'none' }}
              onSelect={(id) => {
                console.log('Here');
                openQuoteDetailCallback(id);
              }}
            />
            <DetailTable
              rows={Array(2)
                .fill(null)
                .map((_, i) => {
                  return createSupplierData(
                    'fdhsdfh' + i,
                    'Company',
                    4,
                    'GA',
                    'Surgery',
                    '$20',
                    'Draft',
                  );
                })}
              columns={columnsSupplier}
              className={classes.productTable}
              selected={'-'}
              style={{ display: tab === 1 ? 'table' : 'none' }}
              onSelect={(id) => {
                openProductHistoryCallback(id);
              }}
            />
          </Box>

          <Popover
            id={id1}
            open={open1}
            anchorEl={anchorEl1}
            onClose={handleClose1}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box class={classes.Popover}>
              <Box
                className={classes.PopoverItem}
                onClick={() => detailEditControls.setTrue()}
              >
                <Edit style={{ marginRight: '20px' }} />
                <Typography className={classes.fontPoppins}>Edit</Typography>
              </Box>
              <Box className={classes.PopoverItem}>
                <img
                  alt="archive"
                  src={require('../../assets/Icons/archive.png')}
                  style={{ marginRight: '20px', height: '20px' }}
                />
                <Typography className={classes.fontPoppins}>Archive</Typography>
              </Box>
              <Box
                className={classes.PopoverItem}
                style={{ borderTop: '1px solid #E5E5E5' }}
              >
                <img
                  alt="delete"
                  src={require('../../assets/Icons/delete.png')}
                  style={{ marginRight: '20px', height: '20px' }}
                />
                <Typography className={classes.fontPoppins}>Delete</Typography>
              </Box>
            </Box>
          </Popover>
        </Box>
      </Box>
    );
  },
);

export default ProductDetail;
