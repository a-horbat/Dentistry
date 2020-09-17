import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { MoreVert, Add } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import get from 'lodash/get';
import {
  usePagination,
  useSort,
  useFindContext,
} from '@elevatejs/material-crud-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useUpdateMultiple } from '../Update/context';
import cn from 'classnames';
import MainTableStyles from './MainTableStyles';
import clsx from 'clsx';
import { useRect } from '../../hooks/useRect';
import DropDown from '../DropDown';
import ExpandRow from './components/CollapseRow';
import { Remove } from '../../assets/Icons/Prover';

/*
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
*/

const checkEditable = (columnNumber, headCells) => {
  const res = headCells[columnNumber] && headCells[columnNumber].editable;
  return !!res;
};

const checkDropdown = (columnNumber, headCells) => {
  const res = headCells[columnNumber] && headCells[columnNumber].isDropDown;
  return !!res;
};

const MainTableHead = React.memo(
  ({
    headCells,
    order,
    orderBy,
    onRequestSort,
    loading,
    editMode,
    isViewExpanded,
    isShort,
    withCheckbox,
    numSelected,
    rowCount,
    selectAllItems,
    withCollapse,
  }) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    const classes = MainTableStyles();
    return (
      <TableHead>
        <TableRow>
          {withCollapse && (
            <TableCell
              className={clsx(
                classes.tableCell_notEditable,
                classes.tableCell_smallPadding,
                classes.tableCell_withCollapseButton,
              )}
            />
          )}
          {withCheckbox && (
            <TableCell
              padding="checkbox"
              className={classes.tableCell_notEditable}
            >
              <Checkbox
                color="primary"
                checked={numSelected === rowCount}
                onChange={(event) => {
                  selectAllItems(event);
                }}
              />
            </TableCell>
          )}

          {headCells.map((headCell, i) => (
            <TableCell
              key={headCell.id}
              sortDirection={
                orderBy === headCell.id ? (order === 1 ? 'asc' : 'desc') : false
              }
              classes={{
                root:
                  editMode &&
                  !checkEditable(i, headCells) &&
                  classes.tableCell_notEditable,
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={
                  orderBy === headCell.id
                    ? order === 1
                      ? 'asc'
                      : 'desc'
                    : 'desc'
                }
                onClick={createSortHandler(headCell.id)}
              >
                {isViewExpanded && headCell.expandedLabel
                  ? headCell.expandedLabel
                  : headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell
            className={cn(classes.tableCell_smallPadding, {
              [classes.tableCell_notEditable]: editMode,
            })}
          />
        </TableRow>
        <TableRow style={{ height: 8 }}>
          {loading ? (
            <TableCell
              className={classes.loadingCell}
              colSpan={headCells.length + 1}
            >
              <LinearProgress />
            </TableCell>
          ) : (
            <TableCell
              className={classes.dividerCell}
              colSpan={headCells.length + 1}
            />
          )}
        </TableRow>
      </TableHead>
    );
  },
);
const tableRef = React.createRef(null);

const MainTable = React.memo(
  ({
    headCells,
    rows,
    onItemClick,
    selected,
    isViewExpanded,
    widthWithScroll,
    isShort,
    hasActions = true,
    overflowMenuContent,
    overflowLinkContent = null,
    withCheckbox = false,
    withCollapse = false,
    selectedItems = [],
    setSelectedItems,
    handleDelete = null,
    handleExtendedClick,
  }) => {
    const [currentDropDown, setCurrentDropdown] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [overflowId, setOverflowID] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [linkAnchorEl, setLinkAnchorEl] = useState(null);
    const [overflowExceptions, setOverflowExceptions] = useState([]);
    const tableSize = useRect(tableRef);

    const handleClick = (event, id) => {
      event.stopPropagation();
      const settingsStatus = rows.find((el) => el._id === id)?.status;
      if (settingsStatus === 'active') {
        setOverflowExceptions(['resendInvite']);
      }

      setAnchorEl(event.currentTarget);
      setOverflowID(id);
    };
    const handleClick1 = (event) => {
      event.stopPropagation();
      setAnchorEl1(event.currentTarget);
      event.currentTarget.style.color = '#2f80ed';
      event.currentTarget.style.textDecoration = 'underline';
    };
    const handlePopoverLinkOpen = (event) => {
      event.stopPropagation();
      setLinkAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
      setOverflowID(null);
      setOverflowExceptions([]);
    };
    const handleClose1 = () => {
      anchorEl1.style.color = 'black';
      anchorEl1.style.textDecoration = 'none';

      setAnchorEl1(null);
    };
    const handlePopoverLinkClose = () => {
      setLinkAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const openLinkPopover = Boolean(linkAnchorEl);
    const id = open ? 'simple-popover' : undefined;
    const id1 = open1 ? 'simple-popover' : undefined;

    const classes = MainTableStyles();
    const { total } = useFindContext();
    const [{ page, perPage }, { onChangePage }] = usePagination();
    const [{ field, order }, { setSort }] = useSort();
    const { idField, loading } = useFindContext();
    // const [order, setOrder] = useState('asc');
    // const [orderBy, setOrderBy] = useState('');
    // const [page, setPage] = useState(0);
    // const rowsPerPage = 5;

    const handleRequestSort = (event, property) => {
      const isAsc = field === property && order === 1;
      setSort(property, isAsc ? -1 : 1);
    };

    const handleChangePage = (event, newPage) => {
      onChangePage(event, newPage - 1);
    };

    const getPagesCount = () => {
      const i = total % perPage;
      return (total - i) / perPage + (i === 0 ? 0 : 1);
    };

    const isSelectedItem = (id) => selectedItems.indexOf(id) !== -1;

    const handleSelectAllItems = (event) => {
      if (event.target.checked) {
        const selected = rows.map((row) => row[idField]);
        setSelectedItems(selected);
      } else {
        setSelectedItems([]);
      }
    };
    const handleWithCheckboxClick = (event, id) => {
      let newSelected = [...selectedItems];
      const selectedIndex = newSelected.indexOf(id);
      if (selectedIndex !== -1) {
        newSelected = newSelected.filter((itemId) => itemId !== id);
      } else {
        newSelected.push(id);
      }
      setSelectedItems(newSelected);
    };

    // console.log(total);
    // console.log(perPage);

    /* const getLastPageCont = () => {
      return total % perPage === 0 ? perPage : total % perPage;
    }; */

    const {
      multipleUpdates,
      setMultipleUpdate,
      isEditingMultiple,
      onSaveMultiple,
      onCancelMultiple,
      isUpdating,
      error: updateError,
    } = useUpdateMultiple();

    const [tooltipStyles, setTooltipStyles] = useState({});

    let calcTooltipAmount = 0;
    let timerId = -1;
    const delayMs = calcTooltipAmount === 0 ? 0 : 1000;

    const calculateTooltips = () => {
      const tooltipTables = tableRef.current;
      if (tooltipTables) {
        const tooltipCells = Array.from(
          tooltipTables.getElementsByClassName('tooltipCell'),
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
          if (span && p) {
            if (span.offsetHeight > p.offsetHeight) {
              updatedTooltipStyles[cell.dataset.tooltip] = {
                display: 'block',
              };
            }
          }
        });
        setTooltipStyles(updatedTooltipStyles);
      }
    };
    const f = () => {
      if (timerId === -1) {
        timerId = setTimeout(() => {
          calculateTooltips();
          calcTooltipAmount++;
          timerId = -1;
        }, delayMs);
      }
    };

    useEffect(() => {
      f();
    }, [rows, tableSize, tableRef]);

    return (
      <div className={classes.root}>
        <Paper
          elevation={0}
          className={cn(classes.paper, {
            [classes.widthWithScroll]: widthWithScroll,
          })}
        >
          <TableContainer>
            <Table
              ref={tableRef}
              classes={{
                root: clsx(classes.table, 'tooltipMainTable', {
                  [classes.tableEditMode]: isEditingMultiple,
                  tableWithCollapse: withCollapse,
                }),
              }}
            >
              <MainTableHead
                classes={classes}
                order={order}
                orderBy={field}
                onRequestSort={handleRequestSort}
                rowCount={total}
                headCells={headCells}
                loading={loading}
                editMode={isEditingMultiple}
                isViewExpanded={isViewExpanded}
                isShort={isShort}
                withCheckbox={withCheckbox}
                withCollapse={withCollapse}
                rowCount={rows?.length}
                numSelected={selectedItems.length}
                selectAllItems={handleSelectAllItems}
              />
              <TableBody classes={{ root: classes.bodyRoot }}>
                {rows.map((row, index) => {
                  return row?.alternatives && row.alternatives.length ? (
                    <ExpandRow
                      row={row}
                      selected={selected}
                      onItemClick={onItemClick}
                      isEditingMultiple={isEditingMultiple}
                      setMultipleUpdate={setMultipleUpdate}
                      checkEditable={checkEditable}
                      headCells={headCells}
                      classes={classes}
                      handleClick={handleClick}
                      idField={idField}
                      multipleUpdates={multipleUpdates}
                      tooltipStyles={tooltipStyles}
                      hasActions={hasActions}
                      tooltipStyles={tooltipStyles}
                      hasLinkOverflow={!!overflowLinkContent?.length}
                      handlePopoverLinkOpen={handlePopoverLinkOpen}
                      handleDelete={handleDelete}
                      handleExtendedClick={handleExtendedClick}
                    />
                  ) : (
                    <TableRow
                      selected={selected === row[idField]}
                      hover={!isEditingMultiple}
                      tabIndex={-1}
                      key={row[idField] || index}
                      onClick={(event) =>
                        onItemClick && !isEditingMultiple
                          ? onItemClick(row[idField])
                          : withCheckbox && setSelectedItems
                          ? handleWithCheckboxClick(event, row[idField])
                          : null
                      }
                      disabled={isEditingMultiple}
                    >
                      {withCollapse && (
                        <TableCell
                          className={clsx(
                            classes.tableCell_notEditable,
                            classes.tableCell_smallPadding,
                            classes.tableCell_withCollapseButton,
                          )}
                        />
                      )}
                      {withCheckbox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isSelectedItem(row[idField])}
                          />
                        </TableCell>
                      )}
                      {headCells.map((key, i) => {
                        const cellText =
                          isViewExpanded && key['expandedLabel']
                            ? get(row, key.id) +
                              ' > Category 1 > Category  2 > Category 3'
                            : get(row, key.id);
                        // cellText = String(cellText).repeat(
                        //   Math.floor(Math.random() * 10),
                        // );

                        let cell =
                          isEditingMultiple && checkEditable(i, headCells) ? (
                            <input
                              onClick={(ev) => ev.stopPropagation()}
                              value={
                                multipleUpdates[row[idField]]?.[key.id] ??
                                (typeof key.get === 'function'
                                  ? key.get(row)
                                  : get(row, key.id)) ??
                                ''
                              }
                              onChange={(ev) =>
                                setMultipleUpdate(
                                  row[idField],
                                  key.id,
                                  ev.target.value,
                                )
                              }
                            />
                          ) : (
                            <Typography noWrap variant="body1">
                              {key.id === 'name' ? (
                                <span className="tooltipSpan">
                                  {typeof key.get === 'function'
                                    ? key.get(row)
                                    : cellText}
                                </span>
                              ) : typeof key.get === 'function' ? (
                                key.get(row)
                              ) : (
                                cellText
                              )}
                            </Typography>
                          );

                        if (isEditingMultiple && checkDropdown(i, headCells))
                          cell = (
                            <div
                              style={{
                                marginLeft: '5px',
                              }}
                            >
                              <DropDown
                                onFocusCallback={() =>
                                  setCurrentDropdown(row[idField])
                                }
                                value={
                                  multipleUpdates[row[idField]]?.[key.id] ??
                                  (typeof key.get === 'function'
                                    ? key.get(row)
                                    : get(row, key.id)) ??
                                  ''
                                }
                                setValue={(value) =>
                                  setMultipleUpdate(row[idField], key.id, value)
                                }
                                optionsArr={[
                                  'asd',
                                  'ssgdfg',
                                  'Metrex',
                                  'PureLife',
                                  'sdf Sirona',
                                  'sf vivadent',
                                  'septodont',
                                  'kerr',
                                ]}
                                table
                              />
                            </div>
                          );

                        const cellInfo = get(row, key.info);
                        const tooltipClassIdentifier =
                          'tableTooltip' + row[idField];
                        const cellWithInfo = cellInfo ? (
                          <Tooltip
                            arrow={true}
                            PopperProps={{
                              className: 'base86Tooltip',
                              style: tooltipStyles.hasOwnProperty(
                                tooltipClassIdentifier,
                              )
                                ? tooltipStyles[tooltipClassIdentifier]
                                : {},
                            }}
                            title={<Typography>{cellInfo}</Typography>}
                          >
                            {cell}
                          </Tooltip>
                        ) : (
                          cell
                        );
                        return (
                          <TableCell
                            data-tooltip={tooltipClassIdentifier}
                            key={key.id}
                            classes={{
                              root: clsx({
                                [classes.tableCell_notEditable]:
                                  isEditingMultiple &&
                                  !checkEditable(i, headCells),
                                [classes.cellWhite]:
                                  isEditingMultiple &&
                                  checkEditable(i, headCells),
                                dropDownCell:
                                  checkDropdown(i, headCells) &&
                                  currentDropDown == row[idField],
                                tooltipCell: key.id === 'name',
                              }),
                            }}
                          >
                            {cellWithInfo}
                          </TableCell>
                        );
                      })}
                      {hasActions && (
                        <TableCell
                          className={clsx(
                            classes.tableCell_smallPadding,
                            classes.tableCell_actionsButtons,
                          )}
                          classes={{
                            root:
                              isEditingMultiple &&
                              classes.tableCell_notEditable,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            {!!overflowLinkContent?.length && (
                              <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.linkButton}
                                onClick={(event) =>
                                  handlePopoverLinkOpen(event)
                                }
                              >
                                <Add />
                              </Button>
                            )}
                            {handleDelete && (
                              <IconButton>
                                <Remove style={{ fill: '#BDBDBD' }} />
                              </IconButton>
                            )}
                            <IconButton
                              onClick={(e) => {
                                const id = row._id || row.id;
                                if (!isEditingMultiple) {
                                  handleClick(e, id);
                                }
                              }}
                            >
                              <MoreVert />
                            </IconButton>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {isEditingMultiple ? (
          <Box className={classes.buttons}>
            <Button onClick={onCancelMultiple} variant="outlined">
              Cancel
            </Button>
            <Button
              disabled={isUpdating}
              variant="contained"
              onClick={onSaveMultiple}
            >
              <Box display="flex" alignItems="center">
                Save
                {isUpdating ? (
                  <Box
                    mx={1}
                    style={{
                      color: '#fff',
                      height: 20,
                      position: 'absolute',
                      right: 0,
                    }}
                  >
                    <CircularProgress color="inherit" size={20} />
                  </Box>
                ) : null}
              </Box>
            </Button>

            <Typography textAlign="right" color="error">
              {updateError}
            </Typography>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
            style={{ paddingLeft: 0 }}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ color: '#828282', fontSize: '14px' }}>
                {`Showing ${rows.length}/${total} results`}
              </Typography>
            </Box>
            <Pagination
              className="base86-pagination"
              count={getPagesCount()}
              variant="outlined"
              onChange={handleChangePage}
              page={page}
            />
          </Box>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List className={classes.Popover}>
            {overflowMenuContent &&
              overflowMenuContent.map((el) => {
                const checkException = overflowExceptions.find(
                  (ex) => ex === el.code,
                );
                if (!checkException)
                  return (
                    <ListItem
                      className={classes.PopoverItem}
                      key={el.code}
                      button
                      onClick={() => {
                        el.callback(overflowId);
                        handleClose();
                      }}
                    >
                      <ListItemIcon>
                        <el.icon />
                      </ListItemIcon>
                      <ListItemText>{el.text}</ListItemText>
                    </ListItem>
                  );
              })}
          </List>
        </Popover>
        <Popover
          open={openLinkPopover}
          anchorEl={linkAnchorEl}
          onClose={handlePopoverLinkClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List className={classes.Popover}>
            {overflowLinkContent &&
              overflowLinkContent.map((el) => {
                return (
                  <ListItem
                    className={classes.PopoverItem}
                    key={el.code}
                    button
                    onClick={() => {
                      el.callback(overflowId);
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <el.icon />
                    </ListItemIcon>
                    <ListItemText>{el.text}</ListItemText>
                  </ListItem>
                );
              })}
          </List>
        </Popover>
        <Popover
          style={{ left: '85px' }}
          id={id1}
          open={open1}
          anchorEl={anchorEl1}
          onClose={handleClose1}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box className={classes.Popover} style={{ padding: '10px' }}>
            <Typography>
              Bupivacaine Marcaine Bupivacaine 4534 1:200,000 50/Bx Cook Waite
            </Typography>
          </Box>
        </Popover>
      </div>
    );
  },
);

export default MainTable;
