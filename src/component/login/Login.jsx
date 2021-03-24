import React, { useState, useCallback } from "react";
import "./Login.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LoginService from "./LoginService";
import LoginKakao from "./LoginKakao";
import SignUp from "./SignUp";
import { auth, provider } from "./../../firebase";
import { actionTypes } from "../chat/state/reducer";
import { useStateValue } from "../chat/state/StateProvider";
import { useHistory } from "react-router";
import LoginTemplate from "./LoginTemplate";

const Login = () => {
  const history = useHistory();
  const [state, dispatch] = useStateValue();
  const [signUp, setSignUp] = useState(false);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const idInputHandler = useCallback((e) => {
    e.preventDefault();
    const textId = e.target.value;
    setId(textId); // true vs. false
  }, []);

  const pwdInputHandler = useCallback((e) => {
    e.preventDefault();
    const textPwd = e.target.value;
    setPwd(textPwd);
    console.log("textPwd: ", textPwd);
  }, []);

  //   id: email -> 유효성 검사
  const isEmail = (text) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(text); // 형식에 맞는 경우 true 리턴
  };

  const loginClickHandler = useCallback(
    (e) => {
      const validate = isEmail(id);
      if (validate) {
        // set id
        console.log("이메일 형식입니다.");
      } else {
        console.log("이메일 형식이 아닙니다.");
      }
      LoginService.login(id, pwd)
        .then((res) => {
          console.log(res.data);
          history.push('/Home');
        })
        .catch(() => {
          console.log("login Error!");
        });
      setId((e.target.value = ""));
      setPwd((e.target.value = ""));
    },
    [id, pwd]
  );
  const kakaoLoginClick = useCallback(() => {}, []);

  const googleLoginClick = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        history.push('/home');
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signupClick = () => {
    // setSignUp(true);
    history.push('/signUp');
    return <LoginTemplate />
  };

  return (
    <>
      <div className="login">
        <img src="/images/logo.png" alt="" />
        <div className="login__container">
          <div>
            {/* id */}
            <div className="login__input">
              <AccountBoxIcon />
              <input
                value={id}
                placeholder="Enter your Email"
                onChange={idInputHandler}
              />
            </div>
            {/* pwd */}
            <div className="login__input">
              <VpnKeyIcon />
              <input
                type="password"
                value={pwd}
                placeholder="Enter your Password"
                onChange={pwdInputHandler}
              />
            </div>
            <div className="login__find">
              <button onClick={signupClick}>회원가입</button>
              {/* <button>아이디패스워드찾기</button> */}
            </div>
          </div>
          <button className="buttonS" onClick={loginClickHandler}>Sign In</button>
          <div className="login___social">
            <LoginKakao />
            <button className="buttonG" onClick={googleLoginClick}>
              Google 로그인
            </button>
            {/* <LoginGoogle /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
