import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStepStyles = (props) =>
  makeStyles((theme) => ({
    stepRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    completeIcon: {
      '&&': {
        fill: 'white',
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
      },
    },
    stepItem: {
      display: 'flex',
      alignItems: 'center',
      '& > .MuiTypography-root': {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: '22px',
        fontFamily: 'Comfortaa',
        color: '#828282',
      },
      '& > svg': {
        padding: 6,
        border: '1px solid #828282',
        borderRadius: '50%',
        width: 41,
        height: 40,
        marginRight: 12,
        backgroundColor: 'white',
      },
      '& > .stepLine': {
        margin: '0 12px',
        width: 140,
        height: 2,
        border: '1px dashed #BDBDBD',
      },
    },
    selectedItem: {
      '& > svg': {
        fill: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
      '& > .MuiTypography-root': {
        color: theme.palette.primary.main,
      },
      '& > .stepLine': {
        margin: '0 12px',
        width: 140,
        height: 2,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

const StepIndicator = ({ editStep, steps }) => {
  const stepClasses = useStepStyles()();

  return (
    <Box className={stepClasses.stepRoot}>
      {!!steps?.length &&
        steps.map((step) => (
          <Box
            key={step?.stepValue}
            className={`${stepClasses.stepItem} ${
              editStep >= step?.stepValue || step?.isComplete
                ? stepClasses.selectedItem
                : ''
            }`}
          >
            {step?.stepValue !== steps[0]?.stepValue && (
              <Box className="stepLine"></Box>
            )}
            {editStep <= step?.stepValue && !step?.isComplete ? (
              step?.icon
            ) : (
              <Done className={stepClasses.completeIcon} />
            )}
            {step?.title && <Typography>{step.title}</Typography>}
          </Box>
        ))}
    </Box>
  );
};

const EditNavigation = ({
  title = '',
  titleComponent = null,
  editStep,
  steps = [],
  ...other
}) => {
  return (
    <Box display="flex" width="100%" justifyContent="space-between">
      {titleComponent}
      {titleComponent === null && title && (
        <Typography
          style={{
            display: 'inline-flex',
            flexGrow: 1,
            fontWeight: 'bold',
            marginRight: 12,
            letterSpacing: 0,
            color: '#333333',
            fontSize: 32,
            fontFamily: 'Comfortaa',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
      )}
      <StepIndicator editStep={editStep} steps={steps} />
    </Box>
  );
};

export default EditNavigation;
