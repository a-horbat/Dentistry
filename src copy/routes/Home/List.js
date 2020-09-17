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
import capitalize from "lodash/capitalize";
import React, { useState } from "react";
import ApprovedIcon from "../../components/Icons/Approved";
import ArchiveIcon from "../../components/Icons/Archive";
import DeleteIcon from "../../components/Icons/Delete";
import { ItemStatusIcon } from "../../components/Status";
import { useListStyles } from "../../components/List"
import { toMonthYear, sortMonthYear, toMonthString } from "../../utils/time"

export function InvoiceListDisplay({ rows, onClick, onChangeStatus }) {
  const classes = useListStyles();
  const invoicesByMonth = groupBy(rows, record => {
    const date = new Date(record.createdDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    return toMonthYear({ month, year });
  });
  const months = sortMonthYear(Object.keys(invoicesByMonth))
  return (
    <List className={classes.list} subheader={<li />}>
      {months.map(month => (
        <li key={`section-${month}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheader}>
              <Typography variant="h6">{toMonthString(month)}</Typography>
            </ListSubheader>
            {(invoicesByMonth[month] || []).map(record => (
              <InvoiceListItem
                key={record._id}
                invoice={record}
                onChangeStatus={onChangeStatus}
                onClick={() => onClick && onClick(record)}
              />
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export const InvoiceItemBadge = ({ status, createdDate }) => {
  return status ? (
    <Badge
      badgeContent={
        <ItemStatusIcon
          status={status}
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
        {createdDate ? new Date(createdDate)
          .getDate()
          .toString()
          .padStart(2, "0") : ''}
      </Avatar>
    </Badge>
  ) : null;
};

export const InvoiceListItem = ({ invoice, onClick, onChangeStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <ListItem button selected={Boolean(anchorEl)} onClick={onClick} style={{ zIndex: 1 }}>
        <ListItemAvatar>
          <InvoiceItemBadge {...invoice} />
        </ListItemAvatar>
        <ListItemText
          primary={(invoice.vendor && invoice.vendor.name) || capitalize(invoice.status)}
        />
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
      </ListItem>
      <Menu
        id="invoice-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={over([() => onChangeStatus(invoice, 'approved'), () => setAnchorEl(null)])}>
          <ApprovedIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Approve
        </MenuItem>
        <MenuItem onClick={over([() => onChangeStatus(invoice, 'archived'), () => setAnchorEl(null)])}>
          <ArchiveIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Archive
        </MenuItem>
        <MenuItem onClick={over([() => onChangeStatus(invoice, 'deleted'), () => setAnchorEl(null)])}>
          <DeleteIcon style={{ marginRight: 4, height: 20, width: 20 }} />{" "}
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};