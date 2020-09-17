import React from 'react';
import Box from '@material-ui/core/Box';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyes = makeStyles({
  root: {
    width: 20,
    height: 20,
    borderRadius: 2,
    backgroundColor: (props) => (props.color ? props.color : '#eee'),
  },
});

const getColorSchema = (theme) => ({
  Green: theme.palette.success.main,
  Orange: theme.palette.warning.main,
});

const SquarePriorityIndicator = ({ value, style, ...other }) => {
  const theme = useTheme();
  const classes = useStyes({ color: getColorSchema(theme)[value] });

  return <Box className={classes.root} style={style} {...other}></Box>;
};

SquarePriorityIndicator.propTypes = {
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
  other: PropTypes.any,
};

export default SquarePriorityIndicator;
