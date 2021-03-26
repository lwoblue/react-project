import { React, useRef, useState } from 'react';
import Slider from 'react-slick';
import { makeStyles, Button, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const goldColor = createMuiTheme({
  palette: {
    primary: {
      light: '#43a047',
      main: '#000000b8',
      contrastText: '#fcc600',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: 260,
    width: '100%',
    paddingTop: 'calc(50px / 16 * 9)',
  },
  imgSize: {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
  },
  btnDiv: {
    textAlign: 'center',
  },
  btnMR: {
    marginRight: '30px',
  },
}));

export default function AutoPlaySlick(props) {
  const sliderRef = useRef(Slider);
  const classes = useStyles();

  const settings = {
    dots: false, // 스크롤바 아래 점으로 페이지네이션 여부
    infinite: true, // 무한 반복 옵션
    slidesToShow: 2, // 한 화면에 보여질 컨텐츠 개수
    slidesToScroll: 1, // 스크롤 한번에 움직일 컨텐츠 개수
    autoplay: true, // 자동 스크롤 사용 여부
    // speed: 500,        // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
    autoplaySpeed: 1500, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    cssEase: 'linear',
    slide: 'div', //슬라이드 되어야 할 태그 ex) div, li
    arrows: false, // 옆으로 이동하는 화살표 표시 여부
    pauseOnHover: true, // 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
    vertical: false, // 세로 방향 슬라이드 옵션
    // prevArrow: "<button type='button' class='slick-prev'>Previous</button>", // 이전 화살표 모양 설정
    // nextArrow: "<button type='button' class='slick-next'>Next</button>", // 다음 화살표 모양 설정
    dotsClass: 'slick-dots', //아래 나오는 페이지네이션(점) css class 지정
    draggable: true, //드래그 가능 여부
  };

  const play = () => {
    sliderRef.current.slickPlay();
  };

  const pause = () => {
    sliderRef.current.slickPause();
  };

  return (
    <>
      <ThemeProvider theme={goldColor}>
        <Slider {...settings} className={classes.root} ref={sliderRef}>
          <div>
            <img
              src={'images/img1.jpg'}
              alt="logo"
              className={classes.imgSize}
            />
          </div>
          <div>
            <img
              src={'images/img2.jpg'}
              alt="logo"
              className={classes.imgSize}
            />
          </div>
          <div>
            <img
              src={'images/img3.jpg'}
              alt="logo"
              className={classes.imgSize}
            />
          </div>
          <div>
            <img
              src={'images/img4.jpg'}
              alt="logo"
              className={classes.imgSize}
            />
          </div>
          <div>
            <img
              src={'images/img5.jpg'}
              alt="logo"
              className={classes.imgSize}
            />
          </div>
        </Slider>

        <div className={classes.btnDiv}>
          <Button
            className={classes.btnMR}
            theme={goldColor}
            variant="contained"
            color="primary"
            disableElevation
            onClick={play}
          >
            Play
          </Button>
          <Button
            theme={goldColor}
            variant="contained"
            color="primary"
            disableElevation
            onClick={pause}
          >
            Pause
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
}
