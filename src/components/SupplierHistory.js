import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import useEntityDetailStyles from '../MUIStyles/EntityDetails';
import { useProductTableStyles } from '../MUIStyles/Tables';
import DetailTable from './DetailTable';

const columns = [
  {
    id: 'border',
    label: '',
    styleTh: { width: 3, paddingLeft: '0px' },
    styleTr: {
      width: 3,
      position: 'relative',
    },
  },
  { id: 'name', label: 'Invoice No' },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'price',
    label: 'Price',
  },
  {
    id: 'qty',
    label: 'Qty',
  },
  {
    id: 'amount',
    label: 'Amount',
  },
  {
    id: 'invoiceDate',
    label: 'Invoice Date',
  },
];

function createData(
  _id,
  border,
  name,
  status,
  price,
  qty,
  amount,
  invoiceDate,
) {
  return { _id, border, name, status, price, qty, amount, invoiceDate };
}

const rowsSecondTable = [
  createData(
    1,
    <div
      style={{
        width: 3,
        height: '90%',
        backgroundColor: '#27AE60',
        position: 'absolute',
        top: '5%',
        left: '0',
        borderRadius: '10px',
      }}
    />,
    '342343134',
    'PROCESSING',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Blue',
  ),
  createData(
    2,
    <div
      style={{
        width: 3,
        height: '90%',
        backgroundColor: '#2D9CDB',
        position: 'absolute',
        top: '5%',
        left: '0',
        borderRadius: '10px',
      }}
    />,
    '342343134',
    'OPEN',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Aqua',
  ),
  createData(
    1251,
    <div
      style={{
        width: 3,
        height: '90%',
        backgroundColor: '#56CCF2',
        position: 'absolute',
        top: '5%',
        left: '0',
        borderRadius: '10px',
      }}
    />,
    '342343134',
    'SHIPPED',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Yellow',
  ),
  createData(
    1261,
    <div
      style={{
        width: 3,
        height: '90%',
        backgroundColor: '#F2C94C',
        position: 'absolute',
        top: '5%',
        left: '0',
        borderRadius: '10px',
      }}
    />,
    '342343134',
    'PAID',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Green',
  ),
  createData(
    1271,
    <div
      style={{
        width: 3,
        height: '90%',
        backgroundColor: '#27AE60',
        position: 'absolute',
        top: '5%',
        left: '0',
        borderRadius: '10px',
      }}
    />,
    '342343134',
    'DELIVERED',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Orange',
  ),
];

