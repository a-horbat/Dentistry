import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FindSupplierByIdDocument } from '@base86inc/apollo-client';
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
import External from '../assets/Icons/Suppliers/External';
import Expand from '../assets/Icons/Suppliers/Expand';
import DetailTable from './DetailTable';

const columns = [
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
    id: 'price',
    label: 'Price',
  },
  {
    id: 'priceDay',
    label: 'Price Date',
  },
  {
    id: 'popover',
    label: 'Priority',
  },
];

const createData = (
  _id,
  name,
  category,
  sku,
  manufacturer,
  price,
  priceDay,
  priority,
) => {
  return {
    _id,
    name,
    category,
    sku,
    manufacturer,
    price,
    priceDay,
    priority,
  };
};

const rows = [
  createData(
    1,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    2,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    3,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    4,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    5,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    6,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    7,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    8,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    9,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
  createData(
    10,
    'Cook Waite Marcaine Bupivacaine 0.5%, 5656 ',
    'Instruments',
    456,
    'MFG5',
    '$34.78',
    'April 29, 2021',
  ),
];

const SupplierDetail = React.memo(
  ({
    openFullScreen,
    expandable = true,
    closable = true,
    highlight,
    onClose,
    selected,
    openSupplierHistoryCallback,
    setSelectedSupplierHistory,
  }) => {
    // const data = useQuery(FindSuppliersDocument);
    const data = useQuery(FindSupplierByIdDocument, {
      variables: {
        id: selected,
      },
    });

    const supplier = data?.data?.findSupplierById;

    const {
      name,
      minOrderAmount,
      description,
      specialty,
      shippingAddress,
    } = supplier ? supplier : {};
    //console.log(supplier);

    const products = supplier ? supplier.products.data : [];

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
        <Box
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

    const rows = products.map((product, index) => {
      return createData(
        index * 50,
        product.name || 'N/A',
        product.category || 'N/A',
        product.sku || 'N/A',
        String(product.manufacturerId).slice(0, 5) || 'N/A',
        product.lastPurchase || 'N/A',
        product.lastPrice || 'N/A',
      );
    });

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
            src={require('../assets/Icons/Suppliers/HeaderPicture.png')}
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
              {name ? name : 'N/A'}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box style={{ marginTop: -10 }}>
              {!highlight && expandable && (
                <IconButton onClick={openFullScreen}>
                  <Expand className={classes.controlButton} />
                </IconButton>
              )}
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
              ${minOrderAmount ? minOrderAmount : 'N/A'}
            </Typography>
            <Typography
              className={classes.detailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Min.order
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
              N/A
            </Typography>
            <Typography
              className={classes.detailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Annual amount
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
                {specialty ? specialty : 'N/A'}
              </Typography>
            </Box>
            <Typography
              className={classes.detailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Speciality
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
              {shippingAddress ? shippingAddress : 'N/A'}
            </Typography>
            <Typography
              className={classes.detailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Address
            </Typography>
          </Box>
        </Box>
        <Box className={classes.descriptionContainer}>
          <Typography variant="h4" className={classes.detailDescriptionHeader}>
            Notes
          </Typography>
          <Typography className={classes.detailDescriptionFull}>
            {description ? description : 'N/A'}
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
            Products
          </Typography>
          <IconButton>
            <External />
          </IconButton>
        </Box>
        <Box width="100%" mt={1} style={{ overflow: 'auto', marginBottom: 32 }}>
          <DetailTable
            rows={rows}
            columns={columns}
            className={classes.productTable}
            popoverTrigger={popoverTrigger}
            popover={popover}
            selected={selected}
            onSelect={(id) => {
              if (setSelectedSupplierHistory) {
                setSelectedSupplierHistory(id);
              }
              openSupplierHistoryCallback(id);
            }}
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
  },
);

export default SupplierDetail;
