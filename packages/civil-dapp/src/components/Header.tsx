import * as React from 'react';
import styled from 'styled-components';
import { Civil } from '@joincivil/core';
// import BigNumber from 'bignumber.js';

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%
  color: black;
  border-bottom: 2px solid black;
`;

export interface HeaderState {
  balance: string;
}

class Header extends React.Component<{}, HeaderState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      balance: 'loading...'
    };
  }

  componentWillMount() {
    const civil = new Civil();
    // const tcr = civil.getDeployedOwnedAddressTCRWithAppeals();
    const token = civil.getEIP20ForDeployedTCR();
    const instance = this;
    token.then((t) => {
      t.getBalance(civil.userAccount).then((balance) => {
        instance.setState({balance: balance.toString()});
      });
    });
    // tcr.
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <StyledDiv>
        Balance: {this.state.balance}
      </StyledDiv>
    );
  }
}

export default Header;
