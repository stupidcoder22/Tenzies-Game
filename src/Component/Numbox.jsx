import React from "react";

function Numbox(props) {
  const dostyle = {
    backgroundColor: props.isheld ? "#59e391" : "white",
  };

  return (
    <div className="dieface" style={dostyle} onClick={props.hold}>
      <h2 className="">{props.data}</h2>
    </div>
  );
}

export default Numbox;
