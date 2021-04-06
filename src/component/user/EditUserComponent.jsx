import React, { useState, useEffect } from "react";
import ApiService from "api/ApiService";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexFlow: "row",
  },
  style_box: {
    // border: "1px solid #f3eb9f",
    background: "rgba(255, 255, 255, 0.438)",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    padding: "50px",
    borderRadius: "5px",
    marginTop: "10px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    "& button": {
      padding: "10px",
      marginLeft: "20px",
      borderRadius: "10px",
      border: "1px rgba(37, 34, 34, 0.575)",
      backgroundColor: "rgba(65, 61, 61, 0.466)",
      color: "#fcc600",
    },
  },
  row_btn: {
    display: "flex",
    // float: "right",
    marginTop: "20px",
    justifyContent: "center",
    "& button": {
      padding: "15px 25px 15px 25px",
      borderRadius: "10px",
      border: "1px rgba(37, 34, 34, 0.575)",
      backgroundColor: "rgba(37, 34, 34, 0.575)",
      color: "#fcc600",
      // float: "right",
    },
  },
  style_img: {
    minWidth: "250px",
    maxWidth: "250px",
    minHeight: "250px",
    maxHeight: "250px",
    borderRadius: "20px",
  },

  style_form: {
    width: "65%",
    minHeight: "250px",
    minWidth: "250px",
    padding: "20px",
    "& input": {
      marginLeft: "10px",
    },
    "& svg": {
      marginRight: "10px",
    },
  },

}));
const EditUserComponent = () => {
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    ApiService.fetchUserByID(window.localStorage.getItem("userID"))
      .then((res) => {
        let user = res.data;
        setId(user.id);
        setUserName(user.userName);
        setEmail(user.email);
        // setUserImage(user.photoURL);
        ApiService.fetchFirstImage(user.id).then((res)=>{
          if(res.data.message === "photoURL"){
            setUserImage(res.data.photoURL);
          }else{
            setUserImage(`data:image/jpg;base64,${res.data.imageFile}`);
          }
        });
      })
      .catch((err) => {
        console.log("loadUser() Error!!", err);
      });
  });
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

  const onChangePhotoUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const classes = useStyles();
  const onClickUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", id);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await ApiService.fetchImage(formData,config)
      .then((res) => {
        setUserImage(`data:image/jpg;base64,${res.data.imageFile}`);
        alert("성공");
      })
      .catch((err) => {
        alert("실패");
      });
  };

  return (
    <div>
      <div className={[classes.root, classes.style_box].join(" ")}>
        <img className={classes.style_img} src={userImage} alt="" />
        <div className={classes.style_form}>
          <div>
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
              <input
                type="file"
                name="file"
                onChange={onChangePhotoUpload}
              />
              <button onClick={onClickUpload}>upload</button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.row_btn}>
        <button variant="contained" onClick={saveUser}>
          Save
        </button>
      </div>
    </div>
  );
};
export default EditUserComponent;
