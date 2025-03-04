import React from "react";

const ButtonComponent = ({ style, content, url }) => {
  return (
    <a href={url}>
      <button style={style}>{content}</button>
    </a>
  );
};

export default ButtonComponent;
