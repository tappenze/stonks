import React from "react";
import Titles from "./components/Titles";
import Stocks from "./components/Stocks";
//import Graph from "./components/Graph";
import Form from "./components/Form";
import Form2 from "./components/Form2";
import Forex from "./components/Forex";
import Form3 from "./components/Form3";
import Correlate from "./components/Correlate";
import fire from "./config/fire";
//import Login from "./Login";
//import App from "./App";
import firebase from "firebase/app";

// import {
//   Route,
//   NavLink,
//   BrowserRouter
// } from "react-router-dom";


const API_KEY = "l4LeaeZc5U8EUmsYXzZnXL8zUDtyMyfGMEJUoQKLE9vgj6RdFbafdxqrZvDH";
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Home extends React.Component {
  
  state = {

        symbol: undefined,
        name: undefined,
        currency: undefined,
        price: undefined,
        price_open: undefined,
        day_high: undefined,
        day_low: undefined,
        week_high: undefined,
        week_low: undefined,
        day_change: undefined,
        change_pct: undefined,
        close_yesterday: undefined,
        market_cap: undefined,
        volume: undefined,
        volume_avg: undefined,
        shares: undefined,
        stock_exchange_long: undefined,
        stock_exchange_short: undefined,
        timezone: undefined,
        timezone_name: undefined,
        gmt_offset: undefined,
        last_trade_time: undefined,
        pe: undefined,
        eps: undefined,
        error: undefined,
        
        base: undefined,
        base_value: undefined,
        out: undefined,
        end: undefined,
    
        stock1: undefined,
        stock2: undefined,
        correlation: undefined,
        days: undefined
      }

    
      logout(){
        fire.auth().signOut();
      }

      
    
      //SINGLE STOCK
      getStocks = async (e) => {
        e.preventDefault();
        const symbol = e.target.elements.symbol.value;
        const api_single_call = await fetch (
          `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${API_KEY}`
        );
        const data = await api_single_call.json();
        console.log(data);
        
        if (symbol){
          this.setState({
            symbol: data.data[0].symbol,
            name: data.data[0].name,
            currency: data.data[0].currency,
            price: data.data[0].price,
            price_open: data.data[0].price_open,
            day_high: data.data[0].day_high,
            day_low: data.data[0].day_low,
            week_high: data.data[0].week_high,
            week_low: data.data[0].week_low,
            day_change: data.data[0].day_change,
            change_pct: data.data[0].change_pct,
            close_yesterday: data.data[0].close_yesterday,
            market_cap: data.data[0].market_cap,
            volume: data.data[0].volume,
            volume_avg: data.data[0].volume_avg,
            shares: data.data[0].shares,
            stock_exchange_long: data.data[0].stock_exchange_long,
            stock_exchange_short: data.data[0].stock_exchange_short,
            timezone: data.data[0].timezone,
            timezone_name: data.data[0].timezone_name,
            gmt_offset: data.data[0].gmt_offset,
            last_trade_time: data.data[0].last_trade_time,
            pe: data.data[0].pe,
            eps: data.data[0].eps,
            error: ""
          });
          //add stock symbol to watchlist if not already there
          const db = fire.firestore();

          //const FieldValue = require('firebase-admin').firestore.FieldValue;
          //console.log(FieldValue);

          const email = fire.auth().currentUser.email;
          console.log(fire.auth().currentUser.email)

          db.collection('users').doc(email).update({

            watchlist: firebase.firestore.FieldValue.arrayUnion({name: this.state.name, symbol: this.state.symbol})
            
          }).then(function() {
            console.log("Updated user's watchlist");
          });
          // var numfields;
          // db.collection('users').doc(email).get().then(snap => {numfields = snap.size});
          // console.log(numfields);
          //db.collection('users').doc(email).set(this.state.symbol);
        } else {
          this.setState({
            error: "Enter a value"
          });
        }
      };
    
    
      //FOREX
      getForex = async (e) => {
        e.preventDefault();
        const base_value = e.target.elements.base_value.value;
        const base = e.target.elements.base.value;
        const out = e.target.elements.out.value;
        const api_forex_call = await fetch (
          `https://api.worldtradingdata.com/api/v1/forex?base=${base}&api_token=${API_KEY}`
        );
        const data = await api_forex_call.json();
        console.log(data);
        
        if (base_value && base && out){
          //var conversion_factor = 1;
          const conversion_factor = data.data[out];
    
          this.setState({
            base_value: base_value,
            base: base,
            out: out,
            end: base_value * conversion_factor
          });
        } else {
          this.setState({
            error: "Enter a value"
          });
        }
      };
    
      
      //CORRELATION
      //make first api call with history, stored in a data type called data1, then do the same with data2
      getCorrelate = async (e) => {
        e.preventDefault();
        const stock1 = e.target.elements.stock1.value;
        const stock2 = e.target.elements.stock2.value;
        const days = e.target.elements.days.value;
        
        const api_stock1_call = await fetch (
          `https://api.worldtradingdata.com/api/v1/history?symbol=${stock1}&api_token=${API_KEY}`
        );
        const data1 = await api_stock1_call.json();
        console.log(data1);
        
        const api_stock2_call = await fetch (
          `https://api.worldtradingdata.com/api/v1/history?symbol=${stock2}&api_token=${API_KEY}`
        );
        const data2 = await api_stock2_call.json();
        console.log(data2);
    
        const obs1_intermediate = Object.keys(data1.history).map(function(key){
          return [key, data1.history[key].open];
        });
        const obs1 = obs1_intermediate.slice(0,days);
        console.log(obs1);
        
        const obs2_intermediate = Object.keys(data2.history).map(function(key){
          return [key, data2.history[key].open];
        });
        const obs2 = obs2_intermediate.slice(0,days);
        console.log(obs2);
    
        var av1 = 0;
        var av2 = 0;
        var num = 0;
        var denom1 = 0;
        var denom2 = 0;
        var denom = 1;
        var i;
        for (i = 0; i < days; i++){
          av1 += parseFloat(obs1[i][1]);
          av2 += parseFloat(obs2[i][1]);
        }
        av1 = av1/days;
        //console.log(av1);
        av2 = av2/days;
        //console.log(av2);
        let vals1 = new Array(days);
        let vals2 = new Array(days);
        for (i = 0; i < days; i++){
          num += (parseFloat(obs1[i][1]) - av1) * (parseFloat(obs2[i][1]) - av2);
          denom1 += Math.pow(parseFloat(obs1[i][1]) - av1, 2);
          denom2 += Math.pow(parseFloat(obs2[i][1]) - av2, 2);
          vals1[i] = parseFloat(obs1[i][1]);
          vals2[i] = parseFloat(obs2[i][1]);
        }
        denom = denom1 * denom2;
        denom = Math.sqrt(denom);
        
        const correlation = num/denom;
    
        this.setState({
          stock1: stock1,
          stock2: stock2,
          correlation: correlation,
          days: days
        });
    
      };
    
      
    
      render() {
        return (
          <div>     
            <Titles />
            
            <Form getStocks={this.getStocks}/>
            <Stocks 
              symbol = {this.state.symbol}
              name = {this.state.name}
              currency = {this.state.currency}
              price = {this.state.price}
              price_open = {this.state.price_open}
              day_high = {this.state.day_high}
              day_low = {this.state.day_low}
              week_high = {this.state.week_high}
              week_low = {this.state.week_low}
              day_change = {this.state.day_change}
              change_pct = {this.state.change_pct}
              close_yesterday = {this.state.close_yesterday}
              market_cap = {this.state.market_cap}
              volume = {this.state.volume}
              volume_avg = {this.state.volume_avg}
              shares = {this.state.shares}
              stock_exchange_long = {this.state.stock_exchange_long}
              stock_exchange_short = {this.state.stock_exchange_short}
              timezone = {this.state.timezone}
              timezone_name = {this.state.timezone_name}
              gmt_offset = {this.state.gmt_offset}
              last_trade_time = {this.state.last_trade_time}
              pe = {this.state.pe}
              eps = {this.state.eps}
    
            />
            <Form2 getForex={this.getForex}/>
            <Forex 
              base = {this.state.base}
              base_value = {this.state.base_value}
              end = {this.state.end}
              out = {this.state.out}
            />
            <Form3 getCorrelate={this.getCorrelate}/>
            <Correlate 
              stock1 = {this.state.stock1}
              stock2 = {this.state.stock2}
              correlation = {this.state.correlation}
              days = {this.state.days}
            />
            <button onClick={this.logout}>Sign out</button>

          </div>
        );
      }
}

export default Home;