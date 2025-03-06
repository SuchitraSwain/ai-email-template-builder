import React from "react";

const SocialIconComponent = ({ outerStyle, iconStyle, socialIcons }) => {
  return (
    <div style={outerStyle}>
      {socialIcons?.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={social.icon}
            alt={`social-icon-${index}`}
            style={iconStyle}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIconComponent;
