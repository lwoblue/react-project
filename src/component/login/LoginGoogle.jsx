import React from 'react';
import { useHistory } from 'react-router';
import { auth, provider } from './../../firebase';
import { actionTypes } from '../chat/state/reducer';
import { useStateValue } from '../chat/state/StateProvider';
// import axios from 'axios';
import ApiService from 'api/ApiService';

function LoginGoogle() {
  const history = useHistory();
  const [, dispatch] = useStateValue();
  const googleLoginClick = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        history.push('/');
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .then(() => {
        // users table 조회 후 없는 계정이라면 users table에 추가할것.
        let user = {
          email: auth.currentUser.email,
          username: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          deleteYN: 'n',
          provider: 'google',
        };
        console.log(user);
        ApiService.fetchGoogleUser(user)
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
        localStorage.setItem('userID', auth.currentUser.email);
      })
      .catch((error) => {
        alert(error.message);
      });
    console.log(auth.currentUser);
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
