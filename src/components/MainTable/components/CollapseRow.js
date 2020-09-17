import React, { useState } from 'react';
import {
  Box,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from '@material-ui/core';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVert,
  Add,
} from '@material-ui/icons';
import clsx from 'clsx';
import get from 'lodash/get';
import PriorityIndicator from '../../PriorityIndicator/SquarePriorityIndicator';
import { Remove } from '../../../assets/Icons/Prover';

const CollapseRow = React.memo(
  ({
    row,
    selected,
    onItemClick,
    isEditingMultiple,
    setMultipleUpdate,
    checkEditable,
    headCells,
    classes,
    handleClick,
    handleExtendedClick = null,
    idField,
    multipleUpdates,
    hasActions,
    tooltipStyles,
    hasLinkOverflow,
    handlePopoverLinkOpen,
    handleDelete,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <TableRow
          selected={selected === row[idField]}
          onClick={(e) => {
            onItemClick(row[idField]);
          }}
          disabled={isEditingMultiple}
          hover={!isEditingMultiple}
        >
          <TableCell
            className={clsx(
              classes.tableCell_notEditable,
              classes.tableCell_smallPadding,
              classes.tableCell_withCollapseButton,
            )}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? (
                <KeyboardArrowUp color="primary" />
              ) : (
                <KeyboardArrowDown />
              )}
            </IconButton>
          </TableCell>

          {headCells.map((key, i) => {
            const cell = isEditingMultiple ? (
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
                  setMultipleUpdate(row[idField], key.id, ev.target.value)
                }
              />
            ) : (
              <Typography noWrap variant="body1">
                {key.id === 'name' ? (
                  <span className="tooltipSpan">
                    {typeof key.get === 'function'
                      ? key.get(row)
                      : get(row, key.id)}
                  </span>
                ) : typeof key.get === 'function' ? (
                  key.get(row)
                ) : (
                  get(row, key.id)
                )}
              </Typography>
            );
            const cellInfo = get(row, key.info);
            const tooltipClassIdentifier = 'tableTooltip' + row[idField];
            const cellWithInfo = cellInfo ? (
              <Tooltip
                arrow={true}
                PopperProps={{
                  className: 'base86Tooltip',
                  style: tooltipStyles.hasOwnProperty(tooltipClassIdentifier)
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
                      isEditingMultiple && !checkEditable(i, headCells),
                    [classes.cellWhite]:
                      isEditingMultiple && checkEditable(i, headCells),
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
                root: isEditingMultiple && classes.tableCell_notEditable,
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                {hasLinkOverflow && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.linkButton}
                    onClick={(event) => handlePopoverLinkOpen(event)}
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

        {isOpen &&
          row.alternatives.map((altRow) => (
            <TableRow
              className={classes.expandedRow}
              selected={selected}
              onClick={
                handleExtendedClick
                  ? (e) => handleExtendedClick(altRow[idField])
                  : (e) => onItemClick(altRow[idField])
              }
              disabled={isEditingMultiple}
              hover={!isEditingMultiple}
            >
              <TableCell
                className={clsx(
                  classes.tableCell_notEditable,
                  classes.tableCell_smallPadding,
                  classes.tableCell_withCollapseButton,
                )}
              />

              {headCells.map((key, i) => {
                const cell = isEditingMultiple ? (
                  <input
                    onClick={(ev) => ev.stopPropagation()}
                    value={
                      multipleUpdates[altRow[idField]]?.[key.id] ??
                      (typeof key.get === 'function'
                        ? key.get(altRow)
                        : get(altRow, key.id)) ??
                      ''
                    }
                    onChange={(ev) =>
                      setMultipleUpdate(
                        altRow[idField],
                        key.id,
                        ev.target.value,
                      )
                    }
                  />
                ) : (
                  <Typography noWrap variant="body1">
                    {key.id === 'name' ? (
                      <Box display="flex" alignItems="center">
                        <PriorityIndicator
                          value={get(altRow, 'priority')}
                          style={{ marginRight: 16 }}
                        />
                        <span className="tooltipSpan">
                          {typeof key.get === 'function'
                            ? key.get(altRow)
                            : get(row, key.id)}
                        </span>
                      </Box>
                    ) : typeof key.get === 'function' ? (
                      key.get(altRow)
                    ) : (
                      get(altRow, key.id)
                    )}
                  </Typography>
                );
                const cellInfo = get(altRow, key.info);
                const tooltipClassIdentifier = 'tableTooltip' + altRow[idField];
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
                          isEditingMultiple && !checkEditable(i, headCells),
                        [classes.cellWhite]:
                          isEditingMultiple && checkEditable(i, headCells),
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
                  align="right"
                  onClick={(e) => {
                    const id = altRow._id || altRow.id;
                    if (!isEditingMultiple) {
                      handleClick(e, id);
                    }
                  }}
                  className={clsx(
                    classes.tableCell_smallPadding,
                    classes.tableCell_actionsButtons,
                  )}
                  classes={{
                    root: isEditingMultiple && classes.tableCell_notEditable,
                  }}
                >
                  {handleDelete && (
                    <IconButton>
                      <Remove style={{ fill: '#BDBDBD' }} />
                    </IconButton>
                  )}
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
      </>
    );
  },
);

export default CollapseRow;
