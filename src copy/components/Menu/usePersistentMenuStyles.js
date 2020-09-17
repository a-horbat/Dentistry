import { createStyles, makeStyles } from '@material-ui/core/styles';

export const usePersistentMenuStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      [theme.breakpoints.up('md')]: {
        marginLeft: 300,
      },
    },
  })
);
