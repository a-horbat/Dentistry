import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const createData = (
  name,
  category,
  suppliers,
  manufacturer,
  lastPrice,
  bestPrice,
  annualQty,
  annualCost,
  lastPurchase,
) => {
  return {
    name,
    category,
    suppliers,
    manufacturer,
    lastPrice,
    bestPrice,
    annualQty,
    annualCost,
    lastPurchase,
  };
};

const rows = [
  createData(
    'Product name 1',
    'Anesthetic',
    2,
    'Ingenious Technologies',
    '25$',
    '25$',
    4.0,
    2,
    'November 13, 2016',
  ),
  createData(
    'Product name 2',
    'Burs $ Diamonds',
    3,
    'Ingenious Technologies',
    '25$',
    '25$',
    4.3,
    3,
    'November 13, 2016',
  ),
  createData(
    'Product name 3',
    'Disposables',
    2,
    'Infection Control',
    '25$',
    '25$',
    6.0,
    4,
    'November 13, 2016',
  ),
  createData(
    'Product name 4',
    'Endodontics',
    2,
    'Angelus Produtos Odonotologico',
    '25$',
    '25$',
    4.3,
    5,
    'November 13, 2016',
  ),
  createData(
    'Product name 5',
    'Infection Control',
    2,
    'Surgical & Implants',
    '25$',
    '25$',
    49,
    3.9,
    'November 13, 2016',
  ),
  createData(
    'Product name 6',
    'Instruments',
    2,
    'Dentsply Sirona Preventive',
    '25$',
    '25$',
    49,
    3.9,
    'November 13, 2016',
  ),
  createData(
    'Product name 7',
    'Pharmaceuticals',
    2,
    'Angelus Produtos Odonotologico',
    '40$',
    '25$',
    49,
    3.9,
    'November 14, 2016',
  ),
  createData(
    'Product name 8',
    'Surgical & Implants',
    2,
    'Angelus Produtos Odonotologico',
    '30$',
    '25$',
    49,
    3.9,
    'November 13, 2016',
  ),
];

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
  // console.log(stabilizedThis.map(el => el[0]));
  return stabilizedThis.map(el => el[0]);
};

const headCells = [
  { id: 'name', label: 'Product name' },
  { id: 'category', label: 'Category' },
  {
    id: 'suppliers',
    label: 'Suppliers',
  },
  {
    id: 'manufacturer',
    label: 'Manufacturer',
  },
  {
    id: 'lastPrice',
    label: 'Last Price',
  },
  {
    id: 'bestPrice',
    label: 'Best Price',
  },
  {
    id: 'annualQty',
    label: 'Annual Qty',
  },
  {
    id: 'annualCost',
    label: 'Annual Cost',
  },
  {
    id: 'lastPurchase',
    label: 'Last Purchase',
  },
  {
    id: 'buttons',
    label: '',
  },
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  const classes = useStyles();
  return (
    <TableHead classes={{ root: classes.headerRoot }}>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'buttons' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  headerRoot: {
    borderBottom: '10px solid #E5E5E5',
  },
  bodyRoot: {
    '&::before': {
      //does not work :-( https://codepen.io/sinsedrix/pen/cACub
      lineHeight: '1em',
      color: '#E5E5E5',
      display: 'block',
      content: '"."',
    },
  },
}));

const EnhancedTable = () => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody classes={{ root: classes.bodyRoot }}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.name}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.suppliers}</TableCell>
                      <TableCell>{row.manufacturer}</TableCell>
                      <TableCell>{row.lastPrice}</TableCell>
                      <TableCell>{row.bestPrice}</TableCell>
                      <TableCell>{row.annualQty}</TableCell>
                      <TableCell>{row.annualCost}</TableCell>
                      <TableCell>{row.lastPurchase}</TableCell>
                      <TableCell>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default EnhancedTable;
