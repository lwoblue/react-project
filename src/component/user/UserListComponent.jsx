import { Component } from 'react';
// import ApiService from 'api/ApiService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import db from '../../firebase';

class UserListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      message: null,
    };
  }

  componentDidMount() {
    this.reloadUserList();
  }

  // reloadUserList = () => {
  //   ApiService.fetchUsers()
  //     .then((res) => {
  //       this.setState({
  //         users: res.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log('reloadUserList() Error!!', err);
  //     });
  // };

  reloadUserList = () => {
    db.collection('users')
      .doc('IR3CFnBcoETVQpqXRYXF')
      .collection('user')
      .onSnapshot((snapshot) => {
        this.setState({ users: snapshot.docs.map((doc) => doc.data()) });
      });
  };

  // deleteUser = (userID) => {
  //   ApiService.deleteUser(userID)
  //     .then((res) => {
  //       this.setState({
  //         message: 'User Deleted Successfully',
  //       });
  //       this.setState({
  //         users: this.state.users.filter((user) => user.id !== userID),
  //       });
  //     })
  //     .catch((err) => {
  //       console.log('deleteUser Error!', err);
  //     });
  // };

  deleteUser = (userID) => {
    db.collection('users')
      .doc('IR3CFnBcoETVQpqXRYXF')
      .collection('user')
      .where('id', '==', userID)
      .get()
      .then((querySnapshot) => {
        console.log('Document successfully deleted!');
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  editUser = (ID) => {
    window.localStorage.setItem('userID', ID);
    this.props.history.push('/edit-user');
  };

  addUser = () => {
    window.localStorage.removeItem('userID');
    this.props.history.push('/add-user');
  };

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          User List
        </Typography>
        <Button variant="contained" color="primary" onClick={this.addUser}>
          {' '}
          Add User{' '}
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">ID</TableCell> */}
              {/* <TableCell align="center">FirstName</TableCell>
              <TableCell align="center">LastName</TableCell> */}
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">UserName</TableCell>
              {/* <TableCell align="center">Age</TableCell>
              <TableCell align="center">Salary</TableCell> */}
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map((user) => (
              <TableRow key={user.id}>
                {/* <TableCell align="center" component="th" scope="user">
                  {user.id}
                </TableCell> */}
                {/* <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell> */}
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.userName}</TableCell>
                {/* <TableCell align="center">{user.age}</TableCell>
                <TableCell align="center">{user.salary}</TableCell> */}
                <TableCell
                  align="center"
                  onClick={() => this.editUser(user.id)}
                >
                  <CreateIcon />
                </TableCell>
                <TableCell
                  align="center"
                  onClick={() => this.deleteUser(user.id)}
                >
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <h2>User List</h2>
                <button onClick={this.addUser}> Add User</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FistName</th>
                            <th>LastName</th>
                            <th>UserName</th>
                            <th>Age</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map( user =>
                         <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.userName}</td>
                            <td>{user.age}</td>
                            <td>{user.salary}</td>
                            <td>
                                <button onClick={() => this.editUser(user.id)}>Edit</button>
                                <button onClick={() => this.deleteUser(user.id)}>Delete</button>
                            </td>
                         </tr>
                        )}
                    </tbody>
                </table> */}
      </div>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
};

export default UserListComponent;
