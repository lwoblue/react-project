import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";
import { createFirebaseToken, updateOrCreateUser } from "./auth";
import { auth } from "./../../firebase";
import { actionTypes } from "../chat/state/reducer";
import { useStateValue } from "../chat/state/StateProvider";
import axios from "axios";

// interface State {
//     data: any;
// }
const LOGIN_API_BASE_URL = "http://localhost:8080/users";
// const { Kakao } = window;
const LoginKakao = () => {
  const history = useHistory();
  const [state, dispatch] = useStateValue();
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const responseKaKao = (res) => {
    // console.log(JSON.stringify(res));
    // setUid(`kakao:${res.profile.id}`);
    // setEmail(res.profile.kakao_account.email);
    // setName(res.profile.properties.nickname);
    // setPhotoURL(res.profile.properties.profile_image);
    // setProvider("kakao");
    let access_token = res.response.access_token;
    let uid = `kakao:${res.profile.id}`;
    let email = res.profile.kakao_account.email;
    let name = res.profile.properties.nickname;
    let photoURL = res.profile.properties.profile_image;
    let provider = "kakao";
    if (photoURL === undefined) {
      photoURL =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3SvtTRgIX1lfL2YSByB8kwoVkVYQB93It2g&usqp=CAU";
    }
    // fetch(`${LOGIN_API_BASE_URL}/signin/kakao`, {
    fetch(`${LOGIN_API_BASE_URL}/verifyToken`, {
      //백엔드에서 원하는 형태의 endpoint로 입력해서 fetch한다.
      method: "POST",
      headers: {
        Authorization: res.response.access_token,
        //받아오는 response객체의 access_token을 통해 유저 정보를 authorize한다.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        email,
        name,
        photoURL,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // yes
        localStorage.setItem("token", res.firebase_token);
        localStorage.setItem("userID", email);
        console.log("kakao login>>>: ", res);
        auth
          .signInWithCustomToken(res.firebase_token)
          .then((user) => {
            dispatch({
              type: actionTypes.SET_USER,
              user: user,
            });
            history.push("/home");
          }, alert("로그인 성공하였습니다"));

          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
        
  };

  const responseFail = (err) => {
    alert(err);
  };
  return (
    <>
      <KaKaoBtn
        jsKey={"f872b228ad63773a0377adb9608eb437"}
        buttonText="KaKao"
        onSuccess={responseKaKao}
        onFailure={responseFail}
        getProfile={true}
      />
    </>
  );
};

const KaKaoBtn = styled(KaKaoLogin)`
  width: 100%;
  height: 56px;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default LoginKakao;
