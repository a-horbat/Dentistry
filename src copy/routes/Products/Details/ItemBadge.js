import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { ItemStatusIcon } from '../../../components/Status';

const ItemBadge = ({ status, name }) => {
  return (
    <Badge
      badgeContent={
        <ItemStatusIcon status={status} style={{ height: 20, width: 20 }} />
      }
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar>
        {(name || '')
          .split(' ')
          .map(v => v.slice(0, 1))
          .join('')
          .slice(0, 2)
          .toUpperCase()}
      </Avatar>
    </Badge>
  );
};

export default ItemBadge;
