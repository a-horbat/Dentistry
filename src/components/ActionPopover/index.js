import React from 'react';
import {
  Popover,
  MenuItem,
  Typography,
  Divider,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const usePopoverStyles = makeStyles((theme) => ({
  root: { padding: '5px 0px' },
  menuItemClass: {
    padding: '13px 22px',
    '& > svg': {
      color: '#828282'
    }
  },
  textWithMargin: {
    marginLeft: 14,
  },
}));

const ActionPopover = ({
  id,
  open,
  anchorEl,
  onClose,
  popoverMenu,
  ...other
}) => {
  const { root, menuItemClass, textWithMargin } = usePopoverStyles();
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        className: root,
      }}
      {...other}
    >
      {popoverMenu?.length > 0 ? (
        popoverMenu.map((menuItem, index) => (
          <MenuItem
            component="div"
            className={menuItemClass}
            key={`actionPopoverItem-${menuItem?.code}-${index}`}
            onClick={menuItem?.callback}
          >
            {menuItem?.withDivider && <Divider />}
            {menuItem?.icon ? menuItem.icon : null}
            {menuItem?.text && (
              <Typography className={`${menuItem?.icon ? textWithMargin : ''}`}>
                {menuItem?.text}
              </Typography>
            )}
          </MenuItem>
        ))
      ) : (
        <Typography>No actions</Typography>
      )}
    </Popover>
  );
};

ActionPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.element,
  onClose: PropTypes.func,
  popoverMenu: PropTypes.shape({
    code: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.element,
    text: PropTypes.string,
    withDivider: PropTypes.bool,
    callback: PropTypes.func,
  }),
};

export default ActionPopover;
