import React from "react";

function SocialIconsComponent({ style, socialIcons, outerStyle, isEditable }) {
  const handleClick = (e, index) => {
    if (isEditable) {
      e.preventDefault(); // stop redirecting
      e.stopPropagation(); // stop triggering parent actions
      // Trigger your edit logic here if needed
      console.log("Clicked icon to edit:", socialIcons[index]);
    }
  };

  return (
    <div style={outerStyle}>
      {socialIcons?.map((iconObj, index) => (
        <a
          key={index}
          href={isEditable ? "#" : iconObj.url || "#"}
          onClick={(e) => handleClick(e, index)}
        >
          <img src={iconObj.icon} alt="Social Icon" style={style} />
        </a>
      ))}
    </div>
  );
}

export default SocialIconsComponent;
