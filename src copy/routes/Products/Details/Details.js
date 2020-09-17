import React, { useState, useEffect } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import Fab from '../../../components/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import ProductDetails from './ProductDetails';
import AddUnit from './AddUnit';
import ApprovedIcon from '../../../components/Icons/Approved';
import ArchiveIcon from '../../../components/Icons/Archive';
import DeleteIcon from '../../../components/Icons/Delete';
import ChangeIcon from '../../../components/Icons/Transferred';
import AlertsIcon from '../../../components/Icons/Alerts';
import InvoicesIcon from '../../../components/Icons/Invoices';
import ThresholdIcon from '../../../components/Icons/Threshold';
import ChangeUnits from '../../../components/Icons/ChangeUnits';

const approveProduct = () => {
  console.log('approve');
};

const archiveProduct = () => {
  console.log('archive');
};

const deleteProduct = () => {
  console.log('deleteProduct');
};

const changeCategory = () => {
  console.log('changeProduct');
};

const viewAlert = () => {
  console.log('viewAlert');
};

const viewInvoice = () => {
  console.log('viewInvoice');
};

const threshold = () => {
  console.log('threshold');
};

const changeUnit = () => {
  console.log('changeUnit');
};

const testUnits = [
  {
    id: 1,
    unitName: 'Cases',
    unitType: 'Other',
    quantity: '1',
    parent_id: null,
  },
  { id: 2, unitName: 'Cans', unitType: 'Other', quantity: '20', parent_id: 1 },
  { id: 3, unitName: 'Cans', unitType: 'Other', quantity: '5', parent_id: 2 },
];

const testBaseUnitCoast = 1000;

const Details = ({ product, productOpen, productControls }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [baseUnitCost, setBaseUnitCost] = useState(testBaseUnitCoast);
  const [units, setUnits] = useState(testUnits);
  const [addUnitOpen, addUnitOpenControls] = useBooleanControls(false);

  useEffect(() => {
    const arr = priceUpdate(units);
    setUnits([...arr]);
  }, []);

  const updateUnitCost = newUnitCost => {
    setBaseUnitCost(newUnitCost);
    const arr = priceUpdate(units, newUnitCost);
    setUnits([...arr]);
  };

  const removeUnit = id => {
    const arr = units.filter(element => element.id !== id);
    if (arr.length !== 0) {
      arr[0].parent_id = null;
      arr.forEach((element, index) => {
        if (index !== 0) element.parent_id = arr[index - 1].id;
      });
    }

    priceUpdate(arr);

    setUnits([...arr]);
  };

  const priceUpdate = (units, newUnitCost) => {
    let basePrice;
    if (newUnitCost) basePrice = newUnitCost;
      else basePrice = baseUnitCost;

    units.forEach(element => {
      element['price'] = basePrice / element.quantity;
      basePrice = basePrice / element.quantity;
    });

    return units;
  };

  const addUnit = newUnit => {
    //generate id
    let maxID = 0;
    if (units.length !== 0)
      units.forEach(element => {
        if (element.id > maxID) maxID = element.id;
      });
    newUnit["id"] = ++maxID;
    //set parentid
    let parentId = null;
    if (units.length !== 0) parentId = units[units.length - 1].id;
    newUnit["parent_id"] = parentId;
    const arr = [...units, newUnit];

    priceUpdate(arr);

    setUnits(arr);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={productOpen}
        onClose={productControls.setFalse}
        onOpen={productControls.setTrue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: 'drawer-radius container h-80vh' }}
      >
        <DialogContent>
          <span className="drawer-notch" />
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h6">Product Details</Typography>
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
          <ProductDetails
            product={product}
            units={units}
            removeUnit={removeUnit}
            addUnitOpenControls={addUnitOpenControls}
            baseUnitCost={baseUnitCost}
            updateUnitCost={updateUnitCost}
          />
        </DialogContent>
        <DialogActions className="bottom-actions">
          <Fab color="secondary" onClick={productControls.setFalse}>
            <CloseIcon />
          </Fab>
          <Box flexGrow={1} />
          <Fab
            color="secondary"
            onClick={productControls.setFalse}
            disabled={units.length < 1}
          >
            <CheckIcon />
          </Fab>
        </DialogActions>
        <Menu
          id="products-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={threshold}>
            <ThresholdIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Change Threshold
          </MenuItem>
          <MenuItem onClick={changeCategory}>
            <ChangeIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Change Category
          </MenuItem>
          <MenuItem onClick={changeUnit}>
            <ChangeUnits style={{ marginRight: 4, height: 20, width: 20 }} />
            Change Units
          </MenuItem>
          <MenuItem onClick={viewInvoice}>
            <InvoicesIcon style={{ marginRight: 4, height: 20, width: 20 }} />
            View Invoices
          </MenuItem>
          <MenuItem onClick={viewAlert}>
            <AlertsIcon style={{ marginRight: 4, height: 20, width: 20 }} />
            View Alerts
          </MenuItem>
          <MenuItem onClick={approveProduct}>
            <ApprovedIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Approve
          </MenuItem>
          <MenuItem onClick={archiveProduct}>
            <ArchiveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Archive
          </MenuItem>
          <MenuItem onClick={deleteProduct}>
            <DeleteIcon style={{ marginRight: 4, height: 20, width: 20 }} />{' '}
            Delete
          </MenuItem>
        </Menu>
        <Box mb={5} />
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="bottom"
        open={addUnitOpen}
        onClose={addUnitOpenControls.setFalse}
        onOpen={addUnitOpenControls.setTrue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: 'drawer-radius container h-80vh' }}
      >
        <AddUnit addUnitOpenControls={addUnitOpenControls} addUnit={addUnit} />
      </SwipeableDrawer>
    </>
  );
};

export default Details;
