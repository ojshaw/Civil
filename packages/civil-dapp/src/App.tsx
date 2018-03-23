import * as React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

class App extends React.Component {
  render() {
    return (
      <StyledDiv>
        <Header />
        <Main />
      </StyledDiv>
    );
  }
}

export default App;
