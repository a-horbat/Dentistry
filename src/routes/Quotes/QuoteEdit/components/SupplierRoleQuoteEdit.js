import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuoteInfoCard from './QuoteInfoCard';

import MainLayoutStyles from '../../../../layouts/MainLayout/MainLayoutStyles';
import EditNavigation from '../../../../components/EditNavigation';
import DollarSign from '../../../../assets/Icons/DollarSign';
import { Product } from '../../../../assets/Icons/Prover';
import Info from '../../../../assets/Icons/Info';
import HelpModal from './HelpModal';

const stepsNavigation = [
  {
    stepValue: 0,
    title: 'Link Products',
    icon: <Product />,
    isComplete: false,
  },
  {
    stepValue: 1,
    title: 'Set Price',
    icon: <DollarSign />,
    isComplete: false,
  },
];
const useStyles = makeStyles({
  infoCardSpacing: {
    marginTop: 20,
    marginBottom: 28,
  },
  titleContainer: {
    '& > .MuiTypography-root': {
      display: 'inline-flex',
      flexGrow: 1,
      fontWeight: 'bold',
      marginRight: 2,
      letterSpacing: 0,
      color: '#333333',
      fontSize: 32,
      fontFamily: 'Comfortaa',
      whiteSpace: 'nowrap',
    },
  },
});

const QuoteEditTopSupplier = ({ quote, step, title }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const classes = { ...MainLayoutStyles(), ...useStyles() };
  const titleComponent = title ? (
    <Box className={classes.titleContainer} display="flex" alignItems="center">
      <Typography>{title}</Typography>
      <IconButton onClick={() => setIsModalOpen(true)}>
        <Info size="small" />
      </IconButton>
    </Box>
  ) : null;

  return (
    <>
      <Box className={classes.bodyGrid__itemTitle}>
        <EditNavigation
          editStep={step}
          titleComponent={titleComponent}
          steps={stepsNavigation}
        />
      </Box>

      <QuoteInfoCard className={classes.infoCardSpacing} quote={quote} />
      <HelpModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

QuoteEditTopSupplier.propTypes = {
  quote: PropTypes.object,
  step: PropTypes.number,
};
export default QuoteEditTopSupplier;
