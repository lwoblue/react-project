import React, { useState, useEffect } from "react";
import ApiService from "api/ApiService";
import { useHistory } from "react-router";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import db from "../../firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
    textAlign: "center",
    flexDirection: "row",
    color: theme.palette.text.secondary,
  },
  row:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

  },
  style_img: {
    width: "250px",
  },
}));
const EditUserComponent = () => {
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const history = useHistory();

  useEffect(() => {
    ApiService.fetchUserByID(window.localStorage.getItem("userID"))
      .then((res) => {
        let user = res.data;
        setId(user.id);
        setUserName(user.userName);
        setEmail(user.email);
        setUserImage(user.photoURL);
        setPhotoURL(user.photoURL);
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

  const onChangeUserName = (e) => {
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
  const onChangePhotoURL = (e) => {
    e.preventDefault();
    setPhotoURL(e.target.value);
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
    <div>
      {/* <Grid container spacing={1}> */}
      {/* <Typography variant="h4" style={style}> */}
      <div className={classes.root} container spacing={1} item xs={12}>
        <Typography variant="h4">
          Edit Personal Information
        </Typography>
      </div>
      <div className={classes.root}>
        <div className={classes.paper}>
          <img className={classes.style_img} src={userImage} alt="" />
        </div>
        <div className={classes.paper}>
          <div >
            <div className={classes.row}>
              <EmailIcon />
              <TextField
                type="text"
                placeholder="Edit your email"
                name="email"
                fullWidth
                margin="normal"
                value={email}
                readOnly={true}
              />
            </div>
            <div className={classes.row}>
              <AccountCircleIcon />
              <TextField
                type="text"
                placeholder="Edit your name"
                name="userName"
                fullWidth
                margin="normal"
                value={userName}
                onChange={onChangeUserName}
              />
            </div>
            <div className={classes.row}>
              <PermMediaIcon />
              <TextField
                type="text"
                placeholder="Upload your Image file"
                name="userName"
                fullWidth
                margin="normal"
                value={photoURL}
                onChange={onChangePhotoURL}
              />
            </div>

            <Button
              style={{ float: "right" }}
              variant="contained"
              color="primary"
              onClick={saveUser}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditUserComponent;
