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
import React, { useState } from "react";
import ApprovedIcon from "../../components/Icons/Approved";
import ArchiveIcon from "../../components/Icons/Archive";
import DeleteIcon from "../../components/Icons/Delete";
import ChangeIcon from "../../components/Icons/Transferred";
import AlertsIcon from "../../components/Icons/Alerts";
import InvoicesIcon from "../../components/Icons/Invoices";
import { useListStyles } from "../../components/List";
import { ItemStatusIcon } from "../../components/Status";
import over from "lodash/over";

export function VendorListDisplay({
  rows,
  onClick,
  onChangeStatus,
  onChangeCategory,
  onViewInvoices,
  onViewAlerts
}) {
  const classes = useListStyles();
  const vendorsByChar = groupBy(rows, record => {
    return (record.name || "").slice(0, 1).toUpperCase();
  });
  const chars = Object.keys(vendorsByChar).sort();
  return (
    <List className={classes.list} subheader={<li />}>
      {chars.map(char => (
        <li key={`section-${char}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheader}>
              <Typography variant="h6">{char}</Typography>
            </ListSubheader>
            {(vendorsByChar[char] || []).map(record => (
              <VendorListItem
                key={record._id}
                vendor={record}
                onChangeStatus={onChangeStatus}
                onChangeCategory={onChangeCategory}
                onViewInvoices={onViewInvoices}
                onViewAlerts={onViewAlerts}
                onClick={onClick && (() => onClick(record))}
              />
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export const VendorListItem = ({
  vendor,
  onClick,
  onChangeCategory,
  onChangeStatus,
  onViewInvoices,
  onViewAlerts,
  selected,
  style
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <ListItem
        button={!!onClick}
        onClick={onClick}
        style={{ zIndex: 1, ...style }}
        selected={Boolean(anchorEl) || selected}
      >
        <ListItemAvatar>
          <Badge
            badgeContent={
              <ItemStatusIcon
                status={vendor.status}
                style={{ height: 20, width: 20 }}
              />
            }
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
          >
            <Avatar>
              {(vendor.name || "")
                .split(" ")
                .map(v => v.slice(0, 1))
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={vendor.name}
          secondary={vendor.category}
          classes={{ root: "ellipsis" }}
          primaryTypographyProps={{ noWrap: true }}
        />
        {onChangeCategory && onChangeStatus && (
          <ListItemSecondaryAction style={{ zIndex: 2 }}>
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                setAnchorEl(ev.target);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Menu
        id="vendors-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={over([
            () => onChangeCategory(vendor),
            () => setAnchorEl(null)
          ])}
        >
          <ChangeIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Change Category
        </MenuItem>
        <MenuItem
          onClick={over([
            () => onViewInvoices(vendor),
            () => setAnchorEl(null)
          ])}
        >
          <InvoicesIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          View Invoices
        </MenuItem>
        <MenuItem
          onClick={over([
            () => onViewAlerts(vendor),
            () => setAnchorEl(null)
          ])}
        >
          <AlertsIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          View Alerts
        </MenuItem>
        <MenuItem
          onClick={over([
            () => onChangeStatus(vendor, "approved"),
            () => setAnchorEl(null)
          ])}
        >
          <ApprovedIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Approve
        </MenuItem>
        <MenuItem
          onClick={over([
            () => onChangeStatus(vendor, "archived"),
            () => setAnchorEl(null)
          ])}
        >
          <ArchiveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Archive
        </MenuItem>
        <MenuItem
          onClick={over([
            () => onChangeStatus(vendor, "deleted"),
            () => setAnchorEl(null)
          ])}
        >
          <DeleteIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
