import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ChangeIcon from "../../../components/Icons/Transferred";
import Edit from "../../../components/Icons/Edit";

const OrganizationName = ({
  onChangeOrganization,
  onEditOrganization,
  organizationName,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Box pl={3} pt={2} style={{ backgroundColor: 'white' }}>
        <Typography 
          variant="h6"
          style={{ fontWeight: 'bold' }}
        >Organization Name</Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>{organizationName}</Typography>
            <Box mr={2}>
              <IconButton 
                onClick={ev => {
                  ev.stopPropagation();
                  setAnchorEl(ev.target);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
        </Box>
      </Box>
      <Menu
        id="users-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={onChangeOrganization}>
          <ChangeIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Change Organization
        </MenuItem>
        <MenuItem onClick={onEditOrganization}>
          <Edit style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Edit Organization
        </MenuItem>
      </Menu>
    </>
  );
};

export default OrganizationName;