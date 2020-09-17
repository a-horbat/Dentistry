import React, { useContext } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import {
  Box,
  Button,
  Typography,
  Popover,
  IconButton,
  Slide,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import { useFindContext } from '@elevatejs/material-crud-ui';
import { useButtonStyles } from '../MUIStyles/General';
import { useProductTableStyles } from '../MUIStyles/Tables';
import Edit from '../assets/Icons/Edit';
import useEntityDetailStyles from '../MUIStyles/EntityDetails';
import DetailTable from './DetailTable';
import ActionsPopover from './ActionPopover';
import External from '../assets/Icons/External';
import { Base86Tabs, Base86Tab } from './Tabs';
import { useProductHistoryTableStyles } from '../MUIStyles/Tables';
import { Remove, EditAction, Archive } from '../assets/Icons/Prover';
import RoleContext from '../utils/roleContext';
import { makeStyles } from '@material-ui/core/styles';

const columns = [
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
    label: 'Sent',
  },
  {
    id: 'sendDate',
    label: 'Send Date',
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

const createSpecificationData = (id, name, value) => ({
  id,
  name,
  value,
});

const rows = [
  createSpecificationData('color', 'COLOR', 'Gold'),
  createSpecificationData('ingr', 'INGRIDIENTS', 'Stainless Steel'),
  createSpecificationData('item', 'ITEM', 'Aspirating Syringe'),
  createSpecificationData('qty', 'QUANTITY', 'Each'),
  createSpecificationData('size', 'SIZE', 'Standart'),
  createSpecificationData('width', 'WIDTH', 'Thumb Ring'),
];
const rowsQuoteHistoryTable = [
  createData(123, 'Quote 4', 'Company 5', 456, 800, 'Sent', 'April 29 2021'),
];
const rowsMasterProductsTable = [
  createData(123, 'Quote 4', 'Company 5', 456, 800, 'Sent', 'April 29 2021'),
];
const actionsContent = [
  {
    code: 'editAlternativeProduct',
    text: 'Edit',
    icon: <EditAction />,
    callback: () => {
      console.log('Edit product');
    },
  },
  {
    code: 'archive',
    text: 'Archive',
    icon: <Archive />,
    callback: () => {
      console.log('Archive');
    },
  },
  {
    code: 'delete',
    text: 'Remove from quote',
    icon: <Remove />,
    withDivider: true,
    callback: () => {
      console.log('Delete');
    },
  },
];

const AlternativeDetail = React.memo(
  ({
    setSelectedQuoteDetailCallback,
    openQuoteDetailCallback,
    selected,
    openFullScreen,
    highlight,
    expandable = true,
    closable = true,
    onClose,
    popoverContent = actionsContent,
    tableColumns = columns,
    isEdit = false,
  }) => {
    const classes = Object.assign(
      useEntityDetailStyles(),
      useButtonStyles(),
      useProductTableStyles(),
      useProductHistoryTableStyles(),
    );
    const { role } = useContext(RoleContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
      setTab(newValue);
    };

    const { idField } = useFindContext();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
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

    const [editMode, editModeControls] = useBooleanControls(false);
    const [showEditModeSlide, showEditModeSlideControls] = useBooleanControls(
      false,
    );
    const openEditMode = () => {
      editModeControls.setTrue();
      showEditModeSlideControls.setTrue();
    };
    const closeEditMode = () => {
      editModeControls.setFalse();
      setTimeout(() => {
        showEditModeSlideControls.setFalse();
      }, 250);
    };

    const ProductDetailPopoverTrigger = (
      <img
        alt="active"
        src={require('../assets/Icons/Ellipse 15.png')}
        aria-describedby={id}
        onClick={handleClick}
      />
    );

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
              src={require('../assets/Icons/Rectangle 109.png')}
            />
            <Typography
              variant="h1"
              className={classes.detailHeader}
              style={{
                fontFamily: 'Comfortaa',
              }}
            >
              Aspirating Syringe Thumb Ring Gold Standard Ea
            </Typography>
            <Box>
              <Box style={{ marginTop: -10 }}>
                {expandable && (
                  <IconButton onClick={openFullScreen}>
                    <img
                      alt="expand"
                      className={classes.detailButton}
                      src={require('../assets/Icons/expand.png')}
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
                SKU
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
                Brand
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
        <Box className="scrollPart" style={{ flexGrow: '1', overflow: 'auto' }}>
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
          <Table size="small" className={classes.specificationTable}>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  style={{
                    background: `${index % 2 === 0 ? '#FAFAFA' : '#F0F0F0'}`,
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!rowsQuoteHistoryTable?.length && !rowsMasterProductsTable.length ? (
            <Box textAlign="center" mt={5} my={3}></Box>
          ) : (
            <>
              <Box position="relative" style={{ marginTop: 40 }}>
                <Base86Tabs
                  value={tab}
                  onChange={handleTabChange}
                  className={classes.quoteTabs}
                >
                  <Base86Tab label="Quote history" />
                  <Base86Tab label="Master Products" />
                </Base86Tabs>
                <IconButton className={classes.external}>
                  <External />
                </IconButton>
              </Box>
              <Box style={{ overflow: 'scroll', marginBottom: 32 }}>
                <Box
                  className={classes.tableBox}
                  id="quotesTableBox"
                  style={{ marginBottom: 32 }}
                >
                  <DetailTable
                    rows={rowsQuoteHistoryTable}
                    columns={columns}
                    className={classes.productTable}
                    selected={'-'}
                    style={{ display: tab === 0 ? 'table' : 'none' }}
                    onSelect={(id) => {
                      openQuoteDetailCallback(id);
                    }}
                  />
                  <DetailTable
                    rows={rowsMasterProductsTable}
                    columns={columns}
                    className={classes.productTable}
                    selected={'-'}
                    style={{ display: tab === 1 ? 'table' : 'none' }}
                    onSelect={(id) => {
                      //openProductDetailCallback(id);
                    }}
                  />
                </Box>
              </Box>
            </>
          )}
          <ActionsPopover
            id={id1}
            open={open1}
            anchorEl={anchorEl1}
            onClose={handleClose1}
            popoverMenu={popoverContent}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          />
        </Box>
        {showEditModeSlide && (
          <Slide in={editMode} direction="up" mountOnEnter>
            <Box
              position="absolute"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              style={{
                position: 'absolute',
                // width: 'calc(100% + 40px)',
                // marginLeft: -20,
                marginTop: -20,
                bottom: 0,
                display: 'inline-flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: 84,
                paddingBottom: 24,
                paddingLeft: '25%',
                paddingRight: '25%',
                backgroundImage:
                  'linear-gradient(to bottom, rgba(255,0,0,0), white, rgba(255,255,255,1))',
              }}
            >
              <Button
                className={classes.secondaryButton}
                onClick={closeEditMode}
                style={{ marginRight: 5 }}
              >
                Cancel
              </Button>
              <Button
                className={classes.primaryButton}
                onClick={closeEditMode}
                style={{ marginLeft: 5 }}
              >
                Save
              </Button>
            </Box>
          </Slide>
        )}
      </Box>
    );
  },
);

export default AlternativeDetail;
