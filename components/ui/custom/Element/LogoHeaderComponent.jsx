import React from 'react'

function LogoHeaderComponent({ style, imageUrl, outerStyle }) {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} alt="logoHeader" style={style} />
    </div>
  );
}

export default LogoHeaderComponent
