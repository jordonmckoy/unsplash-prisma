import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Favourites from "./screens/Favourites";
import Search from "./screens/Search";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Search />
        </Route>
        <Route exact path="/favourites">
          <Favourites />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
