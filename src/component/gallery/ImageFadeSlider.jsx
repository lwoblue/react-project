import React, {useState, useEffect, memo} from 'react';
import { useTransition, animated} from 'react-spring';
import './Gallery.css';

  const ImageFadeSlider = memo(({nextPage, transTime, images}) => {
    const [index, setIndex] = useState(0);
    const imageList = images;
    let imageSize = Number(imageList.length);

    const transitions = useTransition(imageList[index], item => item.id, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: { mass: 1, tension: (transTime * 100), friction: (transTime * 50) },
    });
    useEffect(() => void setInterval(() => setIndex(state => (state + 1) % imageSize), nextPage), [imageSize, nextPage]);
    
    return (
      <>
      {
        transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            className="fade-background-slider"
            style={{ ...props, backgroundImage: `url(${item.url}` }}
          />
        ))
      }
      </>
    );
  });

  export default ImageFadeSlider;
  