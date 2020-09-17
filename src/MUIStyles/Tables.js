import { makeStyles } from '@material-ui/core/styles';

export const useProductTableStyles = makeStyles((theme) => ({
  productTable: {
    '& th': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: '-0.41px',
      color: '#333333',
      padding: '12px 8px 12px 0',
      '&:first-child': {
        paddingLeft: 32,
      },
    },
    '& td': {
      padding: '10px 21px 10px 0',
      '&:first-child': {
        paddingLeft: 32,
      },
      '& p': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: '22px',
        letterSpacing: '-0.41px',
        color: '#333333',
        maxWidth: 160,
        margin: 0,
        maxHeight: 44,
        overflow: 'hidden',
      },
    },
  },
  productHistoryTable: {},
}));

export const useProductHistoryTableStyles = makeStyles((theme) => ({
  specificationTable: {
    '& .MuiTableRow-root > td': {
      fontWeight: 500,
    },
  },
  productHistoryTable: {
    '& th': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '22px',
      letterSpacing: '-0.41px',
      color: '#333333',
      padding: '12px 8px 12px 0',
      '&:first-child': {
        paddingLeft: 32,
      },
    },
    '& td': {
      padding: '10px 21px 10px 0',
      '&:first-child': {
        paddingLeft: 32,
      },
      '& p': {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: '22px',
        letterSpacing: '-0.41px',
        color: '#333333',
        maxWidth: 160,
        margin: 0,
        maxHeight: 44,
        overflow: 'hidden',
      },
    },
  },
}));
