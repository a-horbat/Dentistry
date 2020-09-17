import React from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import External from '../../../assets/Icons/Suppliers/External';
import { Popover } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { useButtonStyles } from '../../../MUIStyles/General';
import { useProductTableStyles } from '../../../MUIStyles/Tables';
import useEntityDetailStyles from '../../../MUIStyles/EntityDetails';
import DetailTable from '../../../components/DetailTable';

const ProductDetailPopoverTrigger = (
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: '#27AE60',
    }}
  />
);

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
    id: 'catPrice',
    label: 'Cat. Price',
  },
  {
    id: 'popover',
    label: 'Type',
  },
];

function createData(_id, name, category, sku, manufacturer, catPrice, type) {
  return { _id, name, category, sku, manufacturer, catPrice, type };
}

const rowsSecondTable = [
  createData(
    123,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 E',
    'Company 3',
    456,
    'MGF5',
    '$34.78',
    //<TypeSquare />,
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

const QuoteHistoryForSuppliers = React.memo(
  ({
    setSelectedQueryHistory,
    selected,
    openFullScreen,
    openProductHistoryCallback,
    highlight,
    expandable = true,
    closable = true,
    onClose,
  }) => {
    const classes = Object.assign(
      useEntityDetailStyles(),
      useButtonStyles(),
      useProductTableStyles(),
    );
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClick1 = (event) => {
      setAnchorEl1(event.currentTarget);
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
    const closeEditMode = () => {
      editModeControls.setFalse();
      setTimeout(() => {
        showEditModeSlideControls.setFalse();
      }, 250);
    };

    // const ProductDetailPopoverTrigger = (
    //   <img
    //     alt="active"
    //     src={require('../../../assets/Icons/Ellipse 15.png')}
    //     aria-describedby={id}
    //     onClick={handleClick}
    //   />
    // );

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
              src={require('../../../assets/Icons/Rectangle 109.png')}
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
                {/* {!highlight && expandable && (
                  <IconButton onClick={openFullScreen}>
                    <img
                      alt="expand"
                      className={classes.detailButton}
                      src={require('../../../assets/Icons/expand.png')}
                    />
                  </IconButton>
                )} */}
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
                Manfacturer
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
                555678
              </Typography>
              <Typography
                className={classes.detailText}
                style={{
                  fontFamily: 'Poppins',
                }}
              >
                sku
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
          <Box
            mt={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography
              variant="h4"
              className={classes.detailDescriptionHeader}
            >
              My Products (4)
            </Typography>
            <IconButton>
              <External />
            </IconButton>
          </Box>
          <Box style={{ overflow: 'scroll', marginBottom: 32 }}>
            <DetailTable
              rows={rowsSecondTable}
              columns={columns}
              className={classes.productTable}
              popoverTrigger={ProductDetailPopoverTrigger}
              //popover={ProductDetailPopover}
              selected={selected}
              onSelect={(id) => {
                if (setSelectedQueryHistory) {
                  setSelectedQueryHistory(id);
                }
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
              <Box className={classes.PopoverItem}>
                <img
                  alt="archive"
                  src={require('../../../assets/Icons/archive.png')}
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
                  src={require('../../../assets/Icons/delete.png')}
                  style={{ marginRight: '20px', height: '20px' }}
                />
                <Typography className={classes.fontPoppins}>
                  Remove from quote
                </Typography>
              </Box>
            </Box>
          </Popover>
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

export default QuoteHistoryForSuppliers;
