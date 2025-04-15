import React from "react";

function TextComponent({ style, textarea ,outerStyle}) {
  return (
    <div className="w-full" style={outerStyle}>
      <h2 style={style}>{textarea}</h2>
    </div>
  );
}

export default TextComponent;
