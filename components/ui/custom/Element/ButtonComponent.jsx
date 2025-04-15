import React from 'react'

function ButtonComponent({style,content,outerStyle,url}) {
  return (
    <div style={outerStyle}>
      <a href={url} style={style}>
        {/* <button style={style}>{content}</button> */}
        {content}
      </a>
    </div>
  );
}

export default ButtonComponent
