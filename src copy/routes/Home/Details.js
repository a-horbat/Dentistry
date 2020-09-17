import { useQuery } from '@apollo/react-hooks';
import {
  InvoiceByIdDocument,
  useBooleanControls,
} from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fullscreen from '@material-ui/icons/Fullscreen';
import Skeleton from '@material-ui/lab/Skeleton';
import 'firebase/auth';
import get from 'lodash/get';
import over from 'lodash/over';
import Image from 'material-ui-image';
import React, { useState, useEffect } from 'react';
import ApproveIcon from '../../components/Icons/Approved';
import ArchiveIcon from '../../components/Icons/Archive';
import DeleteIcon from '../../components/Icons/Delete';
import ChangeThreshold from '../../components/Icons/ChangeThreshold';
import ChangeUnits from '../../components/Icons/ChangeUnits';
import ViewAlerts from '../../components/Icons/ViewAlerts';
import ViewInvoices from '../../components/Icons/ViewInvoices';
import TransferredIcon from '../../components/Icons/Transferred';
import Details from '../Products/Details/Details';
import { useDisableScroll } from '../../components/hooks';
import { InvoiceItemBadge } from './List';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';

export const InvoiceDetailsDrawer = ({
  invoice,
  invoiceOpen,
  invoiceControls,
  onChangeStatus,
  onChangeVendor,
  onChangeProduct,
  onChangeLineItemStatus,
  onRemoveLineItem,
}) => {
  const [productOpen, productControls] = useBooleanControls(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const invoiceId = get(invoice, '_id');
  const { data, loading, error } = useQuery(InvoiceByIdDocument, {
    variables: { invoiceId },
    skip: !invoice,
  });
  const invoiceDataId = get(data, 'invoiceById._id');
  const invoiceData =
    invoiceDataId === invoiceId ? get(data, 'invoiceById') : null;
  useDisableScroll(invoiceOpen);
  return (
    <div>
      <SwipeableDrawer
        anchor="bottom"
        open={invoiceOpen}
        onClose={invoiceControls.setFalse}
        onOpen={invoiceControls.setTrue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: 'drawer-radius container h-80vh' }}
      >
        {/* <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
        
      </DialogTitle> */}
        <Menu
          id="invoice-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={over([
              () => productControls.setTrue(),
              () => setAnchorEl(null),
            ])}
          >
            <ChangeThreshold
              style={{ marginRight: 4, height: 20, width: 20 }}
            />{' '}
            Change threshold
          </MenuItem>
          <MenuItem
            onClick={over([
              () => onChangeVendor(invoice),
              () => setAnchorEl(null),
            ])}
          >
            <TransferredIcon
              style={{ marginRight: 4, height: 20, width: 20 }}
            />{' '}
            Change Vendor
          </MenuItem>
          <MenuItem
            onClick={over([
              //TO DO
              () => setAnchorEl(null),
            ])}
          >
            <ChangeUnits style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Change units
          </MenuItem>
          <MenuItem
            onClick={over([
              //TO DO
              () => setAnchorEl(null),
            ])}
          >
            <ViewInvoices style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            View Invoices
          </MenuItem>
          <MenuItem
            onClick={over([
              //TO DO
              () => setAnchorEl(null),
            ])}
          >
            <ViewAlerts style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            View Alerts
          </MenuItem>
          <MenuItem
            onClick={over([
              () => onChangeStatus(invoice, 'approved'),
              () => setAnchorEl(null),
            ])}
          >
            <ApproveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Approve
          </MenuItem>
          <MenuItem
            onClick={over([
              () => onChangeStatus(invoice, 'archived'),
              () => setAnchorEl(null),
            ])}
          >
            <ArchiveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Archive
          </MenuItem>
          <MenuItem
            onClick={over([
              () => onChangeStatus(invoice, 'deleted'),
              () => setAnchorEl(null),
            ])}
          >
            <DeleteIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Delete
          </MenuItem>
        </Menu>
        <DialogContent>
          <span className="drawer-notch"></span>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h6">Invoice Details</Typography>
            </Box>
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                setAnchorEl(ev.target);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <InvoiceDetails
            invoice={invoice}
            invoiceData={invoiceData}
            onChangeProduct={onChangeProduct}
            onChangeLineItemStatus={onChangeLineItemStatus}
            onRemoveLineItem={onRemoveLineItem}
          />
        </DialogContent>
        <DialogActions className="bottom-actions" style={{ padding: 24 }}>
          <Fab color="secondary" onClick={invoiceControls.setFalse}>
            <CloseIcon />
          </Fab>
          <Box flexGrow={1} />
          <Box pb={2.3} pl={2.3}>
            <Fab color="secondary" onClick={invoiceControls.setFalse}>
              <CheckIcon />
            </Fab>
          </Box>
        </DialogActions>
        {loading ? <LinearProgress /> : null}
      </SwipeableDrawer>
      <Details productOpen={productOpen} productControls={productControls} />
    </div>
  );
};

