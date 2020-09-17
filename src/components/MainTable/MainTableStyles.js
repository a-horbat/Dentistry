import { makeStyles } from '@material-ui/core/styles';

const MainTableStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: 'initial',
    '&:not(.tableWithCollapse)': {
      '& th': {
        padding: '12px 0',
        '&:first-child': {
          paddingLeft: 32,
        },
        '& span': {
          lineHeight: '22px',
        },
      },
      '& .MuiTableCell-head': {
        height: 'auto',
      },
      '& td': {
        padding: '10px 16px 10px 0',
        '&:first-child': {
          paddingLeft: 32,
          minWidth: 225,
          maxWidth: 225,
          '& p': {
            whiteSpace: 'normal',
            maxHeight: 44,
          },
        },
      },
    },
  },
  loadingCell: {
    padding: '0 !important',
    margin: '0 !important',
    border: 'none',
    height: 'auto',
  },
  dividerCell: {
    padding: '0 !important',
    margin: '0 !important',
    backgroundColor: theme.palette.background.default,
    height: 5,
    border: 'none',
  },
  tableCell_notEditable: {
    //backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  tableCell_smallPadding: {
    padding: '8px !important',
  },
  tableCell_actionsButtons: {
    '& .MuiButtonBase-root:last-child': {
      marginRight: 12,
    },
  },
  tableCell_withCollapseButton: {
    maxWidth: 38,
  },
  tableCell_withMaxWidth: {
    maxWidth: 80,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '& input': {
      width: '100%',
    },
  },
  tableEditMode: {
    position: 'relative',
    zIndex: 1,
    '&::before': {
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.32)',
      width: '100%',
      height: '100%',
      zIndex: 1,
      content: "''",
    },
    [`& .MuiTableCell-root:not([class*=tableCell_notEditable]):not([class*=dividerCell])`]: {
      position: 'relative',
      zIndex: 2,
      backgroundColor: '#fff',
    },
    ['& .MuiTableBody-root > tr:first-child > .MuiTableCell-root:not([class*=tableCell_notEditable])']: {
      boxShadow: '0px -9px #f5f5f5',
    },
    '&& .MuiTableCell-root.dropDownCell': {
      zIndex: 3,
    },
  },
  paper: {
    marginBottom: theme.spacing(4),
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      width: 176,
      marginLeft: theme.spacing(4),
    },
  },
  cellWhite: {
    background: '#ffffff',
  },
  expandedRow: {
    '& .MuiTableCell-root': {
      backgroundColor: '#F1F2F6',
    },
  },
  linkButton: {
    minWidth: 'unset',
    padding: 0,
    marginRight: 16,
  },
}));

export default MainTableStyles;
