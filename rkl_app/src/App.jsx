import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

import "./App.scss";

import Consultation from "./Components/Consultation/Consultation";
import Consilium from "./Components/Consilium/Consilium";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={apiResponse:"",}
  }

  callAPI(){
    fetch("http://localhost:8080/testAPI")
      .then(res => res.Text())
      .then(res => this.setState({apiResponse: res}))
  }

  componentDidMount(){
    this.callAPI();
  }
  render() {
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
              <Route path="/Konsultacijos" exact strict>
                <Consultation />
              </Route>
              <Route path="/Konsiliumai" exact strict>
                <Consilium />
              </Route>
            </Switch>
            <p>{this.state.apiResponse}</p>
          </div>
        </div>
      </Router>
    );
  }
}  

export default App;
