import { withStyles } from "@material-ui/core/styles";
import MuiFab from "@material-ui/core/Fab";

const Fab = withStyles({
  root: {
    "&.Mui-disabled": {
      backgroundColor: "#FFCCC6",
      color: "white",  
    }
  },
})(MuiFab);

export default Fab;