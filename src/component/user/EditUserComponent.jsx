import React, { Component } from 'react';
import ApiService from 'api/ApiService';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      userName: '',
      firstName: '',
      lastName: '',
      age: '',
      salary: '',
      message: null,
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    ApiService.fetchUserByID(window.localStorage.getItem('userID'))
      .then((res) => {
        let user = res.data;
        this.setState({
          id: user.id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          salary: user.salary,
        });
      })
      .catch((err) => {
        console.log('loadUser() Error!!', err);
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      id: this.state.id,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      salary: this.state.salary,
    };

    ApiService.editUser(user)
      .then((res) => {
        this.setState({
          message: user.lastName + '님 정보가 수정되었습니다.',
        });
        this.props.history.push('/users');
      })
      .catch((err) => {
        console.log('saveUser() Error!!', err);
      });
  };

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Edit User
        </Typography>
        <form>
          <TextField
            type="text"
            name="userName"
            readOnly={true}
            fullWidth
            margin="normal"
            value={this.state.userName}
          />

          <TextField
            placeholder="Edit your first name"
            name="firstName"
            fullWidth
            margin="normal"
            value={this.state.firstName}
            onChange={this.onChange}
          />

          <TextField
            placeholder="Edit your last name"
            name="lastName"
            fullWidth
            margin="normal"
            value={this.state.lastName}
            onChange={this.onChange}
          />

          <TextField
            type="number"
            placeholder="Edit your age"
            name="age"
            fullWidth
            margin="normal"
            value={this.state.age}
            onChange={this.onChange}
          />

          <TextField
            type="number"
            placeholder="Edit your salary"
            name="salary"
            fullWidth
            margin="normal"
            value={this.state.salary}
            onChange={this.onChange}
          />

          <Button variant="contained" color="primary" onClick={this.saveUser}>
            Save
          </Button>
        </form>
        {/* <h2>Edit User</h2>
                <form>
                    <div>
                        <label>User Name:</label>
                        <input type="text" name="userName" readOnly="true" defaultValue={this.state.userName}/>
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input placeholder="Edit your first name" name="firstName" value={this.state.firstName} 
                         onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input placeholder="Edit your last name" name="lastName" value={this.state.lastName} 
                         onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Age:</label>
                        <input type="number" placeholder="Edit your age" name="age" value={this.state.age} 
                         onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Salary:</label>
                        <input type="number" placeholder="Edit your salary" name="salary" value={this.state.salary} 
                         onChange={this.onChange}/>
                    </div>

                    <button onClick={this.saveUser}>Save</button>
                </form> */}
      </div>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
};

export default EditUserComponent;
