import React from "react";

const LogoHeaderComponent = ({ style, imageUrl, outerStyle }) => {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} style={style} alt="logoHeader" />
    </div>
  );
};

export default LogoHeaderComponent;
