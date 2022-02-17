import React from "react";

const HoverableDiv = (props) => {
  return (
    <div
      className={props.className}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
     ? {props.children}
    </div>
  );
};

export default HoverableDiv;
