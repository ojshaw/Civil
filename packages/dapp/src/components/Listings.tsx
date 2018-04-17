import * as React from "react";
import styled from "styled-components";
import { Civil } from "@joincivil/core";
import { List } from "immutable";
import { Subscription } from "rxjs";

import ListingList from "./ListingList";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%
  color: black;
`;

export interface ListingsState {
  applications: List<string>;
  applicationSubscription: Subscription;
  whitelistedListings: List<string>;
  whitelistSubscription: Subscription;
  readyToWhitelistListings: List<string>;
  readyToWhitelistSubscription: Subscription;
  inChallengeCommitListings: List<string>;
  inChallengeCommitSubscription: Subscription;
  inChallengeRevealListings: List<string>;
  inChallengeRevealSubscription: Subscription;
  canBeUpdatedListings: List<string>;
  canBeUpdatedSubscription: Subscription;
  awaitingAppealRequestListings: List<string>;
  awaitingAppealRequestSubscription: Subscription;
  awaitingAppealJudgmentListings: List<string>;
  awaitingAppealJudgmentSubscription: Subscription;
  error: undefined | string;
}

class Listings extends React.Component<{}, ListingsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      applications: List<string>(),
      applicationSubscription: new Subscription(),
      whitelistedListings: List<string>(),
      whitelistSubscription: new Subscription(),
      readyToWhitelistListings: List<string>(),
      readyToWhitelistSubscription: new Subscription(),
      inChallengeCommitListings: List<string>(),
      inChallengeCommitSubscription: new Subscription(),
      inChallengeRevealListings: List<string>(),
      inChallengeRevealSubscription: new Subscription(),
      canBeUpdatedListings: List<string>(),
      canBeUpdatedSubscription: new Subscription(),
      awaitingAppealRequestListings: List<string>(),
      awaitingAppealRequestSubscription: new Subscription(),
      awaitingAppealJudgmentListings: List<string>(),
      awaitingAppealJudgmentSubscription: new Subscription(),
      error: undefined,
    };
  }

  public componentWillMount(): void {
    window.addEventListener("load", this.initListings);
  }

  public componentWillUnmount(): void {
    this.state.applicationSubscription.unsubscribe();
    this.state.whitelistSubscription.unsubscribe();
    this.state.readyToWhitelistSubscription.unsubscribe();
    this.state.inChallengeCommitSubscription.unsubscribe();
    this.state.inChallengeRevealSubscription.unsubscribe();
    this.state.canBeUpdatedSubscription.unsubscribe();
    this.state.awaitingAppealRequestSubscription.unsubscribe();
    this.state.awaitingAppealJudgmentSubscription.unsubscribe();
    window.removeEventListener("load", this.initListings);
  }

  public render(): JSX.Element {
    return (
      <StyledDiv>
        Whitelisted Newsrooms:<br />
        <ListingList listings={this.state.whitelistedListings} />
        <br />
        Applications:<br />
        <ListingList listings={this.state.applications} />
        <br />
        Ready to be Whitelisted:<br />
        <ListingList listings={this.state.readyToWhitelistListings} />
        <br />
        In Challenge Vote-Commit Stage:<br />
        <ListingList listings={this.state.inChallengeCommitListings} />
        <br />
        In Challenge Vote-Reveal Stage:<br />
        <ListingList listings={this.state.inChallengeRevealListings} />
        <br />
        Can be Updated:<br />
        <ListingList listings={this.state.canBeUpdatedListings} />
        <br />
        Awaiting Appeal Request:<br />
        <ListingList listings={this.state.awaitingAppealRequestListings} />
        <br />
        Awaiting Appeal Judgment:<br />
        <ListingList listings={this.state.awaitingAppealJudgmentListings} />
        <br />
        {this.state.error}
      </StyledDiv>
    );
  }

  // TODO(nickreynolds): move this all into redux
  private initListings = async () => {
    const civil = new Civil();
    let tcr;
    try {
      tcr = civil.tcrSingletonTrusted();
    } catch (ex) {
      console.log("failed to get tcr.");
      this.setState({
        error: "No Supported Network Found. Please set MetaMask network to Rinkeby and Unlock Account.",
      });
    }

    if (tcr) {
      const applicationSubscription = tcr.listingsInApplicationStage().subscribe(listing => {
        this.setState({ applications: this.state.applications.push(listing) });
      });
      this.setState({ applicationSubscription });

      const whitelistSubscription = tcr.whitelistedListings().subscribe(listing => {
        this.setState({ whitelistedListings: this.state.whitelistedListings.push(listing) });
      });
      this.setState({ whitelistSubscription });

      const readyToWhitelistSubscription = tcr.readyToBeWhitelistedListings().subscribe(listing => {
        this.setState({ readyToWhitelistListings: this.state.readyToWhitelistListings.push(listing) });
      });
      this.setState({ readyToWhitelistSubscription });

      const inChallengeCommitSubscription = tcr.currentChallengedCommitVotePhaseListings().subscribe(listing => {
        this.setState({ inChallengeCommitListings: this.state.inChallengeCommitListings.push(listing) });
      });
      this.setState({ inChallengeCommitSubscription });

      const inChallengeRevealSubscription = tcr.currentChallengedRevealVotePhaseListings().subscribe(listing => {
        this.setState({ inChallengeRevealListings: this.state.inChallengeRevealListings.push(listing) });
      });
      this.setState({ inChallengeRevealSubscription });

      /*const canBeUpdatedSubscription = tcr.canB().subscribe(listing => {
        this.setState({ applications: this.state.whitelistedListings.push(listing) });
      });
      this.setState({ canBeUpdatedSubscription });*/

      const awaitingAppealRequestSubscription = tcr.listingsAwaitingAppealRequest().subscribe(listing => {
        this.setState({ awaitingAppealRequestListings: this.state.awaitingAppealRequestListings.push(listing) });
      });
      this.setState({ awaitingAppealRequestSubscription });

      const awaitingAppealJudgmentSubscription = tcr.listingsAwaitingAppeal().subscribe(listing => {
        this.setState({ awaitingAppealJudgmentListings: this.state.awaitingAppealJudgmentListings.push(listing) });
      });
      this.setState({ awaitingAppealJudgmentSubscription });
    }
  };
}

export default Listings;