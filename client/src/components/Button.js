import React from "react";

const Button = props => {
  return (
    <button
      style={{
        backgroundColor: props.backgroundColor,
        padding: 10,
        border: "1px solid",
        borderRadius: 5,
        color: props.color
      }}
    >
      {props.text}
    </button>
  );
};

export default Button;