const SupplierHistory = React.memo(({ closable = true, onClose, selected }) => {
  // const data = useQuery(FindSuppliersDocument);

  const classes = Object.assign(
    useEntityDetailStyles(),
    useProductTableStyles(),
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [tableAnchorEl, setTableAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const tableOpen = Boolean(tableAnchorEl);
  const id = open ? 'simple-popover' : undefined;
  const tableId = tableOpen ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const tableHandleClick = (event) => {
    setTableAnchorEl(event.currentTarget);
  };

  const tableHandleClose = () => {
    setTableAnchorEl(null);
  };

  const popoverTrigger = (
    <Box display="flex" justifyContent="center" onClick={tableHandleClick}>
      <div
        style={{
          backgroundColor: '#27AE60',
          width: '20px',
          height: '20px',
          borderRadius: '10px',
        }}
      />
    </Box>
  );

  const popover = (
    <Popover
      id={tableId}
      open={tableOpen}
      anchorEl={tableAnchorEl}
      onClose={tableHandleClose}
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
            src={require('../assets/Icons/Ellipse 15.png')}
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
            src={require('../assets/Icons/orange.png')}
            style={{ marginRight: '20px', height: '20px' }}
          />
          <Typography>Backup</Typography>
        </Box>
        <Box className={classes.PopoverItem}>
          <img
            alt="red"
            src={require('../assets/Icons/red.png')}
            style={{ marginRight: '20px', height: '20px' }}
          />
          <Typography>Banned</Typography>
        </Box>
        <Box className={classes.PopoverItem}>
          <img
            alt="grey"
            src={require('../assets/Icons/grey.png')}
            style={{ marginRight: '20px', height: '20px' }}
          />
          <Typography>N/A</Typography>
        </Box>
      </Box>
    </Popover>
  );

  /* const rows = products.map((product, index) => {
      return createData(
        index * 50,
        product.name || 'N/A',
        product.category || 'N/A',
        product.sku || 'N/A',
        String(product.manufacturerId).slice(0, 5) || 'N/A',
        product.lastPurchase || 'N/A',
        product.lastPrice || 'N/A',
      );
    });*/

  return (
    <Box
      className="half-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{
        // overflow: 'hidden',
        width: '100%',
        maxHeight: '100%',
        height: '100%',
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        width="100%"
      >
        <img
          alt="item image"
          src={require('../assets/Icons/Suppliers/Rectangle 109.png')}
        />
        <Box mr="auto">
          <Typography
            style={{
              fontFamily: 'Comfortaa',
              fontWeight: 'bold',
              fontSize: '22px',
              fontColor: '#333333',
              marginLeft: '20px',
            }}
          >
            Anutra Xylocaine 1% Epinephrine 1:100,000 Ea
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box style={{ marginTop: -10 }}>
            <IconButton onClick={handleClick}>
              <MoreVertIcon className={classes.controlButton} />
            </IconButton>
            {closable && (
              <IconButton onClick={onClose}>
                <CancelIcon className={classes.controlButton} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      <Box width="100%" className={classes.detailTextContainer}>
        <Box className={classes.detailSingleTextContainer}>
          <Typography
            className={classes.detailSubheader}
            variant="h5"
            style={{
              fontFamily: 'Poppins',
            }}
          >
            $53
          </Typography>
          <Typography
            className={classes.detailText}
            style={{
              fontFamily: 'Poppins',
            }}
          >
            Best price
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
            $67
          </Typography>
          <Typography
            className={classes.detailText}
            style={{
              fontFamily: 'Poppins',
            }}
          >
            Catalog Price
          </Typography>
        </Box>
        <Box className={classes.detailSingleTextContainer}>
          <Box style={{ display: 'flex' }}>
            <Typography
              className={classes.detailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Each
            </Typography>
          </Box>
          <Typography
            className={classes.detailText}
            style={{
              fontFamily: 'Poppins',
            }}
          >
            Packaging/UOM
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
            MFG5
          </Typography>
          <Typography
            className={classes.detailText}
            style={{
              fontFamily: 'Poppins',
            }}
          >
            Manufacturer
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
            Org1
          </Typography>
          <Typography
            className={classes.detailText}
            style={{
              fontFamily: 'Poppins',
            }}
          >
            supplier
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
            Ea
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
        <Box className={classes.detailSingleTextContainer}>
          <Typography
            className={classes.detailSubheader}
            variant="h5"
            style={{
              fontFamily: 'Poppins',
            }}
          >
            2423
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
            352456
          </Typography>
          <Typography
            className={classes.detailText}
            style={{
              fontFamily: 'Poppins',
            }}
          >
            SUPPLIER SKU
          </Typography>
        </Box>
      </Box>
      <Box className={classes.descriptionContainer}>
        <Typography variant="h4" style={{ fontSize: '16px', color: '#4F4F4F' }}>
          Supplies & Small Equipment / Browse Supplies / Anesthetics /
          <span style={{ fontWeight: 500 }}>Anesthetic Buffering</span>
        </Typography>
        <Typography variant="h4" className={classes.detailDescriptionHeader}>
          Description
        </Typography>
        <Typography className={classes.detailDescriptionFull}>
          Quality stainless steel aspirating syringes with no removable parts to
          lose or break off. Standard offers a larger thumb ring and standard
          plunger length for traditional aspiration.
        </Typography>
      </Box>
      <Box
        mt={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography variant="h4" className={classes.detailDescriptionHeader}>
          Order History
        </Typography>
      </Box>
      <Box style={{ overflow: 'scroll', marginBottom: 32, width: '100%' }}>
        <DetailTable
          rows={rowsSecondTable}
          columns={columns}
          selected={'-'}
          className={classes.productHistoryTable}
        />
      </Box>
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
        <Box className={classes.Popover}>
          <Box className={classes.PopoverItem}>
            <img
              alt="customers"
              src={require('../assets/Icons/customers.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>View order list</Typography>
          </Box>
          <Box className={classes.PopoverItem}>
            <img
              alt="archive"
              src={require('../assets/Icons/archive.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>Archive</Typography>
          </Box>
          <Divider />
          <Box className={classes.PopoverItem}>
            <img
              alt="delete"
              src={require('../assets/Icons/delete.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>Delete</Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
});

export default SupplierHistory;
