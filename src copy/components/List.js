import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useListStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: theme.palette.background.paper,
    },
    listSubheader: {
      borderBottom: '2px solid #eee',
      borderTop: '2px solid #eee',
      color: '#000',
      backgroundColor: theme.palette.background.paper,
      top: 68,
      '@media all and (max-width: 768px)': {
        top: 116,
      },
      paddingBottom: 8,
      paddingTop: 8,
      zIndex: 3,
    },
    listTop50: {
      '@media all and (max-width: 768px)': {
        top: 50,
      },
    },
    ul: {
      backgroundColor: theme.palette.background.paper,
      listStyle: 'none',
      padding: 0,
    },
  }),
);
