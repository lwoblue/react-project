import React, { memo } from 'react';
import './Gallery.css';

const ImageMoveSlider = memo(({ images }) => {
  console.log(images);
  return (
    <>
      <img src={images} alt="_blank" className="move-images" />
    </>
  );
});

export default ImageMoveSlider;
