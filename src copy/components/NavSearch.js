import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FilterIcon from "@material-ui/icons/FilterListOutlined";
import CancelSearch from "./Icons/CancelSearch";
import { useTheme } from "@material-ui/core/styles";
import "firebase/auth";
import React from "react";

export default ({ searchText, setSearchText, filterOpen, filterControls, isFilterUsed }) => {
  const theme = useTheme()
  const cancelSearch = () => {
    setSearchText("");
  };
  return (
    <Box display="flex" alignItems="center" my={1}>
      <Box display="flex" alignItems="center" width="100%">
        <TextField
          margin="dense"
          value={searchText}
          onChange={ev => setSearchText(ev.target.value)}
          variant="outlined"
          placeholder="Search"
          fullWidth
        />
        <IconButton onClick={cancelSearch} style={{
          right: 45
        }}>
          <CancelSearch />
        </IconButton>
      </Box>
      <Hidden smUp>
        <Box ml={8} />
      </Hidden>
      <Box ml={1}>
        <IconButton
          onClick={filterControls.setTrue}
          size="small"
          style={{ 
            border: `2px solid ${theme.palette.primary.main}`, 
            backgroundColor: isFilterUsed ? theme.palette.primary.main : theme.palette.primary.contrastText,
            color: isFilterUsed ? theme.palette.primary.contrastText : theme.palette.primary.main,
          }}
        >
          <FilterIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