export const InvoiceDetails = ({
  invoice,
  invoiceData,
  onChangeProduct,
  onChangeLineItemStatus,
  onRemoveLineItem,
}) => {
  const [active, setActive] = useState(0);
  const [fullscreenOpen, fullscreenControls] = useBooleanControls(false);
  const status = get(invoiceData, 'status') || get(invoice, 'status');
  const total = get(invoiceData, 'total') || get(invoice, 'total');
  const totalStr =
    typeof total === 'string'
      ? total
      : typeof total === 'number'
      ? total.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '--';
  const vendorName =
    get(invoiceData, 'vendor.name') || get(invoice, 'vendor.name') || status;
  const docDate = get(invoice, 'createdDate')
    ? new Date(get(invoice, 'createdDate')).toLocaleDateString()
    : '--';
  const dueDate = get(invoice, 'dueDate')
    ? new Date(get(invoice, 'dueDate')).toLocaleDateString()
    : '--';
  const lineItems = get(invoiceData, 'lineItems') || [];
  const imageUrl = get(invoiceData, 'imageUrl') || '';
  const imageUrls = get(invoiceData, 'imageUrls') || [];
  return (
    <>
      {invoice && (
        <ListItem disableGutters={true}>
          <ListItemAvatar>
            <InvoiceItemBadge
              status={status}
              createdDate={get(invoice, 'createdDate')}
            />
          </ListItemAvatar>
          <Box width={'100%'}>
            <ListItemText primary={vendorName} />
            <Divider />
          </Box>
        </ListItem>
      )}
      <Box mb={2}>
        <ListItem disableGutters={true}>
          <Grid container>
            <Grid xs={4} item>
              <Typography>Cost</Typography>
              <Typography bold="true" variant="h6">
                {currencySymbol(get(invoice, 'currency'))}
                {totalStr}
              </Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography>Doc Date: {docDate}</Typography>
              <Typography>Due Date: {dueDate}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      </Box>
      <Box
        padding={2}
        position="relative"
        style={{ backgroundColor: '#515659' }}
      >
        {imageUrls && imageUrls.length > 1 ? (
          <SwipeableViews
            index={active}
            onChangeIndex={setActive}
            enableMouseEvents
          >
            {imageUrls.map(url => (
              <InvoiceImage
                key={url}
                src={url}
                style={{ height: 200, width: '100%' }}
              />
            ))}
          </SwipeableViews>
        ) : (
          <InvoiceImage src={imageUrl} style={{ height: 200, width: '100%' }} />
        )}
        <Box position="absolute" style={{ top: 0, right: 0 }} padding={1}>
          <IconButton onClick={fullscreenControls.setTrue} color="primary">
            <Fullscreen style={{ height: 40, width: 40 }} />
          </IconButton>
        </Box>
      </Box>
      {imageUrls && imageUrls.length > 1 ? (
        <MobileStepper
          variant="dots"
          activeStep={active}
          steps={imageUrls.length}
          style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            bottom: 0,
            color: '#fff',
            backgroundColor: 'transparent',
          }}
        />
      ) : null}
      <Box mt={3}>
        <Typography color="primary" variant="h6">
          Products
        </Typography>
      </Box>
      <List>
        {lineItems.map(lineItem => (
          <LineItemListItem
            key={lineItem._id}
            lineItem={lineItem}
            onChangeProduct={onChangeProduct}
            onChangeLineItemStatus={onChangeLineItemStatus}
            onRemoveLineItem={onRemoveLineItem}
          />
        ))}
      </List>
      <div style={{ height: 120 }} />
      <Modal open={fullscreenOpen} onClose={fullscreenControls.setFalse}>
        <Box>
          <Box
            position="absolute"
            onClick={fullscreenControls.setFalse}
            style={{ top: 0, left: 0, bottom: 0, right: 0 }}
          />
          <Box
            padding={2}
            position="relative"
            style={{
              height: '100vh',
              width: '100%',
              maxWidth: 760,
              margin: 'auto',
              overflow: 'scroll',
              WebkitOverflowScrolling: 'touch',
              outline: 'none',
            }}
          >
            {(imageUrl || '').toLowerCase().includes('.pdf') ? (
              <object
                data={imageUrl}
                aria-label={vendorName || `Invoice Image`}
                type="application/pdf"
                style={{
                  objectFit: 'cover',
                  padding: 0,
                  height: '100vh',
                  width: '100%',
                }}
              />
            ) : imageUrls && imageUrls.length > 1 ? (
              imageUrls.map(url => (
                <Image
                  key={url}
                  src={url}
                  alt={vendorName}
                  style={{ width: '100%' }}
                  imageStyle={{
                    objectFit: 'contain',
                    objectPosition: 'top',
                  }}
                />
              ))
            ) : (
              <Image
                src={imageUrl}
                alt={vendorName}
                style={{ width: '100%' }}
                imageStyle={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            )}
            <div style={{ height: 80 }} />
          </Box>
          <Box position="absolute" style={{ bottom: 0, left: 0 }} padding={1}>
            <Fab color="secondary" onClick={fullscreenControls.setFalse}>
              <CloseIcon />
            </Fab>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export const InvoiceImage = ({ src, style }) => {
  return (src || '').toLowerCase().includes('.pdf') ? (
    <object
      data={src}
      type="application/pdf"
      height={style && style.height}
      style={{
        objectFit: 'cover',
        padding: 0,
        ...style,
      }}
    />
  ) : (
    <Image
      src={src}
      style={{
        padding: 0,
        ...style,
      }}
      imageStyle={{
        objectFit: 'cover',
        objectPosition: 'top',
      }}
      loading={
        <Skeleton
          variant="rect"
          height={style && style.height}
          width={style && style.width}
        />
      }
      alt="Invoice"
    />
  );
};

export const LineItemListItem = ({
  lineItem,
  onChangeProduct,
  onChangeLineItemStatus,
  onRemoveLineItem,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <ListItem disableGutters={true}>
        <ListItemText
          classes={{ root: 'ellipsis' }}
          primaryTypographyProps={{ noWrap: true }}
          primary={get(lineItem, 'product.name')}
          secondary={get(lineItem, 'product.category')}
        />
        <Box ml={1}>
          <Typography variant="caption" noWrap>
            {(get(lineItem, 'quantity') || 0).toLocaleString()}
            {get(lineItem, 'unit') || ''}
            {' x '}
            {currencySymbol(get(lineItem, 'currency'))}
            {(get(lineItem, 'amount') || 0).toLocaleString()}
          </Typography>
        </Box>
        <Box ml={3} mr={1}>
          <Typography>
            {currencySymbol(get(lineItem, 'currency'))}
            {(
              (get(lineItem, 'amount') || 0) * (get(lineItem, 'quantity') || 1)
            ).toLocaleString()}
          </Typography>
        </Box>
        <IconButton
          onClick={ev => {
            ev.stopPropagation();
            setAnchorEl(ev.target);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </ListItem>
      <Divider />
      <Menu
        id="line-item-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={over([
            () => onChangeProduct(lineItem),
            () => setAnchorEl(null),
          ])}
        >
          <TransferredIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
          Change Product
        </MenuItem>
        <MenuItem
          onClick={over([
            () => onChangeLineItemStatus(lineItem, 'approved'),
            () => setAnchorEl(null),
          ])}
        >
          <ApproveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
          Approve
        </MenuItem>
        <MenuItem
          onClick={over([
            () => onChangeLineItemStatus(lineItem, 'archived'),
            () => setAnchorEl(null),
          ])}
        >
          <ArchiveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
          Archive
        </MenuItem>
        <MenuItem
          onClick={over([
            () => onRemoveLineItem(lineItem),
            () => setAnchorEl(null),
          ])}
        >
          <DeleteIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export function currencySymbol(unit) {
  switch (unit) {
    case 'USD':
      return '$';
    default:
      return '$';
  }
}
