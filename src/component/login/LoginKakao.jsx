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
    setUid(`kakao:${res.profile.id}`);
    setEmail(res.profile.kakao_account.email);
    setName(res.profile.properties.nickname);
    setPhotoURL(res.profile.properties.profile_image);
    setProvider("kakao");

    const access_token = res.response.access_token;
    const uid = res.profile.id;
    const email = res.profile.kakao_account.email;
    const name = res.profile.properties.nickname;
    const photoURL = res.profile.properties.profile_image;
    const provider = "kakao";
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
      .then(
        (res) => {
          // yes
          localStorage.setItem("token", res.firebase_token);
          dispatch({
            type: actionTypes.SET_USER,
            user: name,
          });
          history.push('/home');
        },
        alert("로그인 성공하였습니다")
        
      );
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
