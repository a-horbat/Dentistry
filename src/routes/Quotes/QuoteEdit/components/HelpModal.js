import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Base86Modal from '../../../../components/Modal';
import { Add } from '@material-ui/icons';
import Indicator from '../../../../components/PriorityIndicator/SquarePriorityIndicator';

const useStyles = makeStyles((theme) => ({
  modalContetnRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  listIcon: {
    marginRight: 18,
    color: theme.palette.secondary.main,
    width: 32,
    height: 32,
    backgroundColor: '#E6E6E6',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  indicatorSmall: {},
  listContainer: {},
  addIcon: {},
  listItem: {
    display: 'flex',
    marginBottom: 16,
  },
  listContent: {
    '& > *': {
      display: 'inline',
    },
    '& > *:not(:last-child)': {
      marginRight: 12,
    },
  },
}));
const stepsArr = [
  [
    'Link a product from your catalog to the requested product from the customer by clicking on',
    <Button
      style={{
        minWidth: 24,
        height: 24,
        display: 'inline-flex',
      }}
      variant="outlined"
      color="secondary"
    >
      <Add fontSize="small" />
    </Button>,
    'Select an existing product from your catalog or create a new one',
  ],
  [
    'Once linked, select whether the product is a Substitute',
    <Indicator
      style={{
        display: 'inline-flex',
      }}
      value="Green"
    />,
    '(identical or almost identical) or leave the default as an Alternative',
    <Indicator
      style={{
        display: 'inline-flex',
      }}
      value="Orange"
    />,
    '(different attributes, packaging, etc.).',
  ],
  [
    'Click the “Edit” button to fill out the individual and private Quote Price for each linked product you want to quote. Remove unwanted products from the quote any time. Hit “Complet and Send” and your quote will be ont he way to the customer!',
  ],
];

const StepsList = ({ steps = [] }) => {
  const {
    listIcon,
    listItem,
    indicatorSmall,
    listContainer,
    listContent,
    addIcon,
  } = useStyles();
  return (
    <Box className={listContainer}>
      {steps.length &&
        steps.map((step, index) => (
          <Box className={listItem}>
            <Box className={listIcon}>
              <Typography>{index + 1}</Typography>
            </Box>
            <Box className={listContent}>
              {step.map((item) => {
                return typeof item === 'string' ? (
                  <Typography>{item}</Typography>
                ) : (
                  item
                );
              })}
            </Box>
          </Box>
        ))}
    </Box>
  );
};

const HelpModal = ({ open, onClose }) => {
  return (
    <Base86Modal
      onClose={onClose}
      open={open}
      title="How to Edit and Submit a Quote"
      size="m"
      showSubmit={false}
    >
      <Box mb={2}>
        <Typography>
          Follow 3 easy steps to set up a quote and send it to the customer:
        </Typography>
      </Box>
      <Box>
        <StepsList steps={stepsArr} />
      </Box>
    </Base86Modal>
  );
};

HelpModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default HelpModal;
