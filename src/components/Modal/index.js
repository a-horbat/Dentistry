import React from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import Info from '../../assets/Icons/Info';
import CloseModal from '../../assets/Icons/CloseModal';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const Base86Modal = React.memo(
  ({
    open,
    title,
    onClose,
    onCancel,
    onSubmit,
    cancelText,
    submitText,
    infoText,
    children,
    customFooter,
    showInfo,
    redButton = false,
    showCancel = true,
    showSubmit = true,
    size = 's',
    modalType,
  }) => {
    const useStyles = makeStyles((theme) => ({
      modalContent: {
        backgroundColor: 'white',
        position: 'absolute',
        outline: modalType === 'changeOrganization' ? 'inherit' : 'none',
        borderRadius: 4,
        //  maxHeight: '80vh',
      },
      smallModal: {
        width: 520,
      },
      mediumModal: {
        width: 784,
      },
      largeModal: {
        width: '80vw',
      },
      modalHeader: {
        height: 75,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 32px 16px 32px',
        borderBottom: '1px solid rgba(230, 230, 230, 1)',
        position: 'sticky',
        top: 0,
        background: '#fff',
      },
      modalTitle: {
        fontFamily: 'Comfortaa',
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: '33px',
        letterSpacing: -0.41,
      },
      modalBody: {
        padding: 32,
        background: 'rgba(230, 230, 230, 0.2)',
        maxHeight: '70vh',
        //overflow: 'scroll',
        overflow: modalType === 'changeOrganization' ? 'visible' : 'scroll',
      },
      modalFooter: {
        height: 80,
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTop: '1px solid rgba(230, 230, 230, 1)',
        bottom: 0,
        background: '#fff',
      },
      closeButton: {
        backgroundColor: 'white',
        border: '1px solid #21C5C4',
        color: '#21C5C4',
        width: '176px',
        height: '48px',
        textTransform: 'none',
      },
      submitButton: {
        backgroundColor: redButton ? '#EB5757' : '#21C5C4',
        color: 'white',
        width: '176px',
        height: '48px',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: redButton ? '#DB4343' : '#1BB7B6',
        },
        marginLeft: 24,
      },
    }));

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const sizeClasses = {
      s: classes.smallModal,
      m: classes.mediumModal,
      l: classes.largeModal,
    };
    return (
      <div>
        <Modal
          open={open}
          onClose={onClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box
              className={clsx(classes.modalContent, sizeClasses[size])}
              style={modalStyle}
            >
              <Box className={classes.modalHeader}>
                <Typography className={classes.modalTitle}>
                  {title || 'Modal'}
                </Typography>
                <Box>
                  {infoText && (
                    <IconButton onClick={() => showInfo()}>
                      <Info />
                    </IconButton>
                  )}
                  <IconButton style={{ marginRight: -12 }} onClick={onClose}>
                    <CloseModal />
                  </IconButton>
                </Box>
              </Box>
              <Box className={classes.modalBody}>{children}</Box>
              <Box className={classes.modalFooter}>
                {customFooter || (
                  <>
                    {showCancel && (
                      <Button
                        classes={{ root: classes.closeButton }}
                        onClick={onCancel || onClose || null}
                      >
                        {cancelText || 'Cancel'}
                      </Button>
                    )}
                    {showSubmit && (
                      <Button
                        classes={{ root: classes.submitButton }}
                        onClick={onSubmit || onClose || null}
                      >
                        {submitText || 'Submit'}
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  },
);

export default Base86Modal;
