import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RoleContext from '../../utils/roleContext';

const RoleRender = ({ admin = null, supplier = null, customer = null }) => {
  const { role } = useContext(RoleContext);
  switch (role) {
    case 'Admin':
      return admin;
    case 'Customer':
      return customer;
    case 'Supplier':
      return supplier;
    default:
      return <></>;
  }
};
RoleRender.propTypes = {
  role: PropTypes.string,
  admin: PropTypes.node,
  supplier: PropTypes.node,
  customer: PropTypes.node,
};

export default RoleRender;
