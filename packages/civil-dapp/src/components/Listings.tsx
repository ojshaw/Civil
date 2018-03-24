import * as React from 'react';
import styled from 'styled-components';
import { Civil } from '@joincivil/core';
// import BigNumber from 'bignumber.js';
import { List } from 'immutable';
const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%
  color: black;
  border-bottom: 2px solid black;
`;

export interface ListingsState {
  applications: List<string>;
}

class Listings extends React.Component<{}, ListingsState> {

  constructor(props: any) {
    super(props);
    this.state = {
      applications: List<string>()
    };
  }

  componentWillMount() {
    const civil = new Civil();
    const tcr = civil.getDeployedOwnedAddressTCRWithAppeals();
    const instance = this;
    tcr.listingsInApplicationStage().subscribe((listing) => {
      instance.setState({applications: this.state.applications.push(listing)});
    });
  }

componentWillUnmount() {

  }

render() {
    return (
      <StyledDiv>
        whaddup listings: {this.state.applications.toString()}
      </StyledDiv>
    );
  }
}

export default Listings;
