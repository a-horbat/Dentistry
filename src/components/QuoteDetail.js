import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import {
  useFindContext,
  RemoveContextProvider,
} from '@elevatejs/material-crud-ui';
import { useBooleanControls } from '@base86inc/apollo-client';
import External from '../assets/Icons/External';
import QuoteProgress from './QuoteProgress';
import { Base86Tabs, Base86Tab } from './Tabs';
import useEntityDetailStyles from '../MUIStyles/EntityDetails';
import DetailTable from './DetailTable';
import { useProductTableStyles } from '../MUIStyles/Tables';
import ActionPopover from './ActionPopover';
import { Remove, HeadingA, EditAction, Archive } from '../assets/Icons/Prover';
import Send from '../assets/Icons/Send';
const columnsProduct = [
  { id: 'name', label: 'Product Name' },
  {
    id: 'category',
    label: 'Category',
  },
  {
    id: 'lastPrice',
    label: 'Last Price',
  },
  {
    id: 'bestPrice',
    label: 'Best Price',
  },
  {
    id: 'annualQty',
    label: 'Annual Qty',
  },
  {
    id: 'annualCost',
    label: 'Annual Cost',
  },
];

const createProductData = (
  _id,
  name,
  category,
  lastPrice,
  bestPrice,
  annualQty,
  annualCost,
) => {
  return {
    _id,
    name,
    category,
    lastPrice,
    bestPrice,
    annualQty,
    annualCost,
  };
};

const columnsSupplier = [
  { id: 'name', label: 'Suppplier' },
  {
    id: 'products',
    label: 'Products',
  },
  {
    id: 'state',
    label: 'State',
  },
  {
    id: 'specialty',
    label: 'Specialty',
  },
  {
    id: 'minOrder',
    label: 'Min Order',
  },
  {
    id: 'status',
    label: 'State',
  },
];

const createSupplierData = (_id, name, state, specialty, minOrder, status) => {
  return {
    _id,
    name,
    state,
    specialty,
    minOrder,
    status,
  };
};

const QuoteDetail = React.memo(
  ({
    quoteId,
    expandable = true,
    closable = true,
    onProductSelect,
    onSupplierSelect,
    onClose,
    openFullScreen,
    openProductDetailCallback,
    openSupplierDetailCallback,
    selectedProductDetail,
    selectedSupplierDetail,
  }) => {
    const classes = Object.assign(
      useEntityDetailStyles(),
      useProductTableStyles(),
    );
    const params = useParams();
    const history = useHistory();
    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
      setTab(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [actionsTriggerEl, setActionsTriggerEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleActionsOpenClick = (event) => {
      setActionsTriggerEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleActionsClose = () => {
      setActionsTriggerEl(null);
    };

    const open = Boolean(anchorEl);

    const openActionsPopover = Boolean(actionsTriggerEl);
    const id = open ? 'simple-popover' : undefined;
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
        code: 'sendToSuppliers',
        text: 'Send to suppliers',
        icon: <Send />,
        callback: () => {
          console.log('Send to suppliers');
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
            src={require('../assets/Icons/Rectangle 109.png')}
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
                    src={require('../assets/Icons/expand.png')}
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
        <QuoteProgress progress="received" style={{ marginTop: 24 }} />
        <Box position="relative">
          <Base86Tabs
            value={tab}
            onChange={handleTabChange}
            className={classes.quoteTabs}
          >
            <Base86Tab label="Products (8)" />
            <Base86Tab label="Suppliers (2)" />
          </Base86Tabs>
          <IconButton className={classes.external}>
            <External />
          </IconButton>
        </Box>
        <Box
          className={classes.tableBox}
          id="quotesTableBox"
          style={{ marginBottom: 32 }}
        >
          <DetailTable
            rows={Array(8)
              .fill(null)
              .map((_, i) => {
                return createProductData(
                  'sadsad' + i,
                  'BYD Care Earloop Mask ASTM Level 2 Blue 50/Bx' + i,
                  'Endodontics',
                  '$35.00',
                  '$40.00',
                  '47',
                  '$406.27',
                );
              })}
            columns={columnsProduct}
            className={classes.productTable}
            selected={'-'}
            style={{ display: tab === 0 ? 'table' : 'none' }}
            onSelect={(id) => {
              openProductDetailCallback(id);
            }}
          />
          <DetailTable
            rows={Array(2)
              .fill(null)
              .map((_, i) => {
                return createSupplierData(
                  'fdhsdfh' + i,
                  'Company',
                  4,
                  'GA',
                  'Surgery',
                  '$20',
                  'Draft',
                );
              })}
            columns={columnsSupplier}
            className={classes.productTable}
            selected={'-'}
            style={{ display: tab === 1 ? 'table' : 'none' }}
            onSelect={(id) => {
              openSupplierDetailCallback(id);
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
