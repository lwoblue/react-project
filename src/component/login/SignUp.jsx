import React, { useState, useCallback } from "react";
import "./Login.css";
import LoginService from "./LoginService";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

function SignUp() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [userName, setUserName] = useState("");

  const idInputHandler = useCallback((e) => {
    e.preventDefault();
    const textId = e.target.value;
    setId(textId); // true vs. false
  }, []);

  const pwdInputHandler = useCallback((e) => {
    e.preventDefault();
    const textPwd = e.target.value;
    setPwd(textPwd);
  }, []);

  const userNameInputHandler = useCallback((e) => {
    e.preventDefault();
    const textName = e.target.value;
    setUserName(textName);
    // console.log("userName: ", textName);
  });

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
      LoginService.signUp(id, pwd, userName)
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          console.log("login Error!");
        });
      setId((e.target.value = ""));
      setPwd((e.target.value = ""));
      setUserName((e.target.value = ""));
    },
    [id, pwd, userName]
  );

  return (
    <div className="login">
      <img src="/images/logo.png" alt="" />
      <div className="login__container">
        {/* <h1>Login</h1> */}
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
          {/* name */}
          <div className="login__input">
            <AccountBoxIcon />
            <input
              value={userName}
              placeholder="Enter your Name"
              onChange={userNameInputHandler}
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
        </div>
        <button onClick={loginClickHandler}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;
