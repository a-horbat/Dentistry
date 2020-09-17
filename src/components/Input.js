import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '100%',
    marginBottom: '20px',
    display: 'inline-block',
  },
  medium: {
    width: '47%',
  },
  large: {
    width: '100%',
  },
  label: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '22px',
    fontFamily: 'Poppins',
    display: 'block',
    color: '#828282',
    textTransform: 'capitalize',
    marginBottom: '4px',
  },
  inputContainer: {
    borderRadius: '6px',
    border: '1px solid #E5E5E5',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    height: '56px',
    padding: '0 18px',
    alignItems: 'center',
  },
  inputWrapper: {
    flexGrow: '1',
  },
  input: {
    border: 'none',
    outline: 'none',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'inline-block',
    maxWidth: '100%',
    width: '100%',
  },
  icon: {
    fill: '#828282',
    marginRight: '18px',
  },
  passwordIcon: {
    fill: '#828282',
    marginLeft: '18px',
    cursor: 'pointer',
  },
}));

// width can be 'medium' and 'large'

const Input = React.memo(
  ({ type, id, labelText, placeholder, Icon, width, handleChange, style }) => {
    const classes = useStyles();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [fieldType, setFieldType] = useState(type);

    const changePasswordVisible = () => {
      setIsPasswordVisible(!isPasswordVisible);
      if (fieldType === 'password') {
        setFieldType('text');
      } else {
        setFieldType('password');
      }
    };

    return (
      <div
        className={cn(classes.container, classes[width])}
        style={style || {}}
      >
        <label className={classes.label} htmlFor={id}>
          {labelText}
        </label>

        <div className={classes.inputContainer}>
          {Icon && <Icon width="18px" heihgt="18px" className={classes.icon} />}

          <div className={classes.inputWrapper}>
            <input
              onChange={(e) => handleChange(e)}
              // onClick={e => alert(e.target.value)}
              className={classes.input}
              id={id}
              type={fieldType}
              placeholder={placeholder}
            />
          </div>

          {type === 'password' && !isPasswordVisible && (
            <VisibilityOutlinedIcon
              onClick={changePasswordVisible}
              className={classes.passwordIcon}
            />
          )}
          {type === 'password' && isPasswordVisible && (
            <VisibilityOffOutlinedIcon
              onClick={changePasswordVisible}
              className={classes.passwordIcon}
            />
          )}
        </div>
      </div>
    );
  },
);

export default Input;
