import React, { useContext } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import { Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFindContext } from '@elevatejs/material-crud-ui';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { useButtonStyles } from '../MUIStyles/General';
import { useProductTableStyles } from '../MUIStyles/Tables';
import Edit from '../assets/Icons/Edit';
import useEntityDetailStyles from '../MUIStyles/EntityDetails';
import DetailTable from './DetailTable';
import ActionsPopover from './ActionPopover';
import Add from '@material-ui/icons/Add';
import { Catalog } from '../assets/Icons/Prover';
import RoleContext from '../utils/roleContext';
import RoleRender from './RoleRender';

const columns = [
  { id: 'name', label: 'Product Name' },
  {
    id: 'supplier',
    label: 'Supplier',
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
    id: 'priceDate',
    label: 'Price Date',
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

const rows = [
  createData('COLOR', 'Gold'),
  createData('INGRIDIENTS', 'Stainless Steel'),
  createData('ITEM', 'Aspirating Syringe'),
  createData('QUANTITY', 'Each'),
  createData('SIZE', 'Standart'),
  createData('WIDTH', 'Thumb Ring'),
];
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

const useStyles = makeStyles((theme) => ({
  emptyProductText: {
    color: theme.palette.text.light,
    margin: '0 auto 24px',
    maxWidth: 450,
  },
}));

const ProductDetail = React.memo(
  ({
    setSelectedProductHistory,
    selected,
    openFullScreen,
    openProductHistoryCallback,
    highlight,
    expandable = true,
    closable = true,
    onClose,
    popoverContent = null,
    tableColumns = columns,
    onLinkNewProductCallback,
    isLinking,
  }) => {
    const classes = Object.assign(
      useEntityDetailStyles(),
      useButtonStyles(),
      useProductTableStyles(),
      useStyles(),
    );
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    //TO DO: Should be removed when backend will be connected. It uses for displaying 2 state variants of content
    const [isEmptyData, setEmptyData] = React.useState(
      !!rowsSecondTable.length,
    );

    const { idField } = useFindContext();
    const { role } = useContext(RoleContext);

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
    const [anchorLinkProducts, setAnchorLinkProducts] = React.useState(null);

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

    const openLinkPopover = Boolean(anchorLinkProducts);
    const linkPopoverId = openLinkPopover
      ? 'link-my-prdoucts-popover'
      : undefined;
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

    const linkProductsPopoverContent = [
      {
        code: 'linkNewProduct',
        text: 'Link new product',
        icon: <Add />,
        callback: () => {
          if (onLinkNewProductCallback) {
            onLinkNewProductCallback();
          }
          setAnchorLinkProducts(null);
          console.log('linkNewProduct');
        },
      },
      {
        code: 'linkCatalogProduct',
        text: 'Link catalog product',
        icon: <Catalog />,
        callback: () => {
          if (onLinkNewProductCallback) {
            onLinkNewProductCallback();
          }
          setAnchorLinkProducts(null);
          console.log('linkCatalogProduct');
        },
      },
    ];

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
                {!highlight && expandable && (
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
                $53
              </Typography>
              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                Last Price
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
                Last Order
              </Typography>
            </Box>
            <Box className={classes.detailSingleTextContainer}>
              <Box
                style={{ display: 'inline-flex', marginTop: editMode ? -4 : 0 }}
              >
                {editMode ? (
                  <input value={678} className={classes.editInput} />
                ) : (
                  <>
                    <Typography
                      className={classes.detailSubheader}
                      variant="h5"
                      style={{
                        fontFamily: 'Poppins',
                      }}
                    >
                      678
                    </Typography>
                    <IconButton
                      style={{ marginTop: -12, marginLeft: 4 }}
                      onClick={openEditMode}
                    >
                      <Edit style={{ width: 16, height: 16 }} />
                    </IconButton>
                  </>
                )}

                {/* <img
                src={require('../../assets/Icons/Union.png')}
                style={{
                  marginTop: '2px',
                  marginLeft: '7px',
                  height: '14px',
                }}
              /> */}
              </Box>

              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                  marginTop: editMode ? 7 : 0,
                }}
              >
                Annual qty
              </Typography>
            </Box>
            <Box
              className={classes.detailSingleTextContainer}
              style={editMode ? { marginLeft: -10 } : {}}
            >
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
                SKU
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
          {/*<Typography
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
          </Table>*/}
          {
            //TO DO: Should be removed when backend will be connected. It uses for displaying 2 state variants of content
            <Switch
              value={isEmptyData}
              onChange={() => {
                setEmptyData(!isEmptyData);
              }}
            />
          }
          {
            //!!rowsSecondTable?.length should be used instead of isEmptyData
          }

          {isEmptyData && !isLinking ? (
            <RoleRender
              role={role}
              customer={null}
              supplier={
                <Box textAlign="center" mt={5} my={3}>
                  <Typography variant="h2" gutterBottom>
                    Link my products
                  </Typography>
                  <Typography className={classes.emptyProductText} gutterBottom>
                    In order to complete a quote, please add a related product
                    or link an existing one from your catalog.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => setAnchorLinkProducts(e.currentTarget)}
                  >
                    <Add />
                  </Button>
                </Box>
              }
            />
          ) : (
            <>
              <Typography
                variant="h4"
                className={classes.detailDescriptionHeader}
                style={{ marginTop: 40 }}
              >
                Supplier Options
              </Typography>
              <Box style={{ overflow: 'scroll', marginBottom: 32 }}>
                <DetailTable
                  rows={rowsSecondTable}
                  columns={[...columns]}
                  className={classes.productTable}
                  popoverTrigger={ProductDetailPopoverTrigger}
                  popover={ProductDetailPopover}
                  selected={selected}
                  onSelect={(id) => {
                    if (setSelectedProductHistory) {
                      setSelectedProductHistory(id);
                    }
                    openProductHistoryCallback(id);
                    console.log(id);
                  }}
                />
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
          <ActionsPopover
            id={linkPopoverId}
            open={openLinkPopover}
            anchorEl={anchorLinkProducts}
            onClose={() => {
              setAnchorLinkProducts(null);
            }}
            popoverMenu={linkProductsPopoverContent}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          />
          {/* <Popover
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
              <Box className={classes.PopoverItem}>
                <img
                  alt="customers"
                  src={require('../assets/Icons/customers.png')}
                  style={{ marginRight: '20px', height: '20px' }}
                />
                <Typography className={classes.fontPoppins}>
                  View Customers
                </Typography>
              </Box>
              <Box className={classes.PopoverItem}>
                <img
                  alt="archive"
                  src={require('../assets/Icons/archive.png')}
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
                  src={require('../assets/Icons/delete.png')}
                  style={{ marginRight: '20px', height: '20px' }}
                />
                <Typography className={classes.fontPoppins}>Delete</Typography>
              </Box>
            </Box>
          </Popover> */}
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

export default ProductDetail;
