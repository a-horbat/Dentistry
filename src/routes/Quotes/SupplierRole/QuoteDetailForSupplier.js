import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
// import {
//   useFindContext,
//   RemoveContextProvider,
// } from '@elevatejs/material-crud-ui';
// import { useBooleanControls } from '@base86inc/apollo-client';
import External from '../../../assets/Icons/External';
import QuoteProgress from './QuoteProgress';
import useEntityDetailStyles from '../../../MUIStyles/EntityDetails';
import DetailTable from '../../../components/DetailTable';
import { useProductTableStyles } from '../../../MUIStyles/Tables';
import ActionPopover from '../../../components/ActionPopover';
import {
  Remove,
  HeadingA,
  EditAction,
  Archive,
} from '../../../assets/Icons/Prover';
import Send from '../../../assets/Icons/Send';

const columns = [
  { id: 'name', label: 'Product Name' },
  {
    id: 'category',
    label: 'Category',
  },
  {
    id: 'manufacturer',
    label: 'Manufacturer',
  },
  {
    id: 'annualQty',
    label: 'Annual Qty',
  },
  {
    id: 'catalogPrice',
    label: 'Price Date',
  },
  {
    id: 'quotePrice',
    label: 'Quote Price',
  },
];

function createData(
  _id,
  name,
  category,
  manufacturer,
  annualQty,
  catalogPrice,
  quotePrice,
) {
  return {
    _id,
    name,
    category,
    manufacturer,
    annualQty,
    catalogPrice,
    quotePrice,
  };
}

const rowsSecondTable = [
  createData(
    123,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 E',
    'Company 3',
    456,
    '78',
    'April 29 2021',
    '$34.78',
  ),
  createData(
    124,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 E1',
    'Company 3',
    456,
    '78',
    'April 29 2021',
    '$34.78',
  ),
  createData(
    125,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 Easd2',
    'Company 3',
    456,
    '78',
    'April 29 2021',
    '$34.78',
  ),
  createData(
    126,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 Easd3',
    'Company 3',
    456,
    '78',
    'April 29 2021',
    '$34.78',
  ),
  createData(
    127,
    'Anutra Xylocaine 1% Epinephrine 1:100,000 E4',
    'Company 3',
    456,
    '78',
    'April 29 2021',
    '$34.78',
  ),
];

const QuoteDetail = React.memo(
  ({
    quoteId,
    expandable = true,
    closable = true,
    // onProductSelect,
    // onSupplierSelect,
    onClose,
    openFullScreen,
    openProductDetailCallback,
    //openSupplierDetailCallback,
    // selectedProductDetail,
    // selectedSupplierDetail,
  }) => {
    const classes = Object.assign(
      useEntityDetailStyles(),
      useProductTableStyles(),
    );
    const params = useParams();
    const history = useHistory();

    // const handleTabChange = (event, newValue) => {
    //   setTab(newValue);
    // };

    const [anchorEl, setAnchorEl] = useState(null);
    const [actionsTriggerEl, setActionsTriggerEl] = useState(null);

    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };

    const handleActionsOpenClick = (event) => {
      setActionsTriggerEl(event.currentTarget);
    };

    // const handleClose = () => {
    //   setAnchorEl(null);
    // };

    const handleActionsClose = () => {
      setActionsTriggerEl(null);
    };

    //const open = Boolean(anchorEl);

    const openActionsPopover = Boolean(actionsTriggerEl);
    //const id = open ? 'simple-popover' : undefined;
    //const [editMode, editModeControls] = useBooleanControls(false);
    // const [showEditModeSlide, showEditModeSlideControls] = useBooleanControls(
    //   false,
    // );
    // const openEditMode = () => {
    //   editModeControls.setTrue();
    //   showEditModeSlideControls.setTrue();
    // };
    // const closeEditMode = () => {
    //   editModeControls.setFalse();
    //   setTimeout(() => {
    //     showEditModeSlideControls.setFalse();
    //   }, 250);
    // };

    const actionsMenuContent = [
      {
        code: 'updateName',
        text: 'Update Name',
        icon: <HeadingA />,
        callback: () => {
          console.log('Update Name');
        },
      },
      {
        code: 'editQuote',
        text: 'Edit Quote',
        icon: <EditAction />,
        callback: () => {
          const id = quoteId ? quoteId : params.quoteId;
          history.push(`/quotes/edit/${id}`, { quoteId: id });
        },
      },
      {
        code: 'send',
        text: 'Send',
        icon: <Send />,
        callback: () => {
          console.log('Send');
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
        text: 'Delete',
        icon: <Remove />,
        withDivider: true,
        callback: () => {
          console.log('Delete');
        },
      },
    ];
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
        <Box className={classes.HeaderContainer}>
          <img
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
            Quote Name 67
          </Typography>
          <Box>
            <Box
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginTop: -12,
              }}
            >
              {expandable && (
                <IconButton onClick={openFullScreen}>
                  {' '}
                  <img
                    className={classes.detailButton}
                    src={require('../../../assets/Icons/expand.png')}
                  />
                </IconButton>
              )}
              <IconButton onClick={(e) => handleActionsOpenClick(e)}>
                <MoreVertIcon className={classes.detailButton} />
              </IconButton>

              {closable && (
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
              $897
            </Typography>
            <Typography
              className={classes.detailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Amount
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
              May 11, 2020
            </Typography>
            <Typography
              className={classes.detailText}
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Send Date
            </Typography>
          </Box>
        </Box>
        <QuoteProgress progress="draft" style={{ marginTop: 24 }} />
        <Box
          mt={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h4" className={classes.detailDescriptionHeader}>
            Products (8)
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
            //selected={selected}
            selected={'-'}
            onSelect={(id) => {
              if (openProductDetailCallback) openProductDetailCallback(id);
            }}
          />
        </Box>
        <ActionPopover
          anchorEl={actionsTriggerEl}
          popoverMenu={actionsMenuContent}
          id="quoteDetailsActionsPopover"
          open={openActionsPopover}
          onClose={handleActionsClose}
        />
      </Box>
    );
  },
);

export default QuoteDetail;
