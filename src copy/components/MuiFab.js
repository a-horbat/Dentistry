import MuiFab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";

const Fab = withStyles(theme => ({
  root: {
    "&.Mui-disabled": {
      backgroundColor: "#FFCCC6",
      color: "white",  
    }
  },
}))(MuiFab);

export default Fab;