import { makeStyles } from '@material-ui/core/styles';

export const useButtonStyles = makeStyles((theme) => ({
  secondaryButton: {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px ${theme.palette.primary.main} solid`,
    textTransform: 'none',
    minWidth: '176px',
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
  },
  primaryButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    textTransform: 'none',
    minWidth: '176px',
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#1BB7B6',
    },
  },
}));
