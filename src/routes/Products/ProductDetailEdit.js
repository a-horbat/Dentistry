import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useProductHistoryTableStyles } from '../../MUIStyles/Tables';
import MainTableStyles from '../../components/MainTable/MainTableStyles';
import DropDown from '../../components/DropDown';
import cn from 'classnames';

const styles = makeStyles({
  editContainer: {
    //border: '1px red solid',
    width: '550px',
  },
  mainText: {
    color: '#828282',
  },
  input: {
    outline: 'none',
    paddingLeft: '10px',
    height: '56px',
    border: '1px solid #E6E6E6',
    borderRadius: '6px',
    '&:focus': {
      border: '1px solid #333333',
    },
  },
  productNameInput: {
    width: '100%',
  },
  secondaryInput: {
    width: '268px',
  },
  descriptionInput: {
    width: '100%',
  },
  textarea: {
    width: '100%',
    height: '144px',
    outline: 'none',
    padding: '10px',
    border: '1px solid #E6E6E6',
    borderRadius: '6px',
    resize: 'none',
    '&:focus': {
      border: '1px solid #333333',
    },
    fontFamily: 'Poppins',
    fontSize: '14px',
  },
});

const ProductDetailEdit = ({ detailEditControls }) => {
  const [state, setState] = useState({
    productName: 'GC America FUJICEM® EVOLVE DOUBLE',
    catalogPrice: '62$',
    manufactures: '3M',
    packingUoM: 'Hesd',
    supplierSKU: '$345 657',
    mfgSku: '$345 657',
    brand: '10',
    description:
      'Quality stainless steel aspirating syringes with no removable parts to lose or break off. Standard offers a larger thumb ring and standard plunger length for traditional aspiration. Petite features a smaller thumb ring and',
  });

  const classes = Object.assign(
    styles(),
    useProductHistoryTableStyles(),
    MainTableStyles(),
  );

  return (
    <Box p={3} display="flex" justifyContent="space-between">
      <Box className={classes.editContainer}>
        <Box>
          <Typography className={classes.mainText}>PRODUCT NAME</Typography>
          <input
            type="text"
            className={cn(classes.productNameInput, classes.input)}
            value={state.productName}
            onChange={(ev) =>
              setState({ ...state, productName: ev.target.value })
            }
          />
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Box>
            <Typography className={classes.mainText}>CATALOG PRICE</Typography>
            <input
              type="text"
              className={cn(classes.secondaryInput, classes.input)}
              value={state.catalogPrice}
              onChange={(ev) =>
                setState({ ...state, catalogPrice: ev.target.value })
              }
            />
          </Box>
          <Box>
            <Typography className={classes.mainText}>MANUFACTURER</Typography>
            <DropDown
              optionsArr={[
                '3M',
                'Kulzer',
                'Metrex',
                'PureLife',
                'Dentsply Sirona',
                'ivoclar vivadent',
                'septodont',
                'kerr',
              ]}
              value={state.manufactures}
              setValue={(value) => setState({ ...state, manufactures: value })}
            />
          </Box>
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Box>
            <Typography className={classes.mainText}>PACKING/UOM</Typography>
            <DropDown
              optionsArr={[
                'asd',
                'ssgdfg',
                'Metrex',
                'PureLife',
                'sdf Sirona',
                'sf vivadent',
                'septodont',
                'kerr',
              ]}
              value={state.packingUoM}
              setValue={(value) => setState({ ...state, packingUoM: value })}
            />
          </Box>
          <Box>
            <Typography className={classes.mainText}>SUPPLIER SKU</Typography>
            <input
              type="text"
              className={cn(classes.secondaryInput, classes.input)}
              value={state.supplierSKU}
              onChange={(ev) =>
                setState({ ...state, supplierSKU: ev.target.value })
              }
            />
          </Box>
        </Box>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Box>
            <Typography className={classes.mainText}>MFG SKU</Typography>
            <input
              type="text"
              className={cn(classes.secondaryInput, classes.input)}
              value={state.mfgSku}
              onChange={(ev) => setState({ ...state, mfgSku: ev.target.value })}
            />
          </Box>
          <Box>
            <Typography className={classes.mainText}>BRAND</Typography>
            <DropDown
              optionsArr={[
                'ABRASIVE',
                'ACKERMAN',
                'AESCULAP',
                'AGM DENTAL',
                'AKZENTA',
                'ALAN',
                'ALBION',
                'ALLE',
                'AMERICAN DENTAL',
                'ANGELUS',
                'ANIOS',
                'ANTHOGYR',
                'APOZA',
                'ARAGO',
                'AREÑOS',
                'AS TECHNOLOGY',
                'ASA DENTAL',
              ]}
              value={state.brand}
              setValue={(value) => setState({ ...state, brand: value })}
            />
          </Box>
        </Box>
        <Box mt={3}>
          <Typography className={classes.mainText}>Description</Typography>
          <textarea
            // variant="outlined"
            className={classes.textarea}
            multiline
            // rows={5}
            //rowsMax={7}
            value={state.description}
            onChange={(ev) =>
              setState({ ...state, description: ev.target.value })
            }
          />
        </Box>
        <Box mt={3} className={classes.buttons}>
          <Button onClick={detailEditControls.setFalse} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={detailEditControls.setFalse}>
            <Box display="flex" alignItems="center">
              Save edits
            </Box>
          </Button>
        </Box>
      </Box>
      <Box>
        <img
          alt="details"
          className={classes.ProductDetailImage}
          src={require('../../assets/Icons/Rectangle 109.png')}
        />
      </Box>
    </Box>
  );
};

export default ProductDetailEdit;
