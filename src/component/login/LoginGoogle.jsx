import React from "react";
import { useHistory } from "react-router";
import { auth, provider } from "./../../firebase";
import { actionTypes } from "../chat/state/reducer";
import { useStateValue } from "../chat/state/StateProvider";
import axios from "axios";
import ApiService from "api/ApiService";

function LoginGoogle() {
  const history = useHistory();
  const [state, dispatch] = useStateValue();
  const googleLoginClick = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        history.push("/home");
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
    localStorage.setItem("userID", auth.currentUser.email);
    // users table 조회 후 없는 계정이라면 users table에 추가할것.
    const user = {
        email: auth.currentUser.email,
        username: auth.currentUser.displayName,
        photoURL:auth.currentUser.photoURL,
        deleteYN: 'n',
        provider: 'google'
    };
    ApiService.fetchGoogleUser(user)
    .then()
    .catch(error=>{
        console.log(error)
    });
  };
  return (
    <>
      <button className="buttonG" onClick={googleLoginClick}>
        Google 로그인
      </button>
    </>
  );
}

export default LoginGoogle;
