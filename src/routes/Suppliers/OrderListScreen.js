import React, { useState, useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import useEntityDetailStyles from '../../MUIStyles/EntityDetails';
import Print from '../../assets/Icons/Suppliers/Print';
import { useProductTableStyles } from '../../MUIStyles/Tables';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import DetailTable from '../../components/DetailTable';
import CheckIcon from '@material-ui/icons/Check';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const columns = [
  { id: 'name', label: 'Name' },
  {
    id: 'sku',
    label: 'SKU',
  },
  {
    id: 'uom',
    label: 'UoM',
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
    id: 'popover',
    label: 'Priority',
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

const rowsSecondTable = [
  createData(
    123,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 E',
    'Company 3',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Green',
  ),
  createData(
    124,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 E1',
    'Company 3',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Green',
  ),
  createData(
    125,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 Easd2',
    'Company 3',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Green',
  ),
  createData(
    126,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 Easd3',
    'Company 3',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Green',
  ),
  createData(
    127,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 E4',
    'Company 3',
    456,
    'MGF5',
    '$34.78',
    'April 29 2021',
    'Green',
  ),
];

const useStyle = makeStyles({
  container: {
    width: '784px',
    height: '100px',
    backgroundColor: 'white',
    outline: 'none',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '32px',
    height: '90vh',
    padding: '32px',
  },
});

const OrderListScreen = ({ open, close }) => {
  const [tableAnchorEl, setTableAnchorEl] = useState(null);
  const tableOpen = Boolean(tableAnchorEl);

  const classes = Object.assign(
    useStyle(),
    useEntityDetailStyles(),
    useProductTableStyles(),
  );

  const tableHandleClick = (event) => {
    setTableAnchorEl(event.currentTarget);
  };

  const tableHandleClose = () => {
    setTableAnchorEl(null);
  };

  const detailPopoverTrigger = (
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
      id="simple-popover"
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
      </Box>
    </Popover>
  );

  const printRef = useRef();

  const print = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.container} ref={printRef}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              width="100%"
            >
              <img
                alt="item image"
                src={require('../../assets/Icons/Suppliers/HeaderPicture.png')}
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
                  Supplier Name
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box style={{ marginTop: -10 }} displayPrint="none">
                  <IconButton onClick={print}>
                    <Print className={classes.controlButton} />
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon className={classes.controlButton} />
                  </IconButton>
                  <IconButton onClick={close}>
                    <CancelIcon className={classes.controlButton} />
                  </IconButton>
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
                  Service
                </Typography>
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
                  (219) 555-0114
                </Typography>
                <Typography
                  className={classes.detailText}
                  style={{
                    fontFamily: 'Poppins',
                  }}
                >
                  Phone
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
                  namesupplierdental@gmail.com
                </Typography>
                <Typography
                  className={classes.detailText}
                  style={{
                    fontFamily: 'Poppins',
                  }}
                >
                  email
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
                    4434
                  </Typography>
                </Box>
                <Typography
                  className={classes.detailText}
                  style={{
                    fontFamily: 'Poppins',
                  }}
                >
                  Account #
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
                  45635
                </Typography>
                <Typography
                  className={classes.detailText}
                  style={{
                    fontFamily: 'Poppins',
                  }}
                >
                  order #
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
                  April 29, 2021
                </Typography>
                <Typography
                  className={classes.detailText}
                  style={{
                    fontFamily: 'Poppins',
                  }}
                >
                  order date
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
                  $53
                </Typography>
                <Typography
                  className={classes.detailText}
                  style={{
                    fontFamily: 'Poppins',
                  }}
                >
                  min order
                </Typography>
              </Box>
            </Box>
            <Box
              style={{ overflowY: 'scroll', marginBottom: 32, height: '40vh' }}
            >
              <DetailTable
                rows={rowsSecondTable}
                columns={columns}
                className={classes.productTable}
                selected={'-'}
                popoverTrigger={detailPopoverTrigger}
                popover={popover}
                priorityFilter
                //selected={selected}
                /*onSelect={(id) => {
                  if (setSelectedProductHistory) {
                    setSelectedProductHistory(id);
                  }
                  openProductHistoryCallback(id);
                }}*/
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default OrderListScreen;
