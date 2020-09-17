import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "firebase/auth";
import groupBy from "lodash/groupBy";
import React, { useState, useMemo } from "react";
import ArchiveIcon from "../../../components/Icons/Archive";
import DeleteIcon from "../../../components/Icons/Delete";
import ChangeIcon from "../../../components/Icons/Transferred";
import ResendInvite from "../../../components/Icons/ResendInvite";
import { ItemStatusIcon } from "../../../components/Status";
import { auth } from "firebase/app";
import "firebase/auth";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    listSection: {
      backgroundColor: theme.palette.background.paper,
    },
    listSubheader: {
      borderBottom: "2px solid #eee",
      borderTop: "2px solid #eee",
      color: "#000",
      backgroundColor: theme.palette.background.paper,
      top: 49,
      "@media all and (max-width: 768px)": {
        top: 116,
      },
      paddingBottom: 8,
      paddingTop: 8,
      zIndex: 3,
    },
    ul: {
      backgroundColor: theme.palette.background.paper,
      listStyle: "none",
      padding: 0,
    },
  })
);

export const UserListDisplay = ({
  rows,
  onClick,
  onChangeOrganization,
  onResendInvite,
  onDeactivate,
}) => {
  const user = auth().currentUser;
  const classes = useStyles();
  const usersByType = useMemo(
    () =>
      groupBy(rows, (record) => (user.uid === record.userId ? "Me" : "Others")),
    [rows, user]
  );

  return (
    <List className={classes.list} subheader={<li />}>
      {["Me", "Others"].map((type) => (
        <li key={`section-${type}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheader}>
              <Typography variant="h6">{type}</Typography>
            </ListSubheader>
            {(usersByType[type] || []).map((record) => (
              <UserListItem
                key={record._id}
                user={record}
                onClick={() => onClick && onClick(record)}
                onChangeOrganization={
                  type === "Me" ? () => onChangeOrganization() : null
                }
                onResendInvite={
                  type === "Others" ? () => onResendInvite() : null
                }
                onDeactivate={type === "Others" ? () => onDeactivate() : null}
              />
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export const UserListItem = ({
  user,
  onClick,
  onChangeOrganization,
  onResendInvite,
  onChangeAddress,
  onDeactivate,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <ListItem onClick={onClick} style={{ zIndex: 1 }}>
        <ListItemAvatar>
          <Badge
            badgeContent={
              <ItemStatusIcon
                status={user.status}
                style={{ height: 20, width: 20 }}
              />
            }
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar>
              {(user.email || "")
                .split(" ")
                .map((v) => v.slice(0, 1))
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText primary={user.email} />
        <ListItemSecondaryAction style={{ zIndex: 2 }}>
          <IconButton
            onClick={(ev) => {
              ev.stopPropagation();
              setAnchorEl(ev.target);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu
        id="users-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {onChangeOrganization && (
          <MenuItem onClick={onChangeOrganization}>
            <ChangeIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            Change Organization
          </MenuItem>
        )}
        {onResendInvite && (
          <MenuItem onClick={onResendInvite}>
            <ResendInvite style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            Resend Invite
          </MenuItem>
        )}
        {onChangeAddress && (
          <MenuItem onClick={onChangeAddress}>
            <ArchiveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            Change Address
          </MenuItem>
        )}
        {onDeactivate && (
          <MenuItem onClick={onDeactivate}>
            <DeleteIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            Deactivate
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
