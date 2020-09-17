import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Base86Modal from '../../../../components/Modal';
import ProductsModalContent from './QuoteAddModalProducts';

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

const LinkNewProductModal = ({ isOpen, onClose, onSubmit, step }) => {
  const classes = useStyles();

  const [addingItems, setAddingItems] = useState([]);

  useEffect(() => {
    setAddingItems([]);
  }, [step]);

  return (
    <Base86Modal
      title={'Link catalog product(s)'}
      open={isOpen}
      onClose={onClose}
      submitText={'Add'}
      onSubmit={onSubmit}
      size="l"
    >
      <ProductsModalContent
        classes={classes}
        addingItems={addingItems}
        setAddingItems={setAddingItems}
      />
    </Base86Modal>
  );
};

export default LinkNewProductModal;
