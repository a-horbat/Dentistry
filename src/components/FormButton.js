import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline-block',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    padding: '15px 0',
    borderRadius: '4px',
    width: '47%',
    minWidth: '180px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  common: {
    color: '#21C5C4',
    border: '1px solid #21C5C4',
  },
  success: {
    backgroundColor: '#21C5C4',
    color: 'white',
  },
  small: {
    padding: '12px 0',
    width: '176px',
  },
}));

// type can be 'common' or 'success'
// size can be 'medium' or 'small'

const FormButton = React.memo(({ buttonText, type, size, handleClick }) => {
  const classes = useStyles();

  return (
    <div
      role="button"
      onClick={handleClick}
      className={cn(classes.button, classes[type], classes[size])}
    >
      {buttonText}
    </div>
  );
});

export default FormButton;
