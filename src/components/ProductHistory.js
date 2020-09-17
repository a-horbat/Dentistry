import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import { Popover } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { usePersistentMenuStyles } from './Menu/usePersistentMenuStyles';
import DetailTable from './DetailTable';
import { useProductHistoryTableStyles } from '../MUIStyles/Tables';

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

const rows = [
  createData('COLOR', 'Gold'),
  createData('INGRIDIENTS', 'Stainless Steel'),
];
const rowsSecondTable = [
  createData(
    1231,
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
    '342343131',
    'PROCESSING',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Blue',
  ),
  createData(
    1241,
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
    '342343132',
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
    '342343133',
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

const ProductDetail = React.memo(({ onClose }) => {
  const classes = Object.assign(
    usePersistentMenuStyles(),
    useProductHistoryTableStyles(),
  );

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open = Boolean(anchorEl1);
  const id = open ? 'simple-popover1' : undefined;

  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  return (
    <Box
      className="half-container"
      style={{
        // overflow: 'hiddvn',
        // minWidth: 784,
        width: '100%',
        maxHeight: '100%',
        height: '100%',
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
      }}
    >
      <Box className="headerStatic" style={{ paddingBottom: '20px' }}>
        <Box className={classes.HeaderContainer}>
          <img
            alt="details"
            className={classes.ProductDetailImage}
            src={require('../assets/Icons/Rectangle 109.png')}
          />
          <Typography
            variant="h1"
            className={classes.ProductDetailHeader}
            style={{
              fontFamily: 'Comfortaa',
            }}
          >
            Anutra Xylocaine 1% Epinephrine 1:100,000 Ea
          </Typography>
          <Box style={{ marginTop: -10 }}>
            <IconButton onClick={handleClick}>
              <MoreVertIcon className={classes.ProductDetailButton} />
            </IconButton>
            <IconButton onClick={() => onClose()}>
              <CancelIcon className={classes.ProductDetailButton} />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.ProductDetailTextContainer}>
          <Box className={classes.ProductDetailSingleTextContainer}>
            <Typography
              className={classes.ProductDetailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              $53
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Best Price
            </Typography>
          </Box>
          <Box className={classes.ProductDetailSingleTextContainer}>
            <Typography
              className={classes.ProductDetailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              $67
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              MSRP
            </Typography>
          </Box>
          <Box className={classes.ProductDetailSingleTextContainer}>
            <Typography
              className={classes.ProductDetailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              $Each
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              PACKING/UOM
            </Typography>
          </Box>
          <Box className={classes.ProductDetailSingleTextContainer}>
            <Typography
              className={classes.ProductDetailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              MFG5
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              MANUFACTURER
            </Typography>
          </Box>
          <Box className={classes.ProductDetailSingleTextContainer}>
            <Typography
              className={classes.ProductDetailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Org1
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              SUPPLIER
            </Typography>
          </Box>
          <Box className={classes.ProductDetailSingleTextContainer}>
            <Typography
              className={classes.ProductDetailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Ea
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              BRAND
            </Typography>
          </Box>

          <Box className={classes.ProductDetailSingleTextContainer}>
            <Typography
              className={classes.ProductDetailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              2423
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              MFG SKU
            </Typography>
          </Box>
          <Box className={classes.ProductDetailSingleTextContainer}>
            <Typography
              className={classes.ProductDetailSubheader}
              variant="h5"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              352456
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              SUPPLIER SKU
            </Typography>
          </Box>
        </Box>
        <Typography
          className={classes.ProductDetailDescription}
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
      <Box className="scrollPart" style={{ flexGrow: '1', overflow: 'auto' }}>
        <Box className={classes.Container}>
          <Typography
            variant="h4"
            className={classes.ProductDetailDescriptionHeader}
            style={{ marginTop: 40 }}
          >
            Description
          </Typography>
          <Typography className={classes.ProductDetailDescriptionFull}>
            Quality stainless steel aspirating syringes with no removable parts
            to lose or break off. Standard offers a larger thumb ring and
            standard plunger length for traditional aspiration. Petite features
            a smaller thumb ring and shorter plunger length, allowing a
            comfortable fit for the smaller-handed doctor. Both are lightweight,
            durable, and tailored to fit your specific injection style.
          </Typography>
        </Box>
        <Typography
          variant="h4"
          className={classes.ProductDetailDescriptionHeader}
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
                  background: `${index % 2 === 0 ? '#FAFAFA' : '#F0F0F0'}`,
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
          className={classes.ProductDetailDescriptionHeader}
          style={{ marginTop: 40 }}
        >
          Order History
        </Typography>
        <Box style={{ overflow: 'scroll', marginBottom: 32 }}>
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
          anchorEl={anchorEl1}
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
                alt="customers"
                src={require('../assets/Icons/customers.png')}
                style={{ marginRight: '20px', height: '20px' }}
              />
              <Typography>View Customers</Typography>
            </Box>
            <Box className={classes.PopoverItem}>
              <img
                alt="archive"
                src={require('../assets/Icons/archive.png')}
                style={{ marginRight: '20px', height: '20px' }}
              />
              <Typography>Backup</Typography>
            </Box>
            <Box className={classes.PopoverItem}>
              <img
                alt="delete"
                src={require('../assets/Icons/delete.png')}
                style={{ marginRight: '20px', height: '20px' }}
              />
              <Typography>Banned</Typography>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
});

export default ProductDetail;
