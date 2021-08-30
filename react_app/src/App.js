import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import AuthService from "./services/auth_service";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';


import AutoBiddingSettings from "./components/AutoBiddingSettings";
import Login from "./components/Login";
import AuctionItems from "./components/AuctionItems";
import AuctionItemDetail from "./components/AuctionItemDetail";



function App(props) {

  const [currentUser, setCurrentUser] = useState(undefined);

  const history = useHistory();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    } else {
      
        history.push("/login");
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };


  return (


    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        
      {currentUser ? (<Link to={"/auction_items"} className="navbar-brand">
          Auction Items
        </Link>
      ):(
        <div></div>
      )}


        {currentUser ? (
          <div className="navbar-nav ml-auto">
              <li className="nav-item">
              <Link to={"/auto_bidding_settings"} className="nav-link">
                Auto Bidding Settings
              </Link>
            </li>
          
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                {currentUser.username}: LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>


          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route path="/auction_items/:itemId" component={AuctionItemDetail} />
          <Route exact path="/auction_items" component={AuctionItems} />
          <Route exact path="/auto_bidding_settings" component={AutoBiddingSettings} />
          <Route exact path="/login" component={Login} />
          <Redirect from="/" to="/auction_items" />

          
        </Switch>
      </div>
    </div>










  );
}

export default App;
