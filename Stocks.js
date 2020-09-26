import React from "react";

const Stocks = props => (
  <div>
    {props.symbol && <p>Symbol: {props.symbol}</p>}
    {props.name && <p>Name: {props.name}</p>}
    {props.currency && <p>Currency: {props.currency}</p>}
    {props.price && <p>Price: {props.price}</p>}
    {props.price_open && <p>Price at Open: {props.price_open}</p>}
    {props.day_high && <p>Day High: {props.day_high}</p>}
    {props.day_low && <p>Day Low: {props.day_low}</p>}
    {props.week_high && <p>Week High: {props.week_high}</p>}
    {props.week_low && <p>Week Low: {props.week_low}</p>}
    {props.day_change && <p>Day Change: {props.day_change}</p>}
    {props.change_pct && <p>Change Percentage: {props.change_pct}</p>}
    {props.close_yesterday && <p>Yesterday's close: {props.close_yesterday}</p>}
    {props.market_cap && <p>Market Cap: {props.market_cap}</p>}
    {props.volume && <p>Volume: {props.volume}</p>}
    {props.volume_avg && <p>Volume Average: {props.volume_avg}</p>}
    {props.shares && <p>Number of Shares: {props.shares}</p>}
    {props.stock_exchange_long && (
      <p>Stock Exchange Long: {props.stock_exchange_long}</p>
    )}
    {props.stock_exchange_short && (
      <p>Stock Exchange Short: {props.stock_exchange_short}</p>
    )}
    {props.timezone && <p>Timezone: {props.timezone}</p>}
    {props.timezone_name && <p>Timezone Name: {props.timezone_name}</p>}
    {props.gmt_offset && <p>gmt_offset: {props.gmt_offset}</p>}
    {props.last_trade_time && <p>Last Trade Time: {props.last_trade_time}</p>}
    {props.pe && <p>Pe: {props.pe}</p>}
    {props.eps && <p>Eps: {props.eps}</p>}
    {props.error && <p>{props.error}</p>}
  </div>
);

export default Stocks;
