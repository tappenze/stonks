import React from "react";

class Form extends React.Component {
  render() {
    return <form onSubmit={this.props.getStocks}>
        <input type="text" name="symbol" placeholder = "Stock Symbol"/>
        <button>Add Stock to watchlist</button>
    </form>;
  }
}


export default Form;