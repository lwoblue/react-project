import React,{ useRef, useEffect} from 'react';
import Slider from 'react-slick';
import Modal from '@material-ui/core/Modal';
import {
  makeStyles,
  Button,
  createMuiTheme,
  Grid,
  Paper,
  SnackbarContent,
  Box,
  Divider,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
// import MainSlideService from '../../api/MainSlideService'
import ImageUploadComponent from '../imageUpload/ImageUploadComponent';
import Axios from 'axios';

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
  paper: {
    height: 300,
    width: '100%',
    overflow: 'auto',
  },
  sliderRoot: {
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
    // textAlign: 'center',
  },
  btnMR: {
    marginRight: '30px',
  },
  snackbarContent: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  snackbarRoot: {
    color: '#fcc600',
    backgroundColor: '#000000b8',
    minWidth: 'auto',
    width: '100%',
  },
  mgTB: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  modalBody: {
    position: 'absolute',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}));

export default function AutoPlaySlick(props) {
  const sliderRef = useRef(Slider);
  const classes = useStyles();
  const [imagePath, setImagePath] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [upOpen, setUpOpen] = React.useState(false);
  const [downOpen, setDownOpen] = React.useState(false);
  const defaultImages = [
    { id: 1, url: 'images/img1.jpg' },
    { id: 2, url: 'images/img2.jpg' },
    { id: 3, url: 'images/img3.jpg' },
    { id: 4, url: 'images/img4.jpg' },
    { id: 5, url: 'images/img5.jpg' },
  ]
  const [items,setItems] = React.useState(defaultImages);

  useEffect(() => {
    let USER_API_BASE_URL = 'http://localhost:8090';
    const fileArray = [];
    Axios.post(`${USER_API_BASE_URL}/api/read-images`, {
    }).then(res => {
        const tmpfileArray = res.data.data;
        if(tmpfileArray.length > 0){
          for(let idx = 0; idx < tmpfileArray.length; idx++){
              fileArray.push({id:(idx+1), url: `images/slide-img/${tmpfileArray[idx].fileName}`})
          }
        }
    });
    // existsSync: 파일이나 폴더가 존재하는 파악
    console.log([fileArray])
    console.log([fileArray].length)
    if([fileArray].length > 0) setItems([fileArray]); 
  }, []);

  const imgViewBody = (
    <div className={classes.modalBody}>
      <img src={imagePath} alt="images" width="100%"/>
    </div>
  );


  const upLoadBody = (
    <div className={classes.modalBody}>
      <ImageUploadComponent setUpOpen={setUpOpen} setItems={setItems}/>
    </div>
  );

  const downLoadBody = (
    <div className={classes.modalBody}>
      <ImageUploadComponent setDownOpen={setDownOpen} setItems={setItems}/>
    </div>
  );

  const settings = {
    dots: true, // 스크롤바 아래 점으로 페이지네이션 여부
    infinite: true, // 무한 반복 옵션
    slidesToShow: 3, // 한 화면에 보여질 컨텐츠 개수
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

  const upload = (e) => {
    setUpOpen(true);
  };

  const download = (e) => {
    setDownOpen(true);
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Slider {...settings} className={classes.sliderRoot} ref={sliderRef}>
            {items.map((item, i) => {
              return (
                  <div key={`img${item.id}`} onDoubleClick={
                    ()=>{    
                      setOpen(true);
                      setImagePath(item.url);
                    }}
                  >
                    <img src={item.url} alt="logo" className={classes.imgSize}/>
                  </div>
              );
            })}
          </Slider>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <ThemeProvider theme={goldColor}>
            <div className={classes.snackbarContent}>
              <SnackbarContent
                className={classes.snackbarRoot}
                message={'Setting'}
              />
            </div>
            <Box component="div" m={2}>
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
              <Divider className={classes.mgTB} />
              <Button
                className={classes.btnMR}
                theme={goldColor}
                variant="contained"
                color="primary"
                disableElevation
                onClick={download}
              >
                Download
              </Button>
              <Button
                theme={goldColor}
                variant="contained"
                color="primary"
                disableElevation
                onClick={upload}
              >
                Uplode
              </Button>
              
            </Box>
          </ThemeProvider>
        </Paper>
      </Grid>
      <Modal
        open={open}
        onClose={()=>{
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      {imgViewBody}
      </Modal>
      <Modal
        open={upOpen}
        onClose={()=>{
          setUpOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      {upLoadBody}
      </Modal>
      {/* <Modal
        open={downOpen}
        onClose={()=>{
          setDownOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      {downLoadBody}
      </Modal> */}
    </>
  );
}
