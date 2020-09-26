import React from "react";

const Correlate = props => (
  <div>
    {props.correlation && props.stock1 && props.stock2 && props.days && <p>The correlation between {props.stock1} and {props.stock2} over the past {props.days} days is {props.correlation}</p>}
  </div>
);

export default Correlate;