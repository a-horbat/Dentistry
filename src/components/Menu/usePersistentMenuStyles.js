import { createStyles, makeStyles } from '@material-ui/core/styles';

export const usePersistentMenuStyles = makeStyles((theme) =>
  createStyles({
    mainContainerCenter: {
      [theme.breakpoints.up('xs')]: {
        // marginLeft: 300,
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-10px',
      },
    },
    mainContainer: {
      [theme.breakpoints.up('md')]: {
        // marginLeft: 300,
      },
    },
    textLeft: {
      [theme.breakpoints.up('xs')]: {
        textAlign: 'left',
        color: '#828282',
        fontWeight: 500,
      },
    },
    tableContainer: {
      [theme.breakpoints.up('xs')]: {
        // background: 'red',
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
    tablePagination: {
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
      },
    },
    tablePage: {
      [theme.breakpoints.up('xs')]: {
        background: 'white',
        display: 'flex',
        border: '.5px solid #828282',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#828282',
        marginLeft: 10,
        fontFamily: 'Poppins',
      },
    },
    tablePageActive: {
      [theme.breakpoints.up('xs')]: {
        background: 'rgba(51, 51, 51, 0.09)',
        display: 'flex',
        border: '.5px solid #828282',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333333',
        fontFamily: 'Poppins',
      },
    },
    tableFooter: {
      [theme.breakpoints.up('xs')]: {
        // background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '32px 20px',
        fontFamily: 'Poppins',
      },
    },
    ProductDetailContainer: {
      [theme.breakpoints.up('xs')]: {
        width: 600,
        padding: 20,
        fontFamily: 'Poppins',
        background: 'white',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
      },
      [theme.breakpoints.up('md')]: {
        background: 'white',
        width: 784,
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',

        padding: 20,
        fontFamily: 'Poppins',
        // marginBottom: '30px',
        // maxHeight: 930,
        overflow: 'scroll',
      },
    },
    ProductDetailImage: {
      marginRight: 20,
      width: 88,
      height: 88,
      border: '1px solid #E5E5E5',
      borderRadius: '2px',
    },
    ProductDetailHeader: {
      [theme.breakpoints.up('xs')]: {
        // background: 'white',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: '150%',
        width: 400,
        textAlign: 'left',
        color: '#333333',
        fontFamily: 'Poppins',
        flexGrow: 1,
      },
    },
    PopoverIcon: {
      color: '#21C5C4;',
      width: '24px',
      height: '24px',
      marginLeft: 'auto',
      [theme.breakpoints.up('xs')]: {
        fontWeight: 500,
        fontSize: 14,
        color: '#333333',
        marginBottom: 10,
        fontFamily: 'Poppins',
      },
    },
    ProductDetailButton: {
      color: '#BDBDBD',
      // marginLeft: '20px',
      width: '24px',
      height: '24px',
      cursor: 'pointer',
    },
    ProductDetailText: {
      [theme.breakpoints.up('xs')]: {
        fontWeight: 500,
        fontSize: 12,
        // lineHeight: 22,
        /* identical to box height, or 183% */

        letterSpacing: '-0.41px',
        textTransform: 'uppercase',
        color: '#828282;',
        fontFamily: 'Poppins',
      },
    },
    Popover: {
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        width: 219,
        flexDirection: 'column',
      },
    },
    PopoverItem: {
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '14px 22px',
      },
    },

    ProductDetailTextContainer: {
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        marginTop: 20,
        fontFamily: 'Poppins',
        flexWrap: 'wrap',
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: '90%',
      },
    },
    ProductDetailSingleTextContainer: {
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontFamily: 'Poppins',
        marginRight: 44,
        marginBottom: 20,
      },
    },
    ProductDetailSubheader: {
      [theme.breakpoints.up('xs')]: {
        fontWeight: 500,
        fontSize: 14,
        color: '#333333',
        marginBottom: 10,
        fontFamily: 'Poppins',
      },
    },
    ProductDetailDescription: {
      [theme.breakpoints.up('xs')]: {
        fontStyle: 'medium',
        fontSize: 16,
        textAlign: 'left',
        verticalAlign: 'top',
        letterSpacing: '0.1%',
        marginTop: 10,
        fontFamily: 'Poppins',
      },
    },
    ProductDetailDescriptionFull: {
      [theme.breakpoints.up('xs')]: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        textAlign: 'left',
        color: '#4F4F4F',
        marginTop: 10,
        fontFamily: 'Poppins',
      },
    },
    ProductDetailDescriptionHeader: {
      [theme.breakpoints.up('xs')]: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 18,
        textAlign: 'left',
        color: '#333333',
        marginTop: 25,
        marginBottom: 20,
        fontFamily: 'Poppins',
      },
    },
    HeaderContainer: {
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        fontFamily: 'Poppins',
      },
    },
    Container: {
      [theme.breakpoints.up('xs')]: {
        marginTop: 20,
        fontFamily: 'Poppins',
      },
    },
    SubContainer: {
      [theme.breakpoints.up('xs')]: {
        marginTop: 10,
        fontFamily: 'Poppins',
      },
    },
  }),
);
