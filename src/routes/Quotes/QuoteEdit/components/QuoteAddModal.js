import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useBooleanControls } from '@base86inc/apollo-client';

import Base86Modal from '../../../../components/Modal';
import ProductsModalContent from './QuoteAddModalProducts';
import SuppliersModalContent from './QuoteAddModalSuppliers';

const useStyles = makeStyles((theme) => ({
  addModalHeaderTypography: {
    fontSize: 20,
    marginRight: 16,
    fontWeight: 'bold',
    fontFamily: 'Comfortaa',
    lineHeight: '22px',
  },
  selectedItemsTypography: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}));

const PRODUCTS_STEP_NUM = 0;
const SUPPLIERS_STEP_NUM = 1;

const AddModal = ({ isOpen, onClose, onSubmit, step }) => {
  const classes = useStyles();

  const [addingItems, setAddingItems] = useState([]);

  const modalTitle =
    step === PRODUCTS_STEP_NUM
      ? 'Add product to the quote'
      : step === SUPPLIERS_STEP_NUM
      ? 'Add suppliers to the quote'
      : '';

  useEffect(() => {
    setAddingItems([]);
  }, [step]);

  return (
    <Base86Modal
      title={modalTitle}
      open={isOpen}
      onClose={onClose}
      submitText={'Add'}
      onSubmit={onSubmit}
      size="l"
    >
      {step === PRODUCTS_STEP_NUM ? (
        <ProductsModalContent
          classes={classes}
          addingItems={addingItems}
          setAddingItems={setAddingItems}
        />
      ) : step === SUPPLIERS_STEP_NUM ? (
        <SuppliersModalContent
          classes={classes}
          addingItems={addingItems}
          setAddingItems={setAddingItems}
        />
      ) : null}
    </Base86Modal>
  );
};

export default AddModal;
