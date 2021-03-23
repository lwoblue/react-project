import React, { Component } from "react";
import styled from "styled-components";
// import { StyledText } from '../style';
import KaKaoLogin from "react-kakao-login";
import { createFirebaseToken,updateOrCreateUser } from "./auth";
import { auth } from "./../../firebase";
import axios from "axios";

// interface State {
//     data: any;
// }
const { Kakao } = window;
class LoginKakao extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "kakao",
    };
  }

  responseKaKao = (res: any) => {
    Kakao.init('f872b228ad63773a0377adb9608eb437');
    this.setState({
      data: res,
    });
    console.log(Kakao.isInitialized());
    console.log(JSON.stringify(this.state.data));
    const userId = `kakao:${this.state.data.profile.id}`;
    const email = this.state.data.profile.kakao_account.email;
    const displayName = this.state.data.profile.properties.nickname; 
    const photoURL = this.state.data.profile.properties.profile_image;
    alert(JSON.stringify(this.state.data));
    updateOrCreateUser(userId, email, displayName ,photoURL);
    auth.createCustomToken(userId, {provider: 'KAKAO'});    
  };

  responseFail = (err) => {
    alert(err);
  };

  

  render() {
    return (
      <>
        <br></br>
        <KaKaoBtn
          jsKey ={'f872b228ad63773a0377adb9608eb437'}
          buttonText="KaKao"
          onSuccess={this.responseKaKao}
          onFailure={this.responseFail}
          getProfile={true}
        />
      </>
    );
  }
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
