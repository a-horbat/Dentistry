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
import over from "lodash/over";
import React, { useState } from "react";
import ApprovedIcon from "../../components/Icons/Approved";
import ArchiveIcon from "../../components/Icons/Archive";
import DeleteIcon from "../../components/Icons/Delete";
import ChangeIcon from "../../components/Icons/Transferred";
import AlertsIcon from "../../components/Icons/Alerts";
import IgnoreIcon from "../../components/Icons/Ignore";
import InvoicesIcon from "../../components/Icons/Invoices";
import ThresholdIcon from "../../components/Icons/Threshold";
import { useListStyles } from "../../components/List";
import { ItemStatusIcon } from "../../components/Status";
import { toMonthYear, toMonthString, sortMonthYear } from "../../utils/time";

export function AlertListDisplay({
  rows,
  onClick,
  onIgnoreAlert,
  onChangeStatus,
  onViewAlerts,
  onViewInvoices,
  onChangeThreshold
}) {
  const classes = useListStyles();
  const alertsByMonth = groupBy(rows, record => {
    const date = new Date(record.createdDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    return toMonthYear({ month, year });
  });
  const months = sortMonthYear(Object.keys(alertsByMonth));
  return (
    <List className={classes.list} subheader={<li />}>
      {months.map(month => (
        <li key={`section-${month}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheader}>
              <Typography variant="h6">{toMonthString(month)}</Typography>
            </ListSubheader>
            {(alertsByMonth[month] || []).map(record => (
              <AlertListItem
                key={record._id}
                alert={record}
                onClick={onClick && (() => onClick(record))}
                onIgnoreAlert={onIgnoreAlert}
                onChangeStatus={onChangeStatus}
                onViewAlerts={onViewAlerts}
                onViewInvoices={onViewInvoices}
                onChangeThreshold={onChangeThreshold}
              />
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export const AlertListItem = ({
  alert,
  onClick,
  onIgnoreAlert,
  onChangeStatus,
  onChangeThreshold,
  onViewInvoices,
  onViewAlerts,
  selected,
  style
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { product } = alert;
  return (
    <>
      <ListItem
        button={!!onClick}
        onClick={onClick}
        style={{ zIndex: 1, ...style }}
        selected={Boolean(anchorEl) || selected}
      >
        <ListItemAvatar>
          <AlertItemBadge product={product} />
        </ListItemAvatar>
        <ListItemText
          primary={product.name}
          secondary={product.category}
          classes={{ root: "ellipsis" }}
          primaryTypographyProps={{ noWrap: true }}
        />
        {(onIgnoreAlert || onChangeStatus ||
          onChangeThreshold ||
          onViewInvoices ||
          onViewAlerts) && (
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
        id="alerts-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {onChangeThreshold && (
          <MenuItem
            onClick={over([
              () => onChangeThreshold(product),
              () => setAnchorEl(null)
            ])}
          >
            <ThresholdIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            Change Threshold
          </MenuItem>
        )}
        {onViewInvoices && (
          <MenuItem
            onClick={over([
              () => onViewInvoices(product),
              () => setAnchorEl(null)
            ])}
          >
            <InvoicesIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            View Invoices
          </MenuItem>
        )}
        {onIgnoreAlert && (
          <MenuItem
            onClick={over([
              () => onIgnoreAlert(alert),
              () => setAnchorEl(null)
            ])}
          >
            <IgnoreIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            Ignore
          </MenuItem>
        )}
        {onChangeStatus && (
          <MenuItem
            onClick={over([
              () => onChangeStatus(product, "archived"),
              () => setAnchorEl(null)
            ])}
          >
            <ArchiveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            Archive
          </MenuItem>
        )}
        {onChangeStatus && (
          <MenuItem
            onClick={over([
              () => onChangeStatus(product, "deleted"),
              () => setAnchorEl(null)
            ])}
          >
            <DeleteIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export const AlertItemBadge = ({ product }) =>
  product && product.status ? (
    <Badge
      badgeContent={
        <ItemStatusIcon
          status={product.status}
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
        {(product.name || "")
          .split(" ")
          .map(v => v.slice(0, 1))
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </Avatar>
    </Badge>
  ) : null;
