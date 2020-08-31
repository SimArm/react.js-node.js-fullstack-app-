import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";

import "./App.scss";
import "./bootstrap-grid.min.css";

import Consultation from "./Components/Consultation/Consultation";
import Consilium from "./Components/Consilium/Consilium";

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <nav className="nav">
          <div className="navWrapper">
            <ul>
              <li>
                <NavLink to="/Konsultacijos" activeClassName="activeNav">Konsultacijos</NavLink>
              </li>
              <li>
                <NavLink to="/Konsiliumai" activeClassName="activeNav">Konsiliumai</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="contentWrapper">
          <Switch>
            <Route exact path="/">
              <Redirect to="/Konsultacijos" />
            </Route>
            <Route path="/Konsultacijos" exact strict>
              <Consultation />
            </Route>
            <Route path="/Konsiliumai" exact strict>
              <Consilium />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
