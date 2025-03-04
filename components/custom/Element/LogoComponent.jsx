import React from "react";

const LogoComponent = ({ style, imageUrl, outerStyle }) => {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} style={style} alt="logo" />
    </div>
  );
};

export default LogoComponent;
