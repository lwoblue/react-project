import React, { useCallback } from "react";
// import { useHistory } from "react-router-dom";

const { Kakao } = window;
// const history = useHistory();

function LoginKakao() {
  const kakaoLoginClick = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        fetch(`토큰 전달할 api`, {
          method: "GET",
          headers: {
            Authorization: authObj.access_token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.access_token);
            localStorage.setItem("Kakao_token", res.access_token);
            if (res.access_token) {
              console.log("Successfully logged in!!");
              // history.push("/");
            }
          });
      },
    });
  };
  return (
    <div>
      <button className="buttonK" onClick={kakaoLoginClick}>
        카카오 로그인
      </button>
    </div>
  );
}

export default LoginKakao;
