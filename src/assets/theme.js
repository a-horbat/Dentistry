import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#21C5C4',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF8070',
      contrastText: '#fff',
    },
    info: {
      main: '#2F80ED',
      contrastText: '#fff',
    },
    success: {
      main: '#27AE60',
      contrastText: '#fff',
    },
    warning: {
      main: '#F2994A',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#bdbdbd',
      light: '#828282',
    },

    divider: '#E0E0E0',
  },
  typography: {
    htmlFontSize: 14,
    fontFamily: 'Poppins',
    h1: {
      fontFamily: 'Comfortaa',
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 1.6,
    },
    h2: {
      fontFamily: 'Comfortaa',
      fontSize: 22,
      fontWeight: 'bold',
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Comfortaa',
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: '27px',
    },
    subtitle1: {
      fontFamily: 'Comfortaa',
      fontSize: 12,
      fontWeight: 500,
      lineHeight: '27px',
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 16,
    },
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    // Custom values here on out - starting with '26'
    'inset 0px -1px 0px rgba(0, 0, 0, 0.08)',
    '0px -2px 12px rgba(143, 157, 160, 0.12)',
  ],
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        borderRadius: '4px',
        padding: '9px 15px',
      },
      label: {
        textTransform: 'none',
        fontSize: 16,
      },
      outlined: {
        padding: '9px 15px',
      },
      outlinedSecondary: {
        backgroundColor: '#FFF5F4',
      },
    },
    MuiTable: {
      root: {
        backgroundColor: '#FFFFFF',
        '& .Mui-selected': {
          color: '#333333 !important',
          backgroundColor: 'rgb(226, 228, 228) !important',
          borderColor: '#333333 !important',
        },
      },
    },
    MuiTableRow: {
      hover: {
        cursor: 'pointer',
        '&:hover': {
          background: '#CAF1F1 !important',
        },
      },
    },
    MuiTableCell: {
      head: {
        padding: '10px 16px',
        height: 46,
        whiteSpace: 'nowrap',
        borderBottom: '1px solid #E0E0E0',
        fontWeight: 'normal',
      },
      body: {
        padding: '10px 16px',
        height: 64,
        borderBottom: '1px solid #EBEBEB',
      },
      root: {
        fontSize: 14,
        '& input': {
          outline: 'none',
          border: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          background: 'none',
        },
      },
      sizeSmall: {
        height: 32,
      },
    },
    MuiTableSortLabel: {
      root: {
        whiteSpace: 'noWrap',
        fontSize: 14,
        fontWeight: 'normal',
      },
    },
    MuiPagination: {
      root: {
        color: '#828282',
        '& .Mui-selected': {
          borderColor: '#333',
          color: '#333',
        },
      },
    },
    MuiPaginationItem: {
      root: {
        color: '#828282',
        '& .Mui-selected': {
          color: '#333',
        },
      },
    },
  },
  props: {
    MuiButton: {
      variant: 'outlined',
      color: 'primary',
      disableElevation: true,
    },
  },
});

export default theme;
