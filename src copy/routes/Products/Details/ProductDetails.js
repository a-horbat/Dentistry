import React from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import SwipeableViews from 'react-swipeable-views';
import IconButton from '@material-ui/core/IconButton';
import Fullscreen from '@material-ui/icons/Fullscreen';
import ItemBadge from './ItemBadge';
import ProductImage from './ProductImage';
import LineItemListItem from './LineItemListItem';
import AddUnit from '../../../components/Icons/AddUnit';
import EditCostDrawer from './EditCostDrawer';

const ProductDetails = ({
  product,
  units,
  removeUnit,
  addUnitOpenControls,
  baseUnitCost,
  updateUnitCost,
}) => {
  const [fullscreenOpen, fullscreenControls] = useBooleanControls(false);
  const productName = product ? product.name : '';
  const category = product ? product.category : '';
  const status = product ? product.status : '';
  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/red-archive-248302.appspot.com/o/base86%2Fimages%2FqziThLTJwMQSp5BPJSfs4sDILU52%2Finvoices%2Finvoice213323.pdf2019-12-03T02%3A32%3A41.136Z?alt=media&token=17570cd6-0d3c-40f2-b338-e83ffdb7b8c2";
  const [ editCostOpen, editCostControl] = useBooleanControls(false);

  const editHandle = () => {
    editCostControl.setTrue();
  };

  return (
    <>
      {product && (
        <ListItem disableGutters>
          <ListItemAvatar>
            <ItemBadge status={status} name={productName} />
          </ListItemAvatar>
          <Box width="100%">
            <ListItemText primary={productName} secondary={category} />
            <Divider />
          </Box>
        </ListItem>
      )}
      <Box mt={2} width="100%">
        <ListItemText secondary="Base unit cost" />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <ListItemText m={1}>{`$${baseUnitCost}`}</ListItemText>
        <Button color="primary" onClick={editHandle}>Edit</Button>
      </Box>
      <Box
        padding={2}
        position="relative"
        style={{ backgroundColor: '#515659' }}
      >
        {imageUrl ? (
          <SwipeableViews enableMouseEvents>
            <ProductImage
              src={imageUrl}
              style={{ height: 200, width: '100%' }}
            />
          </SwipeableViews>
        ) : (
          <ProductImage src={imageUrl} style={{ height: 200, width: '100%' }} />
        )}
        <Box position="absolute" style={{ top: 0, right: 0 }} padding={1}>
          <IconButton onClick={fullscreenControls.setTrue} color="primary">
            <Fullscreen style={{ height: 40, width: 40 }} />
          </IconButton>
        </Box>
      </Box>
      <Box mt={3}>
        <Typography color="primary" variant="h6">
          Units of Measure
        </Typography>
      </Box>
      <List>
        {units
          ? units.map(lineItem => (
              <LineItemListItem
                key={lineItem.id}
                lineItem={lineItem}
                removeUnit={removeUnit}
                baseUnitCost={baseUnitCost}
              />
            ))
          : null}
      </List>
      <Box mt={1}>
        <IconButton onClick={() => addUnitOpenControls.setTrue()}>
          <AddUnit style={{ marginRight: 4, height: 25, width: 25 }} />
          <Box ml={1}>
            <Typography color="primary">Add</Typography>
          </Box>
        </IconButton>
      </Box>
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
              overflow: 'scoll',
              WebkitOverflowScrolling: 'touch',
              outline: 'none',
            }}
          >
            {(imageUrl || '').toLowerCase().includes('.pdf') ? (
              <object
                data={imageUrl}
                type="application/pdf"
                style={{
                  objectFit: 'cover',
                  padding: 0,
                  height: '100vh',
                  width: '100%'
                }}
              />
            ) : (
              <Image
                key={imageUrl}
                src={imageUrl}
                alt={productName}
                style={{ width: '100%' }}
                imageStyle={{
                  objectFit: 'contain',
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
      <EditCostDrawer
        editCostControl={editCostControl}
        editCostOpen={editCostOpen}
        updateUnitCost={updateUnitCost}
        baseUnitCost={baseUnitCost}
      />
    </>
  );
};

export default ProductDetails;