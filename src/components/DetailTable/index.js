import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import get from 'lodash/get';
import { useFindContext } from '@elevatejs/material-crud-ui';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

const useStyle = makeStyles((theme) => ({
  Popover: {
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      width: 219,
      flexDirection: 'column',
    },
  },
  PopoverItem: {
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '14px 22px',
      height: '60px',
    },
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.background.default,
    },
  },
  proverIcon: {
    width: '50px',
  },
  checkbox: {
    color: 'green',
  },
}));

const DetailTable = ({
  columns,
  rows,
  popoverTrigger,
  popover,
  onSelect,
  selected,
  priorityFilter,
  ...props
}) => {
  const [tableAnchorEl, setTableAnchorEl] = useState(null);
  const tableOpen = Boolean(tableAnchorEl);
  const filterClose = () => {
    setTableAnchorEl('');
  };

  const [priorityState, setPriorityState] = useState({
    primary: true,
    backup: false,
  });

  const classes = useStyle();

  const { idField } = useFindContext();

  const [tooltipStyles, setTooltipStyles] = useState({});

  useEffect(() => {
    let timerId = -1;

    const calculateTooltips = () => {
      const tooltipTables = Array.from(
        document.getElementsByClassName('tooltipDetailTable'),
      );
      tooltipTables.forEach((table) => {
        const tooltipCells = Array.from(
          table.getElementsByClassName('tooltipCell'),
        );
        const updatedTooltipStyles = {
          ...tooltipStyles,
        };
        tooltipCells.forEach((cell) => {
          const span = Array.from(
            cell.getElementsByClassName('tooltipSpan'),
          )[0];
          const p = Array.from(cell.getElementsByTagName('p'))[0];
          updatedTooltipStyles[cell.dataset.tooltip] = {
            display: 'none',
          };
          if (span.offsetHeight > p.offsetHeight) {
            updatedTooltipStyles[cell.dataset.tooltip] = {
              display: 'block',
            };
          }
        });
        setTooltipStyles(updatedTooltipStyles);
      });
    };

    const f = () => {
      if (timerId === -1) {
        timerId = setTimeout(() => {
          calculateTooltips();
          timerId = -1;
        }, 1000);
      }
    };

    window.addEventListener('resize', f);
    f();
    const clear = () => {
      window.removeEventListener('resize', f);
    };
    return clear;
  }, [rows]);

  return (
    <>
      <Table {...props}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              if (priorityFilter && column.id === 'popover')
                return (
                  <TableCell key={column.id} style={column.styleTh || {}}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {column.label}
                      <div className="arrowDropdown">
                        <IconButton
                          onClick={(ev) => setTableAnchorEl(ev.currentTarget)}
                        >
                          <ArrowDropDownIcon style={{ color: '#828282' }} />
                        </IconButton>
                      </div>
                    </Box>
                  </TableCell>
                );
              else
                return (
                  <TableCell key={column.id} style={column.styleTh || {}}>
                    {column.label}
                  </TableCell>
                );
            })}
          </TableRow>
        </TableHead>
        <TableBody className="tooltipDetailTable">
          {rows.map((row) => {
            return (
              <TableRow
                hover
                key={row.name}
                selected={String(selected) === String(row?.[idField])}
              >
                {columns.map((column) => {
                  let cellContent = get(row, column.id);
                  const tooltipClassIdentifier =
                    'tableTooltip' + row[idField] ||
                    row.name.replace(/\s/g, '');
                  if (column.id === 'popover') {
                    cellContent = popoverTrigger;
                  }
                  if (column.id === 'name') {
                    cellContent = (
                      <span className="tooltipSpan">{cellContent}</span>
                    );
                  }
                  cellContent = <p>{cellContent}</p>;
                  const identification = row?.[idField]
                    ? row?.[idField]
                    : row['_id'];
                  return (
                    <Tooltip
                      arrow={true}
                      PopperProps={{
                        className: 'base86Tooltip',
                        style:
                          tooltipStyles.hasOwnProperty(
                            tooltipClassIdentifier,
                          ) && column.id === 'name'
                            ? tooltipStyles[tooltipClassIdentifier]
                            : { display: 'none' },
                      }}
                      title={<Typography>{get(row, column.id)}</Typography>}
                    >
                      <TableCell
                        data-tooltip={tooltipClassIdentifier}
                        key={column.id}
                        onClick={() => {
                          //if (column.id === 'name' && onSelect) {
                          onSelect(identification);
                          //  }
                        }}
                        style={Object.assign(
                          column.styleTr || {},
                          column.id === 'popover'
                            ? { textAlign: 'center' }
                            : {},
                        )}
                        className={`${
                          column.id === 'name' ? 'tooltipCell' : ''
                        }`}
                      >
                        {cellContent}
                      </TableCell>
                    </Tooltip>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {popover || null}
      <Popover
        id="simple-popover"
        open={tableOpen}
        anchorEl={tableAnchorEl}
        onClose={filterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box class={classes.Popover}>
          <Box className={classes.PopoverItem}>
            <Box classes={{ root: classes.proverIcon }}>
              <Checkbox
                className="checkbox"
                checked={priorityState.primary}
                color="primary"
                onChange={() =>
                  setPriorityState({
                    ...priorityState,
                    ['primary']: !priorityState.primary,
                  })
                }
              />
            </Box>
            <img
              alt="active"
              src={require('../../assets/Icons/Ellipse 15.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>Primary</Typography>
          </Box>
          <Box className={classes.PopoverItem}>
            <Box classes={{ root: classes.proverIcon }}>
              <Checkbox
                className="checkbox"
                checked={priorityState.backup}
                color="primary"
                onChange={() =>
                  setPriorityState({
                    ...priorityState,
                    ['backup']: !priorityState.backup,
                  })
                }
              />
            </Box>
            <img
              alt="orange"
              src={require('../../assets/Icons/orange.png')}
              style={{ marginRight: '20px', height: '20px' }}
            />
            <Typography>Backup</Typography>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default DetailTable;
