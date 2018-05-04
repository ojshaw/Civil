import * as React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import Listings from "./Listings";
import Newsroom from "./newsroom/Newsroom";
import Contracts from "./Contracts";
import ContractPage from "./ContractPage";
import Listing from "./listing/Listing";
import Editor from "./Editor";
import NewsroomManagement from "./newsroom/NewsroomManagement";
import CreateNewsroom from "./CreateNewsroom";
import Article from "./Article";
import { setCivil } from "../helpers/civilInstance";
import { initializeSubscriptions } from "../helpers/listingEvents";
import { connect, DispatchProp } from "react-redux";

class Main extends React.Component<DispatchProp<any> & RouteComponentProps<any>> {
  public async componentDidMount(): Promise<void> {
    setCivil();
    await initializeSubscriptions(this.props.dispatch!);
  }

  public render(): JSX.Element {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Listings} />
          <Route path="/newsroom/:newsroomAddress" component={Newsroom} />
          <Route path="/contracts" component={Contracts} />
          <Route path="/contract/:contract" component={ContractPage} />
          <Route path="/listing/:listing" component={Listing} />
          <Route path="/editor" component={Editor} />
          <Route path="/mgmt/:newsroomAddress" component={NewsroomManagement} />
          <Route path="/createNewsroom" component={CreateNewsroom} />
          <Route path="/article/:newsroomAddress/:articleId" component={Article} />
        </Switch>
      </>
    );
  }
}

export default withRouter(connect()(Main));
