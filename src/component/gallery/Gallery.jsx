import React, { memo, useState, useRef, useEffect } from 'react';
import ImageFadeSlider from './ImageFadeSlider';
import ImageMoveSlider from './ImageMoveSlider';
import './Gallery.css';

const Gallery = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [isAutoPlay, setAutoPlay] = useState(false);
  const images = [ 
      {id: 0, url: 'http://gwx.bizmeka.com/Upload_BoardSTD_201609/solomonts/%7B911d9658-e421-4c5e-bdf8-ba9a1416ea45%7D/UploadFile/%7BB7C9637F-ACAB-4A81-9680-4E2A14FCC57D%7D/%7Bd32740a6-06b9-4837-ba05-bade456e62cc%7D.jpg'}, 
      {id: 1, url: 'http://gwx.bizmeka.com/Upload_BoardSTD_201609/solomonts/%7B911d9658-e421-4c5e-bdf8-ba9a1416ea45%7D/UploadFile/%7B01E52B87-7228-45FF-AE33-C8010C7AF2D0%7D/%7Bbcab76f1-09a1-4e3f-a3dc-3c87ac0589b6%7D.jpg'}, 
      {id: 2, url: 'http://gwx.bizmeka.com/Upload_BoardSTD_201609/solomonts/%7B911d9658-e421-4c5e-bdf8-ba9a1416ea45%7D/UploadFile/%7BC027D8C7-1C4B-4D11-952A-1A25C72B642C%7D/%7Baeae1e6b-7e81-4d3e-a916-5706a2c8fc22%7D.jpg'}, 
      {id: 3, url: 'http://gwx.bizmeka.com/Upload_BoardSTD_201609/solomonts/%7B911d9658-e421-4c5e-bdf8-ba9a1416ea45%7D/UploadFile/%7B0C63E345-33E1-4327-BF35-28472ED02318%7D/%7B293d854b-4a0b-4181-9357-bbcae485dfd6%7D.jpg'}, 
      {id: 4, url: 'http://gwx.bizmeka.com/Upload_BoardSTD_201609/solomonts/%7B911d9658-e421-4c5e-bdf8-ba9a1416ea45%7D/UploadFile/%7BF2D92CC5-14A5-46C9-A4DC-BB41DDA3804A%7D/%7Bac41ce30-d665-488e-b72f-b790d727248b%7D.jpg'}, 
  ];
  const TOTAL_SLIDES = images.length-1;
  const onChackedAutoPlay = (e) => {
    let isChk = e.target.checked;
    console.log(isChk);
    setAutoPlay(isChk);
  }
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  })

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    }
    if(isAutoPlay){
      const interval = setInterval(play, 2000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay])

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide, TOTAL_SLIDES]);
  
  return (
      <>
        <div className="gallery-wrap">
          <h2>Move Images</h2>
          <div className="move-container">
            <button onClick={prevSlide} className="move-button"><h2>←</h2></button>
            <div className="move-content">
              <div className="move-slide-container" ref={slideRef}>
                {
                  images.map((v,i)=>{
                    return(
                      <ImageMoveSlider images={v.url} key={i}/>
                    );
                  })
                }
              </div>
            </div>
            <button onClick={nextSlide} className="move-button"><h2>→</h2></button>
          </div>
          <div>
            <span><input type="checkbox" onChange={onChackedAutoPlay}/> Auto Play</span>
          </div>
          <h2>Fade Images</h2>
          <div className="fade-container">
            <div className="fade-content">
              <ImageFadeSlider nextPage={4000} transTime={10} images={images}/>
            </div>
          </div>
        </div>
      </>
    )
});
export default Gallery;