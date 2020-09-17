import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import { Popover } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { usePersistentMenuStyles } from '../../components/Menu/usePersistentMenuStyles';
import DetailTable from '../../components/DetailTable';
import { useProductHistoryTableStyles } from '../../MUIStyles/Tables';

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

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('COLOR', 'Gold'),
  createData('INGRIDIENTS', 'Stainless Steel'),
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
            src={require('../../assets/Icons/Rectangle 109.png')}
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
              Each
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Packaging/UoM
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
              Manfacturer
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
              223
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
              555678
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              sku
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
              Each
            </Typography>
            <Typography
              className={classes.ProductDetailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              brand
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
                alt="archive"
                src={require('../../assets/Icons/archive.png')}
                style={{ marginRight: '20px', height: '20px' }}
              />
              <Typography>Archive</Typography>
            </Box>
            <Box className={classes.PopoverItem}>
              <img
                alt="delete"
                src={require('../../assets/Icons/delete.png')}
                style={{ marginRight: '20px', height: '20px' }}
              />
              <Typography>Delete</Typography>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
});

export default ProductDetail;
