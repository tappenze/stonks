import React, { Component } from 'react';
import fire from './config/fire';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.login=this.login.bind(this);
        this.signup=this.signup.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }


    render(){
        return (
        <form>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder = "Enter email"/>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder = "Enter Password"/>
            <button type="submit" onClick={this.login}>Login</button>
            <button onClick={this.signup}>Sign up</button>
            <p id="err"></p>
        </form>
        );
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error)=>{
            document.getElementById("err").innerHTML = error.message;
            //console.log(error)
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error)=>{
            document.getElementById("err").innerHTML = error.message;
            //console.log(error)
        });
        const db = fire.firestore();
        //db.collection('users').add({email: this.state.email, password: this.state.password});
        db.collection('users').doc(this.state.email).set({email: this.state.email, password: this.state.password, watchlist: []});

    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
}
export default Login;