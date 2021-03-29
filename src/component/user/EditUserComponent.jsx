import React, { useState, useEffect } from "react";
import ApiService from "api/ApiService";
import { useHistory } from "react-router";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import db from "../../firebase";
import firebase from "firebase";

const EditUserComponent = ()=>{
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    ApiService.fetchUserByID(window.localStorage.getItem("userID"))
      .then((res) => {
        let user = res.data;
        setId(user.id);
        setUserName(user.userName);
        setEmail(user.email);
        setUserImage(user.photoURL);
      })
      .catch((err) => {
        console.log("loadUser() Error!!", err);
      });
  });

  // firebase db 연동
  // loadUser = () => {
  //   db.collection('users')
  //     .doc('IR3CFnBcoETVQpqXRYXF')
  //     .collection('user')
  //     .where('email', '==', window.localStorage.getItem('userID'))
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         let user = doc.data();
  //         this.setState({
  //           id: user.uid,
  //           // age: user.age,
  //           // salary: user.salary,
  //           userName: user.userName,
  //           email: user.email,
  //           userImage: user.photoURL,
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('Error getting documents: ', error);
  //     });
  //   // this.setState({ userImage: firebase.auth().currentUser.photoURL });
  // };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const onChange = (e) => {
    setUserName(e.target.value);
  };

  const saveUser = (e) => {
    e.preventDefault();

    let user = {
      id: id,
      userName: userName,
    };

    ApiService.editUser(user)
      .then((res) => {
        history.push("/users");
      })
      .catch((err) => {
        console.log("saveUser() Error!!", err);
      });
  };
  const classes = useStyles();

  // firebase db 연동
  // saveUser = (e) => {
  //   e.preventDefault();
  //   let user = {
  //     //id: this.state.id,
  //     userName: this.state.userName,
  //     // password: this.state.password,
  //     // firstName: this.state.firstName,
  //     // lastName: this.state.lastName,
  //     // age: this.state.age,
  //     // salary: this.state.salary,
  //     email: this.state.email,
  //   };
  //   db.collection('users')
  //     .doc('IR3CFnBcoETVQpqXRYXF')
  //     .collection('user')
  //     .where('email', '==', window.localStorage.getItem('userID'))
  //     .get()
  //     .then((querySnapshot) => {
  //       console.log('Document successfully update!');
  //       querySnapshot.forEach((doc) => {
  //         doc.ref.update(user);
  //       });
  //       this.props.history.push('/users');
  //     })
  //     .catch((err) => {
  //       console.log('saveUser() Error!!', err);
  //     });
  // };

    return (
      <div style={style_root}>
        <Grid container spacing={1}>
          {/* <Typography variant="h4" style={style}> */}
          <Grid item xs={12}>
            <Typography className={classes.paper} variant="h4">
              Edit Personal Information
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <div>
              <img style={style_image}src={userImage} alt="" />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <TextField
                type="text"
                placeholder="Edit your email"
                name="email"
                fullWidth
                margin="normal"
                value={email}
                readOnly={true}
              />
              <TextField
                type="text"
                placeholder="Edit your name"
                name="userName"
                fullWidth
                margin="normal"
                value={userName}
                onChange={onChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={saveUser}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  
}

// const frame_div = {
//   display: "grid",
//   gridAutoRows: "minmax(125px, auto)",
// };

// const style = {
//   display: "flex",
//   justifyContent: "center",
// };
const style_image = {
  height: "200px",
  minWidth: "40px",
  maxWidth: "200px",
  background: " yellow",
};
// const style_textfield = {
//   width:"100%",
//   background: " white",

// }
const style_root = {
  // flexGrow: "1",
};
const style_title = {
  justifyContent: "center",
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default EditUserComponent;
