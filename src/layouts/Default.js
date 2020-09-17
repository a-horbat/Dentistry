import React from 'react';

import Hidden from '@material-ui/core/Hidden';
import { PersistentPreviewMenu } from '../components/Menu/PersistentPreviewMenu';

const Default = ({ children }) => {
  return (
    <>
      {/* <Hidden smDown> */}
      {/*  <PersistentPreviewMenu></PersistentPreviewMenu> */}
      {/* </Hidden> */}
      {children}
    </>
  );
};

export default Default;
