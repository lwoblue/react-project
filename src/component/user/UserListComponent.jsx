import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import ApiService from 'api/ApiService';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import XLSX from 'xlsx';
import GetAppIcon from '@material-ui/icons/GetApp';

// import db from '../../firebase';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'email', label: 'Email' },
  { id: 'userName', label: 'User Name' },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            className={classes.tableHeadText}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all users' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableHeadText}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className={classes.tableHeadText}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          // color: theme.palette.secondary.main,
          // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          backgroundColor: lighten('#000000b8', 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const download = (props) => {
  console.log('props.selectedList-->', props.selectedList);
  console.log(typeof props.selectedList);
  console.log('Object.entries-->', Object.entries(props.selectedList));

  // 방법1 - XLSX 라이브러리
  const wb = XLSX.utils.book_new();
  const dataWS = XLSX.utils.json_to_sheet(Object.entries(props.selectedList));
  XLSX.utils.book_append_sheet(wb, dataWS, 'UserList');
  XLSX.writeFile(wb, 'UserList.xlsx');

  // 방법2 - JAVA
  // ApiService.download(JSON.stringify(props.selectedList));
};

// <firebase db 연동>
// const deleteUser = (props) => {
//   let user = {
//     deleteYN: 'y',
//   };
//   props.selectedList.forEach((deleteuser) => {
//     db.collection('users')
//       .doc('IR3CFnBcoETVQpqXRYXF')
//       .collection('user')
//       .where('email', '==', deleteuser)
//       .get()
//       .then((querySnapshot) => {
//         console.log('Document successfully delete!');
//         querySnapshot.forEach((doc) => {
//           doc.ref.update(user);
//         });
//         props.setSelected([]);
//       })
//       .catch((err) => {
//         console.log('deleteUser Error!!', err);
//       });
//   });
// };

const deleteUser = (props) => {
  props.selectedList.forEach((deleteuser) => {
    ApiService.deleteUser(deleteuser)
      .then((res) => {
        props.setSelected([]);
        ApiService.fetchUsers()
          .then((res2) => {
            props.setRows(res2.data);
          })
          .catch((err) => {
            console.log('reloadUserList() Error!!', err);
          });
      })
      .catch((err) => {
        console.log('deleteUser Error!', err);
      });
  });
};

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          User List
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Download UserList">
            <IconButton
              aria-label="download"
              onClick={() => {
                download(props);
              }}
            >
              <GetAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => {
                deleteUser(props);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedList: PropTypes.array.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .Mui-selected': {
      backgroundColor: '#fef9e4',
      '& svg > path': {
        fill: '#fcc600',
      },
    },
    '& .MuiTableRow-hover': {
      '&:hover': {
        backgroundColor: '#f4ebc6',
      },
    },
  },

  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableHead: {
    backgroundColor: '#000000b8',
  },
  tableHeadText: {
    color: '#fcc600 !important',
    '& svg': {
      color: '#fcc600 !important',
    },
  },
  search: {
    position: 'relative',
    left: '70%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    paddingTop: '5px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  pagination: {
    '& p:nth-child(2)': {
      [theme.breakpoints.down('sm')]: {
        visibility: 'hidden',
      },
    },
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    ApiService.searchUser(searchInput)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log('reloadUserList() Error!!', err);
      });

    // <firebase db 연동>
    // db.collection('users')
    //   .doc('IR3CFnBcoETVQpqXRYXF')
    //   .collection('user')
    //   .where('deleteYN', '==', 'n')
    //   .get()
    //   .then((snapshot) => {
    //     setRows(snapshot.docs.map((doc) => doc.data()));
    //   });
  }, [searchInput]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = useCallback(
    (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
    filterUserList(rows, searchInput);
  };

  const filterUserList = (userList, query) => {
    var output = userList.filter((user) => {
      return user.email.toLowerCase().includes(query.toLowerCase());
    });
    setRows(output);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleChangeSearchInput}
          />
        </div>

        <EnhancedTableToolbar
          setSelected={setSelected}
          numSelected={selected.length}
          selectedList={selected}
          setRows={setRows}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.email);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.email)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.email}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.userName}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
