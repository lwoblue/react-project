import React, { useRef, useEffect } from 'react';
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
import ImageUploadComponent from '../imageUpload/ImageUploadComponent';
import Axios from 'axios';

const minimumImageCount = 3;

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
  },
}));

export default function AutoPlaySlick(props) {
  const sliderRef = useRef(null);
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
          for(var idx = 0; idx < tmpfileArray.length; idx++){
            var tmpArray = {id:(idx+1), url: `http://localhost:3000/images/slide-img/${tmpfileArray[idx].fileName}`};
            fileArray.push(tmpArray);
          }
        }
        // existsSync: ???????????? ????????? ???????????? ??????
        if(fileArray.length > 0) setItems(fileArray); 
    });
  }, []);

  const imgViewBody = (
    <div className={classes.modalBody}>
      <img src={imagePath} alt="images" width="100%" />
    </div>
  );

  const upLoadBody = (
    <div className={classes.modalBody}>
      <ImageUploadComponent setUpOpen={setUpOpen} setItems={setItems} minCount={minimumImageCount}/>
    </div>
  );

  const downLoadBody = (
    <div className={classes.modalBody}>
      <ImageUploadComponent setDownOpen={setDownOpen} setItems={setItems} minCount={minimumImageCount}/>
    </div>
  );

  const settings = {
    dots: true, // ???????????? ?????? ????????? ?????????????????? ??????
    infinite: true, // ?????? ?????? ??????
    slidesToShow: 3, // ??? ????????? ????????? ????????? ??????
    slidesToScroll: 1, // ????????? ????????? ????????? ????????? ??????
    autoplay: true, // ?????? ????????? ?????? ??????
    // speed: 500,        // ?????? ?????? ????????? ?????? ?????? ??????????????? ????????? ??????(ms)
    autoplaySpeed: 1500, // ?????? ????????? ??? ???????????? ??????????????? ????????? ?????? (ms)
    cssEase: 'linear',
    slide: 'div', //???????????? ????????? ??? ?????? ex) div, li
    arrows: false, // ????????? ???????????? ????????? ?????? ??????
    pauseOnHover: true, // ???????????? ??????	??? ????????? ???????????? ???????????? ????????? ??????
    vertical: false, // ?????? ?????? ???????????? ??????
    // prevArrow: "<button type='button' class='slick-prev'>Previous</button>", // ?????? ????????? ?????? ??????
    // nextArrow: "<button type='button' class='slick-next'>Next</button>", // ?????? ????????? ?????? ??????
    dotsClass: 'slick-dots', //?????? ????????? ??????????????????(???) css class ??????
    draggable: true, //????????? ?????? ??????
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
            {
            items.map((item, i) => {
              return (
                  <div className="imgdiv" key={`img${item.id}`} onDoubleClick={
                    ()=>{    
                      setOpen(true);
                      setImagePath(item.url);
                    }}
                  >
                    <img src={item.url} alt="logo" className={classes.imgSize} key={item.id}/>
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
             {/*  <Button
                className={classes.btnMR}
                theme={goldColor}
                variant="contained"
                color="primary"
                disableElevation
                onClick={download}
              >
                Download
              </Button> */}
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
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {imgViewBody}
      </Modal>
      <Modal
        open={upOpen}
        onClose={() => {
          setUpOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {upLoadBody}
      </Modal>
      {/* <Modal
        open={downOpen}
        onClose={() => {
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
