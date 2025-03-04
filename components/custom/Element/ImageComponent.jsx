import React from "react";

const ImageComponent = ({ style, imageUrl, outstyle }) => {
  return (
    <div style={outstyle}>
      <img src={imageUrl} style={style} alt="image" />
    </div>
  );
};

export default ImageComponent;
