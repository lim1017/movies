import React from "react";
import HomePage from "./views/HomePage"
import PublicProfile from "./views/PublicProfile";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        
        {/* 
        <Route path={`/profile/:username`}>
          <PublicProfile />
        </Route> */}

        <Route
            path="/profile/:username"
            component={PublicProfile} 
        ></Route>
      </Switch>

      <div className="App"></div>
    </Router>
  );
}

export default App;
