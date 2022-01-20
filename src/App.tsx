import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SubscriptionOrderProcess } from "./Views";

function App() {
  useEffect(() => {
    const url = "https://covid.ourworldindata.org/data/owid-covid-data.json";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        const data = Object.values(json).map((i) => i);
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/subscription-order-process" />;
            }}
          />
          <Route exact path="/subscription-order-process">
            <SubscriptionOrderProcess />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
