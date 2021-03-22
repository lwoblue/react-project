import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import LoginService from "./LoginService";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function SignUp() {
  const history = useHistory();
  const [email, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [userName, setUserName] = useState("");
  const [InputStatus, setInputStatus] = useState("");

  const idInputHandler = useCallback((e) => {
    e.preventDefault();
    const textEnail = e.target.value;
    setId(textEnail); // true vs. false
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
      let emailValidate = false;
      if (InputStatus === "사용가능한 이메일입니다.") {
        emailValidate = true;
      }
      if (
        email !== null &&
        pwd !== null &&
        userName !== null &&
        emailValidate
      ) {
        LoginService.signUp(email, pwd, userName)
          .then((res) => {
            console.log(res.data);
          })
          .catch(() => {
            console.log("SignUp Error!");
          });
        setId((e.target.value = ""));
        setPwd((e.target.value = ""));
        setUserName((e.target.value = ""));
        alert('ok');
        history.push("/login");
      } else {
        // 빈 input 존재
        alert("입력 양식을 채워주세요");
      }
    },
    // [email, pwd, userName,history]
    [email, pwd, userName]
  );

  const idDuplicateCheck = (e) => {
    // 이메일 형식 체크
    const validate = isEmail(email);
    if (validate) {
      // setInputStatus("올바른 이메일 형식입니다.");
      // set id
      LoginService.emailDuplicateCheck(email)
        .then((res) => {
          let status = res.data;
          if (status === "true") {
            setInputStatus("사용가능한 이메일입니다.");
          } else {
            //중복 상태입니다.
            setInputStatus("중복된 이메일입니다.");
          }
        })
        .catch(() => {
          console.log("check Duplcate ERROR!");
        });
    } else {
      setInputStatus("이메일 형식이 아닙니다.");
    }
  };
  const goBack = ()=>{
    history.push(`/login`);
  }

  return (
    <div className="login">
      <img src="/images/logo.png" alt="" />
      <div className="login__container">
        <div style={{ textAlign: "initial" }} onClick={goBack}>
          <ArrowBackIcon />
        </div>
        {/* <h1>Login</h1> */}

        <div>
          {/* id */}
          <div className="login__input">
            <EmailIcon />
            <input
              value={email}
              placeholder="Enter your Email"
              onChange={idInputHandler}
            />
          </div>
          <div
            className="login__inputDuplicateChk"
            style={{ textAlign: "end" }}
          >
            <span>{InputStatus}</span>
            <button
              style={{
                border: "none",
                backgroundColor: "#98d33a",
                borderRadius: "4px",
                height: "25px",
                width: "80px",
                marginLeft: "10px",
              }}
              onClick={idDuplicateCheck}
            >
              중복체크
            </button>
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
