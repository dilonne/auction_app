import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


import "./assets/scss/react_auction_app.scss";
import $ from 'jquery';
import Popper from 'popper.js'




import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
