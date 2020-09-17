import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import QuoteInfoCard from './QuoteInfoCard';

import MainLayoutStyles from '../../../../layouts/MainLayout/MainLayoutStyles';
import EditNavigation from '../../../../components/EditNavigation';
import { Supplier, Product } from '../../../../assets/Icons/Prover';

const stepsNavigation = [
  {
    stepValue: 0,
    title: 'Products',
    icon: <Product />,
    isComplete: false,
  },
  {
    stepValue: 1,
    title: 'Suppliers',
    icon: <Supplier />,
    isComplete: false,
  },
];
const useStyles = makeStyles({
  infoCardSpacing: {
    marginTop: 20,
    marginBottom: 28,
  },
});

const QuoteEditTopCustomer = ({ quote, step, title }) => {
  const classes = { ...MainLayoutStyles(), ...useStyles() };
  return (
    <>
      <Box className={classes.bodyGrid__itemTitle}>
        <EditNavigation editStep={step} title={title} steps={stepsNavigation} />
      </Box>

      <QuoteInfoCard className={classes.infoCardSpacing} quote={quote} />
    </>
  );
};

QuoteEditTopCustomer.propTypes = {
  quote: PropTypes.object,
  step: PropTypes.number,
  title: PropTypes.string,
};
export default QuoteEditTopCustomer;
