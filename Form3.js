import React from "react";

class Form3 extends React.Component {
  render() {
    return <form onSubmit={this.props.getCorrelate}>
        <input type="text" name="stock1" placeholder = "Stock One"/>
        <input type="text" name="stock2" placeholder = "Stock Two"/>
        <input type="text" name="days" placeholder = "Over how many days"/>
        <button>Find Correlation</button>
    </form>;
  }
}


export default Form3;