import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Listings from "./Listings";
import Newsroom from "./Newsroom";

class Main extends React.Component {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route exact={true} path="/" component={Listings} />
        <Route path="/newsroom/:newsroomAddress" component={Newsroom} />
      </Switch>
    );
  }
}

export default Main;
