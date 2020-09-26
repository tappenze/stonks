import React from "react";
import fire from "./config/fire";
import Login from "./Login";
import Home from "./Home";


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount(){
    this.authListener();
  }

  //user authentication and login
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      //console.log(user.email);
      if (user) {
        this.setState({user});
        //localStorage.setItem('user', user.uid)
      } else {
        this.setState({user:null});
        //localStorage.removeItem('user');
      }
    });
  }
  

  render() {
    return (
      <div>
        {this.state.user ? (<Home />) : (<Login />)}   
        
      </div>
    );
  }
}

export default App;