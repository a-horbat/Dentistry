import React, { useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RoleContext from '../../../../utils/roleContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: theme.shadows[27],
    padding: '26px 32px',
    '& > .MuiTypography-root': {
      marginLeft: 12
    }
  },
  infoBlock: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 -22px',
  },
  infoItem: {
    padding: '0 22px',
    '&:not(:last-child)': {
      marginRight: 32,
    },
  },
  infoLabel: {
    fontSize: 12,
    color: '#828282',
    fontWeight: 500,
    lineHeight: '22px',
  },
}));

const QuoteInfoCard = ({ quote, className, ...other }) => {
  const classes = useStyles();
  const userRole = useContext(RoleContext);

  let infoArr = [
    {
      id: 'quoteAmount',
      label: 'Quote Amount',
      value: `${quote?.amount}$`,
    },
    {
      id: 'quoteStatus',
      label: 'Status',
      value: quote?.status,
    },
  ];

  if (userRole.role === 'Supplier') {
    infoArr = [
      {
        id: 'customerName',
        label: 'Custome Name',
        value: quote?.customerName,
      },
      ...infoArr,
      {
        id: 'rfqDate',
        label: 'RFQ Date',
        value: quote?.rfqDate,
      },
      {
        id: 'sendDate',
        label: 'Send Date',
        value: quote?.sendDate,
      },
    ];
  }

  return (
    <Box className={`${classes.root} ${className}`} {...other}>
      <Typography variant="h2" component="p">
        {quote?.name}
      </Typography>
      <Box className={classes.infoBlock} ml={2}>
        {!!infoArr.length &&
          infoArr.map((infoItem) => (
            <Box className={classes.infoItem} key={infoItem.id}>
              <Typography style={{ fontWeight: 500 }}>
                {infoItem?.value}
              </Typography>
              <Typography className={classes.infoLabel}>
                {infoItem?.label}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

QuoteInfoCard.propTypes = {
  info: PropTypes.array,
  quoteName: PropTypes.string,
  other: PropTypes.string,
};

export default QuoteInfoCard;
