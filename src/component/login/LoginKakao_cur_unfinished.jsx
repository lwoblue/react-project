import React, { useState } from "react";
import styled from "styled-components";
// import { StyledText } from '../style';
import KaKaoLogin from "react-kakao-login";

const LoginKakao = ()=>{
  const [data, setData] = useState(null);
  const responseKaKao = (res)=>{
    setData(JSON.stringify(res.data))
    alert(JSON.stringify(data));    
  }

  const responseFail = (err)=>{
    alert(err);
  }

  return(
    <>
        <br></br>
        <KaKaoBtn
          // jsKey={"2b67838751764359be17923f29aa820e"}
          // jsKey ={""}
          buttonText="KaKao"
          onSuccess={responseKaKao}
          onFailure={responseFail}
          getProfile={true}
        />
      </>
  );
}

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 190px;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default LoginKakao;
