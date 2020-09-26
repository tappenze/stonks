import React from "react";

class Form2 extends React.Component {
  render() {
    return <form onSubmit={this.props.getForex}>
        <input type="text" name="base_value" placeholder = "Base Currency Amount"/>
        <input type="text" name="base" placeholder = "Base Currency"/>
        <input type="text" name="out" placeholder = "Output Currency"/>
        <button>Convert</button>
    </form>;
  }
}


export default Form2;