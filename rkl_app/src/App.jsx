import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";

import "./App.scss";
import "./CssLib/bootstrap-grid.min.css";

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
            <Route path="/Konsultacijos" component={Consultation} />
            <Route path="/Konsiliumai" component={Consilium} />
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
