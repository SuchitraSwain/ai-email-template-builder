import React from "react";

const ImageComponent = ({ style, imageUrl, outerStyle }) => {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} style={style} alt="image" />
    </div>
  );
};

export default ImageComponent;
