import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CloseModal from '../assets/Icons/CloseModal';

const useStyles = makeStyles((theme) => ({
  modalContent: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 56,
    left: '50%',
    transform: 'translateX(-50%)',
    outline: 'none',
    borderRadius: 4,
    width: '784px',
  },
  header: {
    padding: '24px 32px 17px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px #E6E6E6 solid',
  },
  subContainer: {
    height: '60vh', // '650px',
    padding: '32px',
    backgroundColor: theme.palette.background.default,
    overflow: 'scroll',
  },
  paragraph: {
    padding: '0 32px 32px 0', // top right bottom left
    display: 'flex',
    alignItems: 'center',
  },
  paragraphNumber: {
    width: '32px',
    height: '32px',
    backgroundColor: '#E6E6E6',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FF8070',
  },
  pictureContainer: {
    paddingBottom: '32px',
  },
  picture: {
    border: '1px #E6E6E6 solid',
    width: '722px',
  },
  footer: {
    height: '92px',
    borderTop: '1px #E6E6E6 solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '32px',
  },
  button: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `1px ${theme.palette.primary.main} solid`,
    textTransform: 'none',
    width: '176px',
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
  },
}));

const UploadGuide = React.memo(({ open, close }) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={close}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box className={classes.modalContent}>
          <Box className={classes.header}>
            <Typography
              style={{
                fontWeight: 'bold',
                fontSize: '22px',
                fontFamily: 'Comfortaa',
              }}
            >
              How to Generate Purchase History Report
            </Typography>
            <IconButton onClick={close}>
              <CloseModal />
            </IconButton>
          </Box>
          <Box className={classes.subContainer}>
            <Typography
              style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
              }}
            >
              Step by step instructions on how to generate the Henry Schein{' '}
              <i>
                “Items Purchased by Manufacturer and Category with Invoice
                Details”
              </i>{' '}
              Report file for upload to base86
            </Typography>
            <Box mt={2} />
            <Box className={classes.paragraph}>
              <Box className={classes.paragraphNumber}>1</Box>
              <Box ml={2}>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    color: '#4F4F4F',
                  }}
                >
                  <span style={{ fontWeight: '500' }}>Log in</span> to your
                  Henry Schein account at{' '}
                  <span
                    style={{
                      color: 'rgb(45, 156, 219)',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    // href="http://henryschein.com"
                    onClick={() => {
                      window.open('http://henryschein.com', '_blank');
                    }}
                  >
                    http://henryschein.com
                  </span>
                </Typography>
              </Box>
            </Box>
            <Box className={classes.paragraph}>
              <Box className={classes.paragraphNumber}>2</Box>
              <Box ml={2}>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    color: '#4F4F4F',
                  }}
                >
                  Select the{' '}
                  <span style={{ fontWeight: '500' }}>Reporting</span> option in
                  my account.
                </Typography>
              </Box>
            </Box>
            <Box className={classes.pictureContainer}>
              <Box className={classes.picture}>
                <img
                  alt="step 2"
                  src={require('../assets/pictures/uploadGuide/2.png')}
                />
              </Box>
            </Box>
            <Box className={classes.paragraph}>
              <Box className={classes.paragraphNumber}>3</Box>
              <Box ml={2}>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    color: '#4F4F4F',
                  }}
                >
                  Select <span style={{ fontWeight: '500' }}>New Report.</span>
                </Typography>
              </Box>
            </Box>
            <Box className={classes.pictureContainer}>
              <Box className={classes.picture}>
                <img
                  alt="step 3"
                  src={require('../assets/pictures/uploadGuide/3.png')}
                />
              </Box>
            </Box>
            <Box className={classes.paragraph}>
              <Box className={classes.paragraphNumber}>4</Box>
              <Box ml={2}>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    color: '#4F4F4F',
                  }}
                >
                  Select the{' '}
                  <span style={{ fontWeight: '500' }}>
                    {' '}
                    Items Purchased by Manufacturer and Category with Invoice
                    Details
                  </span>
                  <br />
                  report and click “Next”
                </Typography>
              </Box>
            </Box>
            <Box className={classes.pictureContainer}>
              <Box className={classes.picture}>
                <img
                  alt="step 4"
                  src={require('../assets/pictures/uploadGuide/4.png')}
                />
              </Box>
            </Box>
            <Box className={classes.paragraph}>
              <Box className={classes.paragraphNumber}>5</Box>
              <Box ml={2}>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    color: '#4F4F4F',
                  }}
                >
                  Select{' '}
                  <span style={{ fontWeight: '500' }}>Default Settings</span>{' '}
                  and click <span style={{ fontWeight: '500' }}>Next</span>.
                </Typography>
              </Box>
            </Box>
            <Box className={classes.pictureContainer}>
              <Box className={classes.picture}>
                <img
                  alt="step 5"
                  src={require('../assets/pictures/uploadGuide/5.png')}
                />
              </Box>
            </Box>
            <Box className={classes.paragraph}>
              <Box className={classes.paragraphNumber}>6</Box>
              <Box width="65%" ml={2}>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    color: '#4F4F4F',
                  }}
                >
                  Wait for the report to get generated. Once it’s ready, click
                  on the Excel to download file to your computer.
                </Typography>
              </Box>
            </Box>
            <Box className={classes.pictureContainer}>
              <Box className={classes.picture}>
                <img
                  alt="step 6"
                  src={require('../assets/pictures/uploadGuide/6.png')}
                />
              </Box>
            </Box>
            <Box className={classes.paragraph}>
              <Box className={classes.paragraphNumber}>7</Box>
              <Box width="60%" ml={2}>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    color: '#4F4F4F',
                  }}
                >
                  Upload the Excel file on your computer to base86. You are
                  done!
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.footer}>
            <Button onClick={close} className={classes.button}>
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
});

export default UploadGuide;
