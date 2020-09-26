import React from "react";

const Forex = props => (
  <div>
    {props.base_value && props.base && props.end && props.out && <p>{props.base_value} {props.base} is equal to {props.end} {props.out}</p>}

  </div>
);

export default Forex;
