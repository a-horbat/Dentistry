import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteUnit from '../../../components/Icons/DeleteUnit';

const LineItemListItem = ({ lineItem, removeUnit }) => {
  const price = lineItem.price
    ? `$ ${parseFloat(lineItem.price).toFixed(2)}`
    : null;
  const quantity = `${lineItem.quantity} x`;

  return (
    <>
      <ListItem disableGutters>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          style={{ width: '100%' }}
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton onClick={() => removeUnit(lineItem.id)}>
              <DeleteUnit style={{ marginRight: 4, height: 25, width: 25 }} />
            </IconButton>
            <Box ml={1}>
              <ListItemText
                classes={{ root: 'ellipsis' }}
                primaryTypographyProps={{ noWrap: true }}
                primary={lineItem.unitName}
                secondary={lineItem.unitType}
              />
            </Box>
          </Box>
          <Box ml={5}>
            <ListItemText
              primary={
                <Typography style={{ color: '#BDBDBD' }}>{quantity}</Typography>
              }
            />
          </Box>
          <Box>
            <ListItemText primary={price} />
          </Box>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default LineItemListItem;
