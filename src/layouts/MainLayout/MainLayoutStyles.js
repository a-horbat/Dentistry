import { makeStyles } from '@material-ui/core/styles';

const MainLayoutStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 73,
    backgroundColor: theme.palette.background.default,
    height: '100%',
    transition: 'all .25s',
  },
  container_open: {
    marginLeft: 225,
  },
  bodyGrid__container: {
    height: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
  bodyGrid__item: {
    margin: theme.spacing(2),
    maxHeight: `calc(100% - ${theme.spacing(4)}px)`,
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  bodyGrid__itemWithMaxMinWidth: {
    maxWidth: 784,
    minWidth: 784,
    width: '100%',
  },
  bodyGrid__itemTitle: {
    // height: 80,
    flex: 'none',
    '& h1': {
      fontFamily: 'Comfortaa',
      fontSize: 32,
    },
  },
  bodyGrid__itemTitleIconBack: {
    marginRight: theme.spacing(3),
    width: 40,
    height: 40,
    marginTop: -3,
    '& svg': {
      marginLeft: -3,
    },
  },
  bodyGrid__itemPaper: {
    boxShadow: 'none',
    borderRadius: 'none',
    maxHeight: '100%',
    padding: theme.spacing(4),
    height: '-webkit-fill-available',
    paddingBottom: 0,
  },
  bodyGrid__itemPaperWithTitle: {
    // maxHeight: `calc(100% - 60px - ${theme.spacing(0)}px)`,
  },
  mainExpandedPageTitle: {
    marginTop: 16,
  },
  FAQList: {
    '& .MuiButtonBase-root:hover': {
      background: 'rgba(245, 245, 245, 0.44)',
    },
  },
  FAQOpenedList: {
    background: 'rgba(245, 245, 245, 0.44)',
    '& .MuiButtonBase-root:hover': {
      background: 'transparent',
    },
  },
}));

export default MainLayoutStyles;
