import React, { Component } from "react";
import styled from "styled-components";
// import { StyledText } from '../style';
import KaKaoLogin from "react-kakao-login";

// interface State {
//     data: any;
// }

class LoginKakao extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "kakao",
    };
  }

  responseKaKao = (res: any) => {
    this.setState({
      data: res,
    });
    alert(JSON.stringify(this.state.data));
  };

  responseFail = (err) => {
    alert(err);
  };

  render() {
    return (
      <>
        <br></br>
        <KaKaoBtn
          // jsKey={"2b67838751764359be17923f29aa820e"}
          // jsKey ={""}
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
