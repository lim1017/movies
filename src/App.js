import React, {useState} from "react";
import HomePage from "./views/HomePage"
import PublicProfile from "./views/PublicProfile";
import AppBar from "./components/AppBar/AppBar"

import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState({username:"", user_id: "", nominations:[]})


  return (
    <Router>
            <AppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Switch>
        
        <Route exact path="/">
          <HomePage isLoggedIn={isLoggedIn} />
        </Route>

        <Route
            path="/profile/:username"
            component={PublicProfile} 
        />
      </Switch>

      <div className="App"></div>
    </Router>
  );
}

export default App;
