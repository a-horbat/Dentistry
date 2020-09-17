import React from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Base86Modal from '../Modal';
import EmptyQuoteIcon from '../../assets/Icons/EmptyQuoteIcon';
import EmptyProductIcon from '../../assets/Icons/EmptyProduct';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  buttonRoot: {
    border: '1px solid #FF8070',
    borderRadius: '4px',
    width: '44px',
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(244, 231, 229)',
  },
  heading: {
    fontFamily: 'Comfortaa',
    fontWeight: 'bold',
    fontSize: '32px',
    color: '#333333',
  },
  subheading: {
    fontFamily: 'Comfortaa',
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#828282',
  },
  icon: {
    color: '#FF8070',
  },
});

const EmptyProduct = React.memo(({ type, showInfo }) => {
  const [open, setOpen] = useBooleanControls(false);
  const history = useHistory();
  const classes = useStyles();
  const types = {
    product: {
      icon: <EmptyProductIcon />,
      text: 'Add products',
      subtext: 'Upload a file',
      infoText: 'Help text',
      action: () => {
        setOpen.setTrue();
      },
    },
    quote: {
      icon: <EmptyQuoteIcon />,
      text: 'No quotes yet',
      subtext: 'Create your first request',
      infoText: '',
      action: () => {
        history.push('/quotes/edit/draft');
      },
    },
  };
  const info = types[type];
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      className={classes.root}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        height="300px"
      >
        {info.icon}

        <Typography className={classes.heading}>{info.text}</Typography>

        <Typography className={classes.subheading}>{info.subtext}</Typography>
        <IconButton onClick={info.action}>
          <Box classes={{ root: classes.buttonRoot }}>
            <AddIcon classes={{ root: classes.icon }} />
          </Box>
        </IconButton>
      </Box>
      <Base86Modal
        title="Upload Purchase History Report"
        open={open}
        onClose={setOpen.setFalse}
        submitText="Upload File"
        infoText={info.infoText}
        size="s"
        showInfo={showInfo}
      >
        <Typography
          style={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: '0.001em',
          }}
        >
          Please upload the Henry Schein "Items Purchased Report" for the period
          of the previous 12 months
        </Typography>
      </Base86Modal>
    </Box>
  );
});
export default EmptyProduct;
