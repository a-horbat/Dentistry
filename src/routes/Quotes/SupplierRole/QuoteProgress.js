import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import capitalize from 'lodash/capitalize';

const useQuoteProgressStyles = makeStyles((theme) => ({
  progressBox: {
    width: '100%',
    position: 'relative',
  },
  mainLine: {
    width: 'calc(100% - 2px)',
    height: 4,
    background: '#E6E6E6',
    position: 'relative',
  },
  innerLine: {
    height: '100%',
    background: '#27AE60',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circlesContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circleActive: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#27AE60',
    position: 'absolute',
    top: -8,
  },
  circleCurrent: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#fff',
    border: '4px solid #27AE60',
    boxSizing: 'border-box',
    position: 'absolute',
    top: -8,
  },
  circleInactive: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#E6E6E6',
    position: 'absolute',
    top: -8,
  },
  labelsContainer: {
    width: '100%',
    position: 'relative',
    marginTop: 16,
    paddingLeft: 1,
    paddingRight: 2,
    height: 50,
  },
  label: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '22px',
    letterSpacing: -0.41,
    color: '#333333',
    width: 90,
    position: 'absolute',
    top: 0,
  },
  textCentered: {
    textAlign: 'centers',
  },
}));

const QuoteProgress = React.memo(({ progress, style }) => {
  const classes = useQuoteProgressStyles();
  const stepMap = {
    new: 0,
    draft: 1,
    send: 2,
  };
  const step = stepMap[progress];
  return (
    <Box className={classes.progressBox} style={style || {}}>
      <Box className={classes.mainLine}>
        <Box className={classes.innerLine} style={{ width: `${50 * step}%` }} />
      </Box>
      <Box className={classes.circlesContainer}>
        {Array(step)
          .fill(null)
          .map((_, index) => {
            return (
              <Box
                className={classes.circleActive}
                style={{ left: `calc(${50 * index}% - ${7 * index}px)` }}
              />
            );
          })}
        <Box
          className={classes.circleCurrent}
          style={{ left: `calc(${50 * step}% - ${7 * step}px)` }}
        />
        {Array(2 - step)
          .fill(null)
          .map((_, index) => {
            index += step + 1;
            return (
              <Box
                className={classes.circleInactive}
                style={{ left: `calc(${50 * index}% - ${7 * index}px)` }}
              />
            );
          })}
      </Box>
      <Box className={classes.labelsContainer}>
        {Object.keys(stepMap).map((key, index) => {
          const colorStyle = index > step ? { color: '#828282' } : {};
          const alignStyle =
            index > 0 && index < 2
              ? { textAlign: 'center' }
              : index === 0
              ? { textAlign: 'left' }
              : index === 2
              ? { textAlign: 'center' }
              : {};
          const leftStyle =
            index === 1
              ? { left: `calc(${50 * index}% - ${43 * index}px)` }
              : index === 2
              ? { left: `calc(${50 * index}% - ${28 * index}px)` }
              : { left: `calc(${50 * index}% - ${31 * index}px)` };
          return (
            <Typography
              className={classes.label}
              style={Object.assign(leftStyle, colorStyle, alignStyle)}
            >
              {capitalize(key)}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
});

export default QuoteProgress;
