import React, { useCallback } from "react";
// import { useHistory } from "react-router-dom";

const { Kakao } = window;
// const history = useHistory();

function LoginKakao() {
  //   const kakaoLoginClick = () => {
  //     Kakao.Auth.login({
  //       success:  (authObj)=> {
  //         fetch(`토큰 전달할 api`, {
  //           method: "GET",
  //           headers: {
  //             Authorization: authObj.access_token,
  //           },
  //         })
  //           .then((res) => res.json())
  //           .then((res) => {
  //             console.log(res.access_token);
  //             localStorage.setItem("Kakao_token", res.access_token);
  //             if (res.access_token) {
  //               console.log("Successfully logged in!!");
  //               // history.push("/");
  //             }
  //           });
  //       },
  //     });
  //   };
  const kakaoLoginClick = () => {
    Kakao.Auth.login({
      success: (authObj) => {
        console.log("정상로그인 되었습니다.", authObj);
      },
      //   fail: (error) => {
      //     console.error("로그인 에러", error);
      //   },
    });
  };
  return (
    <div>
      <button
        style={{
          border: "none",
          backgroundColor: " #fff024",
          width: "100%",
          height: "56px",
          marginTop: "10px",
        }}
        onClick={kakaoLoginClick}
      >
        카카오 로그인 / firebase 테스트 버튼
      </button>
    </div>
  );
}

export default LoginKakao;
