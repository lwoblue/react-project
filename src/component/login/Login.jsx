import React, { useState, useCallback, useEffect } from "react";
import "./Login.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LoginService from "./LoginService";
import LoginKakao from "./LoginKakao";
import { auth, provider } from "./../../firebase";
import { actionTypes } from "../chat/state/reducer";
import { useStateValue } from "../chat/state/StateProvider";
import { useHistory } from "react-router";
import db from "../../firebase";
import LoginGoogle from "./LoginGoogle";
import LoginRoute from "component/route/LoginRoute";

const Login = () => {
  useEffect(() => {
    localStorage.removeItem("userID");
  }, []);
  // localStorage.removeItem('userID');
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
  }, []);

  //   id: email -> 유효성 검사
  const isEmail = (text) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(text); // 형식에 맞는 경우 true 리턴
  };

  const loginClickHandler = useCallback(
    (e) => {
      if (id && pwd) {
        const validate = isEmail(id);
        if (validate) {
          // set id
          console.log("이메일 형식입니다.");
          // <firebase db 연동>
          // db.collection('users')
          //   .doc('IR3CFnBcoETVQpqXRYXF')
          //   .collection('user')
          //   .where('email', '==', id)
          //   .where('password', '==', pwd)
          //   .get()
          //   .then((querySnapshot) => {
          //     querySnapshot.forEach((doc) => {
          //       if (doc.exists) {
          //         console.log(doc.id, ' => ', doc.data());
          //         window.localStorage.setItem('userID', id);
          //         dispatch({
          //           type: actionTypes.SET_USER,
          //           user: doc.data(),
          //         });
          //         history.push('/home');
          //       } else {
          //         alert('존재하지 않는 사용자입니다. 회원가입해주세요.');
          //         history.push('/signUp');
          //       }
          //     });
          //   })
          //   .catch((error) => {
          //     console.error('login Error!', error);
          //   });

          LoginService.login(id, pwd)
            .then((res) => {
              if (res.data === "false") {
                alert("아이디/패스워드를 다시 확인해주세요.");
              } else {
                window.localStorage.setItem("userID", id);
                console.log("id--->", id);
                console.log("login--->", res.data);
                dispatch({
                  type: actionTypes.SET_USER,
                  user: res.data,
                });
                console.log(res.data);
                var user = auth.currentUser;
                if (!user.photoURL) {
                  user.updateProfile({
                    photoURL:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3SvtTRgIX1lfL2YSByB8kwoVkVYQB93It2g&usqp=CAU",
                  });
                }
                if (!user.displayName) {
                  user.updateProfile({
                    displayName: res.data.userName,
                  });
                }
                history.push("/home");
              }
              setId((e.target.value = ""));
              setPwd((e.target.value = ""));
            })
            .catch(() => {
              console.log("login Error!");
            });
        } else {
          alert("이메일 형식이 아닙니다.");
        }
      } else {
        alert("로그인정보를 입력해주세요");
      }
    },
    [id, pwd]
  );
  const signupClick = () => {
    // setSignUp(true);
    history.push("/signUp");
    return <LoginRoute />;
  };

  return (
    <>
      <div className="login">
        {/* <img src="/images/logo.png" alt="" /> */}
        <div className="login__container">
          <div>
            {/* id */}
            <div className="login__input">
              <div className="icon_input">
                <AccountBoxIcon />
              </div>
              <input
                value={id}
                placeholder={`Enter your Email`}
                onChange={idInputHandler}
              ></input>
            </div>
            {/* pwd */}
            <div className="login__input">
              <div className="icon_input">
                <VpnKeyIcon />
              </div>
              <input
                type="password"
                value={pwd}
                placeholder="Enter your Password"
                onChange={pwdInputHandler}
              />
            </div>
          </div>
          
          <div className="buttons">
            <button className="buttonS" onClick={loginClickHandler}>
              Sign In
            </button>
            <div className="login___social">
              <LoginKakao />
              <LoginGoogle />
            </div>
            <div className="login__find">
              <span>Not a member? </span>
              <button onClick={signupClick}>Sign up now!</button>
              {/* <button>아이디패스워드찾기</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
